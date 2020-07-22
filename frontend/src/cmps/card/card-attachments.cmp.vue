<template>
	<section class="card-attachments">
		<i class="el-icon-paperclip"></i>
		<h2>Attachments</h2>
		<ul>
			<li v-for="attachment in attachments" :key="attachment.imgUrl">
				<button @click="removeAttachment(attachment)">
					<i class="el-icon-delete"></i>
				</button>
				<img id="image" :src="attachment.imgUrl" />
			</li>
		</ul>
	</section>
</template>

<script>
export default {
	props: ['attachments'],
	data() {
		return {
			// attachmentsToUpdate: JSON.parse(JSON.stringify(this.attachments))
		}
	},
	computed: {

	},
	methods: {
		removeAttachment(attachment) {
			this.$emit('attachmentRemoved', this.attachment);
		}
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

<style lang="scss">

</style>