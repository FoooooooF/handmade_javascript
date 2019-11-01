let obj={
    a:1,
    b:2
}
var bvalue;
Object.defineProperty(obj,"a",{
    set:(value)=>{
       bvalue=value;
    },
    get:()=>{
        return 100;
    },
    enumerable : true,
    configurable : true
})
obj.a=2;
console.log(obj.a)