import first_hoos from './hymns/first_hoos.js'
import ten_thino from './hymns/ten_thino.js'
import first_lobsh from './hymns/first_lobsh.js'
const app = {
    data() {
        return {
            count: 4,
            first_name: 'Tony',
            last_name: 'Melek',
            toggler_1: true,
            hymns: [ten_thino, first_hoos, first_lobsh],
            langs: {
                'arabic': true,
                'english': true,
                'copticEnglish': true
            },
            displayedLanguages() {
                return Object.keys(this.langs).filter(lang => this.langs[lang]).length
            },
            showMenu: true

        }

    },
    methods: {
        toggle(type, value) {
            switch (type) {
                case 'lang':
                    this.langs[value] = !this.langs[value]
                    break;
                case 'menu':
                    this.showMenu = !this.showMenu
                    break;
                default:
                    break;
            }

        }
    }

}

const app2 = {
    data() {
        return {
            count: 4,
            first_name: 'Lydia',
            last_name: 'Metry',
            toggler_1: true
        }

    },
    methods: {
        clickme() {
            this.first_name = this.first_name === 'Lydia' ? "Tony" : "Lydia"
            this.toggler_1 = !this.toggler_1
        }
    }

}
Vue.createApp(app).mount('#app')
Vue.createApp(app2).mount('#app2')