<template>
    <div class="text-light  wrapper">  
            <div class="container">
            <div class="row">
                <div class="row text-center align-items-center mt-4">
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
                <div @click="decrementverseGroup" class="col cursor-pointer h-70"></div>
                <div @click="incrementverseGroup" class="col cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'"></div>
            </div>
        </div>


    </div>
</template>

<script>
import hymns from '../assets/hymns/new-hymns'
const waitFor=(timeout)=>new Promise((res,rej)=>{
    setTimeout(()=>{
        res();
    },timeout);
});
    export default {
        name:'tasbeha-slides',
        data:()=>({
            selectedHymns: hymns,
            verseGroupSize:2,
            verseGroupIndex:0,
            hymnIndex:0,
        }),
        mounted(){
            console.log(document.querySelector('body').setAttribute('style','background-color:rgb(33,37,41);height:100%;over-flow-y:hidden;'));
            if(window.innerHeight>window.innerWidth) this.$router.push('/')
        },
        watch:{
            currentHymn: {
                async handler(val){
                    await waitFor(0);
                    if(document.body.scrollHeight>window.innerHeight){
                        this.verseGroupSize=1;
                    }else{
                        this.verseGroupSize=2;
                        await waitFor(0);
                        if(document.body.scrollHeight>window.innerHeight) this.verseGroupSize=1;
                    }
                    
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
.wrapper{
    max-height: 100%;
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