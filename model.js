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
   * Fantôme orange : avance aléatoirement
   */
  avancerFantomeOrange(fantome) {
    let position = fantome.position;
    let nextP = this.nextPosition(position, fantome.direction);

    if (!this.detecterMur(nextP)) {
      fantome.position = nextP;
    } else {
      fantome.direction = Math.floor(Math.random() * 4);
      //let nextP = this.nextPosition(position, fantome.direction);
      if (!this.detecterMur(nextP)) {
        fantome.position = nextP;
      }
    }
    console.log(fantome);
  }

  /** 
   * Point départ i1 j1 et arrivée i2 j2
   */
  determinePlusCourtChemin(i1, j1, i2, j2) {
    // masque grille contient cases 0 (accessibles) ou 1 (mur)
    let casesVisitees = []; 
    
    // directions déplacements dans la grille
    const deplacements = [
      [0, 1], //droite
      [0, -1],
      [1, 0], //bas
      [-1, 0],
    ];

    // représentation de la grille dans casesVisitees[]
    for (let i = 0; i < this.grille.length; i++) {
      let ligne = [];
      for (let j = 0; j < this.grille[i].length; j++) {
        if (this.grille[i][j] == ElementType.MUR) {
          ligne.push([-2, -2]); //mur
        } else {
          ligne.push([-1, -1]);
        }
      }
      casesVisitees.push(ligne);
    }

    // algorithme de recherche en largeur (BFS): Breadth-First Search
    // pour trouver le plus court chemin dans une grille
    // file d'attente (queue) contient les cases à explorer: point départ et dist 0 
    let queue = [[i1, j1, 0 ]];
    let i = 0, j = 0, d = 0;

    // la distance d correspond déjà au plus court chemin
    while (queue.length > 0) {
      // position actuelle fantôme
      [i, j, d] = queue.shift(); 
      
      if (i == i2 && j == j2) { 
        break;
      }

      // Calcul des coordonnées du voisin [ii, jj] à partir de i et j
      for (let[di, dj] of deplacements) {
        let ii = i + di;
        let jj = j + dj;
        // check si dans limites de la grille et que la case n'est pas visitée -1
        if (ii >= 0 && jj >= 0 && ii < this.grille[0].length && jj < this.grille.length) {
          if (JSON.stringify(casesVisitees[ii][jj]) == JSON.stringify([-1, -1])) {
            // case voisine devient visitée on enregistre le parent [i,j]
            // et ajout de case voisine dans queue avec une distance incrémentée +1
            casesVisitees[ii][jj] = [i, j];
            queue.push([ii, jj, d + 1]); // cases à explorer 
          }
        }
      }
    }

    [i, j] = casesVisitees[i2][j2];
    
    let chemin = [[i2, j2]]
    
    while (i!=i1 || j!=j1) {
      //cases du chemin dans l’ordre du départ à l’arrivée à la fin de la boucle
      chemin.unshift([i,j]); 
      [i, j] = casesVisitees[i][j];
    }
    
    //ajouter [i, j] au début du tableau chemin
    chemin.unshift([i, j]);

    return chemin;
  }
  
  /**
   * Fantôme rouge : suit Pacman le + court chemin
   */
  avancerFantomeRouge(fantome) {
    
    /*
    let queue = position du phantom
    while (queue non vide)
    {
      Pop(element);
      if position element = pacman
        enregistrer distance
      si non{
        on developpe les 4 points de voisinages
        on push dans la queue les points qui ne sont pas visites ni obstacle
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
