import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from './../node_modules/pinia-plugin-persistedstate/dist/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import App from './App.vue' - Vue App 
import App from './AppExperiment.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.mount('#app')
