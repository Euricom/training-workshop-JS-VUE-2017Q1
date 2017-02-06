<template>
  <div>
    <h3>User List</h3>
    <button class="btn btn-defaut" @click="$router.push('edit')">Add User</button>
    <table class="table">
      <thead>
        <tr>
          <th>First</th>
          <th>Last</th>
          <th>Email</th>
          <th>Age</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users">
          <td>{{user.firstName}}</td>
          <td><a @click="onEdit(user)">{{user.lastName}}</a></td>
          <td>{{user.email}}</td>
          <td>{{user.age}}</td>
          <td><a @click="onDelete(user)">delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getUsers, deleteUser } from '../services/userApi'
import { noop } from '../core/utils'

export default {
  data: () => ({
    users: [],
  }),
  created() {
    getUsers()
      .then((users) => {
        this.users = users
      })
      .catch(noop)
  },
  methods: {
    onEdit(user) {
      this.$router.push({
        name: 'edit',
        params: {
          id: user.id,
        },
      })
    },
    onDelete(user) {
      deleteUser(user)
        .then((deletedUser) => {
          console.log('user deleted', deletedUser)
          this.users = this.users.filter(item => item !== user)
        })
        .catch(noop)
    },
  },
}
</script>
