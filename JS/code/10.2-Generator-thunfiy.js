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
	var r1 = yield readFileThunk('./data/a.txt', 'utf-8');
	console.log(r1);
	var r2 = yield readFileThunk('./data/b.txt', 'utf-8');
	console.log(r2);
};

/*var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
	if (err) throw err;
	var r2 = g.next(data);
	r2.value(function (err, data) {
		if (err) throw err;
		g.next(data);
	});
});*/

function run(fn) {
	var gen = fn();

	let count =0;
	function next(err, data) {
		var result = gen.next(data);
		if (result.done) return;
		result.value(next);
	}

	next();
}

run(gen)
