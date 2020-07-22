
<template>
    <ul class="avatar-list">
        <li class="avatar" v-for="member in members" :key="member._id" :title="member.fullName">
            <avatar :src="member.imgUrl" :username="member.fullName" :size="30" />
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
        console.log(this.members)
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