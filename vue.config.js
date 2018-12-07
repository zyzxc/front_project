module.exports = {
    baseUrl: process.env.NODE_ENV === 'production' ? '/vqz/' : '/',
    devServer: {
        proxy: {
            '/qzConsole': {
                target: 'http://qz.chinaacc.com',
                ws: true,
                changeOrigin: true
            }
        },
        disableHostCheck: true
    },
    lintOnSave: false
};
