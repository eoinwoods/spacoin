'use strict';

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var source = "pragma solidity ^0.4.0; contract HelloMessage { string message ; function HelloMessage(string greeting) public { message = greeting ; } function sayHello() constant returns(string) { return message ; } }" ;
var helloCompiled = web3.eth.compile.solidity(source) ;

var helloContract = web3.eth.contract(helloCompiled.HelloMessage.info.abiDefinition) ;

var message = "Hello there from Ethereum!";
var hello = helloContract.new(message, {from:web3.eth.accounts[0],
					                    data: helloCompiled.code,
                                        gas: 300000}, function(err, contract) {
    if (!err) {
    	if (!contract.address) {

    	} else {
    		console.log("Contract mined with address: " + contract.address) ;
    		console.log(contract) ;
    	}
    } else {
    	console.log("Fatal error: " + err) ;
    }
}) ;

if (hello) {
	hello.sayHello() ;
}
