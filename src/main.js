// import Vue from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ToastService from 'primevue/toastservice';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Toast from 'primevue/toast';
import Card from 'primevue/card';
// import axios from 'axios';
// import VueResource from 'vue-resource';
import '@/plugins/keycloak'
import { updateToken } from '@/plugins/keycloak-util'


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons


console.log("asdfdfasdf");

// const app = createApp(App);
//axios.defaults.headers.get['header-name'] = 'value'

Vue.use(PrimeVue);
Vue.use(ToastService);
// app.use(VueResource);
Vue.config.productionTip = false;
Vue.component('InputText', InputText);
Vue.component('Button', Button);
Vue.component('Toast', Toast);
Vue.component('Password', Password);
Vue.component('Card', Card);

Vue.use(router);

Vue.$keycloak.init({ onLoad: 'login-required' }).then((auth) => {
    if (!auth) {
        window.location.reload();
    } else {
        new Vue({
            // vuetify,
            router,
            // i18n,
            render: h => h(App)
        }).$mount('#app');

        window.onfocus = () => {
            updateToken()
        }
    }
});

// Keycloak.init({onLoad: "login-required"})
//     .then(auth => {
//         if (!auth) {
//             console.log("jkhsjfh");
//             window.location.reload();
//         } else {
//             console.log(Keycloak.token);
//             localStorage.setItem("vue-token", Keycloak.token)
//             app.mount("#app");
//         }
//         //Token Refresh
//         // Пытаемся обновить токен каждые 6 секунд
//         setInterval(() => {
//             // Обновляем токен, если срок его действия истекает в течении 70 секунд
//             Keycloak.updateToken(200).then((refreshed) => {
//                 if (refreshed) {
//                     console.log('Token refreshed' + refreshed);
//                     localStorage.setItem("vue-token", Keycloak.token)
//                 } else {
//                     console.log('Token not refreshed, valid for '
//                         + Math.round(Keycloak.tokenParsed.exp
//                             + Keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
//                 }
//             }).catch(() => {
//                 console.log('Failed to refresh token');
//             });
//         }, 6000)
//     })
//     .catch((error) => {
//         console.error(error);
//     });
