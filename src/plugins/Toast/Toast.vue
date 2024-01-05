<template>
    <transition name="fade">
        <div :class="$style.wrap" v-show="visible">
            <div :class="$style.modal" @click="modalClose"></div>
            <div :class="$style.content">
                <div>
                    {{ msg }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    /**
     * 消息框
     */
    export default {
        name: 'PluginToast',

        props: {
            msg: {
                type: String,
                default: 'unknow msg',
            },
            value: {
                type: Boolean,
                default: false,
            },
        },

        computed: {
            visible: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('changeVisible', val);
                },
            },
        },

        methods: {
            close() {
                this.visible = false;
            },
            modalClose() {
                this.visible = false;
            },
        },
    };
</script>

<style module>
    .wrap {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 22;
        display: flex;
        width: 100%;
        height: 100%;
        color: #fff;
    }

    .modal {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .content {
        position: fixed;
        z-index: 3;
        inset: 0;
        display: flex;
        flex-direction: column;
        margin: auto;
        padding: 16px;
        width: fit-content;
        height: fit-content;
        width: -webkit-fit-content;
        min-width: 120px;
        max-width: 220px;
        background-color: rgba(0, 0, 0, 0.7);
        text-align: center;
        border-radius: 5px;
    }

    .btnWrap {
        margin-top: 5px;
        flex-shrink: 0;
        text-align: center;
    }
</style>
