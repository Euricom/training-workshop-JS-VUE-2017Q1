window.Alert = (function () {
    const alertTypes = {
        'success': 'alert-success',
        'info': 'alert-info',
        'warn': 'alert-warning',
        'error': 'alert-danger',
    }
    const component = Vue.extend({
        props: [
            'type',
        ],
        template: `
            <div v-if="show" class="alert alert-dismissible" :class="alertClassName" role="alert">
                <button type="button" class="close" @click="onClose()"><span aria-hidden="true">&times;</span></button>
                <slot></slot>
            </div>
        `,
        // this an alternative style to define the data function
        data: () => ({
            alertClassName: '',
            show: true,
        }),
        created () {
            console.log(this.type)
            this.alertClassName = alertTypes[this.type]
            if (!this.alertClassName) {
                this.alertClassName = alertTypes.warn
            }
        },
        methods: {
            onClose () {
                this.$emit('closed')
                this.show = false
            },
        },
        updated (arg) {
            console.log('Alert is updated', arg)
            this.show = true
        },
    })
    Vue.component('alert', component)
    return component
})()
