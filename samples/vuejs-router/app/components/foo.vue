<template>
    <div>
        <h1>Foo</h1>
        <span>Route param: {{ $route.params.id }}</span>
    </div>
</template>

<script>
    export default {
        name: 'foo',
        data() {
            return {
            }
        }
    }
</script>
