<template>
  <aside>
    <ul class="lists">
      <li v-for="list in getTodolists"
          v-bind:key="list"
          v-on:click="changeCurrentList({listId: list.id})">{{ list.list_name }} ({{ remainTodos(list.id).length }})</li>
    </ul>
    <button v-on:click="createList">New List</button>
    <button v-on:click="logoutToSignIn">Logout</button>
    {{ getToken }}
    <button v-on:click="getUser({token: getToken})">GetUser</button>
  </aside>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "sidebar.vue",
  methods: {
    ...mapActions('todo', ['createList', 'changeCurrentList']),
    ...mapActions('account', ['logout', 'getUser']),
    logoutToSignIn() {
      this.logout().then(
          this.$router.push('login')
      )
    }
  },
  computed: {
    ...mapGetters('todo', ['getTodolists', 'remainTodos']),
    ...mapGetters('account', ['getToken'])
  }
}
</script>

<style scoped>
aside {
  width: 150px;
  word-wrap: break-word;
  background: white;
  padding: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
  line-height: 1.8;
}

li:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>