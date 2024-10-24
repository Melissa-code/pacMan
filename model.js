ElementType = {
  MUR: 0,
  VIDE: 1,
  POINT: 2,
  ENERGIE: 3,
}

Directions = {
  GAUCHE: 0, 
  DROITE: 1, 
  HAUT: 2, 
  BAS: 3, 
}


/* ************************************************************** */
/*        Plateau jeu                                             */ 
/* ************************************************************** */

class PlateauJeu {
  
  grille;
  listeFantomes; 
  pacman;
  vitesse;

  constructor(grille, listeFantomes, pacman) {
    this.grille = grille; 
    this.listeFantomes = listeFantomes;
    this.pacman = pacman; 
    this.vitesse = 1000;

    setTimeout(() => this.avancer(), this.vitesse);
  }

  dirigerPacman(direction) {
    switch (direction) {
      case "gauche":
        this.pacman.direction = Directions.GAUCHE;
        break;
      case "droite":
        this.pacman.direction = Directions.DROITE;
        break;
      case "haut":
        this.pacman.direction = Directions.HAUT;
        break;
      case "bas":
        this.pacman.direction = Directions.BAS;
        break;
      default:
        console.log("Action inconnue:" + direction);
    }
  }

  avancer() {
    // simuler le mouvement Pacman sans modifier sa position réelle (copie tableau)
    let nouvellePositionPacman = [...this.pacman.position];

    switch (this.pacman.direction) {
        case Directions.GAUCHE:
            nouvellePositionPacman[0] -= 1;
            break;
        case Directions.DROITE:
            nouvellePositionPacman[0] += 1;
            break;
        case Directions.HAUT:
            nouvellePositionPacman[1] -= 1;
            break;
        case Directions.BAS:
            nouvellePositionPacman[1] += 1;
            break;
        default:
            //console.log("Action avancer inconnue");
    }

    if (!this.detecterMur(nouvellePositionPacman)) {
        this.pacman.position = nouvellePositionPacman;
    }
    // Avance en continu 
    setTimeout(() => this.avancer(), this.vitesse); 
  }

  // effacer écran (voir rectBlank)
  // tester si obstacle bordure
  // autres directions


  detecterMur(positionPacman) {

    if (positionPacman[0] < 0 || positionPacman[1] < 0) return true;
    if (positionPacman[0] > this.grille[0].length || positionPacman[0] > this.grille.length) return true;

    const casePacman = this.grille[positionPacman[1]][positionPacman[0]];
    if (casePacman === ElementType.MUR) return true;

    return false;
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

  constructor(position, direction = null, invincible, score) {
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