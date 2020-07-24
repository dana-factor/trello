
<template>
    <ul class="avatar-list">
        <li class="avatar" v-for="member in members" :key="member._id" :title="member.fullName">
            <avatar :src="member.imgUrl" :username="member.fullName" :lighten="100" :size="28" background-color="#dfe1e6" color="#172b4d"/>
        </li>
    </ul>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
    props:['members'],
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
    Avatar
  }

}
</script>

<style>

</style>