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

// import VueResource from 'vue-resource';
import '@/plugins/keycloak'
import { updateToken } from '@/plugins/keycloak-util'


import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                           //icons

// import axios from 'axios';
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
        };

        // Пытаемся обновить токен каждые 6 секунд
        setInterval(() => {
            // Обновляем токен, если срок его действия истекает в течении 70 секунд
            updateToken().then((refreshed) => {
                if (refreshed) {
                    console.log('Token refreshed');
                } else {
                    console.log('Token not refreshed, will be refreshed later.');
                }
            }).catch(() => {
                console.log('Failed to refresh token');
            });
        }, 6000)
    }
});