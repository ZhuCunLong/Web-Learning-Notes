class PubSub{
	constructor(){
		// {
		//   topic1:[fn1,fn2],
		//   topic2:[fn3,fn4],
		// }
		this.topics = {}
		this.subUid = -1
	}
	publish(topic,...args){
		if(this.topics[topic]){
			// 存在 遍历所有topic下的fn
			this.topics[topic].forEach(({fn})=> fn(...args))
		}
	}
	subscribe(topic,fn){
		this.topics[topic] = this.topics[topic] || []
		const token = ++this.subUid + ''
		this.topics[topic].push({
			token,
			fn
		})
		return token
	}
	// 基于订阅上的标记引用，通过特定topic取消订阅
	unSubscribe(token){
		for(const key in this.topics){
			const topicArray = this.topics[key]
			for(let i =0;i<topicArray.length;i++){
				if(topicArray[i].token === token) {
					topicArray.splice(i, 1)
					return
				}
			}
		}
	}
}
