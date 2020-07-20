<template>
    <section class="board-edit-background">
        <div>
        <img class="img-collage" src="../../../public/img/collage.jpg" />
        <h4>Photos</h4>
        </div>
        <div>
        <img class="img-colors" src="../../../public/img/colors.jpg" />
        <h4>Colors</h4>
        </div>

        <!-- <color-picker @changeBgc="changeBgc" /> -->
    </section>
</template>

<script>
import colorPicker from '../color-picker.cmp.vue';

export default {
    name: 'board-edit-background',
    props:[],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {
        changeBgc(color) {
            this.$emit('changeBgc', color)
        }

    },
    created(){

    },
    mounted(){

    },
    watch: {

    },
    components: {
        colorPicker
    }

}
</script>

<style>

</style>