import { Agriculteur } from "./agriculteur";
import { Chef } from "./chef";
import { Usine } from "./usine";

export class Operation{

  idOperation!: number;
  poidsLait!: number;
  dateOperation!: string;
  typeOp!: string;
  code!:number;
  chef!:Chef;
  usine!:Usine;
  agriculteur!:Agriculteur;
  
}