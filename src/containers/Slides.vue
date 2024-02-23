<template>
    <div class="text-light  wrapper prevent-select">  
            <div class="container">
            <nav class="d-flex justify-content-between nav-bar p-2 mt-1">
                <div></div>
                <div class="d-flex align-items-center justify-content-center w-50">
                <h1 @click="goPreviousHymn" class="cursor-pointer" :class="hymnIndex===0 &&'d-none'">&lt;</h1>
                <h1 class="text-danger text-center mx-4 w-75">{{ currentHymn.name }}</h1>    
                <h1 @click="goNextHymn" class="cursor-pointer" :class="hymnIndex===selectedHymns.length-1 &&'d-none'">&gt;</h1>
               </div>
                <div class="d-flex align-items-center">
                <button @click.prevent="changeFontSize('-')" class="smaller">A</button>
                <button @click.prevent="changeFontSize('+')" class="bigger">A</button>
            </div>
           </nav>
            <div class="row">
        
                <div v-for="(verse,index) in currentVerses[0].verses" class="row verses-slides" >
                <div v-for="(verseGroup,langIndex) in currentVerses" class="col my-4 pre-wrap " :class="verseGroup.lang==='arabic'?'arabic':''" >
                    <p :style="{ 'font-size': fontSizeWithRem }">{{ currentVerses[langIndex].verses[index]}}</p>
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
            fontSize:1.5
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
                return languages.map(lang=>({lang,verses:this.currentHymn[lang].slice(startingVerseIndex,lastVerseIndex)}))
            },
            fontSizeWithRem(){
                return `${this.fontSize}rem`
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
</style>