# npm

npm用来在项目中安装第三方包，以下两个指令都能够在项目中添加依赖

```shell
npm install jQuery --save
```

```shell
npm install jQuery 
```

但是第一条指令会在项目中生成一个`package.json`文件，保存项目中的所有相关依赖

## npm网站

> npmjs.com

## npm常用指令

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

# package.json

包描述文件，就像产品的说明书一样

- 建议每个项目的根目录下都有一个`package.json`文件

- 建议执行`npm insatll 包名`的时候都加上`--save`这个选项，目的是用来保存依赖项信息

>npm5以前是不会有`package-lock.json`这个文件的
>
>npm以后才加入了这个文件
>
>当你安装包的时候，npm都会生成或者更新`package-lock.json`
>
>- npm5以后的版本不需要加`--save`，它会自动保存依赖信息
>- 当你安装包的时候，会自动创建或者更新`package-lock.json`这个文件
>- `package-lock.json`这个文件会保存`node_modules`中所有包的信息(版本、下载地址)
>  - 这样的话重新`npm install`的时候速度就可以提升
>- 从文件来看，有一个`lock`称之为锁
>  - 锁定版本号，防治自动升级新版

