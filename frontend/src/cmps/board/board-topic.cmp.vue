<template>
    <section class="board-topic">
        <h2 contenteditable="true" @keyup.enter="updateTopicName">{{topicName}}</h2>
        <!-- <input v-else type="text" v-model="topicName" @keyup.enter="updateTopicName(topic.id)"/> -->
        <button @click="toggleEditMenu">...</button>
        <button v-if="editMenuOpen" @click="removeTopic(topic.id)">X</button>
        <card-preview v-for="card in topic.cards" :key="card.id" :card="card"></card-preview>
        <button @click="addCard">+ Add another card</button>
    </section>
</template>

<script>
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
            // topicEditMode: false,
            topicName: ''
        }
    },
    computed: {

    },
    methods: {
        removeTopic(topicId){
            this.$emit('removeTopic', topicId)
            //context.commit({type: 'removeTopic', topicId})
        },
        toggleEditMenu(){
            this.editMenuOpen = !this.editMenuOpen
        },
        // toggleTopicEditMode(){
        //     this.topicEditMode = !this.topicEditMode
        // },
        updateTopicName(ev){
            this.topicName = ev.target.innerText
            this.$emit('updateTopicName', this.topicName, this.topic.id)
            // context.commit({type: 'updateTopicName', topicName: this.topicName, topicId: this.topic.id})
        },
        addCard(){
            this.$emit('addCard', this.topic.id)
            // context.commit({type: 'addCard', topicId: this.topic.id})
        }
    },
    created(){
        this.topicName = this.topic.name
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