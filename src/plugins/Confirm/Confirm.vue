<template>
    <div :class="$style.wrap" v-show="state">
        <div :class="$style.modal"></div>

        <div :class="$style.box">
            <div :class="$style.body">
                <div v-if="$slots.default" :class="$style.customMsg">
                    <slot></slot>
                </div>
                <div v-else :class="$style.defaultMsg">
                    {{ msg }}
                </div>
            </div>

            <div :class="$style.footer">
                <button :class="$style.cancel" @click="onCancel">Cancel</button>
                <button :class="$style.confirm" @click="onConfirm">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PluginConfirm',

        props: {
            msg: {
                type: [String, Object],
                default: '',
            },
            state: {
                type: Boolean,
                default: true,
            },
        },

        methods: {
            onConfirm() {
                this.$emit('confirm');
            },

            onCancel() {
                this.$emit('cancel');
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
        margin: auto;
    }

    .modal {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .box {
        position: absolute;
        margin: auto;
        z-index: 3;
        inset: 0;
        display: flex;
        flex-direction: column;
        min-width: 360px;
        max-width: 500px;
        width: fit-content;
        height: fit-content;
        background-color: #fff;
    }

    .body {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px 30px;
        min-height: 120px;
    }
    .footer {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        padding: 16px 30px;
        border-top: 1px solid #f4f4f4;
        button {
            background: none;
            border: none;
            padding: 12px 28px;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
            transition: all 0.26s ease;
            &.confirm {
                background-color: #f85d18;
                color: #fff;
                &:hover {
                    background-color: #e44d0c;
                }
            }
            &.cancel {
                background-color: #eee;
                color: #999;
                &:hover {
                    background-color: #ddd;
                }
            }
            & + button {
                margin-left: 20px;
            }
        }
    }
</style>
