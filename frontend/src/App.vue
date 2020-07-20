<template>
<!-- :style="{backgroundColor: background.bgc}" -->
  <div id="app" :style="{backgroundColor: background.bgc, backgroundImage: `url('${background.imgUrl}')`}">
    <app-header></app-header>
    <!-- @changeBgc="changeBgc" -->
    <router-view @setBgc="setBgc" @setBgImg="setBgImg"/>
  </div>
</template>

<script>

import appHeader from '../src/cmps/app-header.cmp'
export default {
    data(){
        return {
          background: {
            imgUrl: '',
            bgc: '', 
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
        this.background.imgUrl = '';
      },
      setBgImg(imgUrl) {
        console.log('setimg')
        this.background.imgUrl = `url('${imgUrl}')`;
        this.background.bgc = '';
        // 'url(' + imgUrl +')';
      }
    },
    components: {
      appHeader
    }
}
</script>

<style lang="scss">

</style>
