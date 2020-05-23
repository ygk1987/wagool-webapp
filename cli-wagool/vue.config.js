//这里配置是vue脚手架cli的配置,而不再是webpack的配置
const {seller, goods, ratings} = require("./data/data.json")
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //在我们ctrl + s时才能启作用
    lintOnSave:false,
    devServer:{
        open:true,
        before: function(app) {
            //app 就是我们express的核心对象  可以用来注册一个后台路由
            app.get('/api/seller', function(req, res) {
                res.json({code:200,data:seller});
            });
            app.get('/api/goods', function(req, res) {
                res.json({code:200,data:goods});
            });
            app.get('/api/ratings', function(req, res) {
                res.json({code:200,data:ratings});
            });
        }
    },
    //还提供了写原生webpack的配置
    configureWebpack:{
        devServer:{
            port:8888
        },
        resolve: {
            alias: {
                'pages': resolve('src/pages'),
                'components': resolve('src/components'),
                'store': resolve('src/store'),
            }
        }
    }
}