<script setup lang="ts">
import {
  NGlobalStyle,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NLoadingBarProvider,
} from 'naive-ui'

import { theme } from '@/features/theme'
</script>

<template>
  <NConfigProvider :theme="theme">
    <NGlobalStyle />

    <NLoadingBarProvider>
      <NMessageProvider>
        <NDialogProvider>
          <slot />
        </NDialogProvider>
      </NMessageProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
