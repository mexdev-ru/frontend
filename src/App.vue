<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import { updateToken } from '@/plugins/keycloak-util'

const AUTHORIZATION_HEADER = 'Authorization'

export default Vue.extend({
  name: 'App',
  created: function () {
    axios.interceptors.request.use(async config => {
      // Обновляем токен
      const token = await updateToken()
      // Добавляем токен в каждый запрос
      config.headers.common[AUTHORIZATION_HEADER] = `Bearer ${token}`
      return config
    })
    
    axios.interceptors.response.use( (response) => {
      return response
    }, error => {
      return new Promise((resolve, reject) => {
        // Если от API получена ошибка - отправляем на страницу /error
        this.$router.push('/error')
        reject(error)
      })
    })
  },
  // Обновляем токен при навигации
  watch: {
    $route() {
      updateToken()
    }
  }
})
</script>

<style lang="scss">

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>