# Object.defineProperty
> vue数据绑定的的核心api，它作了什么？ 在读取数据的时候通过get方法实现代理（vue 中直接通过，this.msg 获取data中的数据），在写入数据的数据通过set方法，触发页面更新。


## 概念
概念

> Object.defineProperty(obj, prop, descriptor)


- obj：要在其上定义属性的对象
- prop：要定义或修改的属性的名称
- descriptor：将被定义或修改的属性描述符

前俩个参数很简单明了，就是指出要在哪个对象上定义或修改哪个属性。重要的是属性的描述符，当我们通过.运算符定义或修改属性的时候，其实等同于调用了Object.defineProperty()。如下：
```js
const man = {}
man.name = 'lihaoze'
Object.getOwnPropertyDescriptor(man, 'name')
// {value: "lihaoze", writable: true, enumerable: true, configurable: true}
```

```js
const man = {}
Object.defineProperty(man, 'name', {
  value: 'lihaoze',
  writable: true,
  configurable: true,
  enumerable: true
})
Object.getOwnPropertyDescriptor(man, 'name')
// {value: "lihaoze", writable: true, enumerable: true, configurable: true}
```
value顾名思义就是属性对应的值，但其不一定是必须存在的。它与setter、getter互斥。后面我们会讲到。那writable,enumerable,configurable具体是什么用处呢，我们接下来分别介绍。



## 一般使用