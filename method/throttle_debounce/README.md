# 防抖与节流
>节流（throttle）的作用是降低事件的触发的频次，常用在mouseMove,scrollTop等这些api上。形象的来说就是把水龙头关小了，以前每秒触发一次的事件，现在三秒触发一次。

>防抖（debounce）的作用是降低事件的触发次数，一通连续操作的最后一次操作会被触发

这个地址将节流和防抖的作用演示的非常形象。
[防抖节流测试地址](http://demo.nimius.net/debounce_throttle/)
## 节流
### 使用时间戳实现节流函数
```js
function throttle(func,wait){
    var context, args;
    var previous=0;
    return function(){
        var now=new Date();
        context=this;
        args=arguments;
        if(now-previous>wait){
            func.apply(context,args);
            previous=now;
        }
    }
}
```
函数中的this,指向调用函数的对象

# reference
1. [JavaScript专题之跟着underscore学防抖(实现步骤清晰) ](https://github.com/mqyqingfeng/Blog/issues/22)
2. [JavaScript专题之跟着underscore学节流(实现步骤清晰) ](https://github.com/mqyqingfeng/Blog/issues/26)