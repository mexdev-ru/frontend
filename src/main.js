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
// import VueResource from 'vue-resource';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

import Keycloak from './plugins/keycloak'

const app = createApp(App);
axios.defaults.headers.get['header-name'] = 'value'

app.use(PrimeVue);
app.use(ToastService);
// app.use(VueResource);
app.config.productionTip = false
app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Password', Password);
app.component('Card', Card);

app.use(router);

Keycloak.init({onLoad: "login-required"})
    .then(auth => {
        if (!auth) {
            console.log("jkhsjfh");
            window.location.reload();
        } else {
            console.log(Keycloak.token);
            localStorage.setItem("vue-token", Keycloak.token)
            app.mount("#app");
        }
        //Token Refresh
        // Пытаемся обновить токен каждые 6 секунд
        setInterval(() => {
            // Обновляем токен, если срок его действия истекает в течении 70 секунд
            Keycloak.updateToken(200).then((refreshed) => {
                if (refreshed) {
                    console.log('Token refreshed' + refreshed);
                    localStorage.setItem("vue-token", Keycloak.token)
                } else {
                    console.log('Token not refreshed, valid for '
                        + Math.round(Keycloak.tokenParsed.exp
                            + Keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).catch(() => {
                console.log('Failed to refresh token');
            });
        }, 6000)
    })
    .catch((error) => {
        console.error(error);
    });
