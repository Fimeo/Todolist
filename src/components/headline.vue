<template>
  <div class="user">
    <h1>Bonjour  {{ getUser.name }}</h1>
  </div>
  <div class="actions">
    <button v-on:click="logout">Déconnexion</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "headline",
  computed: {
    ...mapGetters('account', ['getUser'])
  },
  methods: {
    ...mapActions('account', ['getUserAccount', 'logout'])
  },
  mounted() {
    this.getUserAccount();
  }
}
</script>

<style scoped>
</style>