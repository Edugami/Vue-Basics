import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import App from './App.vue'
import AppExperiment from './AppExperiment.vue'

const app = createApp(AppExperiment)

app.use(createPinia())

app.mount('#app')
