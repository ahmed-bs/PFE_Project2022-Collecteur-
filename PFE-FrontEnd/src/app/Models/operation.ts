import { Agriculteur } from './agriculteur';
import { Chef } from './chef';
import { Collecteur } from './collecteur';
import { Tank } from './tank';
import { Usine } from './usine';

export class Operation {
  idOperation!: number;
  poidsLait!: number;
  dateOperation!: string;
  typeOp!: string;
  code!: number;
  agriculteur!: Agriculteur;
  chef!: Chef;
  tank!: Tank;
  codeRemplissage!: [];
  usine!: Usine;
  collecteur!: Collecteur;
}
