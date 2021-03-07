<template>
<ul class="lists" v-for="list in getTodolists" v-bind:key="list">
  <li v-on:click="changeCurrentList(list.id)">{{ list.list_name }} ({{ remainTodos(list.id).length }})</li>
</ul>
  <button v-on:click="createList">New List</button>
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