import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import CountryFlag from 'vue-country-flag-next'

const app = createApp(App)
app.component('CountryFlag', CountryFlag)
app.use(createPinia()).mount('#app')
