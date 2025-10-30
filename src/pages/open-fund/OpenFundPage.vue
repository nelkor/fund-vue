<script setup lang="ts">
import {
  NP,
  NH1,
  NH2,
  NH3,
  NText,
  NSpin,
  NAlert,
  NSpace,
  NButton,
  useMessage,
  NInputGroup,
  NInputNumber,
} from 'naive-ui'
import { ref } from 'vue'

import { FormSubmit } from '@/shared'
import { getConnection } from '@/features/connection'

import { saveApproval, clearApproval, checkApproval } from './save-approval'

const message = useMessage()
const connection = getConnection()
const transactionInProgress = ref(false)
const tokenBalance = ref<null | number>(null)
const dollarBalance = ref<null | number>(null)
const tokenInputAmount = ref<number | null>(null)
const dollarInputAmount = ref<number | null>(null)

const getStringOfDollarsInput = () => {
  if (!dollarInputAmount.value) {
    throw new Error('Dollar amount is required')
  }

  return dollarInputAmount.value.toString()
}

const roundDecimal = (decimal: string) =>
  parseFloat(parseFloat(decimal).toFixed(4))

const fetchBalance = () =>
  Promise.all([
    connection.getTokenBalance(),
    connection.getDollarBalance(),
  ]).then(([tokenAmount, dollarAmount]) => {
    tokenBalance.value = roundDecimal(tokenAmount)
    dollarBalance.value = roundDecimal(dollarAmount)
  })

const onBuySubmit = () => {
  transactionInProgress.value = true

  const stringOfDollars = getStringOfDollarsInput()
  const alreadyApproved = checkApproval(stringOfDollars)

  // Если уже есть approve, не запрашиваем его повторно.
  const approvalPromise = alreadyApproved
    ? Promise.resolve(true)
    : connection.approveDollar(stringOfDollars)

  approvalPromise
    .then(success => {
      if (success) {
        // Если approve не было изначально, сохраняем новый.
        if (!alreadyApproved) {
          saveApproval(stringOfDollars)
        }

        return connection.buy(stringOfDollars)
      }

      message.error('Attempt to approve dollars failed')

      throw new Error('Attempt to approve dollars failed')
    })
    .then(success => {
      // Независимо от успеха покупки, стираем approve, если он был.
      if (alreadyApproved) {
        clearApproval()
      }

      if (success) {
        fetchBalance()

        dollarInputAmount.value = null

        message.success('HAVE tokens have been successfully purchased!')
      } else {
        message.error('Attempt to buy HAVE tokens failed')
      }
    })
    .finally(() => {
      transactionInProgress.value = false
    })
}

const onSellSubmit = () => {
  if (!tokenInputAmount.value) {
    throw new Error('Token amount is required')
  }

  transactionInProgress.value = true

  connection
    .sell(tokenInputAmount.value.toString())
    .then(success => {
      if (success) {
        fetchBalance()

        tokenInputAmount.value = null

        message.success('HAVE tokens have been successfully sold!')
      } else {
        message.error('Attempt to sell HAVE tokens failed')
      }
    })
    .finally(() => {
      transactionInProgress.value = false
    })
}

const selectAllDollars = () => {
  dollarInputAmount.value = dollarBalance.value
}

const selectAllTokens = () => {
  tokenInputAmount.value = tokenBalance.value
}

fetchBalance()
</script>

<template>
  <NSpin size="large" :show="transactionInProgress" :delay="600">
    <NH1>Open period</NH1>
    <NH3><NText strong type="primary">1 HAVE = 1.2 USD₮</NText></NH3>
    <NH2>Buy HAVE</NH2>

    <form @submit.prevent="onBuySubmit">
      <NSpace vertical size="large">
        <NP v-if="Number.isFinite(dollarBalance)">
          Your balance is <NText strong>{{ dollarBalance }}</NText> USD₮.
        </NP>

        <NInputGroup class="amount-input-group">
          <NInputNumber
            v-model:value="dollarInputAmount"
            :min="0"
            clearable
            size="large"
            class="amount-input"
            :show-button="false"
            :max="dollarBalance || 0"
            placeholder="Enter USD₮ amount"
            :disabled="transactionInProgress"
            :input-props="{ name: 'usdt-amount' }"
          />

          <NButton size="large" ghost @click="selectAllDollars">
            Select all
          </NButton>
        </NInputGroup>

        <FormSubmit
          :disabled="(dollarInputAmount || 0) <= 0 || transactionInProgress"
        >
          <template #text>Buy</template>
        </FormSubmit>

        <NAlert title="Double confirmation" type="warning">
          To purchase tokens, you need to confirm two actions on the network.
          The&nbsp;first&nbsp;one allows Fund to spend dollars from your
          address. The&nbsp;second&nbsp;action is the direct purchase of new
          HAVE tokens.
        </NAlert>
      </NSpace>
    </form>

    <NH2>Sell HAVE</NH2>

    <form @submit.prevent="onSellSubmit">
      <NSpace vertical size="large">
        <NP v-if="Number.isFinite(tokenBalance)">
          Your balance is <NText strong>{{ tokenBalance }}</NText> HAVE.
        </NP>

        <NInputGroup class="amount-input-group">
          <NInputNumber
            v-model:value="tokenInputAmount"
            :min="0"
            clearable
            size="large"
            class="amount-input"
            :show-button="false"
            :max="tokenBalance || 0"
            placeholder="Enter HAVE amount"
            :disabled="transactionInProgress"
            :input-props="{ name: 'have-amount' }"
          />

          <NButton size="large" ghost @click="selectAllTokens">
            Select all
          </NButton>
        </NInputGroup>

        <FormSubmit
          :disabled="(tokenInputAmount || 0) <= 0 || transactionInProgress"
        >
          <template #text>Sell</template>
        </FormSubmit>
      </NSpace>
    </form>
  </NSpin>
</template>

<style scoped>
.amount-input-group {
  display: flex;
  width: 100%;
}

.amount-input {
  flex: 1;
}
</style>
