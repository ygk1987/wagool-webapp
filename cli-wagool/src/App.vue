<template>
  <div id="app">
    <v-head></v-head>
    <div class="navs">
      <div class="item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import head from "components/head/head.vue"
  export default {
    name: 'App',
    components:{
      "v-head":head
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    overflow hidden
    .navs
      background pink
      display flex
      height 40px
      line-height 40px
      .item
        flex 1
        & > a
          display block
          width 100%
          height 100%
          text-align center
</style>
