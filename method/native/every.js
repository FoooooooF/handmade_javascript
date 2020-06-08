/**
 * 手写数组方法 every
 */

if(!Array.prototype.myEvery){
    Array.prototype.myEvery=function(fun){
        for(let i=0;i<this.length;i++){
            if(!fun(this[i],i,this)){
                return fasle
            }
        }
        return true;
    }
}