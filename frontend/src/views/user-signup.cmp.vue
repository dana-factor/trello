<template>
	<section class="user-signup">
		<div class="signup-container">
			<h1>Sign up for your account</h1>
			<form @submit.prevent="signup">
				<h2>{{msg}}</h2>
				<input v-focus type="text" placeholder="Full Name" v-model="credentials.fullName" required />
				<input type="text" placeholder="Username" v-model="credentials.username" required />
				<input type="password" placeholder="Password" v-model="credentials.password" required />
				<button class="add-image">
					Add Profile Image
					<input type="file" @change="onUploadImg" />
				</button>
				<p>{{textNearUpload}}</p>
				<button class="signup">Sign Up</button>
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
			textNearUpload: ''
		}
	},
	computed: {

	},
	methods: {
		async signup() {
			// const cred = this.credentials;
			// if (!cred.username || !cred.password || !cred.fullName) return this.msg = 'Username, password, name are required!'
			if (this.textNearUpload === 'Uploading...') return this.msg = 'Wait for upload to finish!';
			try {
				await this.$store.dispatch({ type: 'signup', userCred: this.credentials })
				this.$router.push('/board');
			} catch (err) {
				this.msg = err;
			}
		},
		async onUploadImg(ev) {
			this.textNearUpload = 'Uploading...';
			const splitPath = ev.target.value.split('\\');
			const imgData = await uploadImg(ev);
			this.credentials.imgUrl = imgData.url;
			this.textNearUpload = splitPath[splitPath.length - 1];
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