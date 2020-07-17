<template>
    <section class="board-topic">
        <div class="topic-header">
            <h2 contenteditable="true" @keydown.enter.prevent="updateTopicName">{{topicName}}</h2>
            <!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
            <button @click="toggleEditMenu">...</button>
            <button v-if="editMenuOpen" @click="removeTopic(topic.id)">X</button>
        </div>
        <div class="topic-main">
            <card-preview v-for="card in topic.cards" :key="card.id" :card="card"></card-preview>
        </div>
        <div class="topic-footer">
            <button @click="addCard">+ Add another card</button>
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
            topicName: ''
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