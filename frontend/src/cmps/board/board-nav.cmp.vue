<template>
    <section class="board-nav">
        <slot name="board-name"></slot>
        <div class="nav-members">
        <member-avatars :members="members"/>
        <h5 @click="toggleUserList">Invite</h5>
        </div>
        <div class="btns-container">
            <div @click.stop class="search-container">
                <app-filter
                v-if="isFilterInputShown"
                @openFilterModal="openFilterModal"
                @filterSet="filterSet"
                ></app-filter>
                <button @click.stop="showFilterInput"><i class="el-icon-search"></i></button>
            </div>
            <slot></slot>
        </div>
        <div v-if="filteredTopics && isFilterModalOpen" class="filter-modal">
            <div v-for="topic in filteredTopics" :key="topic.id">
                <div class="filter-res" v-for="card in topic.cards" :key="card.id">
                    <router-link :to="'card/' + card.id" append>
                        <h2>{{card.name}}</h2>
                        <p>In list: {{topic.name}}</p>
                        <p v-if="card.description">Description: {{card.description}}</p>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import appFilter from '../app-filter.cmp';
import memberAvatars from '../member-avatars.cmp';


export default {
    props:['filteredTopics', 'isFilterModalOpen', 'isFilterInputShown', 'members'],
    data(){
        return{
           
        }
    },
    computed: {
        
    },
    methods: {
        filterSet(filterBy) {
            this.$emit('filterSet', filterBy);
        },
        openFilterModal(){
            this.$emit('openFilterModal')
        },
        showFilterInput(){
            this.$emit('showFilterInput')
        },
        toggleUserList() {
            this.$emit('toggleUserList');
        },
        // addMember(userId) {
        //     this.$emit('addMember', userId);
        // }
    },
    created(){

    },
    mounted(){

    },
    watch: {

    },
    components: {
        appFilter,
        memberAvatars

    }

}
</script>

<style>

</style>