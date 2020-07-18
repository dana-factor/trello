<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>

import appHeader from '../src/cmps/app-header.cmp'
export default {
    data(){
        return {

        }
    },
    components: {
      appHeader
    }
}
</script>

<style lang="scss">

</style>
