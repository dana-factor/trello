<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Homepage</router-link> |
      <router-link to="/board/a101">Board Details</router-link> |
      <router-link to="/board/a101/card/asd">Card Details</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/test">Test</router-link> |

    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">

</style>
