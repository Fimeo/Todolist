<template>
  <div class="home" v-if="current">
    <sidebar></sidebar>
    <TodoList :current-list-id="current"></TodoList>
  </div>
  <div v-else>
    <sidebar></sidebar>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import sidebar from "@/components/sidebar";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
    TodoList, sidebar
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
  mounted: function () {
    if (!localStorage.getItem('authToken')) {
      this.$router.push({name: 'login'})
    } else {
      this.getTodolists()
    }
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-grow: unset;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}
</style>