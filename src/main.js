import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/main.scss';
import notifications from '@kyvg/vue3-notification';

createApp(App)
  .use(router)
  .use(notifications)
  .mount('#app')
