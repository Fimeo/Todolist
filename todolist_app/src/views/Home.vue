<template>
  <div class="home">
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'

export default {
  name: 'Home',
  components: {
    TodoList
  }
}
</script>

<style scoped>

</style>