import Vue from 'vue'
import Keycloak from 'keycloak-js'

const initOptions = {
        url: process.env.VUE_APP_KEYCLOAK_URL,
        realm: 'my_realm',
        clientId: 'my_client'
}

const keycloak = Keycloak(initOptions)

const KeycloakPlugin = {
        install: Vue => {
                Vue.$keycloak = keycloak
        }
}
console.log(Vue)
Vue.use(KeycloakPlugin)

export default KeycloakPlugin