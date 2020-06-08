/**
 * 手写bind
 * 示例：
 * fun().bind(a);
 * 
 */

if(!Function.prototype.mybind){
    Function.prototype.mybind=function(target){
        //通过this获取调用bind  的函数
        let fun=this;
        //去掉第一个参数
        let args=Array.prototype.slice.call(arguments,1);
        return function(){
            // 调用函数，拼接两次传递的参数
            fun.apply(
                target,
                args.concat(
                    Array.prototype.slice.call(arguments)
                )
            )        
        }
    }
}

//example
let lilei={name:"lilei",age:"12"};
let meimei={name:"meimei",age:"10"};

function info(weight,hight){
    console.log(
        `我的名字是${this.name},我${this.age}岁,我体重${weight}公斤,身高${hight}cm`
    )
}
let lilei_info=info.mybind(lilei,50);
let meimei_info=info.mybind(meimei,48);

lilei_info(170);
meimei_info(168);