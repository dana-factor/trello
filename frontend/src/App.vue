<template>
  <div id="app" :style="{backgroundColor: background.bgc, backgroundImage: `url('${background.imgUrl}')`}">
    <app-header></app-header>
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
    computed: {},
    methods: {
      setBgc(color) {
        this.background.imgUrl = '';
        this.background.bgc = color;
      },
      setBgImg(imgUrl) {
        this.background.bgc = '';
        this.background.imgUrl = imgUrl;
      }
    },
    components: {
      appHeader
    }
}
</script>

<style lang="scss">

</style>
