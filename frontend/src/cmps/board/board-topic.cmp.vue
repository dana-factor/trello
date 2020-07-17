<template>
    <section class="board-topic">
        <div class="topic-header">
            <h2 contenteditable="true" @input="updateTopicName">{{topicName}}</h2>
            <!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
            <button @click="toggleEditMenu">...</button>
            <div class="topic-menu" v-if="editMenuOpen">
                <h3>List Actions</h3>
                <span @click="toggleEditMenu" class="closeMenu">X</span>
                <p @click="removeTopic(topic.id); toggleEditMenu();">Delete list</p>
                <p @click="addCard(); toggleEditMenu();">Add new card</p>
                <p @click="toggleMinimize(); toggleEditMenu();"><span v-if="!minimize">Minimize</span><span v-if="minimize">Maximize</span></p>
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
            minimize: false
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
            this.topicName = ev.target.innerText
            this.$emit('updateTopicName', this.topicName, this.topic.id)
        },
        addCard(){
            this.$emit('addCard', this.topic.id)
        },
        toggleMinimize(){
            this.minimize = !this.minimize
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