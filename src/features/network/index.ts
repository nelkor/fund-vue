import { ref, computed } from 'vue'

import { connect, BlockchainConnection } from '@/connection'

const connectionInProgress = ref(false)
const connection = ref<null | BlockchainConnection>(null)

export const canBeConnected = computed(
  () => !connectionInProgress.value && !connection.value,
)

export const getConnection = () => {
  if (!connection.value) {
    throw new Error('Not connected')
  }

  return connection.value
}

export const isConnected = computed(() => Boolean(connection.value))

export const isFundOpen = computed(() => Boolean(connection.value?.isOpen))

// Перенести connection в features и сделать useConnectToNetwork
export const connectToNetwork = () => {
  connectionInProgress.value = true

  connect()
    .then(result => {
      connection.value = result
    })
    .finally(() => {
      connectionInProgress.value = false
    })
}
