<template>
    <section class="user-signup">
        <h1>Signup:</h1>
        <div v-if="loggedinUser">
            <h3>Currently logged as: {{loggedinUser.username}}</h3>
            <p>If you want to add another user, please logout first</p>
            <button @click="logout">Logout</button>
        </div>
        <form v-else @submit.prevent="signup">
            <h2>{{msg}}</h2>
            <input type="text" placeholder="Please input full name" v-model="credentials.fullName"/>
            <input type="text" placeholder="Please input user name" v-model="credentials.username"/>
            <input type="password" placeholder="Please input password" v-model="credentials.password" show-password/>
            <input type="file" @change="onUploadImg"/>
            <button>Signup</button>
        </form>
    </section>
</template>

<script>
import {userStore} from '../store/user.store'
import {uploadImg} from '../services/img-upload.service'
export default {
    props:[],
    data(){
        return{
            msg:'',
            loggedinUser: '',
            credentials: {
                username: '',
                password: '',
                fullName: '',
                imgUrl: ''
            },
        }
    },
    computed: {

    },
    methods: {
        async signup(){
            if (!credentials.username || !credentials.password) return this.msg = 'Please enter username/password'
            let user = await this.$store.dispatch({type: 'signup', userCred: this.credentials})
            this.$router.push('/login')
        },
        async logout(){
            let user = await this.$store.dispatch({type: 'logout'})
            console.log('loggedout user:', user);
            this.loggedinUser = this.$store.getters.loggedinUser
        },
        async onUploadImg(ev){
            // this.saveDisabled = true
            const imgData = await uploadImg(ev)
            this.credentials.imgUrl = imgData.url
            // this.saveDisabled = false
        }
    },
    created(){
        let user = this.$store.getters.loggedinUser
        if (user) this.loggedinUser = user
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