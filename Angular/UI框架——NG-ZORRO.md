# NG-ZORRO

## 快速上手

1. 创建项目

2. 初始化配置

   执行以下命令，自动完成`ng-zorro-antd`的初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作

   ```shell
   ng add ng-zorro-antd
   ```


## 采坑

[官方教程](https://github.com/NG-ZORRO/today-ng-steps)中的坑

1. 添加组件之前，给组件绑定了一个模块，导致在组件中使用`[(ngModel)]`时必须在新添加的模块中引入`FormsModule`，教程中的做法需要在跟组件中引入组件对应的模块，而通过直接建立组件不绑定模块的做法需要在根组件中引入对应的组件。

