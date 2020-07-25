<template>
	<section class="app-header">
		<div class="btns">
			<router-link to="/">
				<i class="el-icon-s-home"></i>
			</router-link>
			<router-link to="/board">Boards</router-link>
			<router-link to="/board/a101">Public Board</router-link>
		</div>
		<h1>trellA</h1>
		<div class="login">
			<template v-if="!loggedInUser">
				<router-link to="/login">Login</router-link>
			</template>
            <template v-else>
                Hey {{loggedInUser.fullName}}!
                <button class="logout" @click="$emit('logout')">Logout</button>
            </template>
		</div>
	</section>
</template>

<script>
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

	}

}
</script>

<style>
</style>