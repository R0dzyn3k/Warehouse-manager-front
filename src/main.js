import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/main.scss';

createApp(App)
  .use(router)
  .mount('#app')
