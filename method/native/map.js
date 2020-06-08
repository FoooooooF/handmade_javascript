/**
 * 手写map
 */
if(!Array.prototype.myMap){
    Array.prototype.myMap=function(fun){
        let a=[];
        for(let i=0;i<this.length;i++){
            a[i]=fun(this[i],i)
        }
        return a;
    }
}