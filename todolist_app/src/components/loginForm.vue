<template>
  <h1>{{ currentMethod.charAt(0).toUpperCase() + currentMethod.substring(1) }}</h1>
  <p>Is Logged : {{ isLogged }}</p>
  <p v-show="isLoading"><i>Loading...</i></p>
  <form id="login" v-on:submit="checkForm">
    <p v-if="getErrorMessage"><b>{{ getErrorMessage }}</b></p>
    <p v-if="getErrorField('email')"><b>{{ getErrorField('email') }}</b></p>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email"><br>
    <p v-if="getErrorField('password')"><b>{{ getErrorField('password') }}</b></p>
    <label for="pass">Password</label>
    <input id="pass" type="password" v-model="password"><br>
    <p v-if="getErrorField('name')"><b>{{ getErrorField('name') }}</b></p>
    <label v-if="currentMethod === 'register'" for="name">Name</label>
    <input v-if="currentMethod === 'register'" id="name" type="text" v-model="name"><br>
    <input type="submit" v-bind:value="currentMethod">
  </form>
  <button id="register" v-on:click="changeMethod">No account yet ? Register</button>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "loginForm",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      currentMethod: "login"
    }
  },
  computed: {
    ...mapGetters('account', ['isLogged', 'isLoading', 'getErrorField', 'getErrorMessage'])
  },
  methods: {
    ...mapActions('account', ['login', 'register', 'deleteErrors', 'addError']),
    axiosLogin() {
      if(this.isLoading)
        return;
      this.deleteErrors()
      this.login([this.email, this.password])
    },
    axiosRegister() {
      if(this.isLoading)
        return;
      this.deleteErrors()
      this.register([this.email, this.password, this.name])
    },
    checkForm: function(e) {
      this.deleteErrors()
      if (this.email && this.password) {
        if (this.currentMethod === "login")
          this.axiosLogin()
        else
          this.axiosRegister()
      }
      if (!this.email) {
        this.addError(['email', 'Email required'])
      }
      if (!this.password) {
        this.addError(['password', 'Password required'])
      }
      e.preventDefault()
    },
    changeMethod() {
      if (this.isLoading)
        return;
      this.deleteErrors()
      this.currentMethod = this.currentMethod === "login" ? "register" : "login";
    }
}
}
</script>

<style scoped>

h1 {
  padding: auto ;
  margin: auto;
  text-align: center; 
}

p{
  margin: auto; 
  padding: auto;
  text-align: center; 


}

#email{
  padding: auto;
  margin: 1%;
  
}

#pass{
  padding: auto;
  margin: 1%;
  


}

button{
  vertical-align: middle;
  margin: auto;
  padding: auto;

}
form{
  text-align: center; 
  margin: auto;
  padding: auto;
  color: #af5b5e;
 }


 
</style>