<template>
	<section onclick class="card-preview">
		<button @click.stop="removeCard">
			<i class="el-icon-delete"></i>
		</button>
		<div
			@click="isLabelTitleShown = !isLabelTitleShown"
			class="card-label"
			v-for="label in labels"
			:key="label.color"
			:style="{backgroundColor: label.color, height: labelHeight, width: labelWidth}"
		>	<p v-if="isLabelTitleShown" class="label-title">{{label.title}}</p>
			<span></span>
		</div>
		<router-link :to="'card/'+card.id" append>
			<h2>{{card.name}}</h2>
			<div v-if="hasImg">
			<img v-for="attachment in card.attachments" :key="attachment.imgUrl" :src="attachment.imgUrl" />
			</div>
			<p v-if="card.dueDate" class="card-status" :class="{overdue: isOverdue, completed: card.isCardDone}">
				<i class="el-icon-time"></i>
				<span> {{ dueDateShort}}</span>
			</p>
			<p v-if="card.description">
				<i class="el-icon-document"></i>
			</p>
			<p v-if="card.checklists.length">
				<i class="el-icon-finished"></i>
				{{checklistCount}}
			</p>
			<p v-if="card.attachments.length">
				<i class="el-icon-paperclip"></i>
			</p>
		</router-link>
	</section>
</template>

<script>
import { utilService } from '../../services/util.service.js';

export default {
	props: ['card','boardLabels'],
	data() {
		return {
			isLabelTitleShown: false
		};
	},
	computed: {
		checklistCount() {
			return this.card.checklists.reduce(
				(doneEnteries, checklist) => doneEnteries + checklist.tasks.reduce(
					(doneEnteriesInTask, task) => task.isDone ? doneEnteriesInTask + 1 : doneEnteriesInTask
					, 0), 0) +
				'/' +
				this.card.checklists.reduce((enteries, checklist) => enteries += checklist.tasks.length, 0)
		},
		labels() {
			let labelsToShow = [];
			this.boardLabels.forEach(label => {
				if (this.card.labels.includes(label.color)) labelsToShow.push(label);
			});
			return labelsToShow;
		},
		labelHeight(){
			return (this.isLabelTitleShown) ? '16px' : '8px'
		},
		labelWidth(){
			return (this.isLabelTitleShown) ? '56px' : '40px'
		},
		dueDateShort() {
			return utilService.getDateShort(this.card.dueDate);
		},
		isOverdue() {
			if (this.card.isCardDone) return;
			return this.card.dueDate < Date.now();
		},
		hasImg() {
			if (!this.card.attachments.length) return;
			var imgs = this.card.attachments.filter(attachment => attachment.imgUrl);
			return imgs.length;
		}
	},
	methods: {
		removeCard() {
			this.$emit('removeCard', this.card.id)
		}
	},
	created() { },
	components: {}
};
</script>

<style lang="scss" scoped>
</style>