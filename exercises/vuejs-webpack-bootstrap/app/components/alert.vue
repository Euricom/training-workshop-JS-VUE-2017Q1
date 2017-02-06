<template>
  <div v-if="show" class="alert alert-warning alert-dismissible" role="alert">
    <button type="button" class="close" @click="onClose()"><span aria-hidden="true">&times;</span></button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'alert',
    data () {
      return {
        show: true,
      }
    },
    methods: {
      onClose () {
        this.$emit('closed')
        this.show = false
      },
    },
  }
</script>
