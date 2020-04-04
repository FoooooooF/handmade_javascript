class MVVM{
    constructor(options){
        this.$el=options.el;
        this.$data=options.data;
        if(this.$el){
            //把数据 全部不转化Object.defineProperty来定义
            new Observer(this.$data);
            console.log(this.$data);
            new Compiler(this.$el,this);
        }
    }
}
//订阅
class Dep{
    constructor(){
        this.subs=[]; //存放所有的wacther
    }
    //订阅
    addSub(watcher){
        this.subs.push(watcher);
    }
    //发布
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
}
//观察者模式 (发布订阅)
class Watcher{
    constructor(vm,expr,cb){
        this.vm=vm;
        this.expr=expr;
        this.cb=cb;
        //默认先存放那一个老值
        this.oldValue=this.get();
    }
    get(){ //vm.$data.obj vm.$data.obj.a
        Dep.target=this; //存储当前的watcher 到Dep.target 上
        //取值 把观察者与数据关联起来
        let value=CompileUtils.getVal(this.vm,this.expr);
        Dep.target=null;
        return value;
    }
    //数据更新后会调用观察者的update方法
    update(){
        let newValue=CompileUtils.getVal(this.vm,this.expr);
        if(newValue!=this.oldValue){
            this.cb(newValue);
        }
    }
}

//数据劫持
class Observer{
    constructor(data){
        this.observer(data);
    }
    observer(data){
        if(data&& typeof data==="object"){
            for(let key in data){
                this.defineReactive(data,key,data[key]);
            }
        }
    }
    defineReactive(obj,key,value){
        this.observer(value);
        let dep=new Dep(); //没给一个属性,都加上一个订阅器
        Object.defineProperty(obj,key,{
            get(){
                Dep.target&&dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{ 
                if(newVal!=value){
                    //如果赋值是对象,重新劫持
                    //使用箭头函数,不改变this指向
                    this.observer(newVal); 
                    value=newVal;
                    dep.notify();
                }
            }
        })
    }
}
//模板编译
class Compiler{
    constructor(el,vm){
        this.el=this.isElementNode(el)?el:document.querySelector(el);
        this.vm=vm;
        //获取当前节点中的元素放到内存中
        let fragment=this.node2fragment(this.el);
        //替换模板中的内容
        //编译模板 使用数据编译 (vue2使用ast处理)
        this.compile(fragment)
        //把内容放回节点中
        this.el.appendChild(fragment);
    }
    compile(node){
        let childNodes=node.childNodes;
        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){
                this.compileElement(child)
                //如果是元素 递归遍历子节点
                this.compile(child);
            }else{
                this.compileText(child)
            }
        })
    }
    //判断是不是指令
    isDirective(attrName){
        return attrName.startsWith('v-');
    }
    //编译元素
    compileElement(node){
        // attributes 类数组对象
        let attributes=node.attributes;
        [...attributes].forEach(attr=>{ //v-model="config"
            let {name,value}=attr;
            if(this.isDirective(name)){
                console.log(node,name,value);
                let [,directive]=name.split('-');
                CompileUtils[directive](node,value,this.vm);
            }
        })
    }
    //编译文本
    compileText(node){ //判断当前文本中的内容是否包含 {{name}} {{aaa}}
        let content=node.textContent;
        if(/\{\{(.+?)\}\}/.test(content)){
           //找到所有文本
           CompileUtils['text'](node,content,this.vm)
        }
    }
    node2fragment(node){
        let fragment=document.createDocumentFragment();
        let firstChild;
        while(firstChild=node.firstChild){
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
    isElementNode(node){
        return node.nodeType===1;
    }
}

//编译方法
let CompileUtils={
    getVal(vm,expr){
        return expr.split(".").reduce((acc,cur)=>{
            return acc[cur];
        },vm.$data);
    },
    setVal(vm,expr,value){
        return expr.split(".").reduce((acc,cur,index,arr)=>{
            if(arr.length-1===index){
                acc[cur]=value
            }
        },vm.$data);
    },
    //node 是节点 expr 是表达式 vm是当前Vue实例
    model(node,expr,vm){ 
        //给输入框如遇value 属性 node.value=xxx
        let fn=this.updater["modelUpdater"];
        new Watcher(vm,expr,(newVal)=>{
            //给输入框一个观察者,如果稍后数据更新了会触发此方法
            //使用新值为输入框赋值
            fn(node,newVal)
        })
        node.addEventListener('input',(e)=>{
            let value=e.target.value;//获取用户输入
            this.setVal(vm,expr,value);
        })
        let value=this.getVal(vm,expr);
        fn(node,value);

    },
    getContentValue(vm,expr){
        //遍历表达式,将内容从新换为一个完整的内容返回
        return expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(vm,args[1]);
        })
    },
    text(node,expr,vm){
        let fn=this.updater["textUpdater"];
        //replace 操作熟悉 获取当前的匹配字符串,并替换
        let content=expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            //给表达式每个{{}} 都加上观察者
            new Watcher(vm,args[1],(newVal)=>{
                fn(node,this.getContentValue(vm,expr))
            })
            return this.getVal(vm,args[1]);
        })
        fn(node,content);
    },
    updater:{
        modelUpdater(node,value){
            node.value=value;
        },
        textUpdater(node,value){
            node.textContent=value;
        }
    }
}