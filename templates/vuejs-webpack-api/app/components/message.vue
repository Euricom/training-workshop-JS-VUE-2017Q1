<template>
  <div>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'message',
    data: () => ({
      message: 'Hello from messsage',
    }),
  }
</script>

<style lang="less" scoped>
@color-alert: red;
h1 {
  color: @color-alert;
}
</style>
