# 新的UI方案

## 文本新增样式

### opacity

更改透明度

### 新增的颜色模式rgba

```css
#wrap{
  background: rgba(0,0,0,0.5)
}
```

更改透明度

### 文字阴影

`text-shadow`

可以添加多层，阴影之间用逗号隔开。（多个阴影时，第一个阴影在最上边）

默认值：none       不可继承

|     值     | 是否必选 | 描述                                            |
| :--------: | :------: | :----------------------------------------------------------- |
|<color>| 可选 | 可以在偏移量之前或之后指定。如果没有指定颜色，则使用UA（用户代理）选择的颜色 |
| <offset-x> |    必选    | 指定水平偏移量，若是负值则阴影位于文字左边 |
| <offset-y> | 必选 | 指定垂直偏移量，若是负值则阴影位于文字上面边<br />如果两者均为0，则阴影位于文字正后方（如果设置了<blur- radius>则会产生模糊效果） |
| <blur- radius> | 可选 | 这是<length>值。如果没有指定，则默认为0.值越大，模糊半径越大，阴影也就越大越淡 |

- 浮雕特效

```css
.fudiao{
  color:white;
  text-shadow: black 1px 1px 10px;
}
```

- 动画模糊效果

```css
h1{
  color:black;
  transition:1s;
}

h1:hover{
  color:rgba(0,0,0,0);
  text-shadow: black 0 0 100px;
}
```

- 模糊背景

### 文字描边

- `-webkit-text-stroke`属性

```css
.mystroke{
  font: 100px/200px "微软雅黑";
  text-align: center;
  color: white;
  -webkit-text-stroke: 4px pink;
}
```

### 文字方向

```css
div{
  width: 200px;
  height: 200px;
  border: 1px solid;
  margin: 0 auto;
  /******************/
  direction: rtl;
  unicode-bidi: bidi-override;
}
```

### 文字溢出显示省略号

```css
div{
  width: 200px;
  height: 200px;
  border: 1px solid;
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

