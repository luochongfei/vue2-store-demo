import Vue from 'vue';
import Confirm from './Confirm.vue';

export default (msg) => {
    return new Promise((resolve, reject) => {
        console.log(msg)
        const ConfirmContructor = Vue.extend({
            data() {
                return {
                    visible: true,
                };
            },
            render(h) {
                const self = this;
                return h(Confirm, {
                    props: {
                        msg,
                        state: this.visible
                    },
                    on: {
                        confirm() {
                            self.visible = false;
                            resolve();
                        },
                        cancel() {
                            self.visible = false;
                            reject();
                        }
                    }
                }, [
                    typeof msg === 'object' && msg
                ]);
            }
        });

        const vm = new ConfirmContructor().$mount();

        document.body.appendChild(vm.$el);
    });
}