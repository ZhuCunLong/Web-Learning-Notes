# dom resize事件监听

不知道什么时候 window上多了一个[resizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)类方法，从MDN上我们可以看到该特性应该还在提案阶段，所有只有部分比较新的浏览器支持，但是社区提供了对应的polyfill来解决低版本浏览器的兼容问题，可兼容ie9及以上版本

具体代码如下：

```ts
import ResizePolyfill from 'resize-observer-polyfill'

function resizeObserver (el, resizeEvent: (contentRect: any, target: HTMLElement) => void) {
  let Observer = _.get(window, 'resizeObserver')
  if (!Observer) {
    Observer = ResizePolyfill
  }

  const observer = new Observer(entities => {
    if (entities && entities.length) {
      entities.forEach(entity => {
        // contentRect:位置大小信息
        // target:dom信息
        const { contentRect, target } = entity
        const { handleResize } = target
        if (handleResize) {
          handleResize(contentRect, target)// 目标对象发生改变之后的逻辑操作
        }
      })
    }
  })

  el.handleResize = resizeEvent
  observer.observe(el)
}
```

`_`表示lodash

