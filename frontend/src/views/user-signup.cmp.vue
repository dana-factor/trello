<template>
	<section class="user-signup">
		<div class="signup-container">
			<h1>Sign up for your account</h1>
			<form @submit.prevent="signup">
				<h2>{{msg}}</h2>
				<input
					v-focus
					type="text"
					placeholder="Enter full name"
					v-model="credentials.fullName"
					required
				/>
				<input type="text" placeholder="Enter user name" v-model="credentials.username" required />
				<input type="password" placeholder="Create password" v-model="credentials.password" required />
				<input type="file" @change="onUploadImg" />
				<button>Sign Up</button>
			</form>
			<hr />
			<p>
				Already have an account?
				<router-link to="/login">Log In</router-link>
			</p>
		</div>
	</section>
</template>

<script>
import { userStore } from '../store/user.store'
import { uploadImg } from '../services/img-upload.service'
export default {
	props: [],
	data() {
		return {
			msg: '',
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
		async signup() {
			// const cred = this.credentials;
			// if (!cred.username || !cred.password || !cred.fullName) return this.msg = 'Username, password, name are required!'
			try {
				await this.$store.dispatch({ type: 'signup', userCred: this.credentials })
				this.$router.push('/board');
			} catch (err) {
				this.msg = err;
			}
		},
		async onUploadImg(ev) {
			const imgData = await uploadImg(ev);
			this.credentials.imgUrl = imgData.url;
		}
	},
	created() {
		const user = this.$store.getters.loggedinUser;
		if (user) this.$router.push('/login');
	},
	mounted() {

	},
	watch: {

	},
	components: {

	}

}
</script>

<style>
</style>