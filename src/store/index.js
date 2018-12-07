import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tagsView from './modules/tagsView'
import app from './modules/app'

Vue.use(Vuex)

const Store = new Vuex.Store({
    modules: {
        tagsView,
        app
    },
    getters
});

export default Store
