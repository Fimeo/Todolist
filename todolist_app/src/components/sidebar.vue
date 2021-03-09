<template>
  <aside>
    <ul class="lists">
      <li v-for="list in getTodolists"
          v-bind:key="list"
          v-on:click="changeCurrentList(list.id)">{{ list.list_name }} ({{ remainTodos(list.id).length }})</li>
    </ul>
    <button v-on:click="createList">New List</button>
  </aside>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "sidebar.vue",
  methods: {
    ...mapActions('todo', ['createList', 'changeCurrentList']),
  },
  computed: {
    ...mapGetters('todo', ['getTodolists', 'remainTodos'])
  }
}
</script>

<style scoped>

</style>