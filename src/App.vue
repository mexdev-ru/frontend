<template>
    <div id="app">
      <router-view></router-view>
      <Toast/>
    </div>
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
        const token = await updateToken()
        config.headers.common[AUTHORIZATION_HEADER] = `Bearer ${token}`
        return config
      })

      axios.interceptors.response.use( (response) => {
        return response
      }, error => {
        return new Promise((resolve, reject) => {
          this.$router.push('/error')
          reject(error)
        })
      })
    },
    watch: {
      $route() {
        updateToken()
      }
    }
  })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
