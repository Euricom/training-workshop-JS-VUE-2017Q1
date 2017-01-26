const globalEvent = new Vue();

// alert component
const Alert = Vue.extend({
    template: `
        <div v-if="show" class="alert alert-warning alert-dismissible" role="alert">
            <button type="button" class="close" @click="onClose()"><span aria-hidden="true">&times;</span></button>
            <slot></slot>
        </div>
    `,
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
})
Vue.component('alert', Alert)

// translate directive
Vue.directive('translate', {
    key: '',
    inserted: function (el, binding, vnode) {
        this.key = el.innerHTML
        el.innerHTML = window.translate.getTranslation(this.key)
        // register for change event
        globalEvent.$on('lang:changed', (lang) => {
            console.log('lang changed: ', lang)
            vnode.context.$forceUpdate()
        })
    },
    update: function (el) {
        el.innerHTML = window.translate.getTranslation(this.key)
    },
})

// eslint-disable-next-line
new Vue({
    el: '#root',
    data () {
        return {
            message: 'Hello World',
            showText: true,
        }
    },
    created () {
        window.translate.language = 'nl'
    },
    filters: {
        toUpperCase: function (value) {
            if (!value) return ''
            return value.toString().toUpperCase()
        },
    },
    methods: {
        onToggle () {
            this.showText = !this.showText
        },
        onClosed () {
            console.log('dialog is closed')
        },
        setLang (lang) {
            window.translate.language = lang
            globalEvent.$emit('lang:changed', lang)
        },
    },
})



