import Vue from 'vue';
import Toast from './Toast.vue';

let toastInstance;
let vm;

export default (args) => {
    let msg = null;
    let time = 3000;

    if (typeof args === 'string') {
        msg = args;
    } else if (typeof args === 'object' && typeof args !== null) {
        msg = args.msg;
        time = args.time || time;
    }

    if (!msg) {
        return;
    }

    if (!toastInstance) {
        toastInstance = Vue.extend({
            data() {
                return {
                    visible: false,
                    msg: '',
                }
            },
            render(h) {
                const self = this;
                return h(Toast, {
                    props: {
                        value: this.visible,
                        msg: this.msg,
                    },
                    on: {
                        changeVisible(val) {
                            self.visible = val;
                        }
                    }
                });
            }
        });

        vm = new toastInstance().$mount();

        document.body.appendChild(vm.$el);
    }

    vm.$nextTick(() => {
        vm.msg = msg;
        vm.visible = true;

        setTimeout(() => {
            vm.visible = false;
        }, time);
    });

    return vm;
}