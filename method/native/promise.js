/**
源码: https://github.com/dream2023/blog/tree/master/promise

es6 知识: http://es6.ruanyifeng.com

this 问题: https://juejin.im/post/59bfe84351882531b730bac2

Promise 基础教学: https://www.imooc.com/learn/949

Promise/A+规范原文: https://promisesaplus.com/

Promise/A+规范译文: http://www.ituring.com.cn/article/66566

参考文章 BAT 前端经典面试问题：史上最最最详细的手写 Promise 教程: https://juejin.im/post/5b2f02cd5188252b937548ab

参考文章 手写实现满足 Promise/A+ 规范的 Promise: https://www.jianshu.com/p/8d5c3a9e6181

vscode 代码运行插件 code-runner

 */
class Promise{
    constructor(executor){
        //初始化state为等待状态
        this.state="pending";
        //成功的值
        this.value=undefined;
        // 失败的值
        this.reason=undefined;
        //成功
        let resolve=value=>{
            //sate改变.resolve调用就会失败
            if(this.state==="pending"){
                //resolve调用后,state转为成功态
                this.state="fulfilled";
                //存储成功的值
                this.value=value;
            }
        }
        //失败
        let reject=reason=>{
            if(this.state==="pending"){
                // reject调用后,state转为失败态
                this.state="rejected";
                //存储失败的原因
                this.reason=reason;
            }
        }
        //如果executor 执行错误
        try{
            //立即执行executor
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }
        
    }

    // then方法
    then(onFulfilled,onRejected){
        if(this.satte==="fulfilled"){
            onFulfilled(this.value);
        }

        if(this.satte==="rejected"){
            onRejected(this.reason);
        }
    }
}