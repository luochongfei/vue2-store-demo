import toast from './Toast/index.js';
import calc from './calc.js'
import confirm from './Confirm/index.js';

export default {
    install(Vue) {
        // 价格
        Vue.prototype.$c = function (val) {
            return `$${val}`;
        }

        // 消息框
        Vue.prototype.$toast = toast;

        // 计算
        Vue.prototype.$calc = calc;

        // 确认弹框
        Vue.prototype.$confirm = confirm;
    }
}