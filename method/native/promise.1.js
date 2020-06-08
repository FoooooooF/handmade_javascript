//例1

// function getUserId() {
//     return new Promise(function(resolve) {
//         //异步请求
//         http.get(url, function(results) {
//             resolve(results.id)
//         })
//     })
// }


// getUserId().then(function(id) {
//     //一些处理
// })

function Promise(fn){
    let value=null;
    let callbacks=[];

    this.then=function(onFulfilled){
        callbacks.push(onFulfilled);
        return this;
    }

    function resolve(value){
        callbacks.forEach((cb)=>{
            cb(value)
        })
    }

    fn(resolve);
}
function test(){
    return new Promise((resolve)=>{
        console.log("this is fn")
        resolve()
    }); 
}
// console.log(test());
console.log(test().then(console.log(1)).then(console.log(2)));