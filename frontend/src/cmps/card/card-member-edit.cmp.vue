<template>
    <section class="card-member-edit">
			<app-filter @filterSet="searchMember"/>
            <user-list v-if="filteredUsers" :users="filteredUsers" :memberOf="card" @toggleMember="toggleMember"/>
    </section>
</template>

<script>
import appFilter from '../app-filter.cmp.vue';
import userList from '../user-list.cmp.vue';
export default {
    props:['members', 'card'],
    data(){
        return{
            filteredUsers: []
        }
    },
    computed: {

    },
    methods: {
        searchMember(filterBy) {
            const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			const filteredUsers = this.members.filter(user => {
                if (user.fullName === 'Guest') return false;
				return user.fullName.match(exp) || user.username.match(exp);	
			})
			this.filteredUsers = filteredUsers;
        },
        toggleMember(userId) {
            this.$emit('toggleMember', userId);
        }

    },
    created(){
        const usersToShow = this.members.filter(user => user.fullName !== 'Guest')
        this.filteredUsers = usersToShow;
    },
    mounted(){

    },
    watch: {

    },
    components: {
        appFilter,
        userList
    }

}
</script>

<style>

</style>