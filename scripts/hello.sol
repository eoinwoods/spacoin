pragma solidity ^0.4.0;

contract HelloMessage {
	string message ;
	function HelloMessage(string greeting) public {
		message = greeting ;
	}
	function sayHello() constant returns(string) {
		return message ;
	}
}
