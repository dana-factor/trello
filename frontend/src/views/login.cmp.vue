<template>
    <section class="login">
    <h1>login</h1>
    <color-picker/>
    <board-edit-background></board-edit-background>
    </section>
</template>

<script>

import boardEditBg from '../cmps/board/board-edit-background.cmp.vue';
import colorPicker from '../cmps/color-picker.cmp.vue';
export default {
    props:[],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {

    },
    created(){

    },
    mounted(){

    },
    watch: {

    },
    components: {
        boardEditBg,
        colorPicker
    }

}
</script>

<style>

</style>