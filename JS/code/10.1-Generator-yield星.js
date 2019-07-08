function* genFuncWithReturn() {
	yield 'a';
	yield 'b';
	return 'The result';
}
function* logReturned(genObj) {
	let result = yield* genObj;
	console.log(result);
}

console.log([...logReturned(genFuncWithReturn())])
