// const url= 'https://www.nowcoder.com/test/question/8b3c9b90fcb7476b97c671dfaaad2cbd?pid=27974724&tid=41286293'
var readline = require('readline')
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal:false
});

let cur_line = 0
let lineCount
let arr = []
let tree = []
rl.on('line', function(line){
	if(cur_line === 0){
		arr = line.split(' ');
		arr = arr.map(item => parseInt(item))
		lineCount = arr[1]
		const length = arr[0]
		tree = Array.from({length}, (v,i)=>{
			return {
				left: -1,
				right: -1
			}
		})
		cur_line++
	} else if(cur_line < lineCount +1){
		if(line.indexOf('left') !== -1){
			arr = line.split('left')
			const parent =arr[0]-1
			tree[parent].left = arr[1] - 1
		} else {
			arr = line.split('right')
			const parent =arr[0]-1
			tree[parent].right = arr[1] - 1
		}
		cur_line++
		if(cur_line === lineCount+1){
			handleTree(tree)
			tree = []
			cur_line = 0
		}
	}
})

function handleTree(tree){
	let count = 0
	for(let i = 0;i<tree.length;i++){
		const {left ,right} = tree[i]
		if(left===-1||right===-1){
			continue
		}
		if(isLeaf(left) && isLeaf(right)){
			count ++
		}
	}
	console.log(count)
}

function isLeaf(node){
	const {left, right} = tree[node]
	return left===-1&&right===-1
}
