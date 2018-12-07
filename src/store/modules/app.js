import Cookies from 'js-cookie'
import {constantRouteMap} from '@/router'

const pkg = require('../../../package');

const App = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        routers: constantRouteMap,
        addRouters: [],
        //popURL: pkg.popURL
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened;
            state.sidebar.withoutAnimation = false;
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1);
            state.sidebar.opened = false;
            state.sidebar.withoutAnimation = withoutAnimation;
        },
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            ///state.routers = constantRouteMap.concat(routers)
        }
    },
    actions: {
        ToggleSidebar: ({commit}) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar: ({commit}, withoutAnimation) => {
            commit('CLOSE_SIDEBAR', withoutAnimation)
        },
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                commit('SET_ROUTERS', data);
                resolve()
            })
        }
    }
};

export default App

