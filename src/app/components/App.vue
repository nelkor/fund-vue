<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'

import { AppHeader } from '@/widgets/app-header'
import { OpenFundPage } from '@/pages/open-fund'
import { ClosedFundPage } from '@/pages/closed-fund'
import { InstructionPage } from '@/pages/instruction'
import { isFundOpen, isConnected } from '@/features/network'

import NaiveProvider from './NaiveProvider.vue'
</script>

<template>
  <NaiveProvider>
    <NLayout>
      <AppHeader />

      <NLayoutContent class="app-layout-content" :native-scrollbar="false">
        <div class="page-wrapper">
          <OpenFundPage v-if="isFundOpen" />
          <ClosedFundPage v-else-if="isConnected" />
          <InstructionPage v-else />
        </div>
      </NLayoutContent>
    </NLayout>
  </NaiveProvider>
</template>
