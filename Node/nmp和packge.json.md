# npm

npm用来在项目中安装第三方包，以下两个指令都能够在项目中添加依赖

```shell
npm install jQuery --save
```

```shell
npm install jQuery 
```

但是第一条指令会在项目中生成一个`package.json`文件，保存项目中的所有相关依赖

# package.json

包描述文件，就像产品的说明书一样

- 建议每个项目的根目录下都有一个`package.json`文件

- 建议执行`npm insatll 包名`的时候都加上`--save`这个选项，目的是用来保存依赖项信息

# npm网站

> npmjs.com

# npm常用指令

如果不想安装`cnpm`又想使用淘宝的镜像服务器来下载；

```shell
npm install jquery --registry=https://registry.npm.taobao.org
```
但是每一次手动这样加参数很麻烦，所以我们可以把这个选项加入配置文件中

```shell
npm config set registry https://registry.npm.taobao.org

# 查看npm配置信息
npm config list
```

只要经过了上面命令的配置，则你以后所有的`npm install`都会默认通过淘宝服务器来下载

