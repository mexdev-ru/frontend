import Vue from 'vue'
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_PROTOCOL + `://` + process.env.VUE_APP_URL + '/',
});

axiosInstance.interceptors.request.use(async config => {
    // Обновляем токен
    Vue.$keycloak.updateToken(process.env.VUE_APP_KEYCLOAK_MIN_VALID_TOKEN || 60);
    const token = Vue.$keycloak.token;
    // Добавляем токен в каждый запрос
    config.headers.common['Authorization'] = `Bearer ${token}`
    return config
});

const AxiosPlugin = {
    install: Vue => {
        Vue.$axios = axiosInstance
    }
}

Vue.use(AxiosPlugin);

export default AxiosPlugin