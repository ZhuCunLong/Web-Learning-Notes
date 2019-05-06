// webpack 主体就是一个自执行函数
// 函数的参数是一个modules对象
(function (modules) {
	// The module cache 先定义一个缓存
	var installedModules = {};

	// The require function  实现了require方法
	// 浏览器环境下，不支持node中的require方法，所以webpack做出了实现

	function __webpack_require__(moduleId) {  // "./src/index.js"
		// Check if module is in cache   判断模块是否已经在缓存中，或者说是否已经加载过，有点类似缓存函数
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;  // 如果在缓存中，直接返回导出内容
		}
		// Create a new module (and put it into the cache)
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,     // 模块是否被加载
			exports: {}
		};
		// Execute the module function 执行模块函数
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		// Flag the module as loaded
		module.l = true;
		// Return the exports of the module
		return module.exports;
	}

	// 唯一无法理解的地方，形参是一个赋值语句，如何把字符串传给moduleId
	return __webpack_require__(__webpack_require__.s = "./src/index.js");
})({
	"./src/a.js": function (module, exports) {
		module.exports = 'hello world'
	},
	"./src/index.js": function (module, exports, __webpack_require__) {
		let str = __webpack_require__("./src/a.js")
		console.log(str)
	}
})
