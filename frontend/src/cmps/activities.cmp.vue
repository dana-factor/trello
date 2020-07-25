<template>
  <section class="activities-container">
    <div class="activities">

      <div class="activity" v-for="activity in activitiesToShow" :key="activity.createdAt">
        <avatar
          :src="activity.user.imgUrl"
          :username="activity.user.fullName"
          :lighten="100"
          :size="28"
        />
        <div class="content" :class="{comment:activity.isComment}">
          <p>
            <span class="name">{{activity.user.fullName}}</span>&nbsp;
            <span v-if="activity.isComment">left a comment&nbsp;</span>
            <span v-if="isShowInCard">{{activity.text | removeInCard}}</span>
            <span v-else>{{activity.text}}</span>
          </p>
          <p class="time">{{activity.createdAt | timeSince}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import moment from 'moment';
import Avatar from 'vue-avatar'
export default {
	props: ['activities', 'isShowInCard'],
	computed: {
		activitiesToShow() {
			// return this.activities;
			return this.activities.slice(0, 20);
		},
	},
	filters: {
		timeSince(timestamp) {
			return moment(timestamp).fromNow();
		},
		removeInCard(text) {
			let parts = text.split('in');
			return parts[parts.length - 2];
		}
	},
	components: {
		Avatar
	}
}
</script>

<style lang="scss">
</style>