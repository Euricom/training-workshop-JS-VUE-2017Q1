<template>
    <div id="app">
        <h1>{{title}}</h1>
        <p>
            <router-link to="/foo/12">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                title: 'Vue with WebPack'
            }
        }
    }
</script>

<style lang="less">
.router-link-active {
  color: red;
}
</style>
