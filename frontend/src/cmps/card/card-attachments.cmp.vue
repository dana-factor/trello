<template>
    <section class="card-attachments">
    <ul>
        <li v-for="attachment in attachments" :key=attachment.imgUrl>
            <label for="image">Image</label>
            <img id="image" :src="attachment.imgUrl"/>
        </li>
    </ul>
    </section>
</template>

<script>
export default {
    props:['attachments'],
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

    }

}
</script>

<style lang="scss">
.card-attachments{
    img{
        width: 250px;
    }
    li{
        display: flex;
        flex-direction: column;
    }
}
</style>