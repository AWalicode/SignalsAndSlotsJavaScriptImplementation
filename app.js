'use strict';


//==========Extend SignalSlot====================================================
class Child extends SignalSlot{
	constructor(candyLimit){
		super();
		this.candyBag = null;
		this.eatenSweets = 0;
		if(candyLimit != null){
			this.candyLimit = candyLimit;
		}else{
			this.candyLimit = 5;
		}
	}
	//Signals ===================================================================
		signal_limitOfCandiesReached(logicValue){}
		signal_giveMeBagOfCandy(){}
	//===========================================================================

	eatOneCandy(){
		try{
			if(this.candyBag.onTop){
				this.eatenSweets++;
				document.getElementById("app").innerHTML += `Child ate ${this.eatenSweets} candy <br/>`;
				if(this.eatenSweets > this.candyLimit){
					//starting the signal=================================
						this.signal_limitOfCandiesReached(true);
					//====================================================
				}
			}else{
				alert("Mom took a sack of candies :(");
			}
		}catch(CandiesNoFound){
			alert("Child: Where is my bag of candies?????")
			//starting the signal=========================================
				this.signal_giveMeBagOfCandy();
			//============================================================
		}
	}

	takeCandyBag(candyBag){
		this.candyBag = candyBag;
	}
}



class Parent{
	constructor(child, candyBag){
		this.child = child;
		this.candyBag = candyBag;
		//Function Connect =======================================================
			this.child.connect("signal_limitOfCandiesReached", this, "hideCandies");
			this.child.connect("signal_giveMeBagOfCandy", this, "giveChildCandyBag");
		//========================================================================
	}

	hideCandies(logicValue){
		this.candyBag.hideCandyBag();
	}

	giveChildCandyBag(){
		document.getElementById("app").innerHTML += `Parent: gives candy to the child <br/>`;
		this.child.takeCandyBag(this.candyBag);
	}
}



class CandyBag{
	constructor(candies){
		this.onTop = true;
	}

	hideCandyBag(){
		this.onTop = false;
	}
}