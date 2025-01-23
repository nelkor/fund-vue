import { createApp } from 'vue'

import { App, watchHeight } from '@/app'

watchHeight()
createApp(App).mount('#app')
