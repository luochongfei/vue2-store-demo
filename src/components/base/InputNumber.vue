<template>
    <div :class="$style.wrap" :style="{ width: `${width}px` }">
        <button @click="sub" :class="$style.btn">-</button>
        <input
            type="text"
            inputmode="numeric"
            :value="currentVal"
            :class="$style.input"
            @change="handleInput" />
        <button @click="add" :class="$style.btn">+</button>
    </div>
</template>

<script>
    /**
     * 数量控件40
     */
    export default {
        name: 'InputNumber',

        props: {
            value: {
                type: [String, Number],
                default: 1,
            },
            min: {
                type: Number,
                default: 1,
            },
            max: {
                type: Number,
                default: 100,
            },
            width: {
                type: Number,
                default: 130,
            },
        },

        data() {
            return {
                currentVal: this.value,
            };
        },

        methods: {
            emitInput() {
                this.$emit('input', Number(this.currentVal));
            },

            handleInput(e) {
                const inputVal = e.target.value;

                if (inputVal < this.min) {
                    this.currentVal = this.min;
                } else if (inputVal > this.max) {
                    this.currentVal = this.max;
                } else if (parseInt(inputVal)) {
                    this.currentVal = parseInt(inputVal);
                } else {
                    this.currentVal = this.min;
                }

                this.$nextTick(() => {
                    e.target.value = this.currentVal;
                    this.$emit('inputChange', this.currentVal);
                });
            },

            add() {
                if (this.currentVal < this.max) {
                    this.currentVal++;
                    this.emitInput();
                    this.$emit('add', this.currentVal);
                }
            },

            sub() {
                if (this.currentVal > this.min) {
                    this.currentVal--;
                    this.emitInput();
                    this.$emit('sub', this.currentVal);
                }
            },
        },

        watch: {
            value(v) {
                this.currentVal = v;
            },
        },
    };
</script>

<style module>
    .wrap {
        display: inline-flex;
        font-size: 15px;
    }
    .btn {
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        font-size: 18px;
    }
    .input {
        margin: 0 5px;
        flex-grow: 1;
        width: 100%;
        text-align: center;
    }
</style>
