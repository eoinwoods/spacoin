'use strict';
var SpaCoin = artifacts.require("SpaCoin");

module.exports = function(exitCallback) {
	var coin ;

	SpaCoin.new().then(function(instance){
		coin = instance ;
		console.log("New SpaCoin contract address is " + coin.address) ;
		return coin.outstandingValue.call() ;
	}).then(function(result) {
		console.log("Network has " + result.toNumber() + " coins outstanding") ;
	});

	exitCallback() ;
}