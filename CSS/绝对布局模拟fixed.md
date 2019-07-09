# 绝对布局模拟fixed

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>fixed</title>
  <style>
    html,body{
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    #wrap{
      height: 100%;
      border: 1px solid red;
      overflow: auto;
    }
    #test{
      height: 3000px;
    }
    #fixed{
      position: absolute;
      width: 200px;
      height: 200px;
      left: 20px;
      top: 20px;
      background: aqua;
    }
  </style>
</head>
<body>
<div id="wrap">
  <div id="test"></div>
  <div id="fixed"></div>
</div>
</body>
</html>
```

