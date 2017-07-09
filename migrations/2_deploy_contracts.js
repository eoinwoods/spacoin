var ConvertLib = artifacts.require("./ConvertLib.sol");
var SpaCoin = artifacts.require("./spacoin.sol");


module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.deploy(SpaCoin, {gas: 800000});
};
