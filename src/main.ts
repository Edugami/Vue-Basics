import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from './../node_modules/pinia-plugin-persistedstate/dist/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import App from './App.vue' - Vue App 

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import TagExperiment from './TagExperiment.vue'
const app = createApp(TagExperiment)

// import ReactivityExperiment from './ReactivityExperiment.vue'
// const app = createApp(ReactivityExperiment)

app.use(pinia)
app.mount('#app')
