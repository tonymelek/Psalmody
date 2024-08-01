<template>
    <div class="text-light  wrapper prevent-select">  
            <div class="container position-relative">
               <div class="d-flex align-items-start mt-1 ">
                     <span  
                     @click.prevent="toggleMenu" 
                     class="nav-bar cursor-pointer menu-icon material-symbols-outlined d-inline-block p-2" 
                     :class="isMenuOpen?'menu-icon-rotate me-2':'menu-icon-rotate-reverse'">menu</span>
                     <h1 class="position-absolute header-pos">{{ currentHymn.name }} - ({{ verseGroupIndex+1}}/{{ currentHymnTotalGroups }})</h1>

                <nav class="d-flex justify-content-between p-2 nav-bar position-absolute bg-dark menu-pos" :class="isMenuOpen?'animate__animated animate__fadeInLeft':'animate-fadeInRight'">
                    <div>
                        <div class="position-absolute right">
                            <button @click.prevent="changeFontSize('-')" class="smaller">A</button>
                            <button @click.prevent="changeFontSize('+')" class="bigger">A</button>
                        </div>
                        <div>
                        <div class="font-2 px-3" v-for="(hymn,index) in selectedHymns" :key="hymn.name" @click="updateSelectedHymn(index)">
                            {{ hymn.name }}
                        </div>
                    </div>
                    </div>
              </nav>
            </div>
               
            <div class="row">
        
                <div v-for="(verse,index) in currentVerses[0].verses" class="row" :class="(currentVerses[0].startingVerseIndex+index)%2===0?'bahari':'quibli'" >
                <div v-for="(verseGroup,langIndex) in currentVerses" 
                class="col my-4 pre-wrap"
                 :class="verseGroup.lang==='arabic'?'arabic':''" >
                    <p :style="{ 'font-size': fontSizeWithRem }">
                        {{ currentVerses[langIndex].verses[index]}}
                    </p>
                </div>
                </div>
             
            </div>
            <div>

            </div>
       

            </div>
            <div class="absolute h-100">
            <div class="row h-100">
                <div @click="decrementverseGroup" class="col cursor-pointer"></div>
                <div @click="incrementverseGroup" class="col cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'"></div>
            </div>
        </div>


    </div>
</template>

<script>
import hymns from '../assets/hymns/new-hymns'
const waitFor=(timeout)=>new Promise((res)=>{
    setTimeout(()=>{
        res();
    },timeout);
});
const adjustHeight=async(_this)=>{
                    await waitFor(0);
                    if(document.body.scrollHeight>window.innerHeight){
                        _this.verseGroupSize=1;
                    }else{
                        _this.verseGroupSize=2;
                        await waitFor(0);
                        if(document.body.scrollHeight>window.innerHeight) _this.verseGroupSize=1;
                    }
}
    export default {
        name:'tasbeha-slides',
        data:()=>({
            selectedHymns: hymns,
            verseGroupSize:2,
            verseGroupIndex:0,
            hymnIndex:0,
            fontSize:1.5,
            isMenuOpen:false
        }),
        mounted(){
            document.querySelector('body').setAttribute('style','background-color:rgb(33,37,41);height:100%;over-flow-y:hidden;');
            if(window.innerHeight>window.innerWidth) this.$router.push('/')
        },
        watch:{
            currentHymn: {
                async handler(val){
                    await adjustHeight(this);           
                }
                },
                deep: true
        },
        computed:{
            currentHymn(){
                return this.selectedHymns[this.hymnIndex]
            },
            currentVerses(){
                const startingVerseIndex=this.verseGroupSize*this.verseGroupIndex;
                const lastVerseIndex=this.verseGroupSize*(this.verseGroupIndex+1);
                const languages=['english','copticEnglish','arabic'];
                return languages.map(lang=>({lang,
                    verses:this.currentHymn[lang].slice(startingVerseIndex,lastVerseIndex),
                    startingVerseIndex
                }))
            },
            fontSizeWithRem(){
                return `${this.fontSize}rem`
            },
            currentHymnTotalGroups(){
                return Math.ceil(this.currentHymn.english.length/this.verseGroupSize)
            }
        },
        methods:{
            incrementverseGroup(){
                if(this.isMenuOpen){
                    this.isMenuOpen=false;
                    return;
                }
                if((this.verseGroupIndex+1)*this.verseGroupSize>=this.currentHymn.english.length){
                    this.verseGroupIndex=0;
                    this.hymnIndex++ 
                }else{
                    this.verseGroupIndex++
                }
            },
            decrementverseGroup(){
                if(this.isMenuOpen){
                    this.isMenuOpen=false;
                    return;
                }
                if(this.verseGroupIndex===0 &&this.hymnIndex>0){
                    this.hymnIndex--
                }else if (this.verseGroupIndex===0 &&this.hymnIndex===0){
                    //do nothing
                }else{
                    this.verseGroupIndex--
                }
            },
            goNextHymn(){
                if(this.hymnIndex<this.selectedHymns.length-1) {
                    this.hymnIndex++ 
                    this.verseGroupIndex=0;
                }
            

            },
            goPreviousHymn(){
                if(this.hymnIndex>0) {
                    this.hymnIndex-- 
                    this.verseGroupIndex=0;
                }
       
            },
            async changeFontSize(sign){
                if(sign=='+'){
                    this.fontSize+=0.25;
                }else{
                    this.fontSize-=0.25;
                }
                if(this.verseGroupIndex===0) await adjustHeight(this);
            },
            toggleMenu(){
                this.isMenuOpen=!this.isMenuOpen;
            },
            updateSelectedHymn(index){
                this.isMenuOpen=false;
                this.hymnIndex=index;
                this.verseGroupIndex=0;
            }
            
        }

    }
</script>


<style scoped>
.wrapper{
    max-height: 100%;
}

.absolute{
    text-align: center;
    min-width: 100%;
    position: absolute;
    top: 70px;
    z-index: 10;
    /* transform: translate(13%,-10%); */
}
p{
    font-size: 4vh;
}
.bigger{
    font-size: 2rem;
    font-weight: bolder;
    height: 3rem;
    width: 3rem;
}
.smaller{
    font-size: 1rem;
    height: 3rem;
    width: 3rem;
    vertical-align: bottom;
}
.nav-bar{
    border:2px solid wheat;
    border-radius: 5px;
    box-shadow: 0 0 10px #9ecaed;
}
button{
    border-radius: 5px;
    margin:0 5px;
}
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}
@keyframes rotate-menu {
           0%{
            transform: rotate(0deg);
           } 
           100%{
            transform: rotate(90deg);
           }
        }
@keyframes rotate-menu-reverse {
    0%{
    transform: rotate(90deg);
    } 
    100%{
    transform: rotate(0deg);
    }
}
          
.menu-icon{
    font-size: 2.5rem;
}
.menu-icon-rotate{
    animation: rotate-menu .5s  linear forwards;
}
.menu-icon-rotate-reverse{
    animation: rotate-menu-reverse .5s  linear forwards;
}

@keyframes animate__fadeInRight{
    0%{
        opacity: 0;
        transform: translate3d(0, 0, 0);
    }
    100%{
        transform: translate3d(0, -120%, 0);
        opacity: 1;
    }
}
.animate-fadeInRight{
    animation: animate__fadeInRight 1s linear forwards;
}
.menu-pos{
    left:80px;
    width:60%;
    min-height: 100%;
    height: 98svh;
    z-index:20;
    cursor: pointer;
    overflow-y:scroll;
}
.header-pos{
    width: 100%;
    z-index: -1;
    color: rgb(236, 59, 59);
    text-align: center;
}
.font-2{
    font-size: 1.5rem;
}
.right{
    right: 0;
}


</style>