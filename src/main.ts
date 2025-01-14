// SPDX-License-Identifier: MIT
// Copyright © 2024 André Santos

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
      preset: Nora
  }
});
app.use(createPinia())
app.use(router)

app.mount('#app')

