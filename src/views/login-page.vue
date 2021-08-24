<template>
  <Card style="width: 19rem; margin-bottom: 2em; margin: auto">
    <template #title>
      <h2>Login page</h2>
    </template>

    <template #content>
      <div class="sizes">
        <div class="username">
          <span class="p-input-icon-right">
            <i class="pi pi-user" />
            <InputText
              v-if="isValidName"
              type="loginText"
              v-model="userName"
              placeholder="Username"
            />

            <InputText
              v-else
              class="p-invalid"
              type="loginText"
              v-model="userName"
              placeholder="Username"
            />
          </span>
        </div>
        <div class="password">
          <Password
            v-if="isValidPassword"
            v-model="userPassword"
            toggleMask
            placeholder="Password"
            :feedback="false"
          ></Password>
          <Password
            v-else
            class="p-invalid"
            v-model="userPassword"
            toggleMask
            placeholder="Password"
            :feedback="false"
          ></Password>
        </div>
        <div class="btn-submit">
          <Button label="Log in" @click="logInM" />
          <Toast />
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import { get } from "@/backend";
import axios from "axios";
export default {
  data() {
    return {
      userName: null,
      userPassword: null,
      userList: [],
      isValidName: true,
      isValidPassword: true,
    };
  },
  watch: {
    userName(word) {
      if (word === "" || word === null) {
        this.isValidName = false;
      } else {
        this.isValidName = true;
      }
    },
    userPassword(code) {
      if (code === "" || code === null) {
        this.isValidPassword = false;
      } else {
        this.isValidPassword = true;
      }
    },
  },
  methods: {
    logInM() {
      console.log(this.userName);
      this.login(this.userName, this.userPassword)
      get(this.userName, this.userPassword)
      // if (this.userName === "" || this.userName === null) {
      //   this.isValidName = false;
      //   this.$toast.add({
      //     severity: "error",
      //     summary: "Error Message",
      //     detail: "Forgot to enter your name.",
      //     life: 2000,
      //   });
      // }
      // if (this.userPassword === "" || this.userPassword === null) {
      //   this.isValidPassword = false;
      //   this.$toast.add({
      //     severity: "error",
      //     summary: "Error Message",
      //     detail: "Forgot to enter your password.",
      //     life: 2000,
      //   });
      // }
      // if (this.isValidName && this.isValidPassword) {
      //   if (get(this.userName, this.userPassword) !== null) {
      //     this.$router.push("Home");
      //   } else {
      //     this.$toast.add({
      //       severity: "error",
      //       summary: "Error Message",
      //       detail: "Wrong login or password!",
      //       life: 4000,
      //     });
      //   }
      // }
    },

    login(username, password) {
      console.log(username + password)
      let headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials':true
      };

      // const postData = {
      //   grant_type: "authorization_code",
      //   client_id: "my_client",
      //   username: username,
      //   password: password,
      //   scope: "openid",
      // };
      axios
        .post(
          "http://localhost:8080/auth/realms/my_realm/protocol/openid-connect/token",
      
        {headers: headers}, {params: {grant_type: 'client_credentials',
        client_id: 'my_client',
        username: username,
        password: password,
        scope: 'openid'}}
        )
        .then(response => {
     
            let tokeninfo = this.jwtDec(response.access_token);
            console.log(tokeninfo);
          });
    },
  },
};
</script>


<style lang="scss">
.sizes {
  .p-inputtext {
    margin-bottom: 5px;
    padding: 0.5rem 2rem;
    padding-left: 8px;
  }
  .p-button {
    margin-top: 20px;
    padding: 0.5rem 5.55rem;
  }
  .p-error {
  }
}

::v-deep(.p-password input) {
  width: 5rem;
}
</style>