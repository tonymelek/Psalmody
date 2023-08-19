<template>
    <div>

            <h2 @click="incrementverseGroup" class="cursor-pointer" :class="verseGroupSize*(verseGroupIndex+1)>=currentHymn.length &&'text-danger'">+</h2>
            <h2 @click="decrementverseGroup" class="cursor-pointer">-</h2>
            <div class="container">

            <div class="row">
                <h1 class="text-danger text-center" :id="currentHymn.name">{{ currentHymn.name }}</h1>
                <div class="col">
                    <div  v-for="verse in currentHymn.english.slice(verseGroupSize*verseGroupIndex,verseGroupSize*(verseGroupIndex+1))">
                {{ verse }}
            </div>
                </div>
                <div class="col">
                    <div v-for="verse in currentHymn.copticEnglish.slice(verseGroupSize*verseGroupIndex,verseGroupSize*(verseGroupIndex+1))">
                {{ verse }}
            </div>
                </div>
                <div class="col arabic">
                    <div v-for="verse in currentHymn.arabic.slice(verseGroupSize*verseGroupIndex,verseGroupSize*(verseGroupIndex+1))">
                {{ verse }}
                    </div>
                </div>
             
            </div>
            
            </div>
        


    </div>
</template>

<script>
import hymns from '../assets/hymns'
    export default {
        name:'tasbeha-slides',
        data:()=>({
            selectedHymns: hymns,
            verseGroupSize:2,
            verseGroupIndex:0,
            hymnIndex:0,
        }),
        computed:{
            currentHymn(){
                return this.selectedHymns[this.hymnIndex]
            }
        },
        methods:{
            incrementverseGroup(){
                console.log((this.verseGroupIndex+1)*this.verseGroupSize+this.verseGroupSize,this.verseGroupSize,this.currentHymn.copticEnglish.length);
                if((this.verseGroupIndex+1)*this.verseGroupSize+this.verseGroupSize>this.currentHymn.copticEnglish.length){
                    this.verseGroupIndex=0;
                    this.hymnIndex++ 
                }else{
                    this.verseGroupIndex++
                }
            },
            decrementverseGroup(){
                if(verseGroupIndex===0){
                    this.hymnIndex--
                }else{
                    this.verseGroupIndex--

                }
            }
        }

    }
</script>

<style scoped>

</style>