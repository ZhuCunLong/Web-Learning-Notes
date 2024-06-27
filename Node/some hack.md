# Some hack

## glob

`glob` 是一个用于文件路径匹配的工具，在 Node.js 中通常用来查找文件。它使用类似于 shell 的通配符来匹配文件路径。

- 使用场景

  如果要针对某一个项目做批量操作，可以结合babel修改源文件，例如查找所有使用了catch的地方，并标记，又或者是修改某一个包的引用

  这种方式不依赖webpack，实际也没有必要依赖webpack，主打一个无脑扫描无脑干

```js
const glob = require('glob');
const path = require('path');

const cwd = path.resolve(__dirname, 'project');

console.time('glob');
glob('src/**/*.+(md|png|jpg|jpeg|gif|svg|mp4|webm|ogg|mp3|wav|flac|aac|woff|woff2|eot|ttf|otf)', { cwd, dot: true }, (err, matches) => {
  console.timeEnd('glob');
  if (err) {
    console.error('Error occurred:', err);
    return;
  }
  console.log('Matched files:', matches);
});
```

