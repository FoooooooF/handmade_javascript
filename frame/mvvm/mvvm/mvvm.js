function Vue(options={}){
    this.$options=options;  //将所有属性挂载到实例的$options上

    var data=this._data=this.$options.data;


    // 数据劫持
    observe(data);

    //数据代理 将定义在this._data中的数据全部定义到this（vue 实例）上
    // 通过 vue实例代理vue._data
    //vue._data.a -> vue.a
    for(let key in data){
        Object.defineProperty(this,key,{
            enumerable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                if(newVal===this._data[key]){
                    return
                }
                this._data[key]=newVal;
            }
        })
    }

    //模板编译
    new Compile(options.el,this);
}

function Compile(el,vm){
    vm.$el=document.querySelector(el);
    let fragment=document.createDocumentFragment();
    while(child=vm.$el.firstChild){ //将#app节点中的内容移入内存中
        //这个操作会删除vm.$el 中的dom节点吗？？？
        fragment.appendChild(child);
    }
    replace(fragment)
    function replace(fragment){
        Array.from(fragment.childNodes).forEach((node)=>{
            let text=node.textContent;
            let reg=/\{\{(.*)\}\}/;
            if(node.nodeType===3&&reg.test(text)){ //处理文本节点
                console.log(RegExp.$1) //a.a b
                let arr=RegExp.$1.split('.');
                let val=vm;
                arr.forEach((k)=>{
                    val=val[k]
                })

                //每个绑定到页面中的值,都会在compile的时候新建一个订阅者
                new Watcher(vm,RegExp.$1,(newVal)=>{ //函数里需要接受一个新值
                    node.textContent=text.replace(reg,newVal); 
                })

                //初始化时直接替换为实例中的data相应的值
                node.textContent=text.replace(reg,val); 
            }

            if(node.nodeType===1){ //处理元素节点中的指令
                let nodeAttrs=node.attributes;
                Array.from(nodeAttrs).forEach((attr)=>{
                    let name=attr.name;
                    let exp=attr.value;
                    if(name.indexOf('v-')===0){  //v-model
                        node.value=vm[exp];
                    }
                    new Watcher(vm,exp,(newVal)=>{ 
                        node.value=newVal; 
                    })
                    node.addEventListener('input',function(e){
                        let newVal=e.target.value;
                        vm[exp]=newVal;
                    })
                })
            }
            if(node.childNodes){ //如果该节点下还有子节点,继续replace递归
                replace(node)
            }
        })
    }
   
    vm.$el.appendChild(fragment);
}

//观察对象 给对象添加Object.defineProperty
//深度数据劫持
function Observe(data){
    let dep=new Dep();
    for (let key in data){
        let val=data[key];
        observe(val) //如果val 是对象 继续递归 劫持对象
        Object.defineProperty(data,key,{
            enumerable:true,
            get(){
                //获取值得时候 添加订阅者;
                Dep.target&&dep.addSub(Dep.target);
                return val
            },
            set(newVal){
                if(newVal===val){
                    return
                }
                val=newVal
                observe(newVal) //如果newVal 是对象 继续递归 劫持对象
                dep.notify();  //让watcher的update方法执行
            }
        })
    }

}
function observe(data){
    if (typeof data !== "object") return;
    return new Observe(data)
}


  // 发布订阅模式
  function Dep(){
    this.subs=[];
}
Dep.prototype.addSub=function(sub){
    this.subs.push(sub);
}
Dep.prototype.notify=function(){
    this.subs.forEach(sub=>{
        sub.update()
    })
}


function Watcher(vm,exp,fn){
    this.fn=fn;
    this.vm=vm;
    this.exp=exp;
    Dep.target=this;

    //为vm实例设值 会触发Observe的get方法 该方法会添加Dep.target进入订阅队列
    let val=vm;
    let arr=exp.split('.');
    arr.forEach((k)=>{
        val=val[k]
    })
    Dep.target=null;

}
Watcher.prototype.update=function(){
    let val=this.vm;
    let arr=this.exp.split('.');
    arr.forEach((k)=>{
        val=val[k]
    })
    this.fn(val);
}
