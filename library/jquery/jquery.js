(function(window){//传入全局window对象
    /**
     *创建Jquery构造函数 
     * @param {*} arg 
     */
    function Jquery(arg){
        this.event=[];
        switch(typeof arg){
            case "function":
                addEvent(window,"load",arg);
                break;
            case "string":  //例如$(".box","#box")
                var target=document.querySelectorAll(arg);
                this.event=this.event.concat(...target);
                break;
            case "object":
                break;
            default:
                break;
        }
    }
    
    /**
     * 事件绑定函数
     * @param {Node} tar 事件绑定目标 
     * @param {string} type  //事件类型
     * @param {function} cb  //事件的回调函数
     */
    function addEvent(tar,type,cb){
        
        console.log(tar);
        tar.addEventListener(type,cb,false); // 参数1：事件类型,参数2：回调函数,参数3：事件的捕获
    }
    //在Jquery原型上定义方法
    Jquery.prototype={
        click:function(fn){
            console.log(this.event);
            for(var i=0;i<this.event.length;i++){
                addEvent(this.event[i],"click",fn); //调用事件绑定函数
            }
        }
    }
    function $(arg){
        return new Jquery(arg);
    }

    // 将函数内的$赋值大全局window的$和jquery属性上
    window.$= window.jquery=$;
})(window)
