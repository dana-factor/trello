<template>
<!-- :style="{backgroundColor: background.bgc}" -->
  <div id="app" :style="{backgroundColor: background.bgc}">
    <app-header></app-header>
    <!-- @changeBgc="changeBgc" -->
    <router-view @setBgc="setBgc" />
  </div>
</template>

<script>

import appHeader from '../src/cmps/app-header.cmp'
export default {
    data(){
        return {
          background: {
            image: '',
            bgc: 'lightblue', 
          }
        }
    },
    computed: {
      // bgc() {
      //   // console.log('bgc', this.$store.getters.board)
      //   // return this.$store.getters.board.style.backgroundColor;
      // }
    },
    methods: {
      setBgc(color) {
        this.background.bgc = color;
      }
    },
    components: {
      appHeader
    }
}
</script>

<style lang="scss">

</style>
