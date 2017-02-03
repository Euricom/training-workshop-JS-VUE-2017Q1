(function () {
    const globalEvent = new Vue()

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
                alertMessage: 'Alert: We have a problem.',
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
                console.log('Alert is closed')
                this.alertMessage = ''
            },
            onShowAlert () {
                this.alertMessage = 'Yet, another problem occured, Help!'
            },
            setLang (lang) {
                window.translate.language = lang
                globalEvent.$emit('lang:changed', lang)
            },
        },
    })
})()


