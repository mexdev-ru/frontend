// import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import Card from 'primevue/card';
import axios from 'axios';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

import Keycloak from './plugins/keycloak'


const app = createApp(App);
axios.defaults.headers.get['header-name'] = 'value'

app.use(PrimeVue);
app.use(ToastService);
app.config.productionTip = false
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Card', Card);

app.use(router);

Keycloak.init({ onLoad: "login-required" })
  .then(auth => {
    if (!auth) {
        console.log("jkhsjfh");
      window.location.reload();
    } else {
        console.log("hui");
      app.mount("#app");
    }
    //Token Refresh
    setInterval(() => {
      Keycloak.updateToken(70).catch(() => {
        console.error("Failed to refresh token");
      });
    }, 6000);
  })
  .catch((error) => {
    console.error(error);
  });
