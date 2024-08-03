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


            <div v-show="showMenu">
                <div class="d-flex justify-content-around pt-2  bg-light animate__animated animate__fadeInDown">
                    <div class="d-flex align-items-center ">

                        <label class="switch">
                            <input type="checkbox" value="english" class="mx-2" v-model="langs">
                            <span class="slider round"></span>
                        </label>
                        <div class="mx-2">English</div>
                    </div>
                    <div class="d-flex align-items-center">

                        <label class="switch">
                            <input type="checkbox" value="copticEnglish" class="mx-2" v-model="langs">
                            <span class="slider round"></span>
                        </label>
                        <div class="mx-2">Coptic English</div>
                    </div>

                    <div class="d-flex align-items-center">

                        <label class="switch">
                            <input type="checkbox" value="arabic" class="mx-2" v-model="langs">
                            <span class="slider round"></span>
                        </label>
                        <div class="mx-2">Arabic</div>
                    </div>

                </div>
                <div class="d-flex flex-column  pt-2  bg-light animate__animated animate__fadeInLeft menu_width">
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
            <div v-for="verse in hymn.english.length" class="container verses">
                <div class="row my-3 " :class="{ 'text-primary': verse % 2 === 0 }">
                    <div :class="colsCount" class="pre-wrap" :style="{ 'font-size': fontSizeWithRem }" v-show="showLang('english')">
                        {{ hymn.english[verse - 1] }}
                    </div>
                    <div :class="colsCount" class="pre-wrap" :style="{ 'font-size': fontSizeWithRem }" v-show="showLang('copticEnglish')">
                        {{ hymn.copticEnglish[verse - 1] }}</div>
                    <div class="arabic pre-wrap" :class="colsCount" :style="{ 'font-size': fontSizeWithRem }"
                        v-show="showLang('arabic')">
                        {{ hymn.arabic[verse-1] }}
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hymns from '../assets/hymns/new-hymns'
export default {
    name: 'sunday-midnight',
    data: () => ({
        count: 4,
        toggler_1: true,
        hymns,
        langs: ["english", "copticEnglish", "arabic"],
        showMenu: false,
        selectedHymns: hymns,
        fontSize: 1
    }),
    methods: {
        changeFontSize(step){
            this.fontSize+=step
        },
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
        if(window.innerHeight<window.innerWidth) this.$router.push('/slides')
    },
    computed: {
        langsCount() {
            return this.langs.length
        },
        colsCount() {
            return `col-${12 / this.langsCount}`
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
.bigger{
    font-weight: bolder;
    font-size: 2rem;
}
.font-border{
    border: 1px solid black;
    border-radius: 2px;
    line-height: 2rem;
    padding: 0 .5rem;
}
</style>