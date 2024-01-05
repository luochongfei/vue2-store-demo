<template>
    <div>
        <VirtualList :items="items" :size="60" :shownumber="10"></VirtualList>
    </div>
</template>

<script>
    import VirtualList from "@comBusi/VirtualList.vue";

    export default {
        name: "PageTest",
        components: {
            VirtualList,
        },
        computed: {
            items() {
                return Array(10000)
                    .fill("")
                    .map((item, index) => ({
                        id: index,
                        content: "列表数据" + index,
                    }));
            },
        },
    };
</script>

<style module></style>
