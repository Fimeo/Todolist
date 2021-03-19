<template>
  <aside>
    <ul class="lists">
      <li v-for="list in getTodolists"
          v-bind:key="list"
          v-on:click="changeCurrentList({listId: list.id})">{{ list.name }} ({{ remainTodos(list.id).length }})
        <button v-on:click="deleteTodolist( {listId : list.id} )">del</button>

      </li>
    </ul>
    <input type="text" v-model="inputListName" size="16">
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
  display: ;
  width: 150px;
  max-height: ;
  word-wrap: break-word;
  background: white;
  padding: 5px;
  border-radius:3px;
}

ul {
  list-style-type: none;
  padding: 0;
  line-height: 1.8;
  font: 1em "Trebuchet MS",Arial,sans-serif ;
}

li {
  border:1px solid #48695e;
	border-radius:2px;
	padding: 2px 2px ;
	margin:2px;
}
li:hover {
  cursor: pointer;
  text-decoration: ;
  background: #ece2e2 ;
	border:1px solid #48695e;
	border-radius:1px;
  padding: 2px 4px;
}
</style>