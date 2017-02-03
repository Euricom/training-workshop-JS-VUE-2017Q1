<template>
  <div id="app" class="container">
    <h1>{{title}}</h1>
    <button class="btn btn-danger" @click="panelView = !panelView">Switch View</button>
    <hr>
    <user-list v-if="!panelView" :users="users"></user-list>
    <user-panel-list v-else :users="users"></user-panel-list>
  </div>
</template>

<script>
import axios from 'axios'
import UserList from './components/userList.vue'
import UserPanelList from './components/userPanelList.vue'

export default {
  components: {
    UserList,
    UserPanelList,
  },
  data: () => ({
    title: 'User App',
    users: [
      { id: 1, name: 'peter' },
      { id: 2, name: 'peter' },
    ],
    panelView: false,
  }),
  created() {
    console.log('created')
    axios.get('api/users')
      .then((res) => {
        this.users = res.data.users
      })
  },
}
</script>

<style lang="less">
  @import "~bootstrap/dist/css/bootstrap.css";

  // add here your custom styling
</style>

