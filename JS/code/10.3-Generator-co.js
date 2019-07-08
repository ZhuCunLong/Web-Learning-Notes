var fs = require('fs');
var co = require('co');


var gen = function* (){
	var f1 = yield readFile('./data/a.txt');
	var f2 = yield readFile('./data/b.txt');
	console.log(f1.toString());
	console.log(f2.toString());
};

var readFile = function (fileName){
	return new Promise(function (resolve, reject){
		fs.readFile(fileName, function(error, data){
			if (error) return reject(error);
			resolve(data);
		});
	});
};

co(gen)
