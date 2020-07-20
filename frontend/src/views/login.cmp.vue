<template>
	<section class="loginApp">
		<h1>Login</h1>
		<h2>{{msg}}</h2>

		<div v-if="loggedinUser">
			<h3>
				Loggedin User:
				{{loggedinUser.username}}
				<button @click="doLogout">Logout</button>
			</h3>
		</div>
		<form @submit.prevent="doLogin">
			<input type="text" v-model="loginCred.username" placeholder="Username" />
			<br />
			<input type="text" v-model="loginCred.password" placeholder="Password" />
			<br />
			<button>Login</button>
		</form>
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
			loginCred: {},
			msg: '',
			// userToEdit: {}
		}
	},
	computed: {
		users() {
			return this.$store.getters.users
		},
		loggedinUser() {
			return this.$store.getters.loggedinUser
		}
	},
	created() {
		console.log('this.loggedinUser', this.loggedinUser)
	},
	methods: {
		async doLogin() {
			const cred = this.loginCred
			if (!cred.username || !cred.password) return this.msg = 'Please enter username/password'
            await this.$store.dispatch({ type: 'login', userCred: cred });
			this.loginCred = {};

		},
		getAllUsers() {//for debugging
			this.$store.dispatch({ type: 'loadUsers' })
		},
		// removeUser(userId) {
		//   this.$store.dispatch({ type: 'removeUser', userId })
		// },
		// updateUser() {
		//   this.$store.dispatch({ type: 'updateUser', user: this.userToEdit })
		// },
		doLogout() {
			this.$store.dispatch({ type: 'logout' })//todo, move to navbar or something
		}
	},
	// watch: {
	// 	loggedinUser() {
	// 		this.userToEdit = { ...this.loggedinUser }
	// 	}
	// }
}
</script>