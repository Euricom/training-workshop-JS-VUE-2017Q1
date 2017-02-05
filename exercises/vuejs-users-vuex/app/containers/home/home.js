import { mapState } from 'vuex'

export default {
  components: {
  },
  data: () => ({
  }),
  computed: {
    ...mapState({
      users: state => state.users.items,
    }),
  },
  created() {
    this.$store.dispatch('getUsers')
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
      this.$store.dispatch('deleteUser', { user })
    },
  },
}
