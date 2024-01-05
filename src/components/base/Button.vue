<template>
    <div>
        <button
            :class="[
                $style.btn,
                { [$style.btnBlock]: isBlock },
                { [$style.btnPrimary]: isPrimary },
                { [$style.btnDark]: isDark },
            ]"
            v-on="this.$listeners">
            <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'CompButton',
        inheritAttrs: false, // 不显示继承父级属性
        data() {
            const attrs = this.$attrs;
            const typeList = attrs.type?.split(' ');

            return {
                isBlock: typeList.includes('block'),
                isPrimary: typeList.includes('primary'),
                isDark: typeList.includes('dark'),
            };
        },
        created() {
            // console.log(this.$attrs, this.$listeners);
        },
    };
</script>

<style module>
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 230px;
        height: 44px;
        border: none;
        color: #fff;
        font-size: 16px;
        font-weight: bold;
        transition: all 0.26s ease;
        cursor: pointer;
    }
    .btnPrimary {
        background-color: #f85d18;
        &:hover {
            background-color: #e44d0c;
        }
    }
    .btnDark {
        background-color: #202020;
        &:hover {
            background-color: #343333;
        }
    }

    .btnBlock {
        width: 100%;
    }
</style>
