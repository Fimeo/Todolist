<template>
  <main>
    <div class="todolist">
      <div class="todolist_header">
        <div class="header_todolist_content">
          <h1>{{ currentListName }}</h1>
          <div class="header_actions">
            <button v-on:click="removeDoneTodo">Supprimer terminés</button>
            <button v-on:click="deleteTodolist({listId: currentListId})"><span>Supprimer la liste</span></button>
          </div>
        </div>
      </div>
      <div class="view_content">
        <section>
          <div class="filter">
            <h2>Tâches</h2>
          </div>
        </section>
        <input v-model="newTodoText" autofocus="autofocus" class="new-todo" placeholder="Ajouter une tâche" type="text"
               v-on:focus="hideInput" v-on:keydown.enter="createNewTodo">
        <div class="list_todo">
          <ul class="todolist">
            <li v-for="todo in todos_filtered" :key="todo.id" class="todo">
              <div v-show="!editing[todo.id]" class="view">
                <input v-bind:id="todo.id" class="toggle"
                       type="checkbox"
                       v-bind:checked="!!+todo.completed"
                       v-on:click="toggleTodo({todoId: todo.id, name: todo.name, listId: currentListId, completed: todo.completed})">
                <label v-bind:class="!!+todo.completed ? 'completed' : 'remain'"
                       @dblclick="showInput(todo.id, todo.name)">{{ todo.name }}</label>
                <button class="destroy" v-on:click="deleteTodo({listId: currentListId, todoId: todo.id})"></button>
              </div>
              <input v-show="editing[todo.id]"
                     :ref="'input_'+todo.id"
                     v-model="editText"
                     class="edit"
                     type="text"
                     @blur="hideInput(todo.id)"
                     @keydown.enter="changeTodo(todo.id)">
            </li>
          </ul>
        </div>
        <footer>
          <span class="todo-count">
            {{ remainTodos(currentListId).length }} tâche(s) à faire
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
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Home",
  data() {
    return {
      newTodoText: '',
      filter: 'all',
      editText: null,
      editing: {}
    }
  },
  props: ['currentListId'],
  methods: {
    ...mapActions('todo', ['deleteTodo', 'createTodo', 'removeDone', 'changeTodoText', 'toggleTodo', 'deleteTodolist']),
    createNewTodo() {
      this.createTodo({listId: this.currentListId, text: this.newTodoText})
      this.newTodoText = ''
    },
    setFilter(value) {
      this.filter = value;
    },
    removeDoneTodo() {
      this.removeDone({listId: this.currentListId, todos: this.doneTodos(this.currentListId)})
    },
    changeTodo(id) {
      if (this.editText !== "")
        this.changeTodoText({listId: this.currentListId, todoId: id, text: this.editText})
      this.hideInput(id)
    },
    showInput(id, text) {
      // Set focus to the input when label was double clicked
      this.editing[id] = true
      this.editText = text
      this.$nextTick(function () {
        this.$refs["input_" + id].focus()
      })
    },
    hideInput(id) {
      this.editing[id] = false
      this.editText = ""
    }
  },
  computed: {
    ...mapGetters('todo', ['doneTodos', 'remainTodos', 'allTodos', 'getListName']),
    todos_filtered: function () {
      if (this.filter === 'all') {
        return this.allTodos(this.currentListId);
      } else if (this.filter === 'done')
        return this.doneTodos(this.currentListId);
      else
        return this.remainTodos(this.currentListId);
    },
    currentListName: function () {
      return this.getListName(this.currentListId)
    }
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  opacity: .5;
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
  z-index: 1;
  cursor: pointer;
}

.toggle {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3C/svg%3E");
}

.toggle:checked {
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Cpath d="M22 11.08V12a10 10 0 1 1-5.93-9.14"%3E%3C/path%3E%3Cpolyline points="22 4 12 14.01 9 11.01"%3E%3C/polyline%3E%3C/svg%3E');
}

.view label {
  word-break: break-all;
  padding: 15px 40px 15px 65px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  z-index: 5
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

.new-todo, .edit {
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
  outline: none;
}

footer {
  color: #777;
  padding: 10px 15px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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


main {
  margin-left: 305px;
  min-height: 380px;
  background-color: #fff;
  border-right: 1px solid #f1f1f1;
  position: relative;
  overflow: hidden auto;
  transition: margin-left .25s cubic-bezier(.4, 0, .2, 1);
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  outline: none !important;
}

.todolist {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  outline: none !important;
}

.todolist_header {
  margin-bottom: 24px;
  display: flex;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 2;
  padding-left: 55px;
  padding-right: 55px;
  padding-top: 36px;
  outline: none !important;
}

.header_todolist_content {
  display: flex;
  width: 100%;
  padding-bottom: 8px;
  max-width: 800px;
  margin: 0 auto;
  -webkit-box-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  justify-content: space-between;
  word-break: break-word;
}

.todolist h1 {
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.header_actions {
  margin-top: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: #333;
  word-break: break-word;
}

.header_actions button {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-left: 16px;
  text-decoration: none;
  color: grey;
  border-radius: 3px;
}

.header_actions button:hover {
  background-color: #eee;
  color: #202020;
}

.header_actions span {
  font-size: 12px;
  margin-left: 3px;
  margin-right: 6px;
  word-break: normal;
}

.view_content {
  padding-left: 55px;
  padding-right: 55px;
  max-width: 800px;
  position: relative;
  z-index: 1;
  margin: 0 auto;
  min-width: calc(60%);
}

.view_content section .filter {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: sticky;
  background-color: #fff;
  border: #ddd;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
  padding: 0;
  z-index: 2;
}

h2 {
  text-align: left;
  padding: 6px 30px 5px 0;
  line-height: 20px;
  font-size: 14px;
  font-weight: 700;
  -webkit-box-flex: 1;
  flex: 1;
  margin: 0;
  word-wrap: break-word;
  word-break: break-word;
}

.list_todo {
  font-size: 13px;
}

.list_todo ul {
  margin: 0;
  list-style-type: none;
}

.list_todo li {
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}

.list_todo .item {
  display: flex;
  -webkit-box-align: stretch;
  align-items: stretch;
  position: relative;
  padding: 0;
  cursor: pointer;
  min-height: 30px;
}

.item button {
  display: flex;
  flex-shrink: 0;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  user-select: none;
}

button {
  font-family: inherit;
  font-size: 13px;
  color: #202020;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

.task_checkbox {
  background-color: transparent;
  color: grey;
  height: 16px;
  width: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 50%;
  display: flex;
  flex-shrink: 0;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
}

.item_content {
  width: 100%;
  text-align: left;
  text-decoration: none;
  font-size: 14px;
  line-height: 21px;
  word-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>