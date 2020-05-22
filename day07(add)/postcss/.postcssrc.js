const autoprefixer = require("autoprefixer");
module.exports={
    plugins:[
        autoprefixer({
            browsers:['Chrome > 56']
            // browsers:['>0%']
            // browsers:['last 2 version']
        })
    ]
}