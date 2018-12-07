const getters = {
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    getAllRouters: state => state.app.routers,
    addRouters: state => state.app.addRouters,
};


export default getters
