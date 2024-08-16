<template>
    <Portrait v-if="isPortrait" />
    <Landascape :hymn="hymn" v-else />
</template>

<script>
import Portrait from '../components/Portrait.vue';
import Landascape from '../components/Landascape.vue';
import { orientations } from '../constants'
export default {
    name: 'home-page',
    components: {
        Portrait,
        Landascape
    },
    data: () => ({
        orientation: '',
    }),
    computed: {
        isPortrait() {
            return this.orientation === orientations.portrait;
        },
        hymn() {
            return this.$route.query.hymn;
        },
        langs() {
            return this.$route.query.langs;
        }

    },
    mounted() {
        const handleResize = () => {
            if (window.innerHeight > window.innerWidth) {
                this.orientation = orientations.portrait;
            } else {
                this.orientation = orientations.landscape;
            }
        }
        window.addEventListener('resize', handleResize)
    }
}
</script>

<style scoped></style>