// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Remplissage{

 struct Tank{
  uint idTank;
  string matricule;
  uint poidVide;
  uint poidActuel;
  string etat ;
   }

   struct Agriculteur{
  uint idAgriculteur;
  string nom;
  string prenom;
  string username;
  string password; 
   }




struct Operation{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
  Collecteur collecteur; 
  Agriculteur agriculteur;
 
   }



struct Collecteur{
  uint idCollecteur;
  string  nomCollecteur ;
  string adresse ;
  uint  tel;
   }


   constructor() {
  }
Operation[] public operations2;

string[] public ALLS;
uint256 public nextID = 1;
//create 2
  function addOperation2(Operation memory op)
   public returns (Operation memory op0) {

    Agriculteur memory newAgriculteur = Agriculteur(op.agriculteur.idAgriculteur
     ,op.agriculteur.nom,op.agriculteur.prenom
     ,op.agriculteur.username,op.agriculteur.password);


     Collecteur memory newCollecteur = Collecteur(op.collecteur.idCollecteur, 
     op.collecteur.nomCollecteur
     ,op.collecteur.adresse,op.collecteur.tel);

    Operation memory newOperation = Operation(op.idOperation,op.poidsLait, 
    op.dateOperation,op.typeOp,op.code,newCollecteur,newAgriculteur);
    operations2.push(newOperation);
    return (newOperation);
  }
  //get all operations 
  
  function getOperations() public view returns (Operation[] memory result ) {
    return operations2;
  }

//get one operation

 function getOperation(uint id) public view returns(Operation memory operation) {
    for(uint i = 0; i<nextID;i++) {
      if(operations2[i].idOperation==id) {
        return operations2[i];
      }
    }
  }


//*********************************************************************************/
//second app 
//******************************************************************************/



struct Operation0{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
  Agriculteur0 agriculteur;
  Chef chef;
//Usine usine;
Tank tank ;
   }

  struct Agriculteur0{
  uint idAgriculteur;
  string nom;
  string prenom;
  string email;
  string adress;  
  uint tel;  
   }


   
  struct Chef{
  uint idChef;
  string nom;
  string prenom;
  string email;
  string adress;  
  uint tel;  
  uint cin; 
 // uint tank ;
   string username;
  string password; 
   }

      struct OperationTank{
 uint idOpTank;
  uint qteInsereTank;  
  string Date;
  Operation0 operation;
  Tank tank ;
   }
Operation0[] public operationTank2;

  function addOperationTank(Operation0 memory operationTank) 
   public returns (Operation0 memory tt0) {

      Tank memory newTank = Tank(operationTank.tank.idTank,operationTank.tank.matricule,operationTank.tank.poidVide,
      operationTank.tank.poidActuel,operationTank.tank.etat);

     

     Agriculteur0 memory newAgriculteur = Agriculteur0(operationTank.agriculteur.idAgriculteur
     ,operationTank.agriculteur.nom,operationTank.agriculteur.prenom
     ,operationTank.agriculteur.email,operationTank.agriculteur.adress,operationTank.agriculteur.tel);

    Chef memory newChef = Chef(operationTank.chef.idChef
     ,operationTank.chef.nom,operationTank.chef.prenom
     ,operationTank.chef.email,operationTank.chef.adress,operationTank.chef.tel,
     operationTank.chef.cin,operationTank.chef.username,operationTank.chef.password);
     
/*
Usine memory newUsine = Usine(operationTank.usine.idUsine,operationTank.usine.nomUsine,
     operationTank.usine.adresse);*/
    Operation0 memory newOperation = Operation0(operationTank.idOperation,operationTank.poidsLait, 
    operationTank.dateOperation,operationTank.typeOp,operationTank.code,newAgriculteur,newChef,newTank);
//,newAgriculteur,newChef,newUsine,newTank
     
/*
    OperationTank memory newOperationTank = OperationTank(operationTank.idOpTank,operationTank.qteInsereTank,operationTank.Date,newOperation,newTank);
*/

    operationTank2.push(newOperation);



    return (newOperation);
  }

//*********************************************************************************/
//third app 
//******************************************************************************/
   struct Usine{
   uint idUsine;
    string nomUsine;
   string adresse;  
   }

struct Operation01{
  uint idOperation;
  uint  poidsLait;
  string  dateOperation ;
  string typeOp ;
  uint  code;
  //string sender;
 // uint tank ;
 // Agriculteur0 agriculteur;
  Chef chef;
Usine usine;
Tank tank ;
   }

   Operation01[] public operationTank3;

  function addOperationTankRetrait(Operation01 memory operationTank) 
   public returns (Operation01 memory tt0) {

      Tank memory newTank = Tank(operationTank.tank.idTank,operationTank.tank.matricule,operationTank.tank.poidVide,
      operationTank.tank.poidActuel,operationTank.tank.etat);

     
/*
     Agriculteur0 memory newAgriculteur = Agriculteur0(operationTank.agriculteur.idAgriculteur
     ,operationTank.agriculteur.nom,operationTank.agriculteur.prenom
     ,operationTank.agriculteur.email,operationTank.agriculteur.adress,operationTank.agriculteur.tel);
*/
    Chef memory newChef = Chef(operationTank.chef.idChef
     ,operationTank.chef.nom,operationTank.chef.prenom
     ,operationTank.chef.email,operationTank.chef.adress,operationTank.chef.tel,
     operationTank.chef.cin,operationTank.chef.username,operationTank.chef.password);
     

Usine memory newUsine = Usine(operationTank.usine.idUsine,operationTank.usine.nomUsine,
     operationTank.usine.adresse);
    Operation01 memory newOperation = Operation01(operationTank.idOperation,operationTank.poidsLait, 
    operationTank.dateOperation,operationTank.typeOp,operationTank.code,newChef,newUsine,newTank);
//,newAgriculteur,newChef,newUsine,newTank
     
/*
    OperationTank memory newOperationTank = OperationTank(operationTank.idOpTank,operationTank.qteInsereTank,operationTank.Date,newOperation,newTank);
*/

    operationTank3.push(newOperation);



    return (newOperation);
  }



















}