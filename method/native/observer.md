```js
var subject = {
	observers: [],
	notify() {
		this.observers.forEach(observer =>{
			observer.update()
		})
	},
	attach (observer) {
		this.observers.push(observer)
	}
}
var observer = {
	update(){
		alert('updated')
	}
}
subject.attach(observer)
subject.notify()
```
而使用订阅发布模式，使用中间订阅发布对象的方式如下
```js
var publisher = {
	publish(pubsub) {
		pubsub.publish()
	}
}
var pubsub = {
	subscribes: [],
	publish() {
		this.subscribes.forEach(subscribe =>{
			subscribe.update();
		})
	},
	subscribe(sub) {
		this.subscribes.push(sub)
	}
}
var subscribe = {
	update() {
		console.log('update')
	},
        subscribe(pubsub) {
            pubsub.subscribe(this);
        }
}
subscribe.subscribe(pubsub)
publisher.publish(pubsub)
```
自己认为，两种模式本质都是一样的，主要关键点都在于注册（添加到注册数组中）和触发（触发注册数组中的内容），只是订阅/发布模式对注册和触发进行了解耦。可以看到，使用订阅发布模式中发布者触发publish的时候，可以选择触发哪一些订阅者集合（因为publish参数传递了中间集合，可以定义多个pubsub集合），而观察者模式则只能触发所有的被观察对象。

浏览器addEventListener 观察者模式