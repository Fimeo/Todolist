<template>
  <div class="left_menu">
    <div class="list_menu" role="navigation">
      <ul>
        <li v-for="list in getTodolists" v-bind:key="list.id" v-bind:class="list.id === getCurrentListId ? 'current' : ''"
        v-on:click="changeCurrentList({listId: list.id})">
          <span class="item_icon">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
              <g><g><path d="M510.194,221.846L441.735,84.353c-2.922-5.862-8.905-9.567-15.452-9.567H85.717c-6.547,0-12.53,3.705-15.452,9.567
                  L1.806,221.846C0.616,224.233,0,226.868,0,229.537v190.418c0,9.532,7.726,17.258,17.258,17.258h477.483
                  c9.532,0,17.258-7.726,17.258-17.258V229.537C512,226.868,511.384,224.233,510.194,221.846z M96.4,109.303h319.195l51.562,103.551
                  H355.524c-8.158,0-15.216,5.782-16.902,13.761c-0.616,2.917-15.872,71.381-85.498,71.381s-84.883-68.464-85.487-71.312
                  c-1.628-8.048-8.704-13.83-16.913-13.83H44.843L96.4,109.303z M477.483,402.697H34.517V247.371h103.108
                  c12.127,35.339,46.644,85.142,115.499,85.142c68.861,0,103.378-49.802,115.499-85.142h108.86V402.697z"/>
              </g></g>
            </svg>
          </span>
          <span class="item_content">{{ list.name }}<small class="item_counter">{{ remainTodos(list.id).length }}</small></span>
        </li>
      </ul>
      <input type="text" placeholder="Nouvelle liste"
      v-on:keypress.enter="createList" v-model="inputListName"
      maxlength="20">
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "sidebar",
  data() {
    return {
      inputListName: ""
    }
  },
  methods: {
    ...mapActions('todo', ['createTodolist', 'changeCurrentList']),
    ...mapActions('account', ['logout', 'getUser']),
    createList() {
      if (this.inputListName !== "") {
        this.createTodolist({name: this.inputListName})
        this.inputListName = ""
      }
    }
  },
  computed: {
    ...mapGetters('todo', ['getTodolists', 'remainTodos', 'getCurrentListId']),
  }
}
</script>

<style scoped>
.left_menu {
  width: 305px;
  box-sizing: border-box;
  height: calc(100vh - 44px);
  padding-top: 30px;
  padding-left: 35px;
  position: fixed;
  left: 0;
  transition: left .25s cubic-bezier(.4,0, .2,1);
  overflow-x: hidden;
  background-color: #fafafa;
  user-select: none !important;
  outline: none !important;
}

.list_menu {
  width: 265px;
  padding-bottom: 30px;
  box-sizing: border-box;
}

.list_menu input {
  padding: 0;
  overflow: hidden;
  width: 240px;
  margin: 35px 0 0;
  line-height: 2;
}

.list_menu ul {
  margin: 0;
  padding: 0;
  position: relative;
  outline: none !important;
}

.list_menu li {
  border-radius: 5px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-height: 24px;
  font-size: 14px;
  color: #333;
  list-style: none;
  padding: 5px 16px 5px 5px;
  transition: color .1s ease-in, background-color .1s ease-in;
  outline: none !important;
  line-height: 1.25;
  cursor: pointer;
}

.list_menu li:hover, .current {
  background: #ececec;
}

.item_icon {
  width: 20px;
  height: 24px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 5px;
  margin-top: -1px;
}

.item_content {
  display: flex;
  -webkit-box-flex: 1;
  flex: 1;
  -webkit-box-align: center;
  align-items: center;
  width: calc(100% - 60px);
  min-height: 24px;
  line-height: 24px;
  word-break: break-word;
  outline: none !important;
}

.item_counter {
  color: #aaa;
  margin-left: auto;
  padding-left: 5px;
  display: inline-block;
  font-size: 12px;
  line-height: 22px;
  outline: none !important
}

.current .item_counter {
  color: #dd4b39;
}
</style>