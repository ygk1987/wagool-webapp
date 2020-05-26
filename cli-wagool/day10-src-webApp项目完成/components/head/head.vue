<template>
  <div class="head">
    <div class="top">
        <div class="avatar">
            <img :src="seller.avatar" />
        </div>
        <div class="info">
            <div class="title">
                <i class="brand"></i>
                <span class="name">{{seller.name}}</span>
            </div>
            <div class="desc">
                <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
            </div>
            <div class="support" v-if="seller.supports">
                <!-- <i class="icon"></i> -->
                <!--非props特性的属性:class   props特性的属性:size type-->
                <!--非props特性的属性会被模板继承下来-->
                <v-icon class="icon" size="1" :type="seller.supports[0].type"></v-icon>
                <span class="text">{{seller.supports[0].content}}</span>
            </div>
        </div>
        <div class="btn" @click="showMask=true">
            <span v-if="seller.supports">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bulletin" @click="showMask=true">
        <div class="icon">
            <i></i>
        </div>
        <p class="text">
            {{seller.bulletin}}
        </p>
        <div class="arrow">
            <i class="icon-keyboard_arrow_right"></i>
        </div>
    </div>
    <div class="bg">
        <img :src="seller.bgImg">
    </div>
    <transition name="mask">
        <div class="mask" v-show="showMask">
            <div class="mainWrap">
                <div class="main">
                    <!--画遮罩页-->
                    <h2 class="title">{{seller.name}}</h2>
                    <div class="starsWrap">
                        <v-stars size="48" :score="seller.score" :length="length"></v-stars>
                    </div>
                    <v-line class="line">
                        <template>
                            <span class="text">优惠信息</span>
                        </template>
                    </v-line>
                    <v-list :supports="seller.supports"></v-list>
                    <v-line class="line">
                        <template>
                            <span class="text">商家公告</span>
                        </template>
                    </v-line>
                    <p class="content">
                        {{seller.bulletin}}
                    </p>
                </div>
            </div>
            <div class="footer">
                <i class="icon-close" @click="showMask=false"></i>
            </div>
        </div>
    </transition>
    <div class="bottom"></div>
  </div>
</template>

<script>
    import line from "components/line/line"
    import list from "components/list/list"
    import stars from "components/stars/stars"

    import {mapState} from "vuex"
    export default {
        name: 'v-head',
        data(){
            return{
                showMask:false,
            }
        },
        computed:{
            ...mapState(["seller","length"]),
        },
        components:{
            "v-line":line,
            "v-list":list,
            "v-stars":stars
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/extend.styl"
  .head
    width 100%
    height 134px
    position relative
    overflow hidden
    .top
        position relative
        box-sizing border-box
        height 106px
        background rgba(7,17,27,.5)
        padding 24px 12px 18px 24px
        .avatar
            float left
            width 64px
            height 64px
            margin-right 16px
            img
                width 100%
                height 100%
                border-radius 2px
        .info
            float left
            color rgba(255,255,255,1)
            margin-top -3px
            .title 
                margin-top 2px
                margin-bottom 8px
                font-size 0
                .brand
                    bg-image(brand)
                    display inline-block
                    width 30px
                    height 18px
                    vertical-align middle
                    margin-top 2px
                    background-size 100%
                    background-repeat no-repeat
                    margin-right 6px
                .name
                    font-size 16px
                    font-weight bold
                    vertical-align middle
            .desc
                font-size 12px
            .support
                margin-top 10px
                margin-bottom 2px
                font-size 0
                .icon
                    vertical-align middle
                    margin-right 4px
                .text
                    vertical-align middle
                    font-size 10px
        .btn
            display flex
            justify-content space-around
            align-items center
            position absolute
            right 12px
            bottom 10px
            border-radius 8px
            width 40px
            height 24px
            font-size 10px
            font-weight 200
            color rgba(255,255,255,1)
            background rgba(0,0,0,.2)
            span
                margin-left: 5px;
    .bulletin
        display flex
        height 28px
        align-items center
        background rgba(7,17,27, .2)
        font-size 10px
        color rgba(255,255,255,1)
        .icon
            flex-basis 26px
            margin-left 12px
            & > i 
                bg-image(bulletin)
                background-repeat no-repeat
                background-size 100%
                display inline-block
                width 22px
                height 12px
        .text
            flex 1
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
        .arrow
            flex-basis 26px
    .bg
        /* left + right + w(auto) + p + b +m = head的尺寸 */
        /* top + bottom + h(auto) + p + b +m = head的尺寸 */
        position absolute 
        left 0
        right  0
        top 0
        bottom 0
        background pink
        z-index -1
        filter blur(3px)
        img
            width 100%
            height 100%
    .mask
        position fixed
        left 0
        right 0
        top 0
        bottom 0
        z-index 9
        background rgba(7,17,27,.8)
        overflow auto
        .mainWrap
            min-height 100%
        .main
            @extend .clearfix
            padding-bottom 96px
            overflow hidden /*解决margin穿透 塌陷*/
            .title
                margin-top 64px
                text-align center
                line-height 16px
                font-size 16px
                font-weight 700
                color white
            .starsWrap
                width 80%
                margin 0 auto
                text-align center
                margin-top 16px
                margin-bottom 28px
            .line
                width 80%
                margin 0 auto
                .text
                    font-weight 100
                    margin 0 12px
                    font-size 14px
                    color rgba(255,255,255,1)
            .content
                margin 0 auto
                margin-top 24px
                box-sizing border-box
                padding 0 12px
                width 80%
                font-size 12px
                line-height 24px
                color rgba(255,255,255,1)
                font-weight 200
        .footer
            margin-top -96px
            height 96px
            color white
            line-height 96px
            text-align center
            font-size 32px
</style>
