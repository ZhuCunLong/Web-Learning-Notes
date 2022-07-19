# CSS3 @media 查询

常用于自适应样式

```css
/* 屏幕宽度小于960px样式生效 */
@media screen and (max-width: 960px) {
    body {
        background-color:lightblue;
    }
}
/* 屏幕宽度大于1440px样式生效 */
@media screen and (min-width: 1440px) {
    body {
        background-color:lightblue;
    }
}
```

也可以用于link标签

```html
<!-- 宽度大于 900px 的屏幕使用该样式 -->
<link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen.css">
<!-- 宽度小于或等于 600px 的屏幕使用该样式 -->
<link rel="stylesheet" media="screen and (max-width: 600px)" href="smallscreen.css">
```

## 注意声明的顺序

```css
@media screen and (min-width: 1200px){ //>=1200的设备 }
@media screen and (min-width: 992px){ //>=992的设备 }
@media screen and (min-width: 768px){ //>=768的设备 }
```

这种声明方式，当屏幕宽度为1440px，大于1200px的样式会失效，最终使用大于768px的样式效果

正确顺序如下

```css
@media screen and (min-width: 768px){ //>=768的设备 }
@media screen and (min-width: 992px){ //>=992的设备 }
@media screen and (min-width: 1200px){ //>=1200的设备 }
```

这种声明顺序下实际上不同屏幕分辨率的区间也变得明了了

```css
@media screen and (min-width: 768px){ //778px~992px的设备 }
@media screen and (min-width: 992px){ //992px~1200px的设备 }
@media screen and (min-width: 1200px){ //>=1200的设备 }
```

