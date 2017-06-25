'use strict';
var SpaCoin = artifacts.require("SpaCoin");

module.exports = function(exitCallback) {
	var coin ;

	var CONTRACT_ADDR = "0x16bc4143116ecafed7168bdf4169573982da0a15" ;

	var testuser = web3.eth.accounts[1] ;

	// or SpaCoin.deployed().then(...) to find it
	SpaCoin.at(CONTRACT_ADDR).then(function(instance){
		coin = instance ;
		return coin.outstandingValue.call() ;
	}).then(function(result) {
		console.log("Network has " + result.toNumber() + " coins outstanding") ;
		return coin.allocate(testuser, 1000) ;
	}).then(function(result){
		console.log("Allocation transaction hash is: " + result.tx) ;
		return coin.holderBalance.call(testuser) ;
	}).then(function(result) {
		console.log("Test user " + testuser + " has " + result.toNumber() + " coins after allocation") ;
	});

	exitCallback() ;
}