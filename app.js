import hymns from './hymns/index.js'

const app = {
    data() {
        return {
            count: 4,
            toggler_1: true,
            hymns,
            langs: ["english", "copticEnglish", "arabic"],
            showMenu: false,
            selectedHymns: hymns
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
        },
        toggleHymn(name) {
            console.log(name);
            const hymn = this.selectedHymns.find(hymn => hymn.name === name)
            const index = this.hymns.findIndex(hymn => hymn.name === name)
            console.log(index);
            if (hymn) {
                this.selectedHymns = this.selectedHymns.filter(hymn => hymn.name !== name)
            } else {
                const hymnToAdd = this.hymns.find(hymn => hymn.name === name)
                this.selectedHymns.splice(index, 0, hymnToAdd);
            }

        }
    }

}
Vue.createApp(app).mount('#app')
