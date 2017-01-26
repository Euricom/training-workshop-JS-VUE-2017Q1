class TranslationService {

    constructor () {
        this.translations = {
            'Welcome to Vue': {
                nl: 'Welkom in Vue',
            },
        }
        this.language = 'nl'
    }

    getTranslation (message) {
        const trans = this.translations[message][this.language]
        return trans || message
    }
}

window.translate = new TranslationService()

