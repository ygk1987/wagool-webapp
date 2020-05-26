<template>
  <div class="stars" :class="`stars-${size}`">{{length}}
    <div class="star" :class="item" :style="{marginRight:`${mr}px`}"
      v-for="(item,index) in scoreArr" :key="index"></div>
  </div>
</template>

<script>
export default {
  name: 'stars',
  props: {
    mr:String,
    size: String,
    score:Number, //根据分数去计算出5颗星星的状态
    length:Number
  },
  computed:{//一个数据依赖另外一个数据,要能立刻想到计算属性computed
    scoreArr(){
      //1.边界情况的处理
      if(this.score === undefined) return ["off","off","off","off","off"]
      if(this.score < 0) return ["off","off","off","off","off"]
      if(this.score > 5) return ["on","on","on","on","on"]
      
      let arr = [];
      //处理分数,让得到的分数更精确,3.4 -> 3 ; 3.8 ->3.5
      let score = Math.floor(this.score * 2) / 2;
      //满星的数量
      let fullSize  = Math.floor(score);
      //是否需要半星
      let needHalf =  (score % 1) === 0 ? false : true
      
      //把经过处理的分数score,构建评星对应的数组
      for(var i = 0; i < fullSize; i++){
        arr.push("on");
      }
      if(needHalf) arr.push("half")
      while(arr.length < this.length){
        arr.push("off");
      }
      //返回构建评星后对应的数组
      return arr;
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
