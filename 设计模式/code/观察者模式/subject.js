/*class Subject{
	constructor() {
		this.observers = new ObserverList()
	}

	AddObserver (observer) {
		this.observers.Add(observer)
	}

	RemoveObserver (observer) {
		this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0))
	}

	Notify (context) {
		const observerCount = this.observers.Count()
		for(let i = 0;i<observerCount;i++){
			this.observers.Get(i).Update(context)
		}
	}
}*/

function Subject() {
	this.observers = new ObserverList()
}

Subject.prototype.AddObserver = function (observer) {
	this.observers.Add(observer)
}

Subject.prototype.RemoveObserver = function (observer) {
	this.observers.RemoveIndexAt(this.observers.IndexOf(observer, 0))
}
Subject.prototype.Notify = function (context) {
	const observerCount = this.observers.Count()
	for(let i = 0;i<observerCount;i++){
		this.observers.Get(i).Update(context)
	}
}
