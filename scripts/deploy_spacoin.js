// Some of this code is from Mikko Ohtamaa:
//    See https://ethereum-transaction-toy.tokenmarket.net/
//    and https://ethereum.stackexchange.com/questions/7255/deploy-contract-from-nodejs

// Choose deployment target
const NODE_URL = "http://localhost:11545"; // livenet
//const NODE_URL = "http://localhost:10545"; // Ropsten
//const NODE_URL = "http://localhost:9545"; // local Geth net
//const NODE_URL = "http://localhost:8545"; // local testrpc net

// What is being deployed?
const CODE_FILE = "contracts/Spacoin.sol" ;
const CONTRACT_NAME = "SpaCoin" ;

// Optimise EVM code?
const OPTIMISE = 1 ;

const fs = require('fs');
const solc = require('solc');
var Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL));

const input = fs.readFileSync(CODE_FILE);
const output = solc.compile(input.toString(), OPTIMISE);
console.log("Solc version: " + solc.version());
console.log("Type:" + typeof(output.contracts));
console.log("Contracts structure entries: " + Object.keys(output.contracts)) ;

const bytecode = output.contracts[":" + CONTRACT_NAME].bytecode;
const abi = JSON.parse(output.contracts[":" + CONTRACT_NAME].interface);

const byteCodeOut = fs.writeFileSync(CONTRACT_NAME + ".bc", "0x" + bytecode) ;
const abiOut = fs.writeFileSync(CONTRACT_NAME + ".abi", abi) ;

const contract = web3.eth.contract(abi);

var transactionHash ;
var contractAddress ;
const contractInstance = contract.new({
    data: '0x' + bytecode,
    from: web3.eth.accounts[0],
    gas: 600000
    ,gasPrice: 5000000000
    }
);
// Transaction has can be used with eth.getTransaction()
console.log("Create transaction: " + contractInstance.transactionHash);

// See http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We need to wait until any miner has included the transaction
// in a block to get the address of the contract
async function waitBlock() {
  while (true) {
    let receipt = web3.eth.getTransactionReceipt(contractInstance.transactionHash);
    if (receipt && receipt.contractAddress) {
      console.log("Contract address: " + receipt.contractAddress) ;
      console.log("Your contract has been deployed at http://www.etherscan.io/address/" + receipt.contractAddress);
      console.log("Note that it might take 30 - 90 seconds for the block to be visible in etherscan.io");
      break;
    }
    console.log("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber);
    await sleep(4000);
  }
}
waitBlock() ;

