<template>
  <div id="app" :style="{backgroundColor: background.bgc}">
    <app-header></app-header>
    <router-view @changeBgc="changeBgc"/>
  </div>
</template>

<script>

import appHeader from '../src/cmps/app-header.cmp'
export default {
    data(){
        return {
          background: {
            image: '',
            bgc: '',
          }
        }
    },
    methods: {
      changeBgc(color) {
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
