class Watcher{
    constructor(cb){
        this.cb=cb;
    }
    update(){
        this.cb();
    }
}
class Dep{
    constructor(){
        this.subs=[];
    }
    addSub(cb){
        this.subs.push(cb)
    }
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update();
        })
    }
}
let d=new Dep();
d.addSub(new Watcher(()=>{console.log(1)}));
d.notify();
d.notify();

let d2=new Dep();
d2.addSub(new Watcher(()=>{console.log(11)}));
d2.notify();