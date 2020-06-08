/**
 * 插入排序
 */
function insertSort(arr){
    for(let i=1;i<arr.length;i++){
        let k=arr[i];
        let j;
        for(j=i-1;j>=0&&k<arr[j];j--){

            arr[j+1]=arr[j]
            console.log(arr)
        }
        arr[j+1]=k
    }
    return arr;
}
let test=[12,45,23,78,20,8];
console.log(insertSort(test));