import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fluent from './fluent'

createApp(App).use(store).use(router).use(fluent).mount('#app')
