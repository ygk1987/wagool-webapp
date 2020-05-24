<template>
  <div class="goods">
    <div class="content">
        <div class="menuWrap">
            <ul class="menulist">
                <li class="menu" v-for="(good,index) in goods" :key="index">
                  <v-icon class="icon" v-if="good.type >= 0" size="3" :type="good.type"></v-icon>
                  <span>{{good.name}}</span>
                </li>
            </ul>
        </div>
        <div class="typeWrap"></div>
    </div>
    <div class="cart">
      购物车
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    name: 'goods',
    computed:{
      ...mapState(["goods"]),
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    flex 1
    display flex
    flex-direction column
    /* flex的注意点：
      1.尽量规避使用flex-shrink *{flex-shrink:0}
      2.元素有溢出内容会影响到flex的弹性空间管理 所以在flex布局中 
          如果遇到有溢出内容尽量使用overflow:hidden */
    overflow hidden
    .content
      flex 1
      display flex
      /* flex的注意点：
        1.尽量规避使用flex-shrink *{flex-shrink:0}
        2.元素有溢出内容会影响到flex的弹性空间管理 所以在flex布局中 
            如果遇到有溢出内容尽量使用overflow:hidden */
      overflow hidden
      .menuWrap
        flex-basis 80px
        .menulist
          .menu
            one-px(rgba(7,17,27,.1))
            height 54px
            background #f3f5f7
            font-size 12px
            display flex
            justify-content center
            align-items center
            .icon
              margin-right 3px
      .typeWrap
        flex 1
    .cart
      flex-basis 50px
      background gray
</style>
