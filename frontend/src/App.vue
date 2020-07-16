<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Homepage</router-link> |
      <router-link to="/board/:boardId">Board Details</router-link> |
      <router-link to="/board/:boardId/card/:cardId?">Card Details</router-link> |
      <router-link to="/login">Login</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
