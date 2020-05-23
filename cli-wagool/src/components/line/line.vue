<template>
  <div class="line">
    <div class="left"></div>
    <slot>
      <span class="text">default</span>
    </slot>
    <div class="right"></div>
  </div>
</template>

<script>
  export default {
    name: 'v-line',
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .line
    display flex
    align-items center
    .left
      flex 1
      height 1px
      background rgba(255,255,255,.2)
    .text
      margin 0 12px
      font-size 14px
      font-weight 700
      color rgba(255,255,255,1)
    .right
      flex 1
      height 1px
      background rgba(255,255,255,.2)
</style>
