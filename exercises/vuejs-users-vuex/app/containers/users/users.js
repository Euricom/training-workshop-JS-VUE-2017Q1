import { mapState } from 'vuex'

export default {
  components: {
  },
  computed: {
    ...mapState({
      users: state => state.users.items,
    }),
  },
  data: () => ({
  }),
  created() {
    this.$store.dispatch('getUsers')
  },
  methods: {
  },
}
