import hymns from './hymns/index.js'

const app = {
    data() {
        return {
            count: 4,
            toggler_1: true,
            hymns,
            langs: ["english", "copticEnglish", "arabic"],
            showMenu: false
        }

    },
    computed: {
        langsCount() {
            return this.langs.length
        },
        colsCount() {
            return `col-${12 / this.langsCount}`
        }
    },
    methods: {
        toggle(type, value) {
            switch (type) {
                case 'menu':
                    this.showMenu = !this.showMenu
                    break;
                default:
                    break;
            }

        },
        showLang(lang) {
            return this.langs.indexOf(lang) !== -1
        }
    }

}
Vue.createApp(app).mount('#app')
