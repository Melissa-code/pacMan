ElementType = {
  MUR: 0,
  VIDE: 1,
  POINT: 2,
  ENERGIE: 3,
};

Directions = {
  GAUCHE: 0,
  HAUT: 1,
  DROITE: 2,
  BAS: 3,
};

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

    //setTimeout(() => this.avancer(), this.vitesse);
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

  // Faire avancer le fantome rouge
  // si fantome touche pacman il meurt

  avancer() {
    this.avancerPackman();

    for (let phantom of this.listeFantomes)
      switch (phantom.couleur) {
        case "orange":
          //case "rouge":

          //case "rose":
          //case "bleu":
          //this.avancerFantomeOrange(phantom);
          //this.avancerFantomeRouge(phantom)
          break;
      }

    setTimeout(() => this.avancer(), this.vitesse);
  }

  nextPosition(currentPosition, currentDirection) {
    let newPosition = [...currentPosition];

    switch (currentDirection) {
      case Directions.GAUCHE:
        newPosition[0] -= 1;
        break;
      case Directions.DROITE:
        newPosition[0] += 1;
        break;
      case Directions.HAUT:
        newPosition[1] -= 1;
        break;
      case Directions.BAS:
        newPosition[1] += 1;
        break;
      default:
      //console.log("Action avancer inconnue");
    }
    return newPosition;
  }

  avancerPackman() {
    let nouvellePositionPacman = this.nextPosition(
      this.pacman.position,
      this.pacman.direction
    );
    if (!this.detecterMur(nouvellePositionPacman)) {
      this.pacman.position = nouvellePositionPacman;
    }
  }

  /**
   * Orange : avance aléatoirement
   */
  avancerFantomeOrange(fantome) {
    let position = fantome.position;
    let nextP = this.nextPosition(position, fantome.direction);

    if (!this.detecterMur(nextP)) {
      fantome.position = nextP;
    } else {
      fantome.direction = Math.floor(Math.random() * 4);
      let nextP = this.nextPosition(position, fantome.direction);
      if (!this.detecterMur(nextP)) {
        fantome.position = nextP;
      }
    }
    console.log(fantome);
  }

  determinePlusCourtChemin(i1, j1, i2, j2) {
    let casesVisitees = [];
    let distances = new Set();
    const deplacements = [
      [0, 1], //droite
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    //console.log(this.grille)

    for (let i = 0; i < this.grille.length; i++) {
      let ligne = [];
      for (let j = 0; j < this.grille[i].length; j++) {
        if (this.grille[i][j] == ElementType.MUR) {
          ligne.push(1);
        } else {
          ligne.push(0);
        }
      }
      casesVisitees.push(ligne);
    }

    let queue = [[i1, j1, 0]];
    while (queue.length > 0) {
      console.table(queue);
      let [i, j, d] = queue.shift();
      if (i == i2 && j == j2) {distances.add(d);continue;}
      casesVisitees[i][j] = 1;
      for (let[di, dj] of deplacements) {
        let ii = i + di;
        let jj = j + dj;
        if (
          ii >= 0 &&
          jj >= 0 &&
          ii < this.grille[0].length &&
          jj < this.grille.length
        ) {
          if (casesVisitees[ii][jj] == 0) {
            casesVisitees[ii][jj] = 1;
            queue.push([ii, jj, d + 1]);
          }
        }
      }
    }
    return distances;
  }
  //valider la d (distance)
  // memoriser le chemin parcouru 
  

  /**
   * rouge : suit Pacman
   * le + court chemin
   */
  avancerFantomeRouge(fantome) {
    //let casesVisitees = grid[][]; // this.plateauJeu.grille
    console.log(this.grille);

    /*
    let queue = position du phantom
    while (queue non vide)
    {
      Pop(element);
      if position element = pacman
        enregistrer distance
      si non{
        on developpe les 4 points de voisinages
        on push dans la que les points qui ne sont pas visite ni obstacle
      }
    }
    on determine le min des distances 
    */
    // position du fantome

    // position de pacman

    // avoir les 4 directions possibles

    // pour chaque dir possible

    // Calculer position du fantôme dans la direction

    // Check si un mur

    // Calculer la distance entre position fantome et PacMan

    // Voir si distance est plus courte
  }

  detecterMur(position) {
    if (position[0] < 0 || position[1] < 0) return true;
    if (position[0] > this.grille[0].length || position[0] > this.grille.length)
      return true;

    const casePacman = this.grille[position[1]][position[0]];
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
  position; //[x, y]
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
