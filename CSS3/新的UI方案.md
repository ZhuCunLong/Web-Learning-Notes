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
  // 一定要配合unicode-bidi: bidi-override来使用
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

## 盒模型新增样式

### 盒模型阴影

**box-shadow** 以由逗号分隔的列表来描述一个或多个阴影效果。该属性可以让几乎所有元素的边框产生阴影。如果元素同时设置了 `border-radius`，阴影也会有圆角效果。多个阴影的z-ordering 和多个 text shadows规则相同(第一个阴影在最上面)。

默认值：none

不可继承

**语法**

```css
/* x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页(阴影向内) | x偏移量 | y偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;
```

**语法**

`inset`

不使用`inset`，默认阴影在边框外，即阴影向外扩散。
使用 `inset` 后，阴影在边框内（即使是透明边框），即阴影向内扩散，背景之上内容之下。

`<offset-x>` `<offset-y>`

这是头两个 `<length>` 值，用来设置阴影偏移量。x,y 是按照数学二维坐标系来计算的，只不过y垂直方向向下。  `<offset-x>` 设置水平偏移量，正值阴影则位于元素右边，负值阴影则位于元素左边。 `<offset-y>` 设置垂直偏移量，正值阴影则位于元素下方，负值阴影则位于元素上方。

如果两者都是0，那么阴影位于元素后面。这时如果设置了`<blur-radius>` 或`<spread-radius>` 则有模糊效果。需要考虑 `inset` 

`<blur-radius>`

这是第三个`<length>`值。值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利。需要考虑 `inset` 

`<spread-radius>`

这是第四个`<length>`值。取正值时，阴影扩大；取负值时，阴影收缩。默认为0，此时阴影与元素同样大。需要考虑 `inset` 

`<color>`

如果没有指定，则由浏览器决定——通常是`color`的值，不过目前Safari取透明。

### 倒影

`-webkit-box-reflect`

目前只有谷歌浏览器支持

### `resize`

```css
div{
  display: inline-block;
  width： 200px；
  height: 200px;
  background: pink;
  vertical-align: middle;
  resize: both;
  //一定要配合overflow来使用
  overflow: auto;
}
```

### `box-sizing`

这个属性有点意思

和`padding`属性的值有关，比如

```html
<style>
  input{
    width: 200px;
    padding: 0 50px;
  }
</style>
<body>
  <input type="text"/>
</body>
```

上述样式最终输入框的宽度会被撑为300px，输入内容的部分占200px，前后空50px

如果设置了`box-sizing`就符合预设了

```css
input{
  width: 200px;
  padding: 0 50px;
  box-sizing: border-box;
}
```

## 新增UI样式

### 圆角

`border-radius`

