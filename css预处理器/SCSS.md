# SCSS

## Mixin混合语法

### 定义混合指令`@mixin`

```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

### 应用混合样式`@include`

```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```

编译为：

```css
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; 
}
```

