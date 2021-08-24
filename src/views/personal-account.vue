<template>
  <div class="hello">
    <div class="container">
      <h2>role list</h2>

      <input
        type="text"
        v-bind:value="textInput"
        v-on:input="handlyInput"
        v-on:keypress.enter="addRole"
      />

      <button class="btn" v-on:click="addRole">add role</button>
      <button class="btn" v-on:click="showRole">show role</button>
      <button class="btn" v-on:click="deleteRole">delete role</button>
      <button class="btn" v-on:click="showAll">show all</button>
      <button class="btn" v-on:click="editRole">edit role</button>
    </div>

    <ul id="example-1">
      <li v-for="role in roleList" :key="role.id">
        {{ role.id }} {{ role.name }}
      </li>
    </ul>
    <div v-if="selectedRole !== null">
      <h3>{{ selectedRole.id }} {{ selectedRole.name }}</h3>
    </div>
  </div>
</template>
<script>
import Keycloak from "@/plugins/keycloak";
import axios from "axios";

export default {
  name: "Account",
  props: { msg: String },
  data() {
    return {
      textInput: [],
      selectedRole: [],
      roleList: [],
      token: Keycloak.token,
    };
  },
  mounted() {
    console.log(this.token);
    axios
      .get("http://" + process.env.VUE_APP_URL + "/role/all", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("vue-token"),
        },
      })
      .then((response) => {
        this.roleList = response.data;
      });
    console.log(process.env.VUE_APP_PROXY);
  },
  methods: {
    handlyInput(event) {
      this.textInput = event.target.value;
    },
    addRole() {
      this.selectedRole = [];

      const roleName = prompt("Input name of role");
      console.log(roleName);
      if (roleName === null) {
        alert("Incorrect input");
        return;
      }

      axios
        .post(
          "http://" + process.env.VUE_APP_URL + "/role/",
          { headers: { Authorization: `Bearer ${this.token}` } },
          {
            name: roleName,
          }
        )
        .then((response) => {
          console.log(response);
          axios
            .get("http://" + process.env.VUE_APP_URL + "/role/all", {
              headers: { Authorization: `Bearer ${this.token}` },
            })
            .then((response) => {
              this.roleList = response.data;
            });
        });
    },
    deleteRole() {
      this.selectedRole = [];
      if (this.textInput === "") {
        return;
      } else {
        axios
          .delete(
            "http://" + process.env.VUE_APP_URL + "/role/" + this.textInput,
            { headers: { Authorization: `Bearer ${this.token}` } }
          )

          .then((response) => {
            console.log(response);
            axios
              .get("http://" + process.env.VUE_APP_URL + "/role/all", {
                headers: { Authorization: `Bearer ${this.token}` },
              })
              .then((response) => {
                this.roleList = response.data;
              });
          });
      }
    },
    showRole() {
      this.selectedRole = [];
      if (this.textInput === "") {
        axios
          .get("http://" + process.env.VUE_APP_URL + "/role/all", {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((response) => {
            this.roleList = response.data;
          });
        this.selectedRole = [];

        return;
      } else {
        axios
          .get(
            "http://" + process.env.VUE_APP_URL + "/role/" + this.textInput,
            { headers: { Authorization: `Bearer ${this.token}` } }
          )
          .then((response) => {
            console.log(response);

            this.selectedRole = response.data;
            console.log(response.data);
            console.log(this.selectedRole);
            this.roleList = [];
          });
      }
    },
    showAll() {
      this.selectedRole = [];
      axios
        .get("http://" + process.env.VUE_APP_URL + "/role/all", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((response) => {
          this.roleList = response.data;
        });
    },
    editRole() {
      if (this.textInput === "") {
        axios
          .get("http://" + process.env.VUE_APP_URL + "/role/all", {
            headers: { Authorization: `Bearer ${this.token}` },
          })
          .then((response) => {
            this.roleList = response.data;
          });
        this.selectedRole = [];

        return;
      } else {
        axios
          .get(
            "http://" + process.env.VUE_APP_URL + "/role/" + this.textInput,
            { headers: { Authorization: `Bearer ${this.token}` } }
          )
          .then((response) => {
            console.log(response);

            this.selectedRole = response.data;
            console.log(response.data);
            console.log(this.selectedRole);
            this.roleList = [];
          });
      }
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  list-style-position: 10px;
  margin: 0 10px;
}
h2 {
  color: #2a2f36;
}
</style>
