class ObserverList{

	constructor() {
		this.observerList = []
	}

	Add(obj){
		return this.observerList.push(obj)
	}

	Empty(){
		this.observerList = []
	}

	Count(){
		return this.observerList.length
	}

	Get(index){
		if(index>-1&&index<this.observerList.length){
			return this.observerList[index]
		}
	}

	Insert(obj, index){
		let pointer = -1
		if(index === 0){
			this.observerList.unshift(obj)
			pointer = index
		} else if(index === this.observerList.length){
			this.observerList.push(obj)
			pointer = index
		}
		return pointer
	}

	IndexOf (obj, startIndex){
		let i = startIndex, pointer = -1
		while(i<this.observerList.length){
			if(this.observerList.length){
				pointer = i
			}
			i++
		}
		return pointer
	}

	RemoveIndexAt(index){
		if(index === 0){
			this.observerList.shift()
		} else if(index === this.observerList.length -1){
			this.observerList.pop()
		}
	}

}

class Observer {
	constructor() {
		this.Update = function (){

		}
	}
}

function extend(obj, extension){
	for(let key in obj){
		extension[key] = obj[key]
	}
}


