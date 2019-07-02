let obj = {
	a: '1',
	b: '2',
	c: function () {
		console.log(this)
	},
	d:()=>{
		console.log(this)   //从这里开始，this就永远不可能是obj了
	},
	e(){
		console.log(this)
		this.d();
		this.c();
	}
}

this.a = 'a'
/*obj.c();
obj.d();*/
obj.e();
