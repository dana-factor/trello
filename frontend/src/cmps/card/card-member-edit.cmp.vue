<template>
    <section class="card-member-edit">
			<app-filter @filterSet="searchMember"/>
            <user-list v-if="filteredUsers" :users="filteredUsers" @addMember="addMember"/>
    </section>
</template>

<script>
import appFilter from '../app-filter.cmp.vue';
import userList from '../user-list.cmp.vue';
export default {
    props:['members'],
    data(){
        return{
            filteredUsers: []
        }
    },
    computed: {

    },
    methods: {
        searchMember(filterBy) {
            console.log(filterBy)
            const exp = new RegExp(`.*${filterBy.searchStr}.*`, 'i');
			const filteredUsers = this.members.filter(user => {
                if (user.fullName === 'Guest') return false;
				return user.fullName.match(exp) || user.username.match(exp);	
			})
			this.filteredUsers = filteredUsers;
        },
        addMember(userId) {
            this.$emit('addMember', userId);
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