<template>
    <div class="board-preview">
        <!-- contenteditable="true" @change="saveBoardName" -->
        <!-- <p> {{board.name}}</p>  -->
        <img class="board-img" v-if="board.style.imgUrl" :src="board.style.imgUrl" />
        <div class="board-bgc" v-else :style="{backgroundColor: board.style.backgroundColor}"></div>
        <div class="board-name">{{board.name}}</div>
    </div>
</template>

<script>
export default {
    props:['board'],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {
    },
    created(){},
    mounted(){

    },
    watch: {

    },
    components: {

    }

}
</script>

<style scoped> 



h4 {
    margin: 0;
}


</style>