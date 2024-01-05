<template>
    <div :class="$style.wrap">
        <GoodsCard
            v-for="item of goodsList"
            :key="item.id"
            :data="item"
            :class="$style.item">
        </GoodsCard>
    </div>
</template>

<script>
    import recommendData from '@/mock/recommend-new.json';
    import GoodsCard from './GoodsCard/GoodsCard1.vue';

    // 推荐位
    export default {
        name: 'RecommendList',
        props: {
            goodSn: {
                type: String,
                required: true,
            },
        },
        components: {
            GoodsCard,
        },
        data() {
            return {
                goodsList: [],
            };
        },
        created() {
            // const query = new URLSearchParams({
            //     bizType: "goods_detail",
            //     goodSn: "Q592424600D20J0GPV0",
            //     uDate: 0,
            // });
            // this.promiseData = fetch(
            //     "/api/recommend/buy-and-buy?=" + query
            // ).then((res) => {
            //     return res.json();
            // });
        },
        mounted() {
            // this.promiseData.then((res) => {
            this.goodsList = recommendData.data;
            // });
        },
    };
</script>

<style module>
    .wrap {
        display: flex;
        overflow-x: auto;
        padding-bottom: 20px;
    }
    .item {
        & + .item {
            margin-left: 20px;
        }
    }
</style>
