# Virtual DOM 虚拟dom
流行框架react 和vue 都使用了Virtual DOM，现在对Virtual DOM的生成和渲染进行分析
## 虚拟DOM
```js
{
  tag: 'div',
  props: {
    class: 'app',
    name:"app"
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'hello world!!!'
      ]
    }
  ]
}
```
### 渲染虚拟DPOM为真实DOM
```js
function render(vdom) {
  // 如果是字符串或者数字，创建一个文本节点
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    return document.createTextNode(vdom)
  }
  const { tag, props, children } = vdom
  // 创建真实DOM
  const element = document.createElement(tag)
  // 设置属性
  setProps(element, props)
  // 遍历子节点，并获取创建真实DOM，插入到当前节点
  children.forEach((el)=>{element.appendChild(render(el))})

  // 虚拟 DOM 中缓存真实 DOM 节点
  vdom.dom = element

  // 返回 DOM 节点
  return element
}

function setProps (element, props) {
  Object.entries(props).forEach(([key, value]) => {
    setProp(element, key, value)
  })
}

function setProp (element, key, vlaue) {
  element.setAttribute(
    // className使用class代替
    key === 'className' ? 'class' : key,
    vlaue
  )
}
```

## 参考
- [虚拟 DOM 到底是什么？](https://zhuanlan.zhihu.com/p/75533792)
- [Vitual DOM 的内部工作原理](https://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/)