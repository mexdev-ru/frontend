<template>
  <Card style="width: 19rem; margin-bottom: 2em; margin: auto">
    <template #title> Welcome, {{ this.userName }}! </template>

    <template #content>
      Such a great name - {{ this.userName }}. Are you a duke? or maybe a
      prince? In any case, we are glad to see you on our Home Page.
    </template>

    <template #footer>
      <Button label="Log out" @click="logOut" />
    </template>
  </Card>
</template>

<script>
import Keycloak from "@/plugins/keycloak";
export default {
  data() {
    return {
      userName: "username",
      userPassword: null,
    };
  },
  methods: {
    logOut() {
      this.$router.push("/");
    },
  },
  async created() {
    let user = await Keycloak.loadUserProfile();
    console.log(user);
  }
};
</script>