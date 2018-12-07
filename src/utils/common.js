import router from '@/router'
import {Loading} from "element-ui";
import {getToken} from "./cookies";
import Layout from '@/views/Layout'
import store from "@/store";
import {getStorage, setStorage, removeStorage} from "./cookies";


const _import = file => () => import('@/views/' + file);
const whiteList = '/login';
let loadingOpt = {
    fullscreen: true,
    lock: true,
    text: '正在加载，请稍候..',
    background: 'rgba(0, 0, 0, 0.7)'
};

router.beforeEach(((to, from, next) => {

    if (getToken()) {

        if (to.path === '/login') {
            next({path: '/'});
        } else {
            next()
        }
        if (!getStorage('frontRouters')) {
            let getRouter;
            let loadingInstance = Loading.service(loadingOpt);
            getRouter = router.options.routes;
            routerGo(to, next, getRouter)
            //存储路由到localStorage
            setStorage('frontRouters', getRouter);
            setTimeout(function () {
                loadingInstance.close()
            }, 1000);
            /*request.get('/qzConsole/menuVue').then(res => {
              res = res.data;
              if (res.success) {
                getRouter = res.result;
                //存储路由到localStorage
                setStorage('menuRouters', getRouter);
                setTimeout(function () {
                  loadingInstance.close()
                }, 1000);
                //执行路由跳转方法
                routerGo(to, next, getRouter);
              } else {
                getRouter = getStorage('menuRouters');
                routerGo(to, next, getRouter)
              }
            })*/
        } else {
            if (store.getters.addRouters.length <= 0) {
                routerGo(to, next, getStorage('frontRouters'))
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            //next('/')
            next('/login');
        }
    }
}));


const routerGo = (to, next, getRouter) => {
    let newRouters = filterAsyncRouter(getRouter);
    //动态添加路由
    store.dispatch('GenerateRoutes', newRouters).then(() => {
        router.addRoutes(store.getters.addRouters);
        next({...to, replace: true})
    })
};

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = asyncRouterMap => {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout
            } else {
                route.component = _import(route.component)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children)
        }
        return true
    });
};
