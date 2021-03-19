<template>
  <aside>
    <ul class="lists">
      <li v-for="list in getTodolists"
          v-bind:key="list"
          v-on:click="changeCurrentList({listId: list.id})">{{ list.name }} ({{ remainTodos(list.id).length }})
        <button v-on:click="deleteTodolist( {listId : list.id} )">del</button>

      </li>
    </ul>
    <input type="text" v-model="inputListName">
    <button v-on:click="createList">New List</button>
    <button v-on:click="logoutToSignIn">Logout</button>
    <button v-on:click="getUser">GetUser</button>
  </aside>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "sidebar.vue",
  data() {
    return {
      inputListName: ""
    }
  },
  methods: {
    ...mapActions('todo', ['createTodolist', 'changeCurrentList', 'deleteTodolist']),
    ...mapActions('account', ['logout', 'getUser']),
    logoutToSignIn() {
      this.logout().then(
          this.$router.push('login')
      )
    },
    createList() {
      if(this.inputListName !== "") {
        this.createTodolist({name: this.inputListName})
        this.inputListName = ""
      }
    }
  },
  computed: {
    ...mapGetters('todo', ['getTodolists', 'remainTodos']),
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