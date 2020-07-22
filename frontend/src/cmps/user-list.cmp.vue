<template>
    <ul class="user-list">
        <li v-for="user in users" :key="user._id" @click="addMember(user._id)">
             <avatar :src="user.imgUrl" :username="user.fullName" :size="25" />
           <span class="name">{{user.fullName}}</span></li>
    </ul>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    props:['users'],
    data(){
        return{

        }
    },
    computed: {

    },
    methods: {
        addMember(userId) {
            this.$emit('addMember', userId)
        }
    },
    created(){
        console.log(this.users)
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