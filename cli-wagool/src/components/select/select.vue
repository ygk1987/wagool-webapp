<template>
  <div class="ratings-filter">
    <div class="rating-type border-1px">
      <span class="block" :class="{active: type === 2}" @click="changeType(2)">
        全部<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block" :class="{active: type === 0}" @click="changeType(0)">
        推荐<span class="count">{{ratings.filter(rating => rating.rateType === 0).length}}</span>
      </span>
      <span class="block" :class="{active: type === 1}" @click="changeType(1)"> 
        吐槽<span class="count">{{ratings.filter(rating => rating.rateType === 1).length}}</span>
      </span>
    </div>
    <div class="switch" :class="{on:hasText}">
      <span class="iconfont icon-check_circle" @click="changeHasText"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'v-select',
    props:{
      type: Number,
      hasText: Boolean,
      ratings:Array
    },
    methods:{
      changeType(type){
        this.$emit("changeType",type);
      },
      changeHasText(){
        this.$emit("changeHasText");
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .ratings-filter
    .rating-type
      padding: 18px 0
      margin: 0 18px
      one-px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        background: rgba(77, 85, 93, 0.2)
        &.active
          background: green
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: green
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>


