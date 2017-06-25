/*
* @Author: eoin
* @Date:   2017-06-24 23:12:39
* @Last Modified by:   eoin
* @Last Modified time: 2017-06-25 18:38:26
*/

'use strict';
var SpaCoin = artifacts.require("SpaCoin");

contract("SpaCoin", function(accounts) {
	it("should have at least 3 accounts", function() {
		assert(accounts.length > 2, "expecting more than two accounts") ;
	});

	it("should be initialised with 100,000 coins", function() {
		return SpaCoin.deployed().then(function(instance) {
			return instance.outstandingValue.call() ;
		}).then(function(outstandingValue) {
			assert.equal(outstandingValue.valueOf(), 100000, "expected 100,000 coins after initialisation")
		})
	});

	it("should be able to allocate coins to a user", function(){
		var user1 = accounts[0];
		var user2 = accounts[1] ;
		var coin 

		var outstandingValuePost ;
		var user1BalancePost;

		return SpaCoin.deployed().then(function(instance) {
			coin = instance ;
			return coin.allocate(user1, 20000) ;
		}).then(function() {
			return coin.outstandingValue.call()
		}).then(function(outstandingValue) {
			outstandingValuePost = outstandingValue.toNumber() ;
			return coin.holderBalance.call(user1);
		}).then(function(u1balance) {
			user1BalancePost = u1balance.toNumber() ;

			assert.equal(20000, user1BalancePost, "incorrect balance for user1");
			assert.equal(80000, outstandingValuePost, "incorrect outstanding value");
		}) ;

	});

	it("should be able to move coins between users", function(){
		var owner = accounts[0];
		var user1 = accounts[1] ;
		var user2 = accounts[2] ;
		var coin ;

		var user1InitialBalance ;
		var user1FinalBalance ;
		var user2FinalBalance ;

		return SpaCoin.deployed().then(function(instance) {
			coin = instance ;
			return coin.allocate(user1, 20000, {from:owner}) ;
		}).then(function() {
			return coin.holderBalance.call(user1) ;
		}).then(function(user1Balance) {
			user1InitialBalance = user1Balance.toNumber() ;
			return coin.move(user2, 10000, {from:user1});
		}).then(function(result) {
			return coin.holderBalance.call(user1) ;
		}).then(function(user1Balance) {
			user1FinalBalance = user1Balance.toNumber() ;
			return coin.holderBalance.call(user2) ;
		}).then(function(user2Balance) {
			user2FinalBalance = user2Balance.toNumber() ;

			assert.equal(20000, user1InitialBalance, "user1 has the wrong initial balance") ;
			assert.equal(10000, user1FinalBalance, "user1 has the wrong final balance") ;
			assert.equal(10000, user2FinalBalance, "user2 has the wrong final balance") ;
		}) ;

	}) ;

	it("should not allow over allocation", function(){
		var owner = accounts[0] ;
		var user1 = accounts[1] ;
		var coin ;

		var user1FinalBalance ;
		return SpaCoin.deployed().then(function(instance) {
			coin = instance ;
			return coin.allocate(user1, 60000, {from:owner}); // all the coins left after previous tests
		}).then(function(result){
			return coin.holderBalance.call(user1) ;
		}).then(function(result) {
			user1FinalBalance = result.toNumber() ;
			return coin.allocate(user1, 1, {from:owner}) ; // an extra coin
		}).then(function(result){
			assert.equal("InvalidCoinUsage", result.logs[0].event, "expected error for over allocation") ;
			assert.equal(70000, user1FinalBalance, "user1 has the wrong final balance") ;
		}) ;
	}) ;

})
