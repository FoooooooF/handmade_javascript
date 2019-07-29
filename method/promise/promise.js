class Promise {
    //构造函数
    constructor(executor) {
        console.log("is my own promise")
        //初始化state为pending 等待状态  pending/fulfilled/rejected
        this.state = "pending";
        //成功的值
        this.value = undefined;
        //失败的原因
        this.reason = undefined;
        //存放then方法中 成功(onFulfilled)回调的数组
        this.onResolvedCallbacks = [];

        //存放then方法中 失败(onRejected)回调的数组
        this.onRejectedCallbacks = [];

        //成功
        let resolve = (value) => {
            if (this.state === "pending") {
                //resolve调用后,state转化为成功态
                this.state = "fulfilled";
                // 储存成功的值
                this.value = value;

                //一旦resolve执行,调用成功数组的函数
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        //失败
        let reject = (reason) => {
            if (this.state === "pending") {
                //resolve调用后,state转化为失败
                this.state = "rejected";
                // 储存失败的值
                this.reason = reason;
                //一旦resolve执行,调用失败数组的函数
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        // 如果executor执行报错，直接执行reject
        try {
            // 调用的时候,传入resolve,reject的实参
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }

    }
    /**
     * 
     * @param {function} onFulfilled 成功的回调
     * @param {function} onRejected  失败的回调
     */
    then(onFulfilled, onRejected) {
        //onFulfilled 和 onRejected 参数验证,如果不是函数,返回一个默认函数;
        onFulfilled=typeof onFulfilled==='function'?onFulfilled:value=>value;
        onRejected=typeof onRejected==='function'?onRejected:err=>{throw err};

        //声明promsie2 解决then链式调用的问题
        let promise2 = new Promise((resolve, reject) => {
            //状态为fulfilled 执行onFulfilled函数,传入成功的值
            if (this.state === "fulfilled") {
                // onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
                setTimeout(() => {
                    try{
                        let x=onFulfilled(this.value);
                        //resolvePromise,处理自己return的promsie和默认的promise2的关系???
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(e){
                        reject(e);
                    }    
                }, 0);
                

            };
            //状态为rejected,执行onRejected函数,传入失败的原因
            if (this.state === "rejected") {
                setTimeout(()=>{
                   try{
                        let x=onRejected(this.reason);
                        resolvePromise(promise2,x,resolve,reject);
                   }catch(e){
                        reject(e)
                   } 
                },0)
               
            }
            //状态为pending
            if (this.state === "pending") {
                //onfulfilled 传入成功数组
                this.onResolvedCallbacks.push(() => {
                    setTimeout(()=>{
                        try{
                            let x=onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                    
                })
                //onRejected 传入失败数组
                this.onResolvedCallbacks.push(() => {
                    setTimeout(()=>{
                        try{
                            let x=onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        }catch(e){
                            reject(e);
                        }
                    },0)
                })
            }
        })
        // 返回promise2,完成链式调用
        return promise2
    }
}
//处理上一个 return 数据和promsie2的关系
function resolvePromise(promise2,x,resolve,reject){
    //防止循环调用
    if(x===promise2){
        return reject(new TypeError("Chaining cycle detected for promise"));
    }
    //防止多次调用
    let called=false;

    //x不是null 且x是对象或者函数
    if(x!=null&&(typeof x==='object'||typeof x==='function')){
        try {
            let then=x.then;
            if(typeof then==='function'){ //如果x依然是一个promise
                then.call(x,y=>{
                    if(called) return;
                    called=true;
                    resolvePromise(promsie2,y,resolve,reject);
                },err=>{
                    if(called) return;
                    called=true;
                    reject(err);
                })
            }else{
                resolve(x);
            }
        }catch(e){
            if(called) return;
            called=true;
            reject(e);
        }
    }else{
        resolve(x);
    }

}

//实现Promise 对象方法 js一切皆对象,函数上挂载方法即可视为为对象上挂载方法
Promise.resolve=function(val){
    return new Promise((resolve,reject)=>{
        resolve(val)
    })
}

Promise.reject=function(val){
    return new Promise((resolve,reject)=>{
        reject(val)
    })
}
//??
Promise.race=function(promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject)
        }
    })
}

Promise.all=function(promsies){
    let arr=[];
    let i=0;
    function processData(index,data){
        arr[index]=data;
        i++;
        if(i==promises.length){
            resolve(arr);
        }
    }
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promsies.length;i++){
            promsies[i].then(data=>{
                processData(i,data);
            },reject);
        }
    })
}