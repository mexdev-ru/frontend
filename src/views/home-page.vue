<!--<template>-->
<!--    <Card style="width: 19rem; margin-bottom: 2em; margin: auto">-->
<!--        <template #title> Welcome, {{ this.userName }}!</template>-->

<!--        <template #content>-->
<!--            Such a great name - {{ this.userName }}. Are you a duke? or maybe a-->
<!--            prince? In any case, we are glad to see you on our Home Page.-->
<!--        </template>-->

<!--        <template #footer>-->
<!--            <Button label="Log out" @click="logOut"/>-->
<!--        </template>-->
<!--    </Card>-->
<!--</template>-->


<template>
  <div>
      <p>ID: {{ user.id}}</p>
      <p>Username: {{ user.username }}</p>
    <button @click="logOut(user.id)">AAAAAA LOGOUT</button>
  </div>
</template>

<script>
    import Vue from 'vue';

    export default {
        data() {
            return {
              user: {
                  username: "",
                  id: 0,
              }
            }
        },
        methods: {
            logOut(id) {
               console.log(id);
               Vue.$keycloak.logout();
               this.$router.push("/");
            },
        },
        async mounted() {
            this.user = await Vue.$keycloak.loadUserProfile();
        }
    };
</script>