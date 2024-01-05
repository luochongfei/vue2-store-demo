<template>
    <div :class="$style.wrap">
        <div :class="$style.listWrap">
            <GoodsCard
                v-for="item of goodsList"
                :key="item.goodSn"
                :data="item">
                <template #buySlots="{ data }">
                    <div :class="$style.btnWrap">
                        <ComButton
                            type="primary block"
                            @click="addToCart(item)">
                            Add to cart
                        </ComButton>
                    </div>
                </template>
            </GoodsCard>
        </div>
    </div>
</template>

<script>
    import goodsData from '@/mock/recommend-new.json';
    import GoodsCard from '@comBusi/GoodsCard/GoodsCard1.vue';
    import ComButton from '@comBase/Button.vue';

    export default {
        name: 'PageList',

        components: {
            GoodsCard,
            ComButton,
        },

        data() {
            return {
                promiseData: null,
                goodsList: [],
            };
        },

        mounted() {
            this.goodsList = goodsData.data;
        },

        methods: {
            addToCart(item) {
                this.$store.commit('addItem', {
                    qty: 1,
                    goodSn: item.goodSn,
                });

                this.$toast('加购成功！');
            },
        },
    };
</script>

<style module>
    .wrap {
        margin: 40px auto;
    }
    .listWrap {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        gap: 20px;
    }
    .btnWrap {
        margin-top: 20px;
    }
</style>
