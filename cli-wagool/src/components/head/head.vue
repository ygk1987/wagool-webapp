<template>
  <div class="head">
    <div class="top">
        <div class="avatar">
            <img src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg" />
        </div>
        <div class="info">
            <div class="title">
                <i class="brand"></i>
                <span class="name">粥品香坊(大运村)</span>
            </div>
            <div class="desc">
                <span>蜂鸟专送/38分钟送达</span>
            </div>
            <div class="support">
                <i class="icon"></i>
                <span class="text">在线支付满28送美女</span>
            </div>
        </div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
export default {
  name: 'v-head',
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
                    bg-image(decrease_1)
                    display inline-block
                    width 12px
                    height 12px
                    vertical-align middle
                    background-size 100%
                    background-repeat no-repeat
                    margin-right 4px
                .text
                    vertical-align middle
                    font-size 10px
</style>
