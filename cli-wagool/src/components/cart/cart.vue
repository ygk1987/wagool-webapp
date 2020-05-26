<template>
  <div>
    <div class="cart">
        <div  class="left" style="color: white" @click="leftFn">
            <div class="icon">
                <div class="logo" :class="{active: totalCount > 0}">
                    <i class="icon-shopping_cart"></i>
                </div>
                <span class="qipao" v-show="totalCount > 0">{{totalCount}}</span>
            </div>
            <div class="totalPrice" :class="{active: totalCount > 0}">
                <span>¥{{totalPrice}}</span>
            </div>
            <div class="deliveryPrice">
                <span>另需配送费¥{{seller.deliveryPrice}}元</span>
            </div>
        </div>
        <div class="right" :class="{active: totalPrice>=seller.minPrice}">
            <span>{{payText}}</span>
        </div>
    </div>
    <div class="list" v-show="showList">
        <div class="header">
            <span class="cartText">购物车</span>
            <span class="clear" @click="clear">清空</span>
        </div>
        <div class="content" ref="content">
            <ul>
                <li class="item" v-for="(selectedFood, index) in selectedFoods" :key="index">
                    <span class="left"> {{selectedFood.name}} </span>
                    <div class="right">
                        <span class="price">{{selectedFood.price}}</span>
                        <v-control class="control" :food="selectedFood"></v-control>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    <div class="mask" v-show="showList" @click="fold=true"></div>
  </div>
</template>

<script>
  import {mapState} from "vuex" 
  import BScroll from "better-scroll"
  import control from "components/control/control"
  export default {
    name: '',
    data(){
      return {
        fold: true, //代表购物车详情页是折叠,默认就是折叠
      }
    },
    props:{
        selectedFoods:Array
    },
    computed:{
      ...mapState(["seller"]),
      totalCount(){
          return this.selectedFoods.reduce((add,food)=>{
            return add += food.count
          },0)
      },
      totalPrice(){
          return this.selectedFoods.reduce((add,food)=>{
            return add += food.count * food.price
          },0)
      },
      payText(){
        if(this.totalPrice <= 0){
          return `¥${this.seller.minPrice}起送`
        }else if(this.totalPrice <= this.seller.minPrice){
          return `还差¥${this.seller.minPrice - this.totalPrice}起送`
        }else{
          return '去结算';
        }
      },
      showList(){
        /*showList控制着购物车详情页是否显示;
          购物车详情页面显示的两个必要条件:
            1.购物车中必须有数据
            2.用户点击了购物车(购物车需不需要折叠)
              折叠: 购物车详情页不用显示
              不折叠: 购物车详情页需要显示
        */
        if(this.totalCount <= 0){
          this.fold = true;
          return false
        }
        // 每一次showList产生改变时; 我们要重新去计算整个list的滑屏
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.content,{click:true});
        }else{
          //当dom结构产生改变时,务必使用refresh方法,重新计算better-scroll
          this.listScroll.refresh();
        }
        return !this.fold
      },
    },
    methods:{
      clear(){
        this.$emit("clear")
      },
      leftFn(){
        //购物车没有数据!!!
        if(this.totalCount <= 0){
          return
        }
        this.fold = !this.fold
      }
    },
    components:{
      "v-control":control
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
     @import "../../common/stylus/mixin.styl"
    .cart
        position fixed
        z-index 3
        bottom 0
        left 0
        height 46px
        width 100%
        background #141d27
        display flex
        .left
            flex 1
            height 100%
            display flex
            .icon
                position relative
                bottom 15px
                width 56px
                height 56px
                border-radius 50%
                background #141d27
                margin-left 12px
                margin-right 12px
                display flex
                justify-content center
                align-items center
                .logo
                    display flex
                    justify-content center
                    align-items center
                    width 44px
                    height 44px
                    border-radius 50%
                    background rgba(255,255,255,0.4)
                    &.active
                        background rgba(0,160,220,1)
                        i
                            color white
                    i
                        color rgba(255,255,255,0.4)
                .qipao
                    position absolute
                    right 0
                    top 5px
                    width 24px
                    height 16px
                    line-height 16px
                    border-radius 6px
                    background red
                    font-size 9px
                    font-weight 700
                    text-align center
            .totalPrice
                display flex
                justify-content center
                align-items center
                margin-right 12px
                font-size 16px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                &.active
                    color white
            .deliveryPrice
                display flex
                justify-content center
                align-items center
                font-size 14px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                padding-left 12px
                border-left 2px solid rgba(255,255,255,0.1)
        .right
            flex 0 0 105px
            height 100%
            background rgba(255,255,255,0.4)
            display flex
            justify-content center
            align-items center
            &.active
                background green
                span
                    color white
            span
                color rgba(255,255,255,0.6)
    .list
        max-height 255px
        position fixed
        z-index 2
        left 0
        bottom 45px
        width 100%
        background #f3f5f1
        padding-bottom 20px
        .header
            one-px(rgba(7,17,27,.1))
            height 40px
            background #f3f5f7
            display flex
            justify-content space-between
            align-items center
            .cartText
                margin-left 18px ;
                color rgba(7,17,27,1);
                font-weight 800
                font-size 14px
            .clear
                margin-right 18px
                color rgba(0,160,220,1);
                font-weight 800
                font-size 14px

        .content
            max-height 195px
            overflow hidden
            .item
                one-px(rgba(7,17,27,.1))
                display flex
                height 48px
                align-items center
                justify-content space-between
                .left
                    padding-left 18px
                .right
                    display flex
                    align-items center
                    padding-right  22px
                    .price
                        margin-right 12px
                        color rgba(240,20,20,1)
                        font-size 10px
                        font-weight 700
.mask
    position fixed
    z-index 1
    left 0
    right 0
    top 0
    bottom 0
    background rgba(7,17,27,.6)
    backdrop-filter blur(5px)
</style>

