import { ref, computed } from 'vue'

import { connect } from './connect'
import { BlockchainConnection } from './types'

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
