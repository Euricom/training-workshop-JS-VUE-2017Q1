<template>
  <div>
    <h3>Users</h3>
    <div class="flex-grid">
      <div class="col" v-for="user of users">
        <div class="panel panel-default">
          <div class="panel-heading">{{user.firstName}} {{user.lastName}}</div>
          <div class="panel-body">
            <img :src="user.image" width="100%"></img>
            <table class="table">
                <tbody>
                    <tr>
                        <td><strong>Company:</strong></td>
                        <td>{{user.company}}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{{user.email}}</td>
                    </tr>
                    <tr>
                        <td><strong>Age:</strong></td>
                        <td>{{user.age}} year</td>
                    </tr>
                    <tr>
                        <td><strong>Street:</strong></td>
                        <td>{{user.address.street}}</td>
                    </tr>
                    <tr>
                        <td><strong>City:</strong></td>
                        <td>{{user.address.city}} - {{user.address.zip}}</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getUsers } from '../services/userApi'
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
  },
}
</script>

<style lang="less">
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.col {
  width: 32%;
}
</style>

