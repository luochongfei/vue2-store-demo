<template>
    <div :class="$style.wrap">
        <router-link
            :class="$style.goodsLink"
            :to="{ name: 'productIndex', params: { sku: data.goodSn } }">
            <img :src="data.mainImage" alt="" :class="$style.goodsImg" />
        </router-link>

        <div :class="$style.infoWrap">
            <h3 :class="$style.title" :title="data.goodTitle">
                <router-link
                    :class="$style.goodsLink"
                    :to="{
                        name: 'productIndex',
                        params: { sku: data.goodSn },
                    }">
                    {{ data.goodTitle }}
                </router-link>
            </h3>

            <div :class="$style.qty">Qty: {{ data.qty }}</div>

            <div :class="$style.priceWrap">
                <span :class="$style.shopPrice">{{ $c(data.shopPrice) }}</span>
            </div>

            <div :class="$style.buySlots">
                <slot :data="data"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoodsCard2',
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
        position: relative;
        background-color: #fff;
        padding: 20px;
        transition: all 0.26s ease;
        &:hover {
            box-shadow: 0 2px 11px rgba(0, 0, 0, 0.13);
        }
    }
    .goodsLink {
        flex-shrink: 0;
        width: 120px;
    }
    .goodsImg {
        max-width: 100%;
        max-height: 100%;
        display: block;
        width: 100%;
    }

    .infoWrap {
        flex-grow: 1;
        margin-left: 15px;
    }
    .title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        font-weight: normal;
        a {
            text-decoration: none;
            color: #222;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .priceWrap {
        margin-top: 10px;
        font-weight: bold;
        font-size: 20px;
    }
    .qty {
        margin-top: 16px;
        color: #999;
        font-size: 14px;
    }
</style>
