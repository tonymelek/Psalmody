<template>
    <div class="bg-dark text-light h-100">  
            <div class="container ">
            <div class="row">
                <div class="row text-center align-items-center mt-4 sticky-top bg-dark">
                <h1 @click="goPreviousHymn" class="col cursor-pointer">&lt;</h1>
                <h1 class="col text-danger">{{ currentHymn.name }}</h1>    
                <h1 @click="goNextHymn" class="col cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'">&gt;</h1>
            </div>
                <div v-for="(verse,index) in currentVerses[0].verses" class="row verses-slides" >
                <div v-for="(verseGroup,langIndex) in currentVerses" class="col my-4 pre-wrap " :class="verseGroup.lang==='arabic'?'arabic':''" >
                    <p>{{ currentVerses[langIndex].verses[index]}}</p>
                </div>
                </div>
             
            </div>
            <div>

            </div>
       

            </div>
            <div class="absolute">
            <div class="row">
                <h2 @click="decrementverseGroup" class="col cursor-pointer h-70"></h2>
                <h2 @click="incrementverseGroup" class="col cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'"></h2>
            </div>
            <!-- <div class="row">
                <h2 @click="goPreviousHymn" class="col cursor-pointer">&lt;</h2>
                <h2 class="col">{{ currentHymn.name }}</h2>    
                <h2 @click="goNextHymn" class="col cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'">&gt;</h2>
            </div> -->
        </div>


    </div>
</template>

<script>
import hymns from '../assets/hymns/new-hymns'
    export default {
        name:'tasbeha-slides',
        data:()=>({
            selectedHymns: hymns,
            verseGroupSize:2,
            verseGroupIndex:0,
            hymnIndex:0,
        }),
        mounted(){
            if(window.innerHeight>window.innerWidth) this.$router.push('/')
        },
        computed:{
            currentHymn(){
                return this.selectedHymns[this.hymnIndex]
            },
            currentVerses(){
                const startingVerseIndex=this.verseGroupSize*this.verseGroupIndex;
                const lastVerseIndex=this.verseGroupSize*(this.verseGroupIndex+1);
                const languages=['english','copticEnglish','arabic'];
                return languages.map(lang=>({lang,verses:this.currentHymn[lang].slice(startingVerseIndex,lastVerseIndex)}))
            }
        },
        methods:{
            incrementverseGroup(){
                if((this.verseGroupIndex+1)*this.verseGroupSize>=this.currentHymn.copticEnglish.length){
                    this.verseGroupIndex=0;
                    this.hymnIndex++ 
                }else{
                    this.verseGroupIndex++
                }
            },
            decrementverseGroup(){
                if(this.verseGroupIndex===0 &&this.hymnIndex>0){
                    this.hymnIndex--
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
            }
            
        }

    }
</script>

<style scoped>
.h-100{
    position: relative;
    min-height: 100svh;
}
.h-70{
    min-height: 70vh;
}
.absolute{
    text-align: center;
    min-width: 100%;
    position: absolute;
    bottom: 10%;
    z-index: 10;
    /* transform: translate(13%,-10%); */
}
p{
    font-size: 4vh;
}
</style>