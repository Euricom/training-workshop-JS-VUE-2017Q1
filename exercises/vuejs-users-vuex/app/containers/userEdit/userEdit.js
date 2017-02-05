export default {
  computed: {
    user() {
      const userId = this.$store.state.route.params.id
      // we cannot return the user from the store
      // otherwise we updating the store directly
      // se we return a copy of the user instead
      return {
        ...this.$store.state.users.items.find(item => item.id === userId) || {},
      }
    },
  },
  methods: {
    addUser() {
      this.$store.dispatch('addUser', { user: this.user })
        .then(() => {
          this.$router.go(-1)
        })
    },
  },
}
