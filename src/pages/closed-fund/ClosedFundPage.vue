<script setup lang="ts">
import { ref } from 'vue'
import { NP, NA, NH1, NAlert } from 'naive-ui'

import { MyTelegram } from '@/features/templates'
import { getConnection } from '@/features/connection'

const amount = ref(0)
const connection = getConnection()

connection.getTokenBalance().then(balance => {
  amount.value = Number(parseFloat(balance).toFixed(4))
})
</script>

<template>
  <NH1>Closed period</NH1>

  <NP>
    1000 HAVE tokens were issued. The price in the last open&nbsp;period was
    $1&nbsp;per&nbsp;1&nbsp;HAVE. $1,000 was raised over
    the&nbsp;last&nbsp;period. The&nbsp;funds&nbsp;raised
    are&nbsp;now&nbsp;in&nbsp;circulation.
  </NP>

  <NP>
    You can monitor funds in circulation by following

    <NA
      href="https://debank.com/profile/0xaaAaeC452BD175Be98E71745AB2686dFb5777777"
      target="_blank"
      >this link</NA
    >.
  </NP>

  <MyTelegram />

  <NAlert
    v-if="amount"
    :title="`You own ${amount} fund tokens`"
    type="success"
  />
</template>
