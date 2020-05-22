//这里配置是vue脚手架cli的配置,而不再是webpack的配置
module.exports = {
    //在我们ctrl + s时才能启作用
    lintOnSave:false,
    devServer:{
        open:true
    },
    //还提供了写原生webpack的配置
    configureWebpack:{
        devServer:{
            port:8888
        }
    }
}