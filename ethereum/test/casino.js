var Casino = artifacts.require("./Casino.sol")


contract('Casino', (accounts) => {
    var owner = accounts[0]
    var entreprise1 = accounts[1]
    var projet1 = accounts[2]
    var user1 = accounts[3]
    var user2 = accounts[4]
    var user3 = accounts[5]
    // console.log(address);

    it('test user', async function() {
        var amount = 100
        var instance = await Casino.deployed()
        await instance.fundUser(user1, amount, {from: owner})
        var user_result_raw = await instance.users(user1);
        user_result = {}
        user_result.invest = user_result_raw[0].c[0]
        user_result.discount = user_result_raw[1].c[0]
        // console.log(user_result);
        assert.equal(user_result.invest, 100, "user invest")
        assert.equal(user_result.discount, 0, "user dicsount")
    })

    it('test entreprise', async function() {
        var instance = await Casino.deployed()
        await instance.createEntreprise(entreprise1, {from: owner})
        var entreprise_result_raw = await instance.entreprises(entreprise1);
        entreprise_result = {}
        entreprise_result.exist = entreprise_result_raw[0]
        entreprise_result.balance = entreprise_result_raw[1].c[0]
        entreprise_result.total = entreprise_result_raw[2].c[0]
        // console.log(entreprise_result);
        assert.equal(entreprise_result.exist, true, "entreprise exist")
        assert.equal(entreprise_result.balance, 0, "entreprise balance")
        assert.equal(entreprise_result.total, 0, "entreprise total")
    })

    it('test fund Entreprise', async function() {
        var amount = 80
        var instance = await Casino.deployed()
        await instance.fundEntreprise(entreprise1, amount, {from: user1})
        var entreprise_result_raw = await instance.entreprises(entreprise1);
        entreprise_result = {}
        entreprise_result.exist = entreprise_result_raw[0]
        entreprise_result.balance = entreprise_result_raw[1].c[0]
        entreprise_result.total = entreprise_result_raw[2].c[0]
        // console.log(entreprise_result);
        var user_result_raw = await instance.users(user1);
        user_result = {}
        user_result.invest = user_result_raw[0].c[0]
        user_result.discount = user_result_raw[1].c[0]
        // console.log(user_result);
        assert.equal(entreprise_result.exist, true, "entreprise exist")
        assert.equal(entreprise_result.balance, amount, "entreprise amount")
        assert.equal(entreprise_result.total, 0, "entreprise total")
        assert.equal(user_result.invest, 100 - amount, "user invest")
        assert.equal(user_result.discount, amount, "user discount")
    })

    it('test burn Coin Entreprise', async function() {
        var amount = 80
        var instance = await Casino.deployed()
        await instance.burnCoinEntreprise(entreprise1, amount, {from: owner})
        var entreprise_result_raw = await instance.entreprises(entreprise1);
        entreprise_result = {}
        entreprise_result.exist = entreprise_result_raw[0]
        entreprise_result.balance = entreprise_result_raw[1].c[0]
        entreprise_result.total = entreprise_result_raw[2].c[0]
        // console.log(entreprise_result);
        assert.equal(entreprise_result.exist, true, "entreprise exist")
        assert.equal(entreprise_result.balance, 0, "entreprise amount")
        assert.equal(entreprise_result.total, amount, "entreprise total")
    })

    it('test burn Coin User', async function() {
        var amount = 80
        var instance = await Casino.deployed()
        await instance.burnCoinUser(amount, {from: user1})
        var user_result_raw = await instance.users(user1);
        user_result = {}
        user_result.invest = user_result_raw[0].c[0]
        user_result.discount = user_result_raw[1].c[0]
        assert.equal(user_result.invest, 20, "user invest")
        assert.equal(user_result.discount, 0, "user discount")
    })


    // function burnCoinEntreprise(address _entreprise, uint _amount) public onlyOwner {
/*
    it('ecrecover result matches address', async function() {
        var instance = await DigitalSignature.deployed()
        var msg = 'premier test'

        var h = web3.sha3(msg)
        var sig = web3.eth.sign(address, h)

        await instance.newDocument(h, {from: address})
        await instance.newSignature(0, sig, {from: address})

        // var sig2 = web3.eth.sign(address, h).slice(2)
        // var r = `0x${sig2.slice(0, 64)}`
        // var s = `0x${sig2.slice(64, 128)}`
        // var v = web3.toDecimal(sig2.slice(128, 130)) + 27

        var result = await instance.verifySignature.call(0, address)


        var result3 = await instance.recover(h, sig);
        console.log(result3);
        assert.equal(result, true)
    })

    it('ecrecover result matches address', async function() {
        var instance = await DigitalSignature.deployed()
        var msg = 'second test'

        var h = web3.sha3(msg)
        var sig = web3.eth.sign(address, h)

        await instance.newDocument(h, {from: address})
        await instance.newSignature(1, sig, {from: address})

        // var sig2 = web3.eth.sign(address, h).slice(2)
        // var r = `0x${sig2.slice(0, 64)}`
        // var s = `0x${sig2.slice(64, 128)}`
        // var v = web3.toDecimal(sig2.slice(128, 130)) + 27

        var result = await instance.verifySignature.call(1, address)


        var result3 = await instance.recover(h, sig);
        console.log(result3);
        assert.equal(result, true)
    })
*/
})
