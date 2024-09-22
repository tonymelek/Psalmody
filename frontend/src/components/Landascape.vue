<template>
    <div class="text-light  wrapper prevent-select">
        <div class="container position-relative">
            <h1 class="position-absolute header-pos">{{ currentHymn.name }} - ({{ verseGroupIndex + 1 }}/{{
            currentHymnTotalGroups }})</h1>

            <!-- hymns menu -->
            <nav ref="hymnsMenu" class=" justify-content-between p-2 nav-bar position-absolute bg-dark menu-pos"
                :class="isMenuOpen ? 'animate__animated animate__fadeInLeft' : 'animate-fadeOutUpSlow'">
                <div>
                    <div>
                        <div class="font-2 px-3" v-for="(hymn, index) in selectedHymns" :key="hymn?.name"
                            @click="updateSelectedHymn(index)">
                            <span :class="getHymnLocation(index)">{{ hymn?.name }}</span>
                        </div>
                    </div>
                </div>
            </nav>
            <!-- settings menu -->
            <nav ref="settingsMenu" class="position-absolute nav-bar bg-dark settings-pos px-2"
                :class="isSettingsOpen ? 'animate__animated animate__fadeInRight' : 'animate-fadeOutUpFast'">
                <div class="d-flex justify-content-center py-2">
                    <button @click.prevent="changeFontSize('-')" class="smaller">A</button>
                    <button @click.prevent="changeFontSize('+')" class="bigger">A</button>
                </div>
                <div class="px-2">
                    <div v-for="lang in langs" class="d-flex align-items-center ">
                        <label class="switch">
                            <input type="checkbox" :value="lang" class="mx-2" v-model="selectedLangs"
                                :disabled="selectedLangs.length === 1 && selectedLangs.includes(lang)">
                            <span class="slider round"></span>
                        </label>
                        <div class="mx-2">{{ covertToSenctenceCase(lang) }}</div>
                    </div>
                </div>
                <div>
                    <input id="startDate" class="form-control mt-2 mb-1 d-block" type="date" v-model="date" />
                    <span class="text-center d-block w-100" @click.prevent="setLive">Live Date</span>
                </div>
            </nav>

            <header class="d-flex justify-content-between align-items-start mt-1 ">
                <span @click.prevent="toggleMenu" class="nav-bar cursor-pointer menu-icon coptic d-inline-block p-2"
                    :class="isMenuOpen ? 'menu-icon-rotate me-2' : 'menu-icon-rotate-reverse'">|</span>
                <span @click.prevent="toggleSettings"
                    class="nav-bar cursor-pointer menu-icon coptic d-inline-block p-2">{{
            isSettingsOpen
                ? `x` : '*' }}</span>
            </header>
            <main class="row">
                <div v-for="(_, index) in currentVerses[selectedLangs[0]]" class="row"
                    :class="(currentVerses.startingVerseIndex + index) % 2 === 0 ? 'bahari' : 'quibli'">
                    <div class="row" v-for="(_, subIndex) in Array(currentVerses[selectedLangs[0]][0].length)">
                        <div v-for="lang in selectedLangs.sort((a, b) => a > b ? -1 : 1)" class="col mt-4"
                            :class="getClassNameByLang(lang)">
                            <p :style="{ 'font-size': fontSizeWithRem }">
                                {{ currentVerses?.[lang]?.[index]?.[subIndex] }}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <!-- container end -->


        <div class="absolute" :style="{ 'height': `${scrollHeight - 80}px`, 'min-height': '90vh' }">
            <div class="row h-100">
                <div @click="decrementverseGroup" class="col cursor-pointer"></div>
                <div @click="incrementverseGroup" class="col cursor-pointer"></div>
            </div>
        </div>


    </div>
</template>

<script>
import hymns from '../assets/hymns/indexedHymns';
import { scrollToTop, getPreselectedHymnIndex, covertToSenctenceCase, getClassNameByLang } from '../utils';
import { CopticFeasts } from '../assets/hymns/util';
import { langs } from '../constants';
const waitFor = (timeout) => new Promise((res) => {
    setTimeout(() => {
        res();
    }, timeout);
});
const adjustHeight = async (_this) => {
    await waitFor(0);
    if (document.body.scrollHeight > window.innerHeight) {
        _this.verseGroupSize = 1;
    } else {
        _this.verseGroupSize = 2;
        await waitFor(0);
        if (document.body.scrollHeight > window.innerHeight) _this.verseGroupSize = 1;
    }
}
const isoDate = (date = new Date()) => date.toISOString().split("T")[0];
export default {
    name: 'landscape-view',
    props: {
        hymn: {
            type: String,
            required: false,
            default: 'ten_thino'
        }
    },
    data: () => ({
        selectedHymns: hymns(sessionStorage.getItem('date') || isoDate()),
        verseGroupSize: 2,
        verseGroupIndex: 0,
        hymnIndex: 0,
        fontSize: 1.5,
        isMenuOpen: false,
        isSettingsOpen: false,
        scrollHeight: 550,
        selectedLangs: langs.slice(0, -1),
        langs,
        covertToSenctenceCase,
        getClassNameByLang,
        date: sessionStorage.getItem('date') || isoDate(),
        copticFeasts: new CopticFeasts()
    }),
    mounted() {
        document.querySelector('body').setAttribute('style', 'background-color:rgb(33,37,41);height:100%;over-flow-y:hidden;');
        this.hymnIndex = getPreselectedHymnIndex(hymns(this.date), this.hymn);
        this.$refs.hymnsMenu.style.display = 'none';
        this.$refs.settingsMenu.style.display = 'none';
    },
    watch: {
        hymnIndex: {
            async handler() {
                await adjustHeight(this);
                const availableLangs = Object.keys(this.selectedHymns[this.hymnIndex]).filter(v => v != 'name');
                this.langs = availableLangs;
                const selectedLangs = [...this.selectedLangs].filter(v => availableLangs.includes(v));
                this.selectedLangs = selectedLangs;
            }
        },
        date: {
            handler(newVal, OldVal) {
                if (newVal !== isoDate()) sessionStorage.setItem('date', newVal);
                this.hymnIndex = 0;
                this.selectedHymns = hymns(new Date(newVal));
            }
        }
    },
    computed: {
        currentHymn() {

            return this.selectedHymns[this.hymnIndex]
        },
        currentVerses() {
            const startingVerseIndex = this.verseGroupSize * this.verseGroupIndex;
            const lastVerseIndex = this.verseGroupSize * (this.verseGroupIndex + 1);
            const verses = {
                startingVerseIndex
            }
            this.selectedLangs.forEach(lang => verses[lang] = this.currentHymn[lang].slice(startingVerseIndex, lastVerseIndex).map(v => v.split(/\n+/)))
            return verses;
        },
        fontSizeWithRem() {
            return `${this.fontSize}rem`
        },
        currentHymnTotalGroups() {
            return Math.ceil(this.currentHymn.english.length / this.verseGroupSize)
        }
    },
    methods: {
        setLive() {
            sessionStorage.removeItem('date');
            this.hymnIndex = 0;
            this.date = isoDate();
        },
        getHymnLocation(index) {
            if (index < this.hymnIndex) {
                return 'text-danger'
            } else if (index === this.hymnIndex) {
                return 'text-warning'
            }
        },
        async incrementverseGroup() {
            scrollToTop();
            if (this.isMenuOpen || this.isSettingsOpen) {
                this.isMenuOpen = false;
                this.isSettingsOpen = false;
                return;
            }
            if ((this.verseGroupIndex + 1) * this.verseGroupSize >= this.currentHymn.english.length && this.hymnIndex === this.selectedHymns.length - 1) {
                return; //last versegroup in last hymn
            } else if ((this.verseGroupIndex + 1) * this.verseGroupSize >= this.currentHymn.english.length) {
                this.verseGroupIndex = 0;
                this.hymnIndex++
            }
            else {
                this.verseGroupIndex++
            }
            await waitFor(100)
            this.scrollHeight = document.body.scrollHeight
        },
        decrementverseGroup() {
            scrollToTop();
            if (this.isMenuOpen || this.isSettingsOpen) {
                this.isMenuOpen = false;
                this.isSettingsOpen = false;
                return;
            }
            if (this.verseGroupIndex === 0 && this.hymnIndex > 0) {
                this.hymnIndex--
            } else if (this.verseGroupIndex === 0 && this.hymnIndex === 0) {
                //do nothing
            } else {
                this.verseGroupIndex--
            }
        },
        goNextHymn() {
            if (this.hymnIndex < this.selectedHymns.length - 1) {
                this.hymnIndex++
                this.verseGroupIndex = 0;
            }


        },
        goPreviousHymn() {
            if (this.hymnIndex > 0) {
                this.hymnIndex--
                this.verseGroupIndex = 0;
            }

        },
        async changeFontSize(sign) {
            if (sign == '+') {
                this.fontSize += 0.25;
            } else {
                this.fontSize -= 0.25;
            }
            if (this.verseGroupIndex === 0) await adjustHeight(this);
        },
        toggleMenu() {
            this.$refs.hymnsMenu.style.display = 'flex';
            this.isMenuOpen = !this.isMenuOpen;
        },
        toggleSettings() {
            this.$refs.settingsMenu.style.display = 'block';
            this.isSettingsOpen = !this.isSettingsOpen;
        },
        updateSelectedHymn(index) {
            this.isMenuOpen = false;
            this.isSettingsOpen = false;
            this.hymnIndex = index;
            this.verseGroupIndex = 0;
        }

    }

}
</script>


<style scoped>
.wrapper {
    max-height: 100%;
}

.absolute {
    text-align: center;
    min-width: 100%;
    position: absolute;
    top: 70px;
    z-index: 10;
    /* transform: translate(13%,-10%); */
}

p {
    font-size: 4vh;
}

.bigger {
    font-size: 2rem;
    font-weight: bolder;
    height: 3rem;
    width: 3rem;
}

.smaller {
    font-size: 1rem;
    height: 3rem;
    width: 3rem;
    vertical-align: bottom;
}

.nav-bar {
    border: 2px solid wheat;
    border-radius: 5px;
    box-shadow: 0 0 10px #9ecaed;
}

button {
    border-radius: 5px;
    margin: 0 5px;
}

.prevent-select {
    -webkit-user-select: none;
    /* Safari */
    -ms-user-select: none;
    /* IE 10 and IE 11 */
    user-select: none;
    /* Standard syntax */
}

@keyframes rotate-menu {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(90deg);
    }
}

@keyframes rotate-menu-reverse {
    0% {
        transform: rotate(90deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

.menu-icon {
    text-align: center;
    font-size: 2rem;
    width: 3.75rem;
}

.menu-icon-rotate {
    animation: rotate-menu .5s linear forwards;
}

.menu-icon-rotate-reverse {
    animation: rotate-menu-reverse .5s linear forwards;
}

@keyframes animate__fadeOutUp {
    0% {
        opacity: 0;
        transform: translate3d(0, 0, 0);
    }

    100% {
        transform: translate3d(0, -250%, 0);
        opacity: 1;
    }
}

.animate-fadeOutUpSlow {
    animation: animate__fadeOutUp 1s linear forwards;
}

.animate-fadeOutUpFast {
    animation: animate__fadeOutUp .5s linear forwards;
}

.menu-pos {
    left: 80px;
    width: 60%;
    min-height: 100%;
    height: 98svh;
    z-index: 20;
    cursor: pointer;
    overflow-y: scroll;
}

.settings-pos {
    right: 15px;
    top: 73px;
    width: 190px;
    height: 270px;
    z-index: 20;
    cursor: pointer;
}

.header-pos {
    width: 100%;
    z-index: -1;
    color: rgb(236, 59, 59);
    text-align: center;
}

.font-2 {
    font-size: 1.5rem;
}

.right {
    right: 0;
}
</style>