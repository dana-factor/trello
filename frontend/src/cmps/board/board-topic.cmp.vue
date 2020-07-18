<template>
    <section class="board-topic">
        <div class="topic-header">
            <h2 contenteditable @keypress.enter.prevent="updateTopicName" @blur="updateTopicName">{{topicName}}</h2>
            <!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
            <button @click="toggleEditMenu">...</button>
            <div class="topic-menu" v-if="editMenuOpen">
                <h3>List Actions</h3>
                <button @click="toggleEditMenu" class="close-menu">X</button>
                <button @click="removeTopic(topic.id); toggleEditMenu();">Delete list</button>
                <button @click="addCard(); toggleEditMenu();">Add new card</button>
                <button @click="toggleEditListNameShown">Change list name</button>
                <input v-if="editListNameShown" v-model="topicName" @keypress.enter.prevent="updateTopicName" @blur="updateTopicName"/>
                <button @click="toggleMinimize(); toggleEditMenu();"><span v-if="!minimize">Minimize</span><span v-if="minimize">Maximize</span></button>
            </div>
        </div>
        <div class="topic-main" v-if="!minimize">
            <card-preview v-for="card in topic.cards" :key="card.id" :card="card"></card-preview>
        </div>
        <div class="topic-footer" v-if="!minimize">
            <p @click="addCard">+ Add another card</p>
        </div>
    </section>
</template>

<script>
import cardPreview from '../../cmps/card/card-preview.cmp'
export default {
    props:{
        topic: {
        required: true,
        type: Object
        }
    },
    data(){
        return{
            editMenuOpen: false,
            topicName: '',
            minimize: false,
            editListNameShown: false
        }
    },
    computed: {

    },
    methods: {
        removeTopic(topicId){
            this.$emit('removeTopic', topicId)
        },
        toggleEditMenu(){
            this.editMenuOpen = !this.editMenuOpen
        },
        updateTopicName(ev){
            if (ev.target.innerText) this.topicName = ev.target.innerText
            this.$emit('updateTopicName', this.topicName, this.topic.id)
            this.editListNameShown = false
            this.editMenuOpen = false  
        },
        addCard(){
            this.$emit('addCard', this.topic.id)
        },
        toggleMinimize(){
            this.minimize = !this.minimize
        },
        toggleEditListNameShown(){
            this.editListNameShown = !this.editListNameShown
        }
    },
    created(){
        this.topicName = this.topic.name
        console.log(this.topicName);
        
    },
    mounted(){

    },
    watch: {

    },
    components: {
        cardPreview
    }

}
</script>

<style lang="scss" scoped>


</style>