<template>
  <h1>Login Page / Register Page</h1>
  <p>Is Logged : {{ isLogged }}</p>
  <p>Error : {{ getError }}</p>
  <p v-show="isLoading"><i>Loading...</i></p>
  <form>
    <input type="email" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password">
  </form>
  <button v-on:click="axiosLogin">Login</button>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters('account', ['isLogged', 'isLoading', 'getError'])
  },
  methods: {
    ...mapActions('account', ['login']),
    axiosLogin() {
      console.log(this.email, this.password)
      this.login(this.email, this.password)
    }
}
}
</script>

<style scoped>

</style>