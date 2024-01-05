<template>
    <div :class="$style.wrap">
        <!-- 购物车无数据提示 -->
        <div :class="$style.emptyMsg" v-if="!hasCartData">
            购物车中暂无数据，
            <router-link :to="{ name: 'listIndex' }">
                前往列表中选购商品
            </router-link>
        </div>

        <!-- 购物车列表 -->
        <div :class="$style.main" v-if="hasCartData">
            <ul>
                <li
                    v-for="item of cartDataList"
                    :key="item.goodSn"
                    :class="$style.cartItem">
                    <GoodsCard :data="item">
                        <div :class="$style.operaWrap">
                            <InputNumber
                                v-model="item.qty"
                                @inputChange="onNumChange(item, $event)"
                                :max="item.salesStock"
                                @add="onNumChange(item, $event)"
                                @sub="onNumChange(item, $event)">
                            </InputNumber>
                            <a
                                href="javascript:;"
                                @click="delItem(item)"
                                :class="$style.btnDel">
                                删除
                            </a>
                        </div>
                    </GoodsCard>
                </li>
            </ul>
        </div>

        <!-- 购物车汇总 -->
        <div :class="$style.sideInfo" v-if="hasCartData">
            <h3>Order Summary ({{ subTotal.qty }} items)</h3>
            <ul :class="$style.list">
                <li>
                    <label>Subtotal:</label>
                    <span>{{ $c(subTotal.total) }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { data as goodsAllData } from '@/mock/product-new.json';
    import { data as recommendAllData } from '@/mock/recommend-new.json';
    import GoodsCard from '@comBusi/GoodsCard/GoodsCard2.vue';
    import InputNumber from '@comBase/InputNumber.vue';

    export default {
        name: 'PageCart',

        components: {
            GoodsCard,
            InputNumber,
        },

        computed: {
            // 所有数据
            allGoodsData() {
                // 混合搜索列表和推荐列表数据
                const concatList = goodsAllData.concat(recommendAllData);
                const ids = [];

                return concatList.filter((item) => {
                    if (ids.includes(item.goodSn)) {
                        // 排除重复的
                        return false;
                    } else {
                        ids.push(item.goodSn);
                        return true;
                    }
                });
            },

            // 购物车基础数据，只含 sku 和 qty
            cartBaseList() {
                return this.$store.getters.cartList;
            },

            // 购物车完整数据
            cartDataList() {
                return this.cartBaseList.map((baseItem) => {
                    const dataItem = this.allGoodsData.find(
                        (item) => baseItem.goodSn === item.goodSn
                    );
                    dataItem.qty = baseItem.qty;
                    return dataItem;
                });
            },

            // 合计
            subTotal() {
                return this.cartDataList.reduce(
                    (prevObj, curItem) => {
                        prevObj.total = this.$calc.add(
                            prevObj.total,
                            this.$calc.mult(curItem.shopPrice, curItem.qty)
                        );
                        prevObj.qty += curItem.qty;
                        return prevObj;
                    },
                    { total: 0, qty: 0 }
                );
            },

            hasCartData() {
                return this.cartBaseList.length;
            },
        },

        methods: {
            // 加购数量变化时
            onNumChange(item, updateQty) {
                this.$store.commit('updateItem', {
                    qty: updateQty,
                    goodSn: item.goodSn,
                });
            },

            // 删除一项
            delItem(item) {
                this.$confirm('确认要删除这项吗？')
                    .then(() => {
                        this.$store.commit('deleteItem', {
                            goodSn: item.goodSn,
                        });
                    })
                    .catch((e) => {});
            },
        },
    };
</script>

<style module>
    .wrap {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-top: 30px;
    }

    .emptyMsg {
        flex-grow: 1;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 360px;
        color: #999;
        a {
            color: #06b;
        }
    }

    .main {
        flex-grow: 1;
        margin-right: 30px;
    }
    .cartItem {
        & + .cartItem {
            margin-top: 20px;
        }
    }

    .sideInfo {
        flex-shrink: 0;
        width: 360px;
        min-height: 360px;
        padding: 20px 30px;
        background-color: #fff;
        .list {
            li {
                margin-top: 20px;
                label {
                    color: #999;
                    margin-right: 10px;
                }
            }
        }
    }

    .operaWrap {
        margin-top: 15px;
    }

    .btnDel {
        margin-left: 20px;
        color: #06b;
        font-size: 14px;
    }
</style>
