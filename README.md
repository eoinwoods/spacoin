Ethereum Example for SPA2017
============================

The code in this directory is the simple [Solidity](solidity.readthedocs.io) contract, 
within a [Truffle](truffleframework.com) project.

If you have Truffle and a suitable Ethereum node available (start with [testrpc](https://github.com/ethereumjs/testrpc) if in doubt) then you can run:

	$ truffle compile
	$ truffle test
	$ truffle migrate

The `truffle.js` file defines the Ethereum networks that Truffle can deploy to.  The one
named "development" is the default, use `--network` to specify one of the others (updating the file
if needed to identify the node you'll be using for each network you want to use).

Exercise 1 Notes
----------------

The WannaCry ransomware attackers have 3 bitcoin wallets:
* 13AM4VW2dhxYgXeQepoHkHSQuy6NgaEb94
* 115p7UMMngoj1pMvkpHijcRdfJNXj6LrLn
* 12t9YDPgwueZ9NyMgw519p7AA8isjr6SMw

How much have they made?  There are many sites you can use but http://blockchain.info is a good starting point.

On the Ethereum network, the Embark framework's author asks for donations to address 0x8811FdF0F988f0CD1B7E9DE252ABfA5b18c1cDb1.  How much has he received? How recently?

To view the Ethereum network, http://etherscan.io is a good site to use.



