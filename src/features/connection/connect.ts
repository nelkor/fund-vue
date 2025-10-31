import { ethers, Eip1193Provider } from 'ethers'

import { fundAbi } from './fund-abi'
import { tokenAbi } from './token-abi'
import { BlockchainConnection } from './types'
import { unscaleAmount, createCallFunction } from './utils'

const NETWORK_ID = 43114n
const TOKEN_DECIMALS = 18
const DOLLAR_DECIMALS = 6
const FUND_ADDRESS = '0xe83EBE2b62f2FA384Ee842EE7147A8Cb9CBB2F53'
const TOKEN_ADDRESS = '0x0a661766a21D8D0fF11f200158abE0C9DfB8172f'
const DOLLAR_ADDRESS = '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7'

export const connect = async (): Promise<BlockchainConnection> => {
  if (!('ethereum' in window)) {
    throw new Error('No wallet found')
  }

  const provider = new ethers.BrowserProvider(ethereum as Eip1193Provider)

  const { chainId } = await provider.getNetwork()

  if (chainId !== NETWORK_ID) {
    throw new Error('Wrong network')
  }

  const signer = await provider.getSigner()

  const fundContract = new ethers.Contract(FUND_ADDRESS, fundAbi, signer)
  const tokenContract = new ethers.Contract(TOKEN_ADDRESS, tokenAbi, signer)
  const dollarContract = new ethers.Contract(DOLLAR_ADDRESS, tokenAbi, signer)

  const isOpen = await fundContract.isOpen()

  const call = createCallFunction(provider)

  return {
    isOpen,
    approveDollar(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, DOLLAR_DECIMALS)

      return call(() => dollarContract.approve(FUND_ADDRESS, scaledAmount))
    },
    buy(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, DOLLAR_DECIMALS)

      return call(() => fundContract.buy(scaledAmount))
    },
    sell(amount: string) {
      const scaledAmount = ethers.parseUnits(amount, TOKEN_DECIMALS)

      return call(() => fundContract.sell(scaledAmount))
    },
    async getAllowance() {
      return unscaleAmount(
        await dollarContract.allowance(signer.address, FUND_ADDRESS),
        DOLLAR_DECIMALS,
      )
    },
    async getDollarBalance() {
      return unscaleAmount(
        await dollarContract.balanceOf(signer.address),
        DOLLAR_DECIMALS,
      )
    },
    async getTokenBalance() {
      return unscaleAmount(
        await tokenContract.balanceOf(signer.address),
        TOKEN_DECIMALS,
      )
    },
  }
}
