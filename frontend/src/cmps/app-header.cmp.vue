<template>
	<section class="app-header">
		<div>
			<router-link to="/">
				<i class="el-icon-s-home"></i>
			</router-link>
			<router-link to="/board">Boards</router-link>
			<router-link to="/board/a101">Public Board</router-link>
		</div>
		<h1>trella</h1>
		<div>
			<template v-if="!loggedInUser">
				<router-link to="/login">Login</router-link>
			</template>
            <template v-else>
                Hey {{loggedInUser.fullName}}!
                <button @click="$emit('logout')">Logout</button>
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