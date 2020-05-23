<template>
  <div class="stars" :class="`stars-${size}`">
    <div class="star" :class="item"
      v-for="(item,index) in scoreArr" :key="index"></div>
  </div>
</template>

<script>
export default {
  name: 'stars',
  props: {
    size: String,
    score:Number //根据分数去计算出5颗星星的状态
  },
  data(){
    return{
      scoreArr: ["on","on","on","half","off"]
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";
  .stars
    display inline-flex
    .star
      background-size 100%
      background-repeat no-repeat
    &.stars-48
      .star
        width 20px
        height 20px
        margin-right 12px
        &:list-child
          margin-right 0
        &.on
          bg-image(star48_on)
        &.half
          bg-image(star48_half)
        &.off
          bg-image(star48_off)
    &.stars-36
      .star
        width 15px
        height 15px
        margin-right 9px
        &:list-child
          margin-right 0
        &.on
          bg-image(star36_on)
        &.half
          bg-image(star36_half)
        &.off
          bg-image(star36_off)
    &.stars-24
      .star
        width 10px
        height 10px
        margin-right 6px
        &:list-child
          margin-right 0
        &.on
          bg-image(star24_on)
        &.half
          bg-image(star24_half)
        &.off
          bg-image(star24_off)
</style>
