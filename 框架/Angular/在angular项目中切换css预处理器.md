# 在angular项目中切换css预处理器

如果你使用`angular-cli`创建项目时选择的css预处理器用起来不爽，又不可能新建项目做代码迁移，那么可以试试这个方法

- setp1

  在项目文件下打开终端，输入以下指令，修改默认的css预处理器，我是把css转换为scss。

  ```shell
  ng config schematics.@schematics/angular:component.styleext scss
  ```

  完成这个步骤之后，在项目中新建一个组件，对应的css预处理文件会变为scss的格式，但是本人作为一个代码洁癖又有强迫症的人，我想要把之前写过的css全部转换为scss格式，就会出现一个问题

  - 首先我在没有停止项目的情况下，它给我报错了，大概就是项目默认之前的样式文件格式依然为css，但是你给人家改了，报错！

- setp2 

  重启项目，ok，依然有问题，大概就是项目中的`node-sass`这个包短路了，有点什么问题，建议操作是rebuild一下`node-sass`这个包
  
- setp3

  ```shell
  npm rebuild node-sass
  ```

  ok，问题圆满解决