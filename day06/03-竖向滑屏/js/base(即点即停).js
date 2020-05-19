(function (w) {
  w.scroll = {};

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
    //调用layout布局函数
    move(wrap);
  }

  function move(wrap) {
    /*竖向滑屏 
      clildNodes:包含文本子节点 firstChild = clildNodes[0]
      children:不包含文本子节点
    */
    //获取到滑屏元素
    var node = wrap.children[0];
     /*求出滑动的最远距离
      导航往左滑可以滑到的最远的距离(负值 数值是最小的 在没有考虑橡皮筋效果的前提下能走的最远距离)
      滑屏元素是在滑屏区域内部滑动的,这个内部是滑屏区域不带边框的尺寸 : clientWidth
    */
    /* 注意:在计算minY的时候,是有一个潜在的bug的 node这个滑屏元素里面的内容是动态生成的 
      在move方法调用的时候,滑屏元素不一定能渲染成功

      当在项目中遇到一些动态生成的节点时候,而且要获取这些节点的位置尺寸这种信息时,
      一定要长个心眼,最好把获取操作发到一个异步逻辑中
    */
    var minY = wrap.clientHeight - node.offsetHeight; //求比例需要一个正值

    //滑屏元素一开始的位置 ; 手指一开始的位置
    var eleStartX = 0;
    var eleStartY = 0;
    var szStartX =0;
    var szStartY =0;

    //手指上一次touchmove完成时的位置以及手指上一次touchmove完成时的时间点
    var lastPoint = 0;
    var lastTime = 0;
    //每一次toucmove真正移动的距离以及每一次toucmove完成的时间
    var pointDisY = 0;
    var timeDisY = 0;

    //防抖动需要的变量
    var isFirst = true; //让一段逻辑只执行一次需要的变量
    var isY = true; //用户的滑屏方向是否是Y轴
     
    //即点即停需要的变量
    var clearTimer = 0;

    wrap.addEventListener("touchstart",(ev)=>{
      ev = ev || event;
      //防止minY在外部拿的不精确
      minY = wrap.clientHeight - node.offsetHeight;
      var touchC = ev.changedTouches[0];

      eleStartX = transform.css(node,"translateX");
      eleStartY = transform.css(node,"translateY");
      szStartX  = touchC.clientX;
      szStartY = touchC.clientY;
      
      //touchstart时手指的位置
      lastPoint = touchC.clientY
      lastTime = new Date().getTime();

      //正常滑屏时取消动画 清除手动橡皮筋效果的标识
      node.style.transition = "";
      node.handMove = false;
      //重置pointDisY timeDisY 避免每次单纯点击导航时有意料之外的移动
      pointDisY = 0;
      timeDisY = 1; //避免出现NaN 导致意想不到的bug

      //防抖动的值得重新置回来
      isFirst = true;
      isY = true;

      //实现即点即停
      clearInterval(clearTimer);
    })

    wrap.addEventListener("touchmove",(ev)=>{
      //看门狗
      if(!isY){
        //咬住
        return;//防的是后续的抖动
      }
      ev = ev || event;
      var touchC = ev.changedTouches[0];

      var nowPoint = touchC.clientY; //当次touchmove时 手指的位置
      var nowTime = new Date().getTime();
      pointDisY = nowPoint - lastPoint; //当次touchmove 距离 上一次touchmove 我们手指移动的距离
      timeDisY = nowTime - lastTime

      lastPoint = nowPoint;
      lastTime = nowTime;

      var szNowX = touchC.clientX;
      var szNowY = touchC.clientY;
      var szDisX = szNowX - szStartX;
      var szDisY = szNowY - szStartY
      var translateY = eleStartY + szDisY;

      //要实现橡皮筋效果 就是让pointDisY的有效距离 越来越小
      //这个比例在每一次touchmove触发时应该要越来越小 (0,0.5]
      var scale = 1;
      if(translateY > 0){
        node.handMove = true; //如果为true代表进行了手动橡皮筋效果的
        //左侧橡皮筋效果
        scale = document.documentElement.clientWidth/((document.documentElement.clientWidth+translateY)*2.5);
      }else if(translateY < minY){
        node.handMove = true;
        //右侧橡皮筋效果的逻辑
        var over = minY - translateY;
        scale = document.documentElement.clientWidth/((document.documentElement.clientWidth + over)*2.5)
      }
      translateY = transform.css(node, "translateY")+(pointDisY*scale);
      /* 判断用户上来的首次滑屏方向：
        判断用户上来的首次滑屏方向 如果是x轴方向 那以后不管怎么滑动都不会触发滑屏逻辑
        判断用户上来的首次滑屏方向 如果是y轴方向 那以后不管怎么滑动都会触发滑屏逻辑 
      */
      if(isFirst){
        isFirst = false
        //如果在手指的滑动方向是y轴 则需要停止整个滑屏逻辑
        if(Math.abs(szDisX) > Math.abs(szDisY)){
            //说明滑动的方向 是偏向y轴的
            isY=false;
            return; //防的是首次抖动
        }
      }
      transform.css(node,"translateY", translateY);
    })

    wrap.addEventListener("touchend",()=>{
      if(node.handMove){
        //说明tocuhend事件触发时,是处于手动橡皮筋效果中的 --> 正常的回到边界位置即可
        var translateY = transform.css(node,"translateY");
        if(translateY > 0){
          //左侧橡皮筋
          translateY = 0;
        }else if (translateY < minY) {
          //右侧橡皮筋
          translateY = minY;
        }
        node.style.transition = ".5s transform"
        transform.css(node,"translateY",translateY);
      }else{
        //説明touchend事件触发时 手动橡皮筋效果没有被触发  --> 进行带橡皮筋效果的快速滑屏
        fast();
      }

      function fast() {
        //Tween算法相关的函数(即点即停)
        var Tween ={
          Linear: function(t,b,c,d){ return c*t/d + b; },
          Back: function(t,b,c,d,s){
              if (s == undefined) s = 1.70158;
              return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
          }
        }

        function tweenMove(type, translateY,time){
          //循环定时器调用多次没有意义,一上来就清除掉
          clearInterval(clearTimer);
          var t = 0; //代表的是当前是哪一次
          var b = transform.css(node,"translateY") //快速滑屏的初始位置
          var c = translateY - b; //要去的位置和初始位置的差值
          var d = (time*1000)/(1000/60) //总次数
          clearTimer = setInterval(() => {
            t++;
            if(t>d){
              clearInterval(clearTimer);
            }
            transform.css(node,"translateY",Tween[type](t,b,c,d));
          }, 1000/60);
        }

        var time = 1; //快速滑屏的总时间
        //则最后一次touchmove的平均速度speed
        var speed = pointDisY / timeDisY;
        speed= Math.abs(speed) < 0.5 ? 0 :speed;
        /* 
          根据速度让滑屏元素在单位时间内化的距离有远有近
          速度的正负号代表的是滑屏的方向
          速度大:在单位时间内滑动距离远一点
          速度小:在单位时间内滑动距离近一点
        */
        /* 
          手指抬起时,如果发现两侧有橡皮筋拉出距离,需要弹回去
          手指抬起时,node的位置
        */
        var translateY = transform.css(node, "translateY")
        translateY = translateY + speed*200;

          //快速滑屏也需要的橡皮筋效果,要借助于贝塞尔曲线
          type="Linear";
          if(translateY > 0){
            //左侧橡皮筋
            translateY = 0;
            type="back";
          }else if(translateY < minY){
            //右侧橡皮筋
            translateY = minY;
            type="back";
          }
          //加过渡效果
          tweenMove(type, translateY,time);
        }
    })  
  }
  w.scroll.init = init;
})(window)