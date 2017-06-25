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
    live: {
      host: "localhost",
      port: 10545,
      network_id: "*" // Match any network id
    }
  }
};
