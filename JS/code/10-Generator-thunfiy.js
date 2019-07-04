var thunkify = require('thunkify');
var fs = require('fs');

/* ******************************** */
// thunk函数的封装thunkify的基本用法
/*var read = thunkify(fs.readFile);
read('package-lock.json')(function(err, str){
	// ...
	console.log(str.toString())
});*/

/*function f(a, b, callback){
	var sum = a + b;
	callback(sum);
	callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);*/

var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
	var r1 = yield readFileThunk('/data/a');
	console.log(r1.toString());
	var r2 = yield readFileThunk('/data/b');
	console.log(r2.toString());
};

var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
	if (err) throw err;
	var r2 = g.next(data);
	r2.value(function (err, data) {
		if (err) throw err;
		g.next(data);
	});
});
