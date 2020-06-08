/**
 * 冒泡排序
 * 气泡会从水底冒出水面
 * bubbleSort
 */
 function bubbleSort(arr){
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr.length-i-1;j++){
            let temp;
            if(arr[j]>arr[j+1]){
                temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
}
let test=[12,45,23,78,20,8]
console.log(bubbleSort(test));