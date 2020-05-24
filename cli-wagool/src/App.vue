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
  import {GETSELLER,GETGOODS,GETRATINGS} from "store/mutation_type.js"
  import head from "components/head/head.vue"
  import {mapActions} from "vuex"

  export default {
    name: 'App',
    components:{
      "v-head":head
    },
    methods:{
      ...mapActions([GETSELLER,GETGOODS,GETRATINGS]),
    },
    mounted(){
      //在app组件被挂载后,请求商家相关的信息,并要传给头部组件
      //组件上转发action  action内部发送请求拿到数据  提交mutation  通过mutation同步的修改数据
      /* this[GETSELLER]();
      this[GETGOODS]();
      this[GETRATINGS](); */

      this.$store.dispatch(GETSELLER)
      this.$store.dispatch(GETGOODS)
      this.$store.dispatch(GETRATINGS)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
  #app
    width 100%
    height 100%
    overflow hidden
    .navs
      one-px(rgba(7,17,27,.1))
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
          &.active
            color rgba(240,20,20,1)
</style>
