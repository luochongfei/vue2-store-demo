<template>
    <div>
        <div :class="$style.base">
            <div :class="$style.img">
                <img :src="goodsData.mainImage" alt="" />
            </div>
            <div :class="$style.info">
                <h1 :class="$style.title">
                    {{ goodsData.goodTitle }}
                </h1>

                <p :class="$style.intro">
                    3-in-1 Fiber Holder: Our fiber fusion splicer machine is
                    suitable for SM, MM, bare fiber, pigtail, rubber-insulated,
                    multi fiber cable; Splice Loss: SM(0.02db); MM(0.01db);
                    DS(0.04db); NZDS(0.04db).
                </p>

                <div :class="$style.priceWrap">
                    {{ $c(goodsData.shopPrice) }}
                </div>

                <div :class="$style.qtyWrap">
                    <InputNumber v-model="qty" :max="goodsData.salesStock">
                    </InputNumber>
                    <span
                        :class="$style.instock"
                        v-if="goodsData.salesStock > 5">
                        In Stock
                    </span>
                </div>

                <div :class="$style.buyWrap">
                    <ComButton
                        type="primary"
                        :class="$style.btn"
                        @click="addToCart">
                        Add To Cart
                    </ComButton>
                    <!-- <ComButton type="dark" :class="$style.btn" @click="buyNow">
                        Buy Now
                    </ComButton> -->
                </div>
            </div>
        </div>

        <div :class="$style.recommend">
            <h2 :class="$style.panelTitle">Recommend</h2>
            <RecommendList :goodSn="goodSn"></RecommendList>
        </div>

        <div :class="$style.desc">
            <h2 :class="$style.panelTitle">Describe</h2>
            <img
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                v-for="(item, index) of descImgList"
                :key="index"
                v-lazy="item" />
        </div>
    </div>
</template>

<script>
    import proImg from '@assets/img/pro1.jpg';
    import ComButton from '@comBase/Button.vue';
    import InputNumber from '@comBase/InputNumber.vue';
    import RecommendList from '@comBusi/RecommendList.vue';

    import { data as goodsAllData } from '@/mock/product-new.json';
    import { data as recommendAllData } from '@/mock/recommend-new.json';

    export default {
        name: 'PageProduct',
        components: {
            ComButton,
            InputNumber,
            RecommendList,
        },
        data() {
            return {
                proImg,
                qty: 1,
                goodSn: this.$route.params.sku,
                descImgList: [
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-a100-1.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-a100-1.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-1.2.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-2.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-3.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-4.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-5.jpg',
                    'https://d2qc09rl1gfuof.cloudfront.net/product/PQFJYNF-300-2T001/exhaust-fan-m100-6.jpg',
                ],
            };
        },
        directives: {
            lazy(el, binding, vnode) {
                el.setAttribute('src', binding.value);
                el.style.maxWidth = '80%';
            },
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

            goodsData() {
                return this.allGoodsData.find(
                    (item) => item.goodSn === this.goodSn
                );
            },
        },
        beforeCreate() {
            console.log('商详:beforeCreate', this, this.$el, this.$data);
        },
        created() {
            console.log('商详:created', this, this.$el, this.$data);
            this.goodSn = this.$route.params.sku;
        },
        beforeMount() {
            console.log('商详:beforeMount', this, this.$el, this.$data);
        },
        mounted() {
            console.log('商详:mounted', this, this.$el, this.$data);
        },
        methods: {
            addToCart() {
                this.$toast({ msg: '加购成功！' });
                this.$store.commit('addItem', {
                    qty: this.qty,
                    goodSn: this.goodSn,
                });
            },
            buyNow() {
                this.$toast({ msg: '立即购买' });
            },
        },
        activated() {
            console.log('进入商详', this.$route.params.sku);
        },
        deactivated() {
            console.log('离开商详');
        },
        beforeRouteEnter(to, from, next) {
            console.log('商详:beforeRouteEnter');
            next();
        },
        beforeRouteUpdate(to, from, next) {
            console.log('商详:beforeRouteUpdate', this.$route.params.sku);
            next();
            this.goodSn = this.$route.params.sku;
        },
        beforeRouteLeave(to, from, next) {
            console.log('商详:beforeRouteLeave');
            next();
        },
    };
</script>

<style module>
    .panelTitle {
        margin-top: 40px;
        margin-bottom: 10px;
        line-height: 30px;
    }
    .base {
        margin: 40px auto;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        .img {
            flex-shrink: 0;
            width: 500px;
            img {
                width: 100%;
            }
        }
    }

    .info {
        margin-left: 60px;
        flex-grow: 1;
    }
    .title {
        font-size: 24px;
    }
    .intro {
        font-size: 14px;
        color: #999;
    }
    .priceWrap {
        margin: 10px 0;
        font-size: 40px;
        font-weight: bold;
    }

    .instock {
        margin-left: 20px;
        color: #04a534;
        font-weight: bold;
    }

    .buyWrap {
        margin: 25px 0;
        .btn + .btn {
            margin-top: 16px;
        }
    }

    .desc {
        background-color: #fff;
    }
</style>
