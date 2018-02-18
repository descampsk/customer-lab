pragma solidity ^0.4.8;

contract Casino {
    address public owner;
    uint ratio;

    struct User {
        address addr;
        uint invest;
        uint discount;
    }

    struct Entreprise {
        bool exist;
        address addr;
        uint balance;
        uint total;
    }

    struct Projet {
        address addr;
        bool exist;
        uint balance;
        uint total;
    }

    mapping(address=>User) public users;
    mapping(address=>Entreprise) public entreprises;
    mapping(address=>Projet) public projets;

    event Discount(address from, uint value);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function _isValideEntreprise(address entreprise) internal view returns (bool) {
        return(entreprises[entreprise].exist);
    }

    function _isValideProjet(address projet) internal view returns (bool) {
        return(projets[projet].exist);
    }

    function Casino() public {
        owner = msg.sender;
        ratio = 1;
    }

    function fundEntreprise(address _entreprise, uint _amount) public {
        require(_isValideEntreprise(_entreprise));
        require(users[msg.sender].invest >= _amount);

        entreprises[_entreprise].balance += _amount;
        users[msg.sender].invest -= _amount;
        users[msg.sender].discount += _amount * ratio;
    }

    function fundProjet(address _projet, uint _amount) public {
        require(_isValideProjet(_projet));
        require(users[msg.sender].invest >= _amount);

        projets[_projet].balance += _amount;
        users[msg.sender].invest -= _amount;
        users[msg.sender].discount += _amount * ratio;
    }

    function createEntreprise(address _entreprise) public onlyOwner {
        require(!entreprises[_entreprise].exist);
        entreprises[_entreprise].exist = true;
        entreprises[_entreprise].balance = 0;
        entreprises[_entreprise].total = 0;
    }

    function createProjet(address _projet) public onlyOwner {
        require(!projets[_projet].exist);
        projets[_projet].exist = true;
        projets[_projet].balance = 0;
        projets[_projet].total = 0;
    }

    function fundUser(address _user, uint _amount) public onlyOwner {
        users[_user].invest += _amount;
    }

    function burnCoinEntreprise(address _entreprise, uint _amount) public onlyOwner {
        require(entreprises[_entreprise].balance >= _amount);
        entreprises[_entreprise].balance -= _amount;
        entreprises[_entreprise].total += _amount;
    }

    function burnCoinProjet(address _projet, uint _amount) public onlyOwner {
        require(projets[_projet].balance >= _amount);
        projets[_projet].balance -= _amount;
        projets[_projet].total += _amount;
    }

    // Discount
    function burnCoinUser(uint _amount) public {
        require(users[msg.sender].discount >= _amount);
        users[msg.sender].discount -= _amount;
        Discount(msg.sender, _amount);
    }

    // to do
    // X    convertir en structure (champ discount pour user)
    // X    créer entreprise / projet
    // X    donner token client
    // X    voir la partie discount
    // X    retrait token entreprises / projets by owner
    // X         function pour changer les tokens
    // -> reçus pour les entreprises / projets ?
    // traçabilité des payements

    // geter

    function Owner() public view returns (address) {
        return(owner);
    }
}
