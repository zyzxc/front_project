import Vue from "vue";
import Router from "vue-router";
import Layout from '@/views/Layout/index.vue';


Vue.use(Router);

export const constantRouteMap = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        hidden: true,
        redirect: 'home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/Home.vue'),
                meta: {title: '首页'}
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@/views/Login.vue'),
        hidden: true
    },
    {
        path: "/index",
        name: "Layout",
        component: Layout
    },
    {
        path: '/user',
        component: Layout,
        name: 'USER',
        meta: {title: '用户信息管理'},
        children: [
            {
                path: 'baseInfo',
                name: 'baseInfo',
                meta: {title: '基本信息'},
                component: () => import('@/views/User/baseInfo.vue')
            }
        ]
    }
]

export default new Router({
    routes: constantRouteMap
});
