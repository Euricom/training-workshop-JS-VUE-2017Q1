<template>
  <div>
    <h3>{{user.id ? 'Edit' : 'Add'}}</h3>
    <form @submit.prevent="addUser">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" class="form-control" id="firstName" v-model="user.firstName">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" class="form-control" id="lastName" v-model="user.lastName">
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" v-model="user.email">
      </div>
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" class="form-control" id="age" v-model="user.age">
      </div>
      <button class="btn btn-defaut" @click.prevent="$router.go(-1)">Back</button>
      <button type="submit" class="btn btn-default">Submit</button>
    </form>
  </div>
</template>

<script>
import { getUser, saveUser } from '../services/userApi'
import { noop } from '../core/utils'

export default {
  data: () => ({
    user: {},
  }),
  created() {
    if (this.$route.params.id) {
      // existing user
      getUser(this.$route.params.id)
        .then((user) => {
          this.user = user
        })
        .catch(noop)
    }
  },
  methods: {
    addUser() {
      console.log('save', this.user)
      saveUser(this.user)
        .then(() => {
          this.$router.go(-1)
        })
        .catch(noop)
    },
  },
}
</script>
