<template>
  <login-form></login-form>
</template>

<script>
import loginForm from "@/components/loginForm";
export default {
  name: "User",
  components: {
    loginForm
  },
  mounted: function () {
    if (localStorage.getItem('authToken')) {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #eceffc;
}
</style>