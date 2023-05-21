import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/app.scss'
import { store } from '@/store'
import App from './App.vue'
createApp(App).use(store).mount('#app')
