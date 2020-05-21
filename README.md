### webapp学习内容
#### day01-webapp基础
```shell
1.B/S和C/S,Toc和Tob
  1. B/S架构
      1.b/s架构有一个先天的优势:跨平台;一套代码搞定mac系统和windows系统,开发成本比较低. 
      2.b/s架构还有一个优势,项目维护成本低
      3.总结：
        b/s架构的优点: 跨平台,开发成本比较低,维护成本低
        b/s架构的缺点: 高度依赖于网络的.性能低.访问速度慢
  2. C/S架构
      1.c/s架构中需要为不同的操作系统各开发一套客户端,开发成本高,维护成本也高
      2.新增功能时;也需要重新发布版本;用户更新之后才能应用. 
      3.c/s架构响应速度快，安全性强

  3. Toc
      tob : 面向企业的项目(后台管理系统)
          crm  : 综合类型的后台管理系统;实现日常办公的需求 & 销售系统
          erp  : 销售系统
          oa   : 办公系统
          cms  : 内容发布系统
          
  4. toc : 面向大众的项目(电商网站)
      toc项目在用户的体验 以及 技术的要求上 比tob的项目高出一大截

2.移动端开发模式
  1. native app(c/s架构)
      web开发接触不到的,因为native使用的是java语言,或者OC语言
  2. web app(b/s架构)
      web开发必须迈过的一道坎
  3. Hybrid app
      1).H5(HTML5)+ 原生 ( Cordova、 ionic)
          HTML5 是由 webview渲染的(webview就是czxt自带的浏览器)
      2).Javascript 开发 + 原生 ( React Native)
          jsx语法 --> 虚拟dom --> 原生控件(操作系统UI)
      3).自绘 UI + 原生 ( Flutter)
          没有借助于webview 也没有使用 原生控件
          学习Dart语言

3.移动设置和屏幕
  1. 屏幕尺寸:
    屏幕尺寸指的是屏幕对角线的长度，单位是英寸，1英寸=2.54厘米。

  2. 屏幕分辩率
      屏幕分辨率指的是屏幕横纵向上物理像素点的个数，一般以横向像素*纵向像素来	表示一个手机的分辨率.

  3. 屏幕像素密度，也叫:像素密度或屏幕密度
      1.屏幕上每英寸可以显示的像素点的数量，单位是ppi，即“pixels per inch”的缩写。
      2.屏幕像素密度与屏幕尺寸和屏幕分辨率有关.

  4. 普通屏&高清屏
      1.特点如下：
          1.一种具备超高像素密度的液晶屏；
          2.同样大小屏幕上显示的像素点由一个变为多个
      2.高清屏和普通屏的主要区别：
        高清屏和普通屏相比，相同区域的物理像素点数,高清屏是普通屏的4倍

      3.能不能使用屏幕分辨率数值上的大小来比较两块屏幕的大小?
        不能,屏幕分辨率是抽象单位

  5. 物理像素
      任何设备的物理像素的数量都是固定的 ，任何一款设备上1物理像素的大小是不会变的.	不同设备上1物理像素的大小可能是不一样的

  6. 设备独立像素
      是物理像素和设备独立像素的一个媒介

  7. 像素比
      1.是设备物理像素和设备独立像素的比例
      2.像素比 = 一个方向上占满一块屏幕需要的物理像素的个数 /一个方向上占满一块屏幕需要的设备独立像素的个数
  8. 像素永远是一个抽象单位!  任何一个设备都具有 物理像素  独立像素
      在iPhone6上 一个独立像素占据多少个物理像素（面积比）
          一个独立像素 = 4个物理像素
```

#### day02-webapp基础
```shell
1.视口和像素的理解?
  1.视口
      1).pc端只有布局视口，
      2).移动端有除了有布局视口还有视觉视口和理想视口；
      3).布局视口的大小用css像素表示；
  2.像素
      1).页面渲染用的是物理像素； 
      2).设备独立像素是物理像素和css像素转换的媒介；
      3).像素比是设备物理像素和设备独立像素的比例！
  3.深刻理解
      1).物理像素是最小的单位，1css像素不等于1物理像素也就是1px不等于1px
      2).css像素与设备独立像素存在关系，设备独立像素与物理像素有关系，所以要通过设备独立像素得到css像素与物理像素的比例
          1).设备独立像素与物理像素就是dpi(屏幕像素密度)的这个比例
          2).在正常情况下，移动端的页面宽高就是设备独立像素大小，所以是1比1的关系(移动端的页面宽高:也即是布局视口，而布局视口的大小就是css像素的大小)
2.移动设备/浏览器
  1.移动端视口
      1).布局视口:限制了你的css布局,
      2).视觉视口:决定用户能看到什么
      3).理想视口:是对于特定设备上特定浏览器的布局视口的一个理想尺寸;把布局视口的尺寸设置为理想视口,本质上,这就是移动端设计的基础
          当写上了<meta name="viewport" content="width=device-width">标签之后;
          布局视口有了一个别名  我们称之为理想视口
      3).完美视口(太大的元素)
          太大的元素:当布局视口内的元素大于整个布局视口后,有些浏览器会选择让整个视觉视口包住这个太大的元素,照理来讲要出现横向滚动条.加上完美视口之后 几乎所有的浏览器都不会包住这个太大的元素 而是出现横向滚动条

  2.设备独立像素是物理像素和css像素转换的媒介；

  3.布局视口的大小和屏幕大小没有关系,只不过默认情况下,布局视口大小、视觉视口大小以及屏幕的尺寸是一样的

  4.移动端视觉视口跟用户的缩小和放大有关系
      1).放大: 放大一个CSS像素的面积  视觉视口内包含的css像素的个数变少
      2).缩小: 缩小一个CSS像素的面积  视觉视口内包含的css像素的个数变多

  5.系统的缩小和放大直接影响布局视口和视觉视口
      与用户缩放类似,但改变的不光是视觉视口,布局视口也会改变!!!
      1).initial-scale 参照于理想视口的尺寸进行缩放
      2).initial-scale属于系统缩放!!! 改变的不光是视觉视口,也会改变布局视口
      3).initial-scale=0.5 是一个缩小操作!!!
          缩小操作: css像素的面积变小!!  视觉视口和布局视口包含的css像素的个数变多!!!
          放大操作: css像素的面积变大!!  视觉视口和布局视口包含的css像素的个数变少!!!

  6. 如何解决布局视口的宽度width和系统缩放initial-scale之间的冲突?
      谁大听谁的

  7.禁止用户缩放
      user-scalable=no,maximum-scale=1.0,minimum-scale=1.0
3.viewport标签的完整写法
  1.meta标签的属性
  <meta name="viewport" content="" />
      width [pixel_value | device-width] width 
          -- 直接去设置具体数值大部分的安卓手机是不支持的 但是IOS支持
              initial-scale 初始缩放比例
              user-scalable 是否允许缩放 （no||yes）,默认允许
              minimum-scale 允许缩放的最小比例
              maximum-scale 允许缩放的最大比例 
              height
  2.完整写法
  <meta
  name="viewport" 	content="width=device-width,height=device-height,user-scalable=no,
    initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" /> 
  加上viewport标签后,1css像素在不同设备上占据的实际的尺寸是一样的
4.移动端webapp构建工具FIS3
  npm i fis3 -g
  fis3 -v
  fis3 server open : 打开fis3内置的静态资源服务器的目录
  fis3 server start : 启动服务器 默认监听8080端口
  手机要和电脑在同一个网段上!!! 手机连电脑的wifi
  ipconfig 查看当前电脑的ip
5.移动端webapp基础总结
  1.四个像素
      1)css像素(浏览器中的最小单位)
      2)物理像素(设备呈像的最小单元):屏幕的分辨率
      3)位图像素是图片的最小单元。
      4)设备独立像素也是一个抽象的层，是设备提供出来的接口
  2.三个视口
      布局视口
      视觉视口
      理想视口
  3.两个操作
      1)用户放大  用户缩小
          放大: 放大一个CSS像素的面积  视觉视口内包含的css像素的个数变少
          缩小: 缩小一个CSS像素的面积  视觉视口内包含的css像素的个数变多
      2)系统放大  系统缩小
          与用户缩放类似,但改变的不光是视觉视口,布局视口也会改变!!!

  4.一个比例
      像素比： 物理像素 /设备独立像素
      当css像素 与 设备独立像素挂上钩,像素比才有意义
  5.注意点
      1.太大的元素(完美视口)
          太大的元素:当布局视口内的元素大于整个布局视口后,有些浏览器会选择让整个视觉视口包住这个太大的元素,照理来讲要出现横向滚动条.加上完美视口之后 几乎所有的浏览器都不会包住这个太大的元素 而是出现横向滚动条
          `<meta name="viewport" content="width=device-width,initial-scale=1.0">`
      2.width和initial-scale之间的冲突
          width:布局视口的尺寸
          initial-scale:系统缩放
          `width` 和 `initial-scale`这两个属性都有可能改变布局视口的尺寸,那到底听谁的
              谁大听谁的!!!!!
      3.禁止用户缩放
          `user-scalable=no,maximum-scale=1.0,minimum-scale=1.0`
  6.viewport标签的完整写法
      <meta name="viewport" content="width=device-width,height=device-height,user-scalable=no,
    initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0" />
      加上viewport标签后,1css像素在不同设备上占据的实际的尺寸是一样的
```
#### day03-webapp基础
```shell
1.物理像素边框的实现
  .one-px(@color){
      position: relative;
      &:after{
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: @color;
        position: absolute;
        bottom: 0;
        transform: scaleY(.5);
        @media only screen and (-webkit-device-pixel-ratio: 3){
            transform: scaleY(.33333333);
        }
      }
  }
2.移动端事件基础
    1.对比pc端的鼠标事件        移动端的触屏事件
      mousedown                   touchstart
      mousemove                   touchmove
      mouseup                     touchend
    2.event事件:
      touches             触发当前事件时,屏幕上的手指列表
      targetTouches       触发当前事件时,元素上的手指列表
      changedTouches      触发当前事件时,触发事件的手指列表
    3.阻止事件冒泡
      stopPropagation()
    4.禁止事件的默认行为
      preventDefault() //这一行代码在chrome的模拟器中是没有作用的!! 在真机上也不可以的!
    5.隐患滚动条失效
      移动端自带的滚动条 我们都是会禁止掉 然后自己实现的
      部分移动端浏览器中滚动条是比较丑的
    6.事件点透
      pc端的事件在移动端有300毫秒的延迟
    7.a标签的跳转方案
      重置所有a标签的跳转
    8.解决a标签误触
      1.在a标签上绑定touchmove事件，`a.isMoved = true;`
      1.在a标签上绑定touchend事件，判断:
        a.addEventListener("touchend",()=>{
            if(!a.isMoved){
                location.href = a.href;
            }
        })
      3.在a标签上绑定touchstart事件，`a.isMoved = false;`
    9.querySelectorAll的坑
      1.querySelectorAll拿到的是静态列表
      2.getxxx系列拿到的是一个动态列表
      3.动态的加了一个li, dom树的结构会产生改变 dom树会重新绘制 内存地址也会产生改变
    10.定位
      1.绝对定位盒模型的特性
        1)绝对定位的盒子 横向上盒模型的尺寸 + right + left = 包含块的横向的尺寸,初始包含块横向的尺寸(视口的宽度)
        2)包含块: 定位的参照物; 离目标元素最近的开启定位的祖先元素;如果没有则参照于初始包含块进行定位
          初始包含块: 是一个视窗大小的矩形;默认位置与视窗保持一致
      2.前端坐标系会随着你使用的css属性不一样而产生改变
3.queryselector的坑
    1.querySelector,拿到的是静态列表
    2.如果dom树的结构会产生改变,需要querySelector重新拿一次
4.无缝滑屏静态布局
    画webapp界面时:
      1. 加viewport标签
      2. 挑选一个适配方案
      3. 禁止移动端所有的元素事件的默认行为
5.无缝滑屏布局动态化
    1.先图片复制一组
    2.当点到第一组的第一张时 立马 跳到第二组的第一张
    3.当点到第二组的最后一张时  立马 跳到第一组的最后一张
6.基本滑屏
    1.基本逻辑
        1. 拿到滑屏元素一开始的位置
        2. 计算出手指滑动的距离
        3. 将手指滑动的距离给滑屏元素加上
    2.index抽象成图片下标
```

#### day04-webapp轮播图
```shell
1.完善小圆点&实现二分之一跳转
    1.index抽象成滑屏元素的位置
2.完成定位版本
    移动端使用定位效率较低,可使用位移提高性能
3.将定位改写为2d变换
4.封装2d变换公共函数
5.完成无缝
    1.无缝的逻辑:
        当点到第一组的第一张时 立马 跳到第二组的第一张
        当点到第二组的最后一张时  立马 跳到第一组的最后一张
    2.注意,元素一开始的位置 一定要等无缝逻辑走完之后才能确定
6.完成自动滑屏
    1.代码的执行是非常快的 界面的渲染是滞后的
    2.完成过渡动画后会触发的事件
    3.无缝 当自动滑到第二组的最后一张时 立马跳到第一组的最后一张
7.解决自动滑屏&手动滑屏的冲突
    让自动滑屏和手动滑屏保持同步即可
8.防抖动逻辑(无缝滑屏完结)
    1.判断用户上来的首次滑屏方向 如果是y轴方向 那以后不管怎么滑动都不会触发滑屏逻辑
    2.判断用户上来的首次滑屏方向 如果是x轴方向 那以后不管怎么滑动都会触发滑屏逻辑

手机如何访问自己写的webapp
    1. 电脑防火墙要关
    2. 电脑要和手机处于同一个网段(电脑开一个共享wifi 让手机连接)
    3. 通过fis3启动服务
        fis3 server open : 打开fis3的静态资源服务器的根目录
        将自己的页面放进去 index.html
        fis3 server start : 启动fis3的静态资源服务器
    4. 打开cmd窗口 输入ipconfig命令 查看自己的ip
```
#### day05-可拖拽导航完成及3d硬件加速
```shell

```
#### day06-竖向滑屏完成和this及flex的复习
```shell
竖向滑屏

this及flex的复习

```
#### day07-vue基础、脚手架及包查找机制复习


