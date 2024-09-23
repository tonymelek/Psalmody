<template>
    <div class="container">
        <div class=" container fixed-top">
            <div class="d-flex justify-content-between bg-light">
                <div class="m-0 cursor-pointer" @click="toggle('menu', showMenu)">
                    <!-- <span v-if="showMenu">Hide Menu</span>
                <span v-else>Show Menu</span> -->
                    <img src="/imgs/menu.png" alt="menu" width="40">
                </div>
                <div class="d-flex  align-items-center">
                    <p @click="changeFontSize(-.25)" class="cursor-pointer my-0 font-border">A</p>
                    <p class="mx-2 my-0 bigger cursor-pointer font-border" @click="changeFontSize(.25)">A</p>
                </div>
            </div>


            <div v-show="showMenu" class="hamburger-menu-wrapper">
                <!-- Languages Selectors -->
                <span class="d-block py-1 text-danger">You can select up to 3 langs, you can alter any of pre-selected</span>
                <div class="row pt-2  bg-light animate__animated animate__fadeInDown">
                    <div v-for="lang in langs" class="col d-flex align-items-center ">
                        <label class="switch">
                            <input type="checkbox" :value="lang" class="mx-2" v-model="selectedLangs"
                                :disabled="selectedLangs.length === 1 && selectedLangs.includes(lang)">
                            <span class="slider round"></span>
                        </label>
                        <span class="mx-2">{{ covertToSenctenceCase(lang) }}</span>
                    </div>
                </div>

                <div ref="hamburger_menu"
                    class="d-flex flex-column  pt-2  bg-light animate__animated animate__fadeInLeft hamburger_menu">
                    <div v-if="selectAll">
                        <button class="btn btn-primary mb-3" @click="select('all')">Select All</button>
                    </div>
                    <div v-else>
                        <button class="btn btn-warning mb-3" @click="select('none')">Select None</button>
                    </div>
                    <div v-for="hymn in hymns" class="mx-2 mb-1" :key="hymn.name">
                        <div class="d-flex justify-content-between align-items-center">
                            <a :href="`#${hymn.name}`" @click="toggle('menu')">{{ hymn.name }}</a>
                            <label class="switch">
                                <input type="checkbox" value="hymn.name" class="mx-2" :checked="checked(hymn.name)"
                                    @click="toggleHymn(hymn.name)">
                                <span class="slider round"></span>
                            </label>
                        </div>
                        <hr class="my-1">
                    </div>
                </div>
            </div>
        </div>
        <div v-for="hymn in selectedHymns" :class="{ 'd-none': langsCount === 0 }">
            <h3 class="text-danger text-center pt-5" :id="hymn.name">{{ hymn.name }}</h3>
            <div v-for="(_, verseIndex) in Array(hymn.english?.length || 0)" class="container verses">
                <div class="row my-3 " :class="{ 'text-primary': verseIndex % 2 === 0 }">
                    <div v-for="(_, subIndex) in hymn.english[0].split(/\n+/)" class="row">
                        <div v-for="lang in getLangs(hymn).sort((a, b) => a > b ? -1 : 1)" class="col"
                            :style="{ 'font-size': fontSizeWithRem }" :class="getClassNameByLang(lang)">
                            {{ hymn[lang][verseIndex]?.split(/\n+/)[subIndex] }}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import getHymns from '../assets/hymns/indexedHymns'
import { langs } from '../constants';
import { covertToSenctenceCase, getClassNameByLang } from '../utils'
const hymns = getHymns();
export default {
    name: 'portrait-view',
    data: () => ({
        toggler_1: true,
        hymns: hymns,
        langs,
        selectedLangs: JSON.parse(localStorage.getItem('langs_portrait'))||langs.slice(0, -2),
        showMenu: false,
        selectedHymns: hymns,
        fontSize: 1,
        covertToSenctenceCase,
        getClassNameByLang
    }),
    watch: {
        selectedLangs: {
            async handler(newVal, oldVal) {
                if (newVal.length > 3) {
                    this.selectedLangs = oldVal;
                    return;
                }
                localStorage.setItem('langs_portrait',JSON.stringify(this.selectedLangs));
            }
        }
    },
    methods: {
        getLangs(hymn) {
            return Object.keys(hymn).filter(v => v != 'name').filter(v => [...this.selectedLangs].includes(v))
        },
        changeFontSize(step) {
            this.fontSize += step
        },
        toggle(type, value) {
            switch (type) {
                case 'menu':
                    this.showMenu = !this.showMenu
                    if (this.showMenu) this.$refs['hamburger_menu'].focus();
                    break;
                default:
                    break;
            }

        },
        select(type) {
            switch (type) {
                case 'all':
                    this.selectedHymns = this.hymns
                    break;
                case 'none':
                    this.selectedHymns = []
                    break;

                default:
                    break;
            }
        },
        checked(hymnName) {
            return this.selectedHymns.find(hymn => hymn.name === hymnName) ? true : false
        }
        ,
        toggleHymn(name) {
            const hymn = this.selectedHymns.find(hymn => hymn.name === name)
            const index = this.hymns.findIndex(hymn => hymn.name === name)
            if (hymn) {
                this.selectedHymns = this.selectedHymns.filter(hymn => hymn.name !== name)
            } else {
                const hymnToAdd = this.hymns.find(hymn => hymn.name === name)
                this.selectedHymns.splice(index, 0, hymnToAdd);
            }

        }
    },
    mounted() {
        document.querySelector('body').setAttribute('style', '');
    },
    computed: {
        langsCount() {
            return this.langs.length
        },
        selectAll() {
            return this.selectedHymns.length === 0
        },
        fontSizeWithRem() {
            return `${this.fontSize}rem`
        }
    }
}
</script>

<style scoped>
.bigger {
    font-weight: bolder;
    font-size: 2rem;
}

.font-border {
    border: 1px solid black;
    border-radius: 2px;
    line-height: 2rem;
    padding: 0 .5rem;
}

.hamburger-menu-wrapper {
    height: 100vh;
    background-color: white;
}
</style>