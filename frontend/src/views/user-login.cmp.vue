<template>
	<section class="user-login">
		<h1>Login</h1>
		<h2>{{msg}}</h2>
		<div v-if="loggedinUser">
			<h3>
				Loggedin User:
				{{loggedinUser.username}}
				<button @click="logout">Logout</button>
			</h3>
		</div>
		<form v-else @submit.prevent="login">
			<input type="text" v-model="credentials.username" placeholder="Username" />
			<br />
			<input type="text" v-model="credentials.password" placeholder="Password" />
			<br />
			<button>Login</button>
		</form>
		<p v-if="!loggedinUser">Not registered yet? <button @click="signup">Sign Up!</button></p>
		<hr />
		<button @click="getAllUsers">Get All Users</button>
		<ul>
			<li v-for="user in users" :key="user._id">
				<pre>{{user}}</pre>
				<button @click="removeUser(user._id)">x</button>
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	name: 'login',
	data() {
		return {
			loggedinUser: '',
			credentials: {
				username: '',
				password: '',
      		},
			msg: '',
		}
	},
	computed: {
		users() {
			return this.$store.getters.users
		}
	},
	methods: {
		async login() {
			const cred = this.credentials
			if (!cred.username || !cred.password) return this.msg = 'Please enter username/password'
			await this.$store.dispatch({ type: 'login', userCred: cred });
			this.loadLoggedinUser()
			this.loginCred = {};
			this.$router.push('/')
		},
		async getAllUsers() {//for debugging
			const users = await this.$store.dispatch({ type: 'loadUsers' })
			return users
		},
		async logout() {
			const user = await this.$store.dispatch({type: 'logout'})//todo, move to navbar or something
      		console.log('loggedout user:', user);
      		this.loadLoggedinUser()
		},
		signup(){
			this.$router.push('/signup')
		},
		loadLoggedinUser(){
			this.loggedinUser = this.$store.getters.loggedinUser
    	}
		// removeUser(userId) {
		//   this.$store.dispatch({ type: 'removeUser', userId })
		// },
		// updateUser() {
		//   this.$store.dispatch({ type: 'updateUser', user: this.userToEdit })
		// },
	},
	created() {
		this.loadLoggedinUser()
		console.log('this.loggedinUser', this.loggedinUser)
  	},
}
</script>