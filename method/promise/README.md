# handmade promsie
## 步骤
1. 创建Promsie类
2. 创建constractor构造函数
3. 实现原型then方法和then的链式调用
4. 实现Promsie对象方法 resolve,reject,race,all
## promsie流程图
![流程图](./assets/776370-20170112213750478-269964759.png)
## 详细步骤
[BAT前端经典面试问题：史上最最最详细的手写Promise教程 ⭐](https://juejin.im/post/5b2f02cd5188252b937548ab)

## 理解
1. new Peomise 传入一个exuctor(执行函数),执行函数有两个形参,resole和reject.
2. resole和reject是两个回调函数,这两个函数的函数体已经在Promsie构造函数中定义,
   它们只用于改变Promsie实例的状态.
   pending->fullfiled 等待->完成
   pending->rejected  等待->失败
   且过程不可逆
3. Promise 原型上定义有then方法,then方法可以传两个参数,
   分别是onResolved(成功的回调)和onRejected(失败的回调),
   then方法监听Promsie 实例的状态,当状态改变时,调用相应的回调方法.
   (then方法是如何监听 实例的状态变化的?)
4. 待理解:then的链式调用,then的穿透,then方法中继续返回Promsie



## reference
- [BAT前端经典面试问题：史上最最最详细的手写Promise教程 ⭐](https://juejin.im/post/5b2f02cd5188252b937548ab)
- [手写Promise——彻底明白Promise原理](https://blog.csdn.net/qq_22167989/article/details/81586105)
- [深入理解 Promise (中)](http://coderlt.coding.me/2016/12/04/promise-in-depth-an-introduction-2/)