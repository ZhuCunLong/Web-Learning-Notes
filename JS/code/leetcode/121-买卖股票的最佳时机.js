var maxProfit = function(prices) {
	let max = 0;
	let left = 0
	for(let j = 1;j<prices.length; j++) {
		if(prices[j] >= prices[left]) {
			max = Math.max(prices[j] - prices[left], max)
		} else {
			left = j
		}
	}
	return max
};

console.log(maxProfit([7,1,5,3,6,4]))
