import { createApp } from 'vue'
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

import '@/plugins/keycloak'
import { updateToken } from '@/plugins/keycloak-util'

Vue.config.productionTip = false

Vue.$keycloak.init({ onLoad: 'login-required' }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        const app = createApp(App);
        axios.defaults.headers.get['header-name'] = 'value'

        app.use(PrimeVue);
        app.use(ToastService);

        app.component('InputText', InputText);
        app.component('Button', Button);
        app.component('Toast', Toast);
        app.component('Password', Password);
        app.component('Card', Card);

        app.use(router);
        app.mount('#app')


        window.onfocus = () => {
            updateToken()
        }
    }
})
