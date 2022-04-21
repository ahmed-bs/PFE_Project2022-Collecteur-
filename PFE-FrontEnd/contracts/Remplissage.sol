// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract Remplissage{
 struct Usine{
   uint idUsine;
    string nomUsine;
   string adresse;  
   }
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
//Tank tank ;
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
   string date;
  Operation0 operation;
  Tank tank ;
   }
      struct OperationTank0{
  uint idOpTank;
  uint qteInsereTank;  
   string date;
  Operation01 operation;
  Tank tank ;
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
//Tank tank ;
   }
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

}
