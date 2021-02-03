function Mypromise(fn){
    console.log('mypromise');
    this.state="pending";
    this.value=null;
    this.callbacks=[];
    let that=this;
    function resolve(newValue) {
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
            var then = newValue.then;
            if (typeof then === 'function') {
                then.call(newValue, resolve);
                return;
            }
        }
        that.state = 'fulfilled';
        that.value = newValue;
        setTimeout(()=> {
            that.callbacks.forEach( (callback) =>{
                that.handle(callback);
            });
        }, 0);
    }
    fn(resolve);
}
Mypromise.prototype.handle=function(callback){
    if (this.state === 'pending') {
        this.callbacks.push(callback);
        return;
    }
    //如果then中没有传递任何东西
    if(!callback.onFulfilled) {
        callback.resolve(this.value);
        return;
    }
    //链式调用的关键点
    //
    var ret = callback.onFulfilled(this.value);
    callback.resolve(ret);
}
Mypromise.prototype.then=function(onFulfilled){
    return new Mypromise(resolve=>{
        this.handle({
            onFulfilled,
            resolve
        })
    })
}