
class SignalSlot {
	constructor(){
		//Array of slots
		this.handlers = [];

		//All Magic
		let regExp = new RegExp('^signal_');
		Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((signal) => {
			if(signal.match(regExp)){
				this[signal] = function(...args){
					this.handlers.filter(value => value.hasOwnProperty(signal)).map((handler) => {
						handler[signal].object[handler[signal].function](...args)
					})
				}
			}
		});
	}
 
	connect(signal, obj, fn){
		let o = {};
		o[signal] = { "object": obj, "function" : fn }
		this.handlers.push(o)
	}

	disconnect(signal, obj, fn){
		let index = -1;
		do{
			index = this.handlers.findIndex(data => data[signal]['function'] == fn && data[signal]['object'] == obj);
			if(index != -1){
				this.handlers.splice(index, 1);
			}
		}while(index != -1)
	}
}
