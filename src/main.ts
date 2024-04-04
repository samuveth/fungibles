import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { UseWagmiPlugin } from 'use-wagmi'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { config } from './helpers/wagmiConfig'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(UseWagmiPlugin, { config })
app.use(VueQueryPlugin)

app.mount('#app')
