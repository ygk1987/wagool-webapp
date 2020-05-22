//这里配置是vue脚手架cli的配置,而不再是webpack的配置
const {seller, goods, ratings} = require("./data/data.json")
module.exports = {
    //在我们ctrl + s时才能启作用
    lintOnSave:false,
    devServer:{
        open:true,
        before: function(app) {
            //app 就是我们express的核心对象  可以用来注册一个后台路由
            app.get('/api/seller', function(req, res) {
                res.json({seller});
            });
            app.get('/api/goods', function(req, res) {
                res.json({goods});
            });
            app.get('/api/ratings', function(req, res) {
                res.json({ratings});
            });
        }
    },
    //还提供了写原生webpack的配置
    configureWebpack:{
        devServer:{
            port:8888
        }
    }
}