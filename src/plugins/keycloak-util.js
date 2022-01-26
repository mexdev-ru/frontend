import Vue from 'vue'

export async function updateToken () {
    return await Vue.$keycloak.updateToken(process.env.VUE_APP_KEYCLOAK_MIN_VALID_TOKEN || 60);
}