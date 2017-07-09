module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    spatestnet: {
      host: "localhost",
      port: 9545,
      network_id: "*" // Match any network id
    },
      // gas: 500000,
      // gasPrice: 100000000000 
    ropsten: {
      host: "localhost",
      port: 10545,
      network_id: "3" // Ropsten test network
    },
    live: {
      host: "localhost",
      port: 11545,
      gasPrice: 5000000000,
      gas: 800000,
      network_id: "1" // Live network
    }
  }
};
