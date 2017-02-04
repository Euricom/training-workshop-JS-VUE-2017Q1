<template>
  <div>
    <h3>Home</h3>
    <button class="btn btn-primary" @click="panelView = !panelView">Switch View</button>
    <button class="btn btn-defaut" @click="$router.push('edit')">Add</button>
    <hr>
    <user-list v-if="!panelView" :users="users" @user-delete="onUserDelete"></user-list>
    <user-panel-list v-else :users="users"></user-panel-list>
  </div>
</template>

<script>
import { getUsers, deleteUser } from '../services/userApi'
import UserList from '../components/userList.vue'
import UserPanelList from '../components/userPanelList.vue'

export default {
  components: {
    UserList,
    UserPanelList,
  },
  data: () => ({
    users: [],
    panelView: false,
  }),
  created() {
    console.log('created')
    getUsers()
      .then((users) => {
        this.users = users
      })
  },
  methods: {
    onUserDelete(user) {
      console.log('del', user)
      deleteUser(user)
        .then((deletedUser) => {
          console.log('user deleted', deletedUser)
          this.users = this.users.filter(item => item !== user)
        })
    },
  },
}
</script>
