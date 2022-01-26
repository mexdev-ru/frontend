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
        <button @click="logOut(user.id)">LOGOUT</button>
        <br>
        <button @click="addCompany()">AAAAAAdd cOOOOOmpany {{ companies.length}}</button>
        <div v-for="company in companies" v-bind:key="company.uuid">
            <p>{{company.name}} ({{company.uuid}})</p>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    let getCompanies = async function () {
        const response = await Vue.$axios.get('/company/all');
        console.log(response.data);
        response.data.sort((a,b) => {return a.name < b.name});
        return response.data;
    }

    export default {
        data() {
            return {
                user: {
                    username: "",
                    id: 0,
                },
                companies: []
            }
        },
        methods: {
            logOut(id) {
                console.log(id);
                Vue.$keycloak.logout();
                this.$router.push("/");
            },
            async addCompany() {
                await Vue.$axios.post('/company', {
                    name: "Test " + (new Date()).toISOString()
                });

                this.companies =  await getCompanies();
            }
        },
        async mounted() {
            this.user = await Vue.$keycloak.loadUserProfile();
            this.companies = await getCompanies();
        }
    };
</script>