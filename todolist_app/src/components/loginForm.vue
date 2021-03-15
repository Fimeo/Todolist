<template>
  <div class="wrapper">
    <div class="alert" v-show="getErrors.length">
      <ul>
        <li v-for="error in getErrors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
    </div>

    <div id="login-page" class="login-page">
      <div>
        <h1>{{ currentForm.charAt(0).toUpperCase() + currentForm.substring(1) }}</h1>
        <p class="loading" v-show="isLoading"><i>Loading...</i></p>
      <div class="form">
        <form v-if="currentForm.toLowerCase() === 'register'"
              v-on:submit.prevent="axiosRegister"
              class="register-form">
          <div class="form-input">
            <label for="register-name">Name</label>
            <input id="register-name" type="text" v-model="name">
          </div>
          <div class="form-input">
            <label for="register-email">Email</label>
            <input id="register-email" type="email" v-model="email">
          </div>
          <div class="form-input">
            <label for="register-pass">Password</label>
            <input id="register-pass" type="password" v-model="password">
          </div>
          <button>Create</button>
          <p class="message">Already registered?
            <a href="#" @click.prevent="toggleForm">Sign In</a></p>
        </form>
        <form v-else
              v-on:submit.prevent="axiosLogin"
              class="login-form">
          <div class="form-input">
            <label for="login-email">Email</label>
            <input id="login-email" type="email" v-model="email">
          </div>
          <div class="form-input">
            <label for="login-pass">Password</label>
            <input id="login-pass" type="password" v-model="password">
          </div>
          <button>Login</button>
          <p class="message">Not registered?
            <a href="#" @click.prevent="toggleForm">Create an account</a></p>
        </form>
      </div>
    </div>
    </div>
  </div>
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
      currentForm: "login"
    }
  },
  computed: {
    ...mapGetters('account', ['isLogged', 'isLoading', 'getErrors'])
  },
  methods: {
    ...mapActions('account', ['login', 'register', 'deleteErrors', 'addError']),
    toggleForm() {
      this.resetInputs()
      this.deleteErrors()
      this.currentForm = this.currentForm === 'login' ? 'register' : 'login';
    },
    resetInputs() {
      this.email = this.password = this.name = ""
    },
    axiosLogin() {
      this.deleteErrors()
      if(this.isLoading)
        return;
      if (!this.email)
        this.addError("Email required")
      if (!this.password)
        this.addError('Password required')
      if (this.getErrors.length)
        return
      this.login([this.email, this.password]).then(() => {
        if (this.isLogged)
          this.$router.push({name:'Home'})
      })
      this.resetInputs()
    },
    axiosRegister() {
      this.deleteErrors()
      if(this.isLoading)
        return;
      if (!this.email)
        this.addError('Email required')
      if (!this.password)
        this.addError('Password required')
      if (!this.name)
        this.addError('Name required')
      if (this.getErrors.length)
        return
      this.register([this.email, this.password, this.name]).then(() => {
        if (this.isLogged)
          this.$router.push({name:'Home'})
      })
      this.resetInputs()
    }
}
}
</script>

<style scoped>

.alert {
  width: 300px;
  margin: 10px auto;
  background-color: #ffa996;
  padding: 5px;
  border-left: 8px solid red;
}

.alert ul {
  list-style: none;
  line-height: 1.8
}

.form-input {
  margin: 25px 0 0 0;
  position: relative;
  border-bottom: 1px solid white;
}

input {
  padding: .5rem 0;
  background: 0 0;
  border: none;
  color: white;
  outline: 0;
  appearance: none;
  margin: 0;
  width: 100%;
}

label {
  transform: translateY(-120%) scale(.75);
  position: absolute;
  top: .5rem;
  left: 0;
  transition: .3s;
  transform-origin: left;
  color: hsl(196, 78%, 61%);
}

button {
  width: 100%;
  margin: 18px 0 9px 0;
  padding: 8px 20px;
  border-radius: 0;
  overflow: hidden;
  background: 0 0;
  transition: .3s;
  border: 1px solid hsl(196, 78%, 61%);
  color: white;
}

button:hover {
  transition: .3s;
  background: hsl(196, 66%, 74%);
  cursor: pointer;
}

.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 40px;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
}

h1 {
  margin: 0 0 24px 0;
}

a, a:visited {
  color: white;
}
</style>