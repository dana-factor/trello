<template>
  <section class="card-preview" :style="{backgroundColor: card.backgroundColor}">
    <button @click.stop="removeCard">
      <i class="el-icon-delete"></i>
    </button>
    <router-link :to="'card/'+card.id" append>
      <div
        @click.prevent="isLabelTitleShown = !isLabelTitleShown"
        class="card-label"
        v-for="label in labels"
        :key="label.color"
        :class="{'title-shown':isLabelTitleShown}"
        :style="{backgroundColor: label.color}"
      >
        <p v-if="isLabelTitleShown" class="label-title">{{label.title}}</p>
        <span></span>
      </div>
      <h2>{{card.name}}</h2>
      <img class="card-img" v-if="hasImg" :src="card.attachments[0].imgUrl" />
      <div class="card-footer">
        <div class="card-badges">
          <p
            v-if="card.dueDate"
            class="card-status"
            :class="{overdue: isOverdue, completed: card.isCardDone}"
          >
            <i class="el-icon-time"></i>
            <span>{{ dueDateShort }}</span>
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
        </div>
        <ul v-if="card.members.length" class="members-preview">
          <li v-for="member in card.members" :key="member._id" :title="member.fullName">
            <avatar
              :src="member.imgUrl"
              :username="member.fullName"
              :size="28"
              background-color="#dfe1e6"
              color="#172b4d"
            />
          </li>
        </ul>
      </div>
    </router-link>
  </section>
</template>

<script>
import { utilService } from "../../services/util.service.js";
import Avatar from "vue-avatar";

export default {
	props: ["card", "boardLabels"],
	data() {
		return {
			isLabelTitleShown: false
		};
	},
	computed: {
		checklistCount() {
			const tasksCount = this.card.checklists.reduce(
				(enteries, checklist) => (enteries += checklist.tasks.length),
				0
			);
			if (!tasksCount) return '';
			return (
				this.card.checklists.reduce(
					(doneEnteries, checklist) =>
						doneEnteries +
						checklist.tasks.reduce(
							(doneEnteriesInTask, task) =>
								task.isDone ? doneEnteriesInTask + 1 : doneEnteriesInTask,
							0
						),
					0
				) +
				"/" +
				tasksCount
			);
		},
		labels() {
			let labelsToShow = [];
			this.boardLabels.forEach(label => {
				if (this.card.labels.includes(label.color)) labelsToShow.push(label);
			});
			return labelsToShow;
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
			this.$emit("removeCard", this.card.id);
		},
	},
	created() { },
	components: {
		Avatar
	}
};
</script>

<style lang="scss" scoped>
</style>