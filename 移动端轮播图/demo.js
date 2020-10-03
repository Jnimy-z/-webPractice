window.addEventListener('load', function () {
    //获取轮播图盒子
    var father = document.querySelector('.father')
    //获取li
    var li = father.querySelectorAll('.son')
    //每次的移动距离
    var w = -li[0].offsetWidth
    //先将盒子的第一张图片设置成第二个li
    father.style.left = w + 'px'
    //设置index获取当前的图片index
    var index = 0
    //获取当前的小圆点
    var circle = document.querySelectorAll('ol li')
    var timer = setInterval(function () {
        //只让ul做动画不让真实left改变
        var translateX = index * w
        // console.log(index)
        //给位置移动添加动画，在这里加而不是上面是为了不让前一张图片显示
        father.style.transition = 'all .3s'
        //利用transform进行水平变换，ie9以上，因为是移动端，所以不用考虑兼容
        // console.log('father.offsetLeft'+father.style.left)
        father.style.transform = 'translateX(' + translateX + 'px)'
        index++;
    }, 1000)
    //实现无缝切换
    father.addEventListener('transitionend', function () {
        if (index >= 5) {
            index = 0;
            //最后一张过去马上跳转到第一张并且不做动画，就像无缝切换的一样
            father.style.transition = 'none'
            father.style.transform = 'translateX(' + 0 + 'px)'
        } else if (index < 0) {
            //手指从第一张往左滑动时
            index = 4
            //马上跳转到相同的第五张图片
            father.style.transition = 'none'
            father.style.transform = 'translateX(' + index * w + 'px)'
        }
        //使小圆点跟随图片改变
        document.querySelector('ol .bg').classList.remove('bg')
        circle[index].classList.add('bg')
    })

    //获取手指刚放下时的坐标, 由于轮播图只在水平方向移动，所以只需要x轴坐标
    var startX = 0;
    //手指移动的距离
    var pointLength = 0;
    father.addEventListener('touchstart', function (e) {
        clearInterval(timer)
        startX = e.touches[0].pageX
        console.log('syart:'+startX)
    })
    father.addEventListener('touchmove', function (e) {
        //向右滑动为正，向左滑动为负
        pointLength = e.touches[0].pageX - startX
        if (pointLength != 0) {
            var allLength = pointLength + index * w
            father.style.transition = 'all .3s'
            father.style.transform = 'translateX(' + allLength + 'px)'
        }
    })
    //手指触摸停止动画
    father.addEventListener('touchend', function () {
        //先清除定时，更严谨
        clearInterval(timer)
        console.log(pointLength)
        //如果滑动的距离大于50就完全划过去
        if (Math.abs(pointLength) > 50) {
            if (pointLength > 0) {
                index--
            } else {
                index++
            }
        }
        father.style.transform = 'translateX(' + index * w + 'px)'
        timer = setInterval(function () {
            var translateX = index * w
            father.style.transition = 'all .3s'
            father.style.transform = 'translateX(' + translateX + 'px)'
        }, 1000)
    })
})