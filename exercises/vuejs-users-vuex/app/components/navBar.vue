<template>
  <ul>
    <li><router-link :to="{ name: 'home'}">Home</router-link></li>
    <li><router-link :to="{ name: 'users'}">Users [{{userCount}}]</router-link></li>
    <li><router-link :to="{ name: 'about'}">About</router-link></li>
  </ul>
</template>

<script>
export default {
  computed: {
    userCount() {
      return this.$store.state.users.items.length
    },
  },
}
</script>

<style>
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}

li {
    float: left;
}

li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover:not(.active) {
    background-color: #111;
}

.router-link-active {
    background-color: #4CAF50;
}
</style>
