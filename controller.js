import Directions from './models/Directions.js';
import Fantome from './models/Fantome.js';
import PacMan from './models/PacMan.js';
import PlateauJeu from './models/PlateauJeu.js';
import Vue from "./Vue.js";

let planDeJeu = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 3, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0],
  [0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0], 
  [0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0], 
  [1, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1], 
  [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], 
  [0, 2, 2, 2, 2, 0, 2, 0, 0, 1, 0, 0, 2, 2, 0, 2, 2, 0], 
  [0, 2, 0, 0, 2, 0, 2, 0, 1, 1, 1, 0, 2, 2, 0, 0, 2, 0], 
  [0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0], 
  [1, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 1], 
  [0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 0], 
  [0, 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 2, 0], 
  [0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// fantômes (couleur, position, intelligence, direction)
const rougeFantome = new Fantome("rouge", [9, 6], "forte", Directions.HAUT);
const bleuFantome = new Fantome("bleuClair", [8,7], "moyenne", Directions.DROITE); 
const orangeFantome = new Fantome("orange", [9,7], "moyenne", Directions.HAUT); 
const roseFantome = new Fantome("rose", [10,7], "moyenne", Directions.GAUCHE); 

const fantomes = [rougeFantome, bleuFantome, orangeFantome, roseFantome];

// PacMan (position, direction = null, invincible, score)
const pacman = new PacMan([9, 9], null, false); 

const plateauDeJeu = new PlateauJeu(planDeJeu, fantomes, pacman);
const vue = new Vue(plateauDeJeu, document, 43);


