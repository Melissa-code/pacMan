ElementType = {
  MUR: 0,
  VIDE: 1,
  POINT: 2,
  ENERGIE: 3,
}


/* ************************************************************** */
/*        Plateau jeu                                             */ 
/* ************************************************************** */

class PlateauJeu {
  
  grille;
  listeFantomes; 

  constructor(grille, listeFantomes) {
    this.grille = grille; 
    this.listeFantomes = listeFantomes;
  }

}

/* ************************************************************** */
/*        Fantôme                                                 */ 
/* ************************************************************** */

class Fantome {

  couleur;
  position; //[x, y]
  intelligence;
  direction;

  constructor(couleur, position, intelligence, direction) {
    this.couleur = couleur;
    this.position = position;
    this.intelligence = intelligence;
    this.direction = direction;
  }
}

/* ************************************************************** */
/*        PacMan                                                  */ 
/* ************************************************************** */

class PacMan {

  position;  //[x, y]
  direction;
  invincible; 
  score;

  constructor(position, direction, invincible, score) {
    this.position = position;
    this.direction = direction; 
    this.invincible = invincible;
    this.score = score; 
  }
}


/* ************************************************************** */
/*        Fruit                                                   */ 
/* ************************************************************** */

class Fruit {

  nom;
  nbPoints;
  image;
  position;

  constructor(nom, nbPoints, image, position) {
      this.nom = nom; 
      this.nbPoints = nbPoints; 
      this.image = image; 
      this.position = position; 
  }
}

/* ************************************************************** */
/*       Farbrique Fruit                                          */ 
/* ************************************************************** */

class FabriqueFruit {

  nomsFruits = ["Pomme", "Orange", "Cerise", "Banane"];

  // 0.99999999999999 => ]0,1[ * N => 0..N
  randomFruit() {
    let indiceRandomFruit = Math.floor(Math.random() * this.nomsFruits.length);
    let nomFruitRandom = this.nomsFruits[indiceRandomFruit];

    return this.fabriquer(nomFruitRandom);
  }

  fabriquer(nomFruit) {

    if (!this.nomsFruits.includes(nomFruit)) {
      throw new Error("Fruit inconnu");
    }

    let fruit;

    switch (nomFruit) {
      case "Pomme":
        fruit = new Fruit(nomFruit, 100, "imgPomme.png", 0, 0);
        break;
      case "Orange":
        fruit = new Fruit(nomFruit, 150, "imgOrange.png", 0, 0);
        break;
      case "Cerise":
        fruit = new Fruit(nomFruit, 200, "imgCerise.png", 0, 0);
        break;
      case "Banane":
        fruit = new Fruit(nomFruit, 250, "imgBanane.png", 0, 0);
        break;
      default:
        console.log("Erreur: Fruit ", nomFruit, " inconnu.");
        return null;
    }

    return fruit;
  }
}