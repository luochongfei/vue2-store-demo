import Vue from 'vue';
import Vuex from 'vuex';
import StorageCartList from './storageCartList.js';

Vue.use(Vuex);


const state = {
    cartList: StorageCartList.get() || [],
};

const getters = {
    cartList(state) {
        return state.cartList
    },
    cartCount(state, b) {
        console.log(state.cartList);
        return state.cartList.reduce((prev, cur) => prev + cur.qty, 0);
    }
};

const mutations = {
    addItem(state, payload) {
        const hasIndex = state.cartList.findIndex(item => item.goodSn === payload.goodSn);

        if (hasIndex >= 0) { // 存在时，只更新数量
            state.cartList[hasIndex].qty += payload.qty;
        } else {
            state.cartList.push(payload);
        }
        console.log(state.cartList, payload)

        StorageCartList.set(state.cartList);
    },

    updateItem(state, payload) {
        const hasIndex = state.cartList.findIndex(item => item.goodSn === payload.goodSn);

        if (hasIndex >= 0) { // 存在时，只更新数量
            state.cartList[hasIndex].qty = payload.qty;
        }

        StorageCartList.set(state.cartList);
    },

    deleteItem(state, payload) {
        const hasIndex = state.cartList.findIndex(item => item.goodSn === payload.goodSn);
        if (hasIndex >= 0) { // 存在时，删除
            state.cartList.splice(hasIndex, 1);
            StorageCartList.set(state.cartList);
        }
    }
};

const actions = {
    addItemAsync({ commit }) {
        setTimeout(() => {
            commit('addItem')
        }, 1200);
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});
