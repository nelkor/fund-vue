<script setup lang="ts">
import { NH1, NH2, NList, NListItem, NText, NA, NP } from 'naive-ui'
</script>

<template>
  <NH1>About us</NH1>

  <NP>
    <NText strong type="primary">Have Fund</NText> is a decentralized investment
    fund.
  </NP>

  <NP>
    During the open period, the Fund freely exchanges its&nbsp;own&nbsp;tokens
    for&nbsp;stablecoins at&nbsp;a&nbsp;fixed&nbsp;price.
  </NP>

  <NP>
    During the closed period, dollars multiply in DeFi, and&nbsp;the&nbsp;number
    of&nbsp;fund&nbsp;tokens does&nbsp;not&nbsp;change.
  </NP>

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
