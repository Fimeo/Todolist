<template>
  <div class="home">
    <sidebar></sidebar>
    <TodoList :current-list-id="current"></TodoList>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'
import sidebar from "@/components/sidebar";
import { mapGetters } from "vuex";

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