<template>
	<section class="card-attachments">
		<ul>
			<li v-for="attachment in attachments" :key="attachment.imgUrl">
				<div>
					<label for="image">🖼️ Image</label>
					<button @click="removeAttachment(attachment)">X</button>
				</div>
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
.card-attachments {
	img {
		width: 250px;
	}
	li {
		display: flex;
		flex-direction: column;
	}
	div {
		display: flex;
		justify-content: space-between;
	}
}
</style>