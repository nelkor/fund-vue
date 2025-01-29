<script setup lang="ts">
import { NH1, NH2, NList, NListItem, NText, NA, NP } from 'naive-ui'

import { MyTelegram } from '@/features/templates'
</script>

<template>
  <NH1>About us</NH1>

  <NP>
    <NText strong type="primary">Have Fund</NText> is a decentralized investment
    fund.
  </NP>

  <NP>
    During the open period, the Fund freely exchanges
    its&nbsp;own&nbsp;tokens&nbsp;HAVE for&nbsp;stablecoins
    at&nbsp;a&nbsp;fixed&nbsp;price.
  </NP>

  <NP>
    During the closed period, stablecoins multiply in DeFi,
    and&nbsp;the&nbsp;number of&nbsp;HAVE&nbsp;tokens does&nbsp;not&nbsp;change.
    So&nbsp;in&nbsp;the&nbsp;next&nbsp;open&nbsp;period,
    the&nbsp;HAVE&nbsp;tokens are&nbsp;more&nbsp;expensive.
  </NP>

  <NP>
    You can inspect the Fund logic in the

    <NA href="https://github.com/nelkor/have-fund" target="_blank">
      GitHub&nbsp;repository</NA
    >

    or directly in

    <NA
      href="https://testnet.snowtrace.io/address/0xCFF3d28996d878e121fB56ad7D9B247Ff5F49460/contract/43113/code"
      target="_blank"
    >
      blockchain&nbsp;explorer</NA
    >. Once on the blockchain, the&nbsp;code&nbsp;cannot&nbsp;be&nbsp;changed.
  </NP>

  <MyTelegram />
  <NH2>How to use</NH2>

  <NList hoverable>
    <NListItem>
      Install
      <NA href="https://metamask.io/ru/download" target="_blank">MetaMask</NA>
    </NListItem>

    <NListItem>
      Select the

      <NA
        href="https://support.avax.network/en/articles/4626956-how-to-add-the-avalanche-c-chain-to-an-evm-wallet"
        target="_blank"
      >
        Avalanche C-Chain
      </NA>
    </NListItem>

    <NListItem>And then click the "Connect" button</NListItem>
  </NList>
</template>
