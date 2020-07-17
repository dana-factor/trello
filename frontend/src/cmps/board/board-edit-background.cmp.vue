<template>
    <section class="board-edit-background">
        <color-picker @changeBgc="changeBgc" />
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