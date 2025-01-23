<script setup lang="ts">
import { ColorPaletteOutline } from '@vicons/ionicons5'
import { NLayoutHeader, NText, NIcon, NButton } from 'naive-ui'

import {
  isConnected,
  canBeConnected,
  connectToNetwork,
} from '@/features/network'
import { useChangeTheme } from '@/features/theme'

const { changeTheme } = useChangeTheme()
</script>

<template>
  <NLayoutHeader bordered class="app-header">
    <NText translate="no">Have Fund</NText>

    <div class="header-content">
      <NButton secondary circle @click="changeTheme">
        <template #icon>
          <NIcon>
            <ColorPaletteOutline />
          </NIcon>
        </template>
      </NButton>

      <NButton
        size="large"
        style="min-width: 120px"
        :disabled="!canBeConnected"
        :type="isConnected ? 'info' : 'primary'"
        @click="connectToNetwork"
      >
        {{ isConnected ? 'Connected' : 'Connect' }}
      </NButton>
    </div>
  </NLayoutHeader>
</template>
