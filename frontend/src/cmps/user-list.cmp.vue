<template>
    <ul class="user-list">
        <li v-for="user in users" :key="user._id" @click="toggleMember(user._id)">
            <div class="avatar-name">
             <avatar :src="user.imgUrl" :username="user.fullName" :size="32" />
           <span class="name">{{user.fullName}}</span>
            </div>
           <!-- <i v-if="user.isMember" class="el-icon-check"></i> -->
        </li>
    </ul>
</template>

<script>
import Avatar from 'vue-avatar';
import { userService } from '../services/user.service.js';

export default {
    props:['users'],
    data(){
        return{
        }
    },
    computed: {
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
.hidden {
    visibility: hidden;
}

</style>