<template>
	<section class="card-attachments">
		<div class="title">
			<i class="el-icon-paperclip"></i>
			<h2>Attachments</h2>
		</div>
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
	methods: {
		removeAttachment(attachment) {
			this.$emit('attachmentRemoved', attachment);
		}
	},
}
</script>