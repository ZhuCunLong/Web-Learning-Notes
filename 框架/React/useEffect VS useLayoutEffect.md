# useEffect VS useLayoutEffect

`useEffect`和`useLayoutEffect`的区别仅有一个：

- `useEffect`执行时机是在React的渲染和提交阶段之后；
- `useLayoutEffect`执行时机是在React的提交阶段之后，但在浏览器实际绘制屏幕之前

## **何时使用`useEffect`**

- **副作用与DOM无关**：例如，数据获取、设置订阅、手动更改浏览器的URL等。
- **不需要立即同步读取或更改DOM**：如果你不关心可能的微小布局跳动或闪烁，那么`useEffect`就足够了。
- **性能考虑**：`useEffect`通常对性能影响较小，因为它不会阻塞浏览器渲染。

## 何时使用`useLayoutEffect`

- **需要同步读取或更改DOM**：例如，你需要读取元素的大小或位置并在渲染前进行调整。
- **防止闪烁**：在某些情况下，异步的`useEffect`可能会导致可见的布局跳动或闪烁。例如，动画的启动或某些可见的快速DOM更改。
- **模拟生命周期方法**：如果你正在将旧的类组件迁移到功能组件，并需要模拟 `componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的同步行为。

