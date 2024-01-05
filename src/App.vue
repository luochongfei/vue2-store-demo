<template>
    <div :class="$style.wrap">
        <Header :class="$style.header"></Header>
        <router-view :class="[$style.content, 'safe-mid']"></router-view>
        <Footer :class="$style.footer"></Footer>
    </div>
</template>

<script>
    import Header from '@comBusi/Header.vue';
    import Footer from '@comBusi/Footer.vue';

    export default {
        name: 'App',
        components: {
            Header,
            Footer,
        },
    };
</script>

<style module>
    @import url('@assets/base.css');
    .wrap {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .header {
        flex-shrink: 0;
        background-color: #fff;
    }

    .content {
        flex-grow: 1;
    }

    .footer {
        flex-shrink: 0;
        height: 30px;
        text-align: center;
        color: #aaa;
    }
</style>
