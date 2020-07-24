<template>
    <ul class="user-list">
        <li v-for="user in usersWithMemberStatus" :key="user._id" @click="toggleMember(user._id)">
            <div class="avatar-name">
             <avatar :src="user.imgUrl" :username="user.fullName" :size="32" background-color="#dfe1e6" color="#172b4d"/>
           <span class="name">{{user.fullName}}</span>
            </div>
           <i v-if="user.isMember" class="el-icon-check"></i>
        </li>
    </ul>
</template>

<script>
import Avatar from 'vue-avatar';
import { userService } from '../services/user.service.js';

export default {
    props:['users', 'memberOf'],
    data(){
        return{
        }
    },
    computed: {
        usersWithMemberStatus() {
            var usersCopy = JSON.parse(JSON.stringify(this.users));
            usersCopy.forEach(user => {
                if(this.memberOf.members.find(member => member._id === user._id)) user.isMember = true;
                else user.isMember = false;
            })
            return usersCopy;
        }
    },
    methods: {
        toggleMember(userId) {
            this.$emit('toggleMember', userId);
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

<style scoped>

</style>