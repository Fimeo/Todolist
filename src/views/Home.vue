<template>
  <div class="page_background">
    <header>
      <div class="header_content">
        <headline></headline>
      </div>
    </header>
    <section class="wrapper">
      <div class="wrapper_content">
        <sidebar></sidebar>
        <TodoList :current-list-id="current" v-if="current"></TodoList>
      </div>
    </section>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import sidebar from "@/components/sidebar";
import headline from "@/components/headline";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
    TodoList, sidebar, headline
  },
  computed: {
    ...mapGetters('todo', ['getCurrentListId']),
    current: function () {
      return this.getCurrentListId;
    }
  },
  methods: {
    ...mapActions('todo', ['getTodolists', 'getTodos', 'createTodolist'])
  },
  created: function () {
    if (!localStorage.getItem('authToken')) {
      this.$router.push({name: 'login'})
    } else {
      this.getTodolists()
    }
  }
}
</script>

<style scoped>
.page_background {
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
}

header {
  box-sizing: border-box;
  height: 44px;
  z-index: 200;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-shrink: 0;
  border-bottom: 1px solid transparent;
  background-color: #db4c3f;
  transition: height .2s ease-in;
  padding-left: 42px;
  padding-right: 42px;
}

.header_content {
  height: 100%;
  width: 100%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  display: flex;
}

.wrapper {
  animation-name: effect-fade-in;
  animation-duration: .12s;
  -webkit-box-flex: 1;
  flex-grow: 1;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  overflow: hidden;
}

.wrapper_content {
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  overflow: hidden;
  outline: none !important;
}
</style>