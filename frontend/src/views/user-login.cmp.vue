<template>
	<section class="user-login">
		<!-- <h1>Login</h1> -->
		<div class="login-container">
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
				<input type="password" v-model="credentials.password" placeholder="Password" />
				<button>Login</button>
			</form>
			<hr>
			<p v-if="!loggedinUser">
				Not registered yet?
				<router-link to="/signup">Sign Up!</router-link>
			</p>
		</div>
		<!-- <hr /> -->
		<!-- <button @click="getAllUsers">Get All Users</button>
		<ul>
			<li v-for="user in users" :key="user._id">
				<pre>{{user}}</pre>
				<button @click="removeUser(user._id)">x</button>
			</li>
		</ul> -->
		<!-- </div> -->
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
			const cred = this.credentials;
			if (!cred.username || !cred.password) return this.msg = 'Please enter username and password';
			try {
				await this.$store.dispatch({ type: 'login', userCred: cred });
				this.$router.push('/board');
			} catch (err) {
				this.msg = err;
				this.loginCred = {};
			}
		},
	},
	created() {
		const user = this.$store.getters.loggedinUser;
		if (user) this.$router.push('/board');
	},
}
</script>