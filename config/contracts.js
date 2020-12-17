module.exports = {
  // default applies to all environments
  default: {
    // order of connections the dapp should connect to
    dappConnection: [
      "$WEB3",  // uses pre existing web3 object if available (e.g in Mist)
      "ws://localhost:8546",
      "http://localhost:8545"
    ],

    // Automatically call `ethereum.enable` if true.
    // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
    // Default value is true.
    // dappAutoEnable: true,

    gas: "auto",

    // Strategy for the deployment of the contracts:
    // - implicit will try to deploy all the contracts located inside the contracts directory
    //            or the directory configured for the location of the contracts. This is default one
    //            when not specified
    // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
    //            contracts section.
    strategy: 'explicit',

    // minimalContractSize, when set to true, tells Embark to generate contract files without the heavy bytecodes
    // Using filteredFields lets you customize which field you want to filter out of the contract file (requires minimalContractSize: true)
    // minimalContractSize: false,
    // filteredFields: [],

    deploy: {

      UniswapV2Factory: {
         fromIndex: 0,
         args: ['$accounts[0]']
       },
    

    TokTst: { 
      deploy: false
    }, //todo add totalsupply
    Bytomtest: {
      instanceOf: 'TokTst',
        fromIndex: 0,
        args: ["Bytom", "BTM"], 

    },
      
    Waytst: {
      instanceOf: 'TokTst',
      fromIndex: 0,
      args: ["WaykiChain", "WIC"], 

      },
    Kybertst: {
      instanceOf: 'TokTst',
      fromIndex: 0,
      args: ["KNC", "QUB"], 

      }},
  afterDeploy: async ({contracts, web3, logger}) => {
      await contracts.UniswapV2Factory.methods.createPair (
        contracts.Waytst.options.address, contracts.Kybertst.options.address).
        send({from: web3.eth.defaultAccount});      
    }

  },


  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run`
  development: {
    dappConnection: [
      "ws://localhost:8546",
      "http://localhost:8545",
      "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    ]
  },

  gana: {
    dappConnection: [
    //  "ws://localhost:8546",
      "http://localhost:8080",
   //   "$WEB3"  // uses pre existing web3 object if available (e.g in Mist)
    ]
  },


  // merges with the settings in default
  // used with "embark run privatenet"
  privatenet: {},

  // merges with the settings in default
  // used with "embark run testnet"
  testnet: {},

  // merges with the settings in default
  // used with "embark run livenet"
  livenet: {}

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  // custom_name: {}
};
