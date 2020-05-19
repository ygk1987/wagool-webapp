/* 实现无缝
1.先将图片复制一组
2.当点到第一组第一张时,立马跳到第二组的第一张
3.当点到第二组的最后一张时,立马跳转到第一组的最后一张
*/
(function (w) {
    w.swiper = {};
    //wrap:移动端开发时的包裹节点
    function init(wrap) {
        //挑选一个适配方案
        var styleNode = document.createElement("style");
        var w = document.documentElement.clientWidth/16;
        styleNode.innerHTML = `html{font-size:${w}px!important`;
        document.head.appendChild(styleNode);
        //禁止移动端事件的默认行为
        wrap.addEventListener("touchstart", (ev)=>{
            ev = ev || event;
            ev.preventDefault();
        })
    }

    //arr:当前无缝滑屏需要的图片的地址
    function slide(arr) {
        //整个滑屏区域
        var swiperWrap = document.querySelector(".swiper-wrap");
        //创建滑屏元素
        var ulNode = document.createElement("ul");
        //小圆点
        var pointWrap = document.querySelector(".swiper-wrap > .point-wrap");
        var liNode = document.querySelector(".swiper-wrap .list li")
        //创建一个style标签
        var styleNode = document.createElement("style");

        if(!swiperWrap){
            throw new Error("页面上缺少swiper-wrap这个滑屏区域");
            return;
        }

        //小圆点相关的逻辑
        if(pointWrap){
            pointWrap.size = arr.length;
            for(var i=0; i<arr.length;i++){
                if(i==0){
                    pointWrap.innerHTML+="<span class='active'></span>";
                }else{
                    pointWrap.innerHTML+="<span></span>";
                }
            }
        }

        //是否需要无缝
        var needWF = swiperWrap.getAttribute("needWF");
        if(needWF !== null){
            //先将图片复制一组
            arr = arr.concat(arr);
        }

        //根据arr动态的去创建滑屏元素
        ulNode.classList.add('list'); //ulNode添加class的
        for(var i=0; i<arr.length;i++){
            ulNode.innerHTML+="<li><img src="+(arr[i])+"></li>"
        }
        swiperWrap.appendChild(ulNode);

        styleNode.innerHTML = ".swiper-wrap .list{width:"+(arr.length)+"00%}";
        styleNode.innerHTML += ".swiper-wrap .list li{width:"+(1/arr.length)*100+"%}";
        document.head.appendChild(styleNode)

        //重新渲染滑屏区域的高度
        liNode = document.querySelector(".swiper-wrap .list li")
        //代码执行到第61行时 界面可能还没有渲染成功
        setTimeout(()=>{
            swiperWrap.style.height = liNode.offsetHeight + "px";
        },200);

        var needAuto = swiperWrap.getAttribute("needAuto");
        //开始手动滑屏
        move(swiperWrap, ulNode, arr, pointWrap, needWF, needAuto);
        //自动滑屏
        if(needAuto !== null && needWF !== null){
            autoMove(ulNode, pointWrap, 0);
        }
    }

    //滑屏的主体方法
    function move(wrap, node, arr, pointWrap, needWF, needAuto) {
        /* 基本逻辑:
            1.拿到滑屏元素一开始的位置
            2.计算出手指滑动的距离
            3.将手指滑动的距离给滑屏元素加上
        */
        var eleStartX = 0; //元素开始的位置
        var touchStartX = 0; //手指开始的位置
        var touchDisX = 0;
        var index = 0; //index抽象成滑屏元素滑动的距离
        //var translateX = 0; //记录translateX的实时的一个偏移
       wrap.addEventListener("touchstart",function(ev){
            ev = ev || event;
            node.style.transition = "";//只有在结束的时候才需要过渡动画,所以一上来就清除该过渡动画

            //停掉自动滑屏
            clearInterval(node.timer);   

           var touchC = ev.changedTouches[0]; //获取手指一开始的位置
           touchStartX = touchC.clientX; //手指开始的位置
           //eleStartX = node.offsetLeft; //元素开始的位置
            //eleStartX = translateX;
            //注意,有了无缝逻辑之后,元素一开始的位置 一定要等无缝逻辑走完之后才能确定
            //eleStartX = css(node, "translateX");

            if(needWF !== null){//需要无缝的
                var whichPic = css(node, "translateX") / document.documentElement.clientWidth;
                if(whichPic === 0){
                    //当点到第一组第一张时,立马跳到第二组的第一张
                    whichPic = -pointWrap.size;
                }else if(whichPic === 1 - arr.length){
                    //当点到第二组的最后一张时,立马跳转到第一组的最后一张
                    whichPic = 1 - pointWrap.size;
                }
                css(node,"translateX", whichPic*document.documentElement.clientWidth);
            }
            //元素一开始的位置 一定要等无缝逻辑走完之后才能确定
            eleStartX = css(node,"translateX");
       })
       wrap.addEventListener("touchmove",function(ev){
            ev = ev || event;
            var touchC = ev.changedTouches[0]; 
            var touchNowX = touchC.clientX;//手指的实时位置
            touchDisX = touchNowX - touchStartX; //手指滑动的距离

            //node.style.left = eleStartX + touchDisX + 'px'
            //transform:translateX(100px)
            /* translateX = eleStartX + touchDisX
            node.style.transform = "translateX("+(translateX)+"px)" */
            css(node, "translateX", eleStartX + touchDisX)
       })
       wrap.addEventListener("touchend",function(){
            //node.offsetLeft代表了滑屏元素在手指抬起时的实时位置
            //index:滑屏元素的实时位置与视口的比例
            //node.offsetLeft记录是left的偏移量,没办法记录transform的变量
            //index = Math.round(node.offsetLeft / document.documentElement.clientWidth);
            // index = Math.round(translateX / document.documentElement.clientWidth);
            index = Math.round(css(node, "translateX") / document.documentElement.clientWidth);
           
            //判断一下边界情况
            if(index > 0){
                index = 0;
            }else if(index < (1 - arr.length)){
                index = 1 - arr.length;
            }

            //同步小圆点(排它思想)
            if(pointWrap){
                var points = pointWrap.querySelectorAll("span");
                for(var i = 0; i <points.length; i++){
                    points[i].classList.remove("active")
                }
                //不管无缝有没有复制一组图片 小圆点的下标永远都是0到4
                points[-index%pointWrap.size].classList.add("active");
            }

            node.style.transition = ".5s transform"; //只有在结束的时候才需要过渡动画
            // node.style.left = index*document.documentElement.clientWidth+'px';
            /* translateX = index*document.documentElement.clientWidth
            node.style.transform = "translateX("+(translateX)+"px)" */
            css(node, "translateX", index*document.documentElement.clientWidth);
            
            //重新开启自动轮播
            if(needAuto !== null && needWF !== null){
                autoMove(node, pointWrap, index);
            }
       })
    }

    //处理自动轮播的函数
    function autoMove(node, pointWrap, autoFlag){
        clearInterval(node.timer);

        // var autoFlag = 0; //所有的下标都看成负值
        node.timer = setInterval(function(){
            node.style.transition = ".5s transform linear"
            //1.自动滑屏的逻辑
            autoFlag--;
            css(node, "translateX", autoFlag*document.documentElement.clientWidth);
            //2.同步小圆点(排它思想)
            if(pointWrap){
                var points = pointWrap.querySelectorAll("span");
                for(var i = 0; i <points.length; i++){
                    points[i].classList.remove("active")
                }
                //不管无缝有没有复制一组图片 小圆点的下标永远都是0到4
                points[-autoFlag%pointWrap.size].classList.add("active");
            }
        }, 1000);

        //代码的执行是非常快的 界面的渲染是滞后的
        node.addEventListener("transitionend", function(){
            //完成过渡动画后会触发的事件
            //无缝 当自动滑到第二组的最后一张时 立马跳到第一组的最后一张
            if(autoFlag === 1 - pointWrap.size * 2){
                autoFlag = 1 -pointWrap.size;
                node.style.transition = "";
                css(node, "translateX", autoFlag*document.documentElement.clientWidth)
            }
        })
    }
    
    w.swiper.init = init;
    w.swiper.slide = slide;
})(window)


