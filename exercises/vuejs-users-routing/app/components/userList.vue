<template>
  <div>
    <h3>Table View</h3>
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
export default {
  props: [
    'users',
  ],
  methods: {
    onEdit(user) {
      console.log('onedit', user)
      this.$router.push({
        name: 'edit',
        params: {
          id: user.id,
        },
      })
    },
    onDelete(user) {
      this.$emit('user-delete', user)
    },
  },
}
</script>


