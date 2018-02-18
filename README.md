# customer-lab
Donner au client les moyens de co-construire le magasin de ces rêves


#Installation Blockchain

```bash
npm install -g banache-cli
npm install -g truffle
```

Sur une console, lancer testrpc (blockchain Ethereum privée de test)
```bash
ganache-cli
```
Compiler et migrer les contrats sur la blockchain
```bash
./ethereum truffle migrate
```

#Installation du serveur web
```bash
./webapp npm install
./webapp npm run dev-start
```

Puis accéder en local à l'application
```bash
http://localhost:3000
```
