<template>
  <section>
  <h2>{{ listName }}</h2>
  <div>
    <input class="new-todo" autofocus="autofocus" type="text" v-model="newTodo" v-on:keyup.enter="createTodo" placeholder="Ajouter une tâche">
  </div>

  <div class="main">
    <ul class="todolist">
      <li v-for="todo in todos_filtered" :key="todo.name" class="todo">
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" v-bind:id="todo.id">
          <label v-if="todo.completed" v-bind:for="todo.id" class="completed">{{ todo.name }}</label>
          <label v-else v-bind:for="todo.id" class="remain">{{ todo.name }}</label>
          <button class="destroy" v-on:click="deleteTodo(todo)"></button>
        </div>
      </li>
    </ul>
  </div>
  <footer>
    <span class="todo-count">
      {{ remainTodos.length }} tâche(s) à faire
    </span>
    <ul class="filters">
      <li>
        <a v-if="filter === 'all'" class="selected" v-on:click="setFilter('all')">Toutes</a>
        <a v-else v-on:click="setFilter('all')">Toutes</a>
      </li>
      <li>
        <a v-if="filter === 'remain'" class="selected" v-on:click="setFilter('remain')">À faire</a>
        <a v-else v-on:click="setFilter('remain')">À faire</a>
      </li>
      <li>
        <a v-if="filter === 'done'" class="selected" v-on:click="setFilter('done')">Faites</a>
        <a v-else v-on:click="setFilter('done')">Faites</a>
      </li>
    </ul>
    <button class="clear-completed" v-on:click="removeDone">Supprimer terminés</button>
  </footer>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      newTodo: '',
      filter: 'all',
      search_id: '',
      listName: 'liste 1'
    }
  },
  methods: {
    ...mapActions('todo', ['deleteItem', 'addTodo', 'removeDone']),
    createTodo() {
      this.addTodo(this.newTodo)
      this.newTodo = ''
    },
    deleteTodo(item) {
      this.deleteItem(item)
    },
    setFilter(value) {
      this.filter = value;
    }
  },
  computed: {
    ...mapGetters('todo', ['doneTodos', 'remainTodos' ,'allTodos']),
    todos_filtered: function() {
      if (this.filter === 'all')
        return this.allTodos;
      else if (this.filter === 'done')
        return this.doneTodos;
      else
        return this.remainTodos;
    }
  },
}
</script>

<style scoped>
section {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
}

h2 {
  padding: 0;
  margin: 0;
}

.completed {
  text-decoration: line-through;
  opacity: .5;
}

.main {
  position: relative;
  border-top: 1px solid #e6e6e6;
  font-weight: 300;
  line-height: 1.4em;
  color: #4d4d4d;

}

.todolist {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo {
  border-bottom: none;
  position: relative;
  font-size: 24px;
}

.toggle {
  height: 40px;
  opacity: 0.4;
  text-align: center;
  width: 40px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  appearance: none;
  outline: 0;
  background: none no-repeat center;
}

.toggle{
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3C/svg%3E");
}

.toggle:checked {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M22 11.08V12a10 10 0 1 1-5.93-9.14"%3E%3C/path%3E%3Cpolyline points="22 4 12 14.01 9 11.01"%3E%3C/polyline%3E%3C/svg%3E');
}

.view {
  border-bottom: 1px solid #e6e6e6;
}

.view label {
  word-break: break-all;
  padding: 15px 40px 15px 65px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todolist li:hover .destroy {
  display: block;
}

.todolist li .destroy:hover {
  color: #af5b5e;
}

.todolist li .destroy::after {
  content: '×';
}

.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
  padding: 0;
  border: 0;
  background: none;
  appearance: none;
}

.destroy:hover {
  cursor: pointer;
}

.new-todo {
  padding: 16px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: none;
  margin: 0;
  width: 100%;
  font-size: 24px;
  line-height: 1.4em;
  box-sizing: border-box;
}

.new-todo::placeholder {
  font-style: italic;
  opacity: .6;
}

.new-todo:focus {
  outline:none;
}

footer {
  color: #777;
  padding: 10px 15px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  align-items: center;
}

footer::before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
  z-index: -10;
}

.filters {
  list-style: none;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-around;
}

.filters li {
  padding: 5px 0;
}

.filters li a.selected {
  border: 1px solid rgba(175, 47, 47, 0.2);
}

.filters li a:hover {
  border: 1px solid rgba(182, 106, 106, 0.2);
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
}

.clear-completed {
  cursor: pointer;
  border: none;
  background: none;
}

.clear-completed:hover {
  text-decoration: underline;
}

</style>