// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Remplissage.sol";
contract RemplissageCol is Remplissage{
//*********************************************************************************/
//second app 
//******************************************************************************/

OperationTank[] public operationTank2;
  function addOperationTank(OperationTank[] memory operationTank,uint count) 
   public returns (OperationTank[] memory tt0) {

   for (uint256 i = 0; i < count ; i++) {
   operationTank2.push(operationTank[i]);
}
    return (operationTank2);
  }

    //get all operations 
  
  function getOperationTanks() public view returns (OperationTank[] memory result ) {
    return operationTank2;
  }
}
