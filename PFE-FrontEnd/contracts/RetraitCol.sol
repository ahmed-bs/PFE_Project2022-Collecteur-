// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Remplissage.sol";
contract RetraitCol is Remplissage{
//*********************************************************************************/
//second app 
//******************************************************************************/

OperationTank0[] public operationTankR;
  function RetraitOperationTank(OperationTank0[] memory operationTank,uint count) 
   public returns (OperationTank0[] memory tt0) {

   for (uint256 i = 0; i < count ; i++) {
   operationTankR.push(operationTank[i]);
}
    return (operationTankR);
  }

    //get all operations 
  
  function getOperationTanks() public view returns (OperationTank0[] memory result ) {
    return operationTankR;
  }
}
