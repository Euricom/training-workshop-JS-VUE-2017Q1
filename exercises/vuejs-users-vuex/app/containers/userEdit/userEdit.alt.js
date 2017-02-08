import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'getUser',
    ]),
    // ...mapActions([
    //   'addUser',
    // ]),
    user() {
      // create a copy of the user
      return {
        ...this.getUser || {},
      }
    },
  },
  methods: {
    onAddUser() {
      // console.log(this.addUser)
      // this.addUser({ user: this.user })
      this.$store.dispatch('addUser', { user: this.user })
        .then(() => {
          this.$router.go(-1)
        })
    },
  },
}
