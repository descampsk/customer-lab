var Web3 = require('web3');
var web3;

var web3 = new Web3(Web3.givenProvider || 'http://casino.blockchain.clairet.ovh');

var CasinoAddress ="0x4f97190e825c74d545742fd86a44772de60117c6";
var abiCasino = [ { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "entreprises", "outputs": [ { "name": "exist", "type": "bool" }, { "name": "addr", "type": "address" }, { "name": "balance", "type": "uint256" }, { "name": "total", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "projets", "outputs": [ { "name": "addr", "type": "address" }, { "name": "exist", "type": "bool" }, { "name": "balance", "type": "uint256" }, { "name": "total", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "users", "outputs": [ { "name": "addr", "type": "address" }, { "name": "invest", "type": "uint256" }, { "name": "discount", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Discount", "type": "event" }, { "constant": false, "inputs": [ { "name": "_entreprise", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "fundEntreprise", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_projet", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "fundProjet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_entreprise", "type": "address" } ], "name": "createEntreprise", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_projet", "type": "address" } ], "name": "createProjet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_user", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "fundUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_entreprise", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "burnCoinEntreprise", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_projet", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "burnCoinProjet", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "burnCoinUser", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "Owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
var CasinoContract = new web3.eth.Contract(abiCasino, CasinoAddress);

/**
 * Récupère toutes les clés publiques
 * @param {function} callback - Callback function
 * La fonction callback prend en argument (err, allPublicKey), avec allPublicKey sous la forme {userKeyList, projetKeyList}
 * Y acceder : result.userKeyList && result.projetKeyList
 */
export async function getAllPublicKeys(callback) {
  web3.eth.getAccounts(function(err, accs) {
      if(accs && err==null) {
        var allPublicKey = {};
        var userKeyList = new Array();
        for(let i=1;i<6;i++) {
          userKeyList.push(accs[i]);
        }
        var projetKeyList = new Array();
        for(let i=6;i<20;i++) {
          projetKeyList.push(accs[i]);
        }
        allPublicKey.userKeyList = userKeyList;
        allPublicKey.projectKeyList = projetKeyList;
        callback(err, allPublicKey);
      } else {
        callback("No key found", null);
      }

  });
}

/**
 * Récupère les soldes d'un utilisateur
 * @param {address} userAddress - L'adresse de l'user
 * @param {function} callback - Callback function
 * La fonction callback prend en argument (err, result), avec result sous la forme {invest, discount}
 * Y acceder : result.invest && result.discount
 */
//export async function getUserFunds(userAddress, callback) {
//  CasinoContract.methods.users(userAddress).call({}, callback);
//}
export async function getUserFunds(context, userAddress, callback) {
	CasinoContract.methods.users(userAddress).call({}, function(err, result) {
		callback(context, err, result);
	});
}

/**
 * Récupère les soldes d'une entreprise/projet
 * @param {address} projetAddr - L'adresse de l'user
 * @param {function} callback - Callback function
 * La fonction callback prend en argument (err, result), avec result sous la forme {balance, total}
 * Y acceder : result.balance && result.total
 */
//<<<<<<< HEAD
//export async function getEntrepriseFunds(projetAddr, callback) {
//  CasinoContract.methods.entreprises(projetAddr).call({}, function(err, result) {
//    callback(err, result);
//  });
export async function getEntrepriseFunds(projetAddr, callback) {
  CasinoContract.methods.entreprises(projetAddr).call({}, callback);
//=======
//export async function getEntrepriseFunds(projetAddr, callback) {
//  CasinoContract.methods.entreprises(projetAddr).call({}, callback);
//>>>>>>> b94be370618a29730f620442621fb4be985de4cd
}

/**
 * Envoie de l'argent à une entreprise depuis un user
 * @param {address} fromUser - L'adresse de l'user
 * @param {address} toEntreprise - L'adresse de l'enterprise
 * @param {function} callback - Callback function
 * La fonction callback prend en argument (error), avec error non nul si l'envoie a échoué.
 */
export async function sendFundToEntreprise(fromUser, toEntreprise, amount, callback) {
  CasinoContract.methods.fundEntreprise(toEntreprise, amount).send({from:fromUser}, callback);
}


/**
 * Envoie de l'argent à une entreprise depuis un user
 * @param {address} fromUser - L'adresse de l'user
 * @param {address} toEntreprise - L'adresse de l'enterprise
 * @param {function} callback - Callback function
 * La fonction callback prend en argument (error), avec error non nul si l'envoie a échoué.
 */
 /*
async function getFundsFromEveryone(callback) {
  getAllPublicKeys(function(err, result) {
    if(!err) {
      var everyFunds = {};
      var userFundsList = new Array();
      for(let i=0;i<result.userKeyList.length;i++) {
        getUserFunds(result.userKeyList[i], function(err, userFunds) {
            userFundsList.push(userFunds);
        });
      }
      var entrepriseFundsList = new Array();
      for(let i=0;i<result.projectKeyList.length;i++) {
        getEntrepriseFunds(result.projectKeyList[i], function(err, entrepriseFunds) {
            entrepriseFundsList.push(entrepriseFunds);
        });
      }
      everyFunds.userFunds = userFundsList;
      everyFunds.entrepriseFunds = entrepriseFundsList;
      callback(err, everyFunds);
    } else {
      callback(err, null);
    }
  });
}


getAllPublicKeys(function(err, result) {
  console.log(result);
});

getAllPublicKeys(function(err, result) {
  console.log(result);
  getUserFunds(result.userKeyList[0], function(err, result2) {
    console.log(result2);
    console.log(result2.discount);
  });

  getEntrepriseFunds(result.projectKeyList[0], function(err, result3) {
    console.log(result3);
    console.log(result3.balance);
  });

  sendFundToEntreprise(result.userKeyList[2], result.projectKeyList[3], 100, function(error) {
    console.log(error);
    getUserFunds(result.userKeyList[2], function(err, result2) {
      console.log(result2);
      console.log(result2.discount);
    });
    getEntrepriseFunds(result.projectKeyList[3], function(err, result3) {
      console.log(result3);
      console.log(result3.balance);
    });
  });
});

getFundsFromEveryone(function(err, result) {
  console.log(err);
  console.log(result);
});
*/
