
module.exports = { 
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        https: false,
        hotOnly: false, // 热更新
        proxy: {
           '/weibo': {
               target: 'http://192.168.20.116:3333',
                changeOrigin: true,
                secure: false,
                // pathRewrite: {
                // // 如果接口本身没有api的路径，那么这里将发送到后端的请求重写为没有api的路径
                //   '^/weibo': ''
                // },

           }
        }
    }
}