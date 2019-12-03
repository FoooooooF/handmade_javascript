# 手写瀑布流
## 基本原理
- 获取页面宽度判断需要生成多少列
- 生成第一行，用数组记录每一行的高度
- 找到高度最短的那一列，向其后添加元素，并记录该列新的高度

## 需求做一个宽度自适应的瀑布流
> 问题：现在的瀑布流每一列的宽度是固定的，在某些屏幕宽度下，会留出多余的白边。

使用媒体查询来判断生成多少列，然后列平分页面的宽度，获取单列的宽度。按照以前的方法继续展示页面。

## 获取图片的原始尺寸
1. 有一种方式可以获取到，直接创建一个新img对象，然后把旧img的src赋值给新的，这时候获取新img的宽度即可
2. HTML5提供了一个新属性naturalWidth/naturalHeight可以直接获取图片的原始宽高。这两个属性在Firefox/Chrome/Safari/Opera及IE9里已经实现。改造下获取图片尺寸的方法。
```js
function getImgNaturalDimensions(img, callback) {
    var nWidth, nHeight
    if (img.naturalWidth) { // 现代浏览器
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
    } else { // IE6/7/8
        var imgae = new Image()
        image.src = img.src
        image.onload = function() {
            callback(image.width, image.height)
        }
    }
    return [nWidth, nHeight]
}
```

# 参考
1. [JS实现瀑布流插件](https://jingyan.baidu.com/article/19020a0a713656529d284218.html)
2. [原生js实现瀑布流效果](https://zhuanlan.zhihu.com/p/55575862)