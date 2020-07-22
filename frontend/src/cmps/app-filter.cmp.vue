<template>
    <section class="app-filter">
        <input v-focus type="text" v-model="filterBy.searchStr" @input="filterSet(); openFilterModal()" placeholder="Search"/>
    </section>
</template>

<script>
export default {
    props:[],
    data(){
        return{
            filterBy: {
		    searchStr: '',
            },
        }
    },
    computed: {

    },
    methods: {
        filterSet() {
            this.$emit('filterSet', {...this.filterBy });
    },
        openFilterModal(){
            this.$emit('openFilterModal')
    }
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

<style>

</style>