<template>
  <div class="list">
    <ul>
      <li v-for="(support,index) in supports" :key="index">
        <v-icon class="icon" size="2" :type="support.type"></v-icon>
        <span class="text" :style="{color: color}">{{support.content}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import icon from "components/icon/icon"
  export default {
    name: 'list',
    props:{
      supports:Array,
      color:String
    },
    components:{
      "v-icon":icon
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .list
    width 80%
    margin 0 auto
    box-sizing border-box
    margin-top 24px
    margin-bottom 28px
    padding 0 12px
    & > ul
      & > li
        display flex
        align-items center
        margin-bottom 12px
        &:last-child
          margin-bottom 0
        .icon
          margin-right 6px
        .text
          font-size 12px
          line-height 12px
          color rgba(255,255,255,1)
          font-weight 200
</style>
