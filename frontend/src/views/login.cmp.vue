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

<style scoped>

 .card {
    height: 100px;
    width: 200px;
    border: 1px solid black;
    margin: 5px;
}

.card-container {
    background-color: beige;
    border: 1px solid black;
    margin: 10px;
}

.column-drag-handle {
    cursor: move;
    padding: 5px;
}

.card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
}

.card-ghost-drop {
    transition: transform 0.18s ease-in-out;
    transform: rotateZ(0deg)
}
.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}

</style>