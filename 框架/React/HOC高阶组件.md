# HOC高阶组件

## what

- React高阶组件（Higher-Order Component, HOC）是一种高级的React组件抽象
- 纯函数，传入的是一个组件a，返回的是一个组件b，且a不能被改变

## 能干什么

- 逻辑复用
  - 状态管理
  - 副作用处理
  - 权限控制
  - 生命周期管理（通过class component的反向继承来实现）

## how

- 属性代理

  ```jsx
  function HOC(WrappedComponent) {
    const newProps = {
      name: 'xxx'
    }
    
    // 统一的props数据处理逻辑，可能是获取公共数据，可能是统一的逻辑处理
    
    return props => {
      return (
        <WrappedComponent {...props} {...newProps}></WrappedComponent>
      )
    }
  }
  ```

- 组件包裹

  ```jsx
  function HOC(WrappedComponent) {
    const [loading, setLoading] = useState(false) 
    
    // 统一的loading状态处理逻辑
    
    return props => {
      return (
        <Spinning loading={loading}>
           <WrappedComponent {...props} ></WrappedComponent>
        </Spinning>
      )
    }
  }
  ```

- 条件渲染

  ```jsx
  function HOC(WrappedComponent) {
    const [auth, setAuth] = useState(false) 
    
    // 统一的权限处理状态处理逻辑
    
    return props => {
      return (
        <>
        	{auth && (<WrappedComponent {...props} ></WrappedComponent>)}
        </>
      )
    }        
  }
  ```

- 反向继承

  ```jsx
  function HOC(WrappedComponent) {
    return class extends WrappedComponent {
      constructor(props){
        super(props)
        this.state = {}
      }
      
      componenetWillMount() {
        if(super.componenetWillMount) {
          super.componenetWillMount()
        }
        // doSomething
      }
      
      componenetDidMount() {
        if(super.componenetDidMount) {
          super.componenetDidMount()
        }
        // doSomething
      }
      
      render() {
        const tree = super.render()
        // 这里甚至可以操作虚拟dom tree，使用react.CloneElement()改变dom 树
        // 从而影响组件的内部逻辑
        return tree
      }
    }
  }
  ```

  反向继承是唯独使用class component组件才能实现