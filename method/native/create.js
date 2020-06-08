/**
 * 手写create
 */
if(typeof Object.create!=="function"){
    Object.create=function(proto){
        let Temp=function(){}
        Temp.prototype=proto;

        let obj=new Temp();
        if(arguments.length>1){
            for(let prop in arguments[1]){
                obj[prop]=arguments[1][prop].value;
            }
        }
        return obj;
    }
}