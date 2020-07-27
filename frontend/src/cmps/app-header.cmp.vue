<template>
	<section class="app-header">
		<div class="btns">
			<router-link to="/" class="home">
				<i class="el-icon-s-home"></i>
			</router-link>
			<router-link to="/board">Boards</router-link>
			<router-link to="/board/5f1aefd0f30ae5001757bd46">Public Board</router-link>
		</div>
		<h1 @click="$router.push('/')">trellA</h1>
		<div class="login">
			<template v-if="!loggedInUser">
				<router-link to="/login">Login</router-link>
			</template>
            <template v-else>
				<div class="user-header">
                <avatar class="avatar" :src="loggedInUser.imgUrl" :username="loggedInUser.fullName" :size="32" background-color="#dfe1e6" color="#172b4d"/>
                <button class="logout" @click="$emit('logout')">Logout</button>
				</div>
            </template>
		</div>
	</section>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
	props: ['loggedInUser'],
	data() {
		return {

		}
	},
	computed: {

	},
	methods: {

	},
	created() {

	},
	mounted() {

	},
	watch: {

	},
	components: {
		Avatar
	}

}
</script>

<style>
</style>