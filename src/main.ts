import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'

const app = createApp(App)

const pinia = createPinia()

app.config.globalProperties.$http = axios;

pinia.use(piniaPluginPersistedstate)
pinia.use(({ store }) => {
    store.$http = axios;
});

app.use(pinia)
app.use(router)
app.use(vuetify)

const globalStore = useGlobalStore();
app.config.globalProperties.$store = globalStore;

app.mount('#app')
