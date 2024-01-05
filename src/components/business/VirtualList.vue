<template>
    <div
        :class="$style.container"
        :style="{ height: containerHeight }"
        @scroll="handleScroll"
        ref="container">
        <div :class="$style.list" :style="{ top: listTop }">
            <div
                v-for="item in showData"
                :key="item.id"
                :style="{ height: size + 'px' }">
                {{ item.content }}
            </div>
            <div :class="$style.bar" :style="{ height: barHeight }"></div>
        </div>
    </div>
</template>

<script>
    function debounce(fn, sec = 16) {
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fn, sec);
        };
    }
    export default {
        name: "VirtualList",
        props: {
            items: Array,
            size: Number,
            shownumber: Number,
        },
        data() {
            return {
                start: 0,
                end: this.shownumber,
            };
        },
        created() {
            const self = this;
            this.handleScroll = debounce(function () {
                const scrollTop = self.$refs.container.scrollTop;

                self.start = Math.floor(scrollTop / self.size);
                self.end = self.start + self.shownumber;
            }, 30);
        },
        mounted() {
            console.log(this.items);
        },
        computed: {
            showData() {
                return this.items.slice(this.start, this.end);
            },
            containerHeight() {
                return this.size * this.shownumber + "px";
            },
            barHeight() {
                return this.size * this.items.length + "px";
            },
            listTop() {
                return this.start * this.size + "px";
            },
        },
    };
</script>

<style module>
    .container {
        overflow-y: scroll;
        background-color: #09c;
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        width: 500px;
        margin: 0 auto;
        position: relative;
        text-align: center;
    }

    .list {
        position: absolute;
        top: 0;
        width: 100%;
    }
</style>
