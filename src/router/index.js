import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        // 如果有 savedPosition，直接返回，表示之前浏览器有记忆的滚动位置
        if (savedPosition) {
            return savedPosition;
        }
        // 否则，滚动到页面顶部
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/list',
            name: 'listIndex',
            component: () => import('@views/list/Index.vue'),
        },
        {
            path: '/product/:sku',
            name: 'productIndex',
            component: () => import('@views/product/Index.vue')
        },
        {
            path: '/cart',
            name: 'cartIndex',
            component: () => import('@views/cart/Index.vue')
        },
        {
            path: '/test',
            name: 'testIndex',
            component: () => import('@views/test/Index.vue')
        },
        {
            path: '/404',
            name: 'notFound',
            component: () => import('@views/other/404.vue')
        }
    ],
});

// 路由守卫：跳转之前
router.beforeEach((to, from, next) => {
    console.log(`来自：${from.path}, 要去往${to.path}`);

    // 未匹配到路由，重定向到404
    if (!to.matched.length) {
        next('/404')
    }

    next();
});


export default router;
