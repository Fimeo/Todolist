<template>

  <h1>Filter list</h1>
  <input type="radio" id="all" value="all" v-model="filter">
  <label for="all">All</label>
  <br>
  <input type="radio" id="done" value="done" v-model="filter">
  <label for="done">Done todos</label>
  <br>
  <input type="radio" id="remains" value="remains" v-model="filter">
  <label for="remains">Todos remains</label>
  <br>

  <input type="text" placeholder="Search with id" v-model="search_id">
  <div v-if="search_id">
    Task : {{ searchById["name"] }}
  </div>
  <hr>

  <div v-if="filter === 'all'">
    <h2>All todos</h2>
  </div>
  <div v-else-if="filter === 'done'">
    <h2>Done Todos</h2>
  </div>
  <div v-else>
    <h2>Remains Todos ( {{ remainTodos.length }})</h2>
  </div>
  <ul>
    <div v-for="todo in todos_filtered" :key="todo.name">
      <input type="checkbox" v-model="todo.completed" v-bind:id="todo.id">
      <label v-bind:for="todo.id">{{ todo.name }}</label>
      <input type="submit" value="Delete" v-on:click="deleteTodo(todo)">
    </div>
  </ul>

  <hr>

  <h2>New Todo</h2>
  <div>
    <input type="text" v-model="newTodo" placeholder="Text">
    <input type="submit" v-on:click="createTodo" value="Add">
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      newTodo: '',
      filter: 'all',
      search_id: ''
    }
  },
  methods: {
    ...mapActions('todo', ['deleteItem', 'addTodo']),
    createTodo() {
      this.addTodo(this.newTodo)
      this.newTodo = ''
    },
    deleteTodo(item) {
      this.deleteItem(item)
    }
  },
  computed: {
    ...mapGetters('todo', ['doneTodos', 'remainTodos', 'getTodoById' ,'allTodos']),
    todos_filtered: function() {
      if (this.filter === 'all')
        return this.allTodos;
      else if (this.filter === 'done')
        return this.doneTodos;
      else
        return this.remainTodos;
    },
    searchById: function () {
      return this.getTodoById(parseInt(this.search_id));
    }
  },
}
</script>

<style scoped>

</style>