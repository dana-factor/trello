<template>
	<section class="card-share-edit">
		<button>
			<img class="icon" src="../../assets/img/whatsapp.png" />
			<span>
				<ShareNetwork
					network="whatsapp"
					:url="cardUrl"
					title="Become a member of this trella task"
				>
					Share on Whatsapp
				</ShareNetwork>
			</span>
		</button>
		<button>
			<img class="icon" src="../../assets/img/facebook.png"  />
			<span>
				<ShareNetwork
					network="facebook"
					:url="cardUrl"
					title="Become a member of this trella task"
				>
					Share on Facebook
				</ShareNetwork>
			</span>
		</button>
		<button>
			<img class="icon" src="../../assets/img/mail.png"  />
			<span>
				<ShareNetwork
					network="email"
					:url="cardUrl"
					title="Become a member of this trella task"
				>
					Share via Email
				</ShareNetwork>
			</span>
		</button>
	</section>
</template>

<script>
export default {
	props: ['cardUrl'],
	data() {
		return {
		};
	},
	computed: {},
	methods: {
	
	},
	created() {},
	mounted() {},
	watch: {},
	components: {}
};
</script>

<style>
</style>