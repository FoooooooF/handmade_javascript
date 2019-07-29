# handmade sort 手写排序算法

## 冒泡排序
```javascript
    function bubbleSort(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                let temp;
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
```

## 插入排序
```javascript
    function insertSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let k = arr[i];
            let j;
            for (j = i - 1; j >= 0 && k < arr[j]; j--) {

                arr[j + 1] = arr[j]
                console.log(arr)
            }
            arr[j + 1] = k
        }
        return arr;
    }
```   
