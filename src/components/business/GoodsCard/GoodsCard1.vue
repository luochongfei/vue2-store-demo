<template>
    <div :class="$style.wrap">
        <router-link
            :class="$style.goodsLink"
            :to="{ name: 'productIndex', params: { sku: data.goodSn } }">
        </router-link>

        <img :src="data.mainImage" alt="" />

        <h3 :class="$style.title">
            {{ data.goodTitle }}
        </h3>

        <div :class="$style.priceWrap">
            <span :class="$style.shopPrice">{{ $c(data.shopPrice) }}</span>
        </div>

        <div :class="$style.buySlots">
            <slot name="buySlots" :data="data"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoodsCard1',
        props: {
            data: {
                type: Object,
                required: true,
            },
        },
        created() {
            // console.log(this.data, "ccc");
        },
    };
</script>

<style module>
    .wrap {
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 30px 20px;
        min-height: 360px;
        background-color: #fff;
        transition: all 0.26s ease;
        &:hover {
            box-shadow: 0 2px 11px rgba(0, 0, 0, 0.13);
        }
    }
    .goodsLink {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .panel {
        position: relative;
        z-index: 2;
    }
    .title {
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        font-weight: normal;
        :hover {
            text-decoration: underline;
        }
    }
    .priceWrap {
        margin-top: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    .buySlots {
        position: relative;
    }
</style>
