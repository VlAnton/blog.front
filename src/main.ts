import { Quasar, Notify, Loading } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import quasarIconSet from 'quasar/icon-set/mdi-v6'
import '@quasar/extras/mdi-v6/mdi-v6.css'
import 'quasar/src/css/index.sass'
import quasarLang from 'quasar/lang/ru'

import '@/assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
  iconSet: quasarIconSet,
  plugins: {
    Notify,
    Loading,
  },
  lang: quasarLang,
  config: {
    animations: 'all',
  },
})

app.mount('#app')
