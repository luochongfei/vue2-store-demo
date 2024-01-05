<template>
    <div :class="$style.wrap">
        <div :class="['safe-mid', $style.container]">
            <router-link :to="{ path: '/list' }">
                <img :src="logo" alt="" width="40" />
            </router-link>
            <ul :class="$style.nav">
                <li>
                    <router-link :to="{ name: 'listIndex' }"
                        >列表页
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'cartIndex' }"
                        >购物车页
                        <em :class="$style.cartCount">{{ cartCount }}</em>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import logo from '@assets/img/logo.png';

    export default {
        name: 'CompHeader',

        data() {
            return { logo };
        },

        computed: {
            cartCount() {
                return this.$store.getters.cartCount;
            },
        },
    };
</script>

<style module>
    .wrap {
        height: 120px;
    }
    .container {
        display: flex;
        align-items: center;
        height: 120px;
    }
    .nav {
        display: flex;
        margin-left: 30px;
        a {
            margin-right: 30px;
            text-decoration: none;
            color: #000;
            font-weight: bold;
            position: relative;
        }
        :global(.router-link-exact-active) {
            color: #f85d18;
        }
    }

    .cartCount {
        position: absolute;
        left: calc(100% - 4px);
        top: -5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5px;
        min-width: 20px;
        height: 20px;
        width: fit-content;
        background-color: #f85d18;
        border-radius: 20px;
        color: #fff;
        font-style: normal;
        font-size: 14px;
        font-weight: normal;
    }
</style>
