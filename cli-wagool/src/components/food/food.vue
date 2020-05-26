<template>
    <div class="food">
        <div class="avatar">
            <img :src="food.image">
        </div>
        <div class="info">
            <span class="foodName">{{food.name}}</span>
            <span class="desc">{{food.description}}</span>
            <span class="ratings">
                <span class="count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </span>
            <span class="prices">
                <span class="newPrice">￥{{food.price}}</span>
                <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </span>
        </div>
        <v-control :food="food"></v-control>
    </div>
</template>

<script>
    import control from "components/control/control";
    export default {
        name: "food",
        props:{
            food:Object
        },
        components:{
            "v-control":control
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .food
        display inline-flex
        .avatar
            margin-right 10px
            width 64px
            height 64px
            flex 0 0 64px
            img
                width 100%
                height 100%
        .info
            font-size 10px
            line-height 10px
            color rgba(147,153,159,1)
            flex 1
            display flex
            flex-direction column
            .foodName
                font-size 14px
                line-height 14px
                color rgba(7,17,27,1)
                margin-top 2px
                margin-bottom 8px
            .desc
                margin-bottom 8px
            .ratings
                margin-bottom 8px
                .count
                    margin-right 12px
            .prices
                margin-bottom 8px
                .newPrice
                    color red
                    font-size 14px
                    font-weight 700
                    margin-right 8px
                .oldPrice
                    text-decoration line-through
        .contorl
            flex 0 0 0
            position absolute
            right 18px
            bottom 10px
</style>