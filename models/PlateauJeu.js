import ElementType from './ElementType.js';
import Directions from './Directions.js';
import Fruit from './Fruit.js';

class PlateauJeu {

  constructor(grille, listeFantomes, pacman) {
    this.grille = grille;
    this.listeFantomes = listeFantomes;
    this.pacman = pacman;
    this.vitesse = 500;
    this.finduJeu = false;
    this.nbPastilles = 134;
    this.nbEnergies = 4;
    this.etatEnergie = false;
    this.fruits = []; 

    this.ajouterFruitAleatoirement();
    this.demarrerAjouterFruits();
    
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
        console.log("Action inconnue: " + direction);
    }
  }

  detecterMur(position) {
    const casePacman = this.grille[position[1]][position[0]];

    if (position[0] < 0 || position[1] < 0) return true;
    if (position[0] >= this.grille[0].length || position[1] >= this.grille.length) return true;
    if (casePacman === ElementType.MUR) return true;

    return false;
  }

  avancerCommeFantomeRose(fantome) {
    if (this.etatEnergie) {
      this.avancerCommeFantomeOrange(fantome);
      return;
    }
  
    const [j1, i1] = fantome.position;
    const [j2, i2] = this.pacman.position;
    const chemin = this.determinePlusCourtChemin(i1, j1, i2, j2);
  
    // Calcule le prochain déplacement (au moins une case sinon pacman)
    if (chemin.length > 1) {
      const [nextI, nextJ] = chemin[1];
      fantome.position = [nextJ, nextI];
    }
  }

  alternerComportementFantomesRougeOrange(fantome) {
    if (this.finduJeu) return;

    setTimeout(() => {
      if (fantome.couleur === "bleuClair") {
        if (fantome.comportementActuel === "rouge") {
            this.avancerCommeFantomeOrange(fantome);  
            fantome.comportementActuel = "orange";
        } else {
            this.avancerCommeFantomeRouge(fantome); 
            fantome.comportementActuel = "rouge";
        }
        // récursivité pour alternance continue 
        this.alternerComportementFantomesRougeOrange(fantome);
      }
    }, 1000);  
  }

  avancer() {
    if (this.finduJeu) return; 
  
    this.avancerPacman();

    if (this.rencontrerFantome()) {
      if (this.etatEnergie == true) {
        this.pacman.score += 200;
      } else {
        this.finduJeu = true; 
        return;
      }
    } 

    for (let fantome of this.listeFantomes)
      switch (fantome.couleur) {
        case "orange":
          this.avancerCommeFantomeOrange(fantome);
        break;
        case "rouge":
          this.avancerCommeFantomeRouge(fantome);
        break; 
        case "rose":
          this.avancerCommeFantomeRose(fantome);
        break; 
        case "bleuClair":
        if (!fantome.comportementActuel) {
            fantome.comportementActuel = "rouge"; 
            this.alternerComportementFantomesRougeOrange(fantome); 
        }
        break;
      }

      if (this.rencontrerFantome() && !this.etatEnergie) {
        this.finduJeu = true; 
      } else {
        setTimeout(() => this.avancer(), this.vitesse);
      }
  }

  nextPosition(currentPosition, currentDirection) {
    let newPosition = [...currentPosition];

    switch (currentDirection) {
      case Directions.GAUCHE:
        if (newPosition[0] == 0)
        {newPosition[0] = this.grille[0].length-1;
          //console.log('bordure');
        }
        else newPosition[0] -= 1;
      break;
      case Directions.DROITE:
        if (newPosition[0] == this.grille[0].length -1)
        {newPosition[0] = 0}
        else newPosition[0] += 1;
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

  avancerPacman() {
    let nouvellePositionPacman = this.nextPosition (
      this.pacman.position,
      this.pacman.direction
    );
    if (!this.detecterMur(nouvellePositionPacman)) {
      this.pacman.position = nouvellePositionPacman;
      let [y, x] = this.pacman.position;

      // Mange les points/pastilles 
      if (this.grille[x][y] == ElementType.POINT) {
        this.grille[x][y] = ElementType.VIDE;
        this.pacman.score ++;
        this.nbPastilles --;

        if (this.nbPastilles == 0 && this.nbEnergies == 0) {
          console.log("Bravo vous avez gagné :)!");
          this.finduJeu = true; 
        }
      } 

      // Mange les énergies
      if (this.grille[x][y] == ElementType.ENERGIE) {
        this.grille[x][y] = ElementType.VIDE;
        this.pacman.score += 50;
        this.nbEnergies --;
        this.fantomesDeviennentBleus(10000);
      } 

      // Mange le fruit
      let fruit = this.fruitPosition(y, x);
      if (fruit) { 
          this.pacman.score += fruit.nbPoints;   
          this.grille[x][y] = ElementType.VIDE; 
          // Retire le fruit de fruits[] via l'index
          const index = this.fruits.indexOf(fruit);  
          if (index !== -1) {
              this.fruits.splice(index, 1);  
          } else {
            //console.error(`Erreur : this.grille[${x}][${y}] est undefined`);
        }
      }     
    } else {
      //console.log('Attention au mur!');
    }
  }
  
  fantomesDeviennentBleus(duree) {
    this.etatEnergie = true;

    // Restaure les couleurs 
    setTimeout(() => {
        this.etatEnergie = false; 
    }, duree);
  } 

  /**
   * Fantôme orange: avance aléatoirement
   */
  avancerCommeFantomeOrange(fantome) {
    let position = fantome.position;
    let nextP = this.nextPosition(position, fantome.direction);

    if (!this.detecterMur(nextP)) {
      fantome.position = nextP;
    } else {
      fantome.direction = Math.floor(Math.random() * 4);
      if (!this.detecterMur(nextP)) {
        fantome.position = nextP;
      }
    }
  }

  /** 
   * Point départ i1 j1 et arrivée i2 j2
   */
  determinePlusCourtChemin(i1, j1, i2, j2) {
    // masque grille : contient cases 0 (accessibles) ou 1 (mur)
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

    // algorithme de recherche en largeur (BFS): Breadth-First Search pour trouver le plus court chemin dans une grille
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
        if (ii >= 0 && jj >= 0 
          && ii < this.grille.length && jj < this.grille[0].length) {
          if (JSON.stringify(casesVisitees[ii][jj]) == JSON.stringify([-1, -1])) {
            // case voisine devient visitée on enregistre le parent [i,j]
            // et ajout de case voisine dans queue avec une distance incrémentée +1
            casesVisitees[ii][jj] = [i, j];
            queue.push([ii, jj, d + 1]); // cases à explorer 
          } else {
            //console.log(`Case [${ii}, ${jj}] est un mur ou déjà visitée`);
          }
        } else {
          //console.log(`Case [${ii}, ${jj}] hors des limites de la grille`);
        }
      }
    }

    [i, j] = casesVisitees[i2][j2];
    let chemin = [[i2, j2]]
    
    while (i != i1 || j != j1) {
      //cases du chemin dans l’ordre du départ à l’arrivée à la fin de la boucle
      if (i == -1 || j == -1)
        break;
      chemin.unshift([i,j]); 
      [i, j] = casesVisitees[i][j];
    }
    //ajouter [i, j] au début du tableau chemin
    chemin.unshift([i, j]);

    return chemin;
  }
  
  /**
   * Fantôme rouge: suit Pacman avec le + court chemin
   */
  avancerCommeFantomeRouge(fantome) {
    if (this.etatEnergie) {
      this.avancerCommeFantomeOrange(fantome);
      return;
    }

    const [j1, i1] = fantome.position;
    const [j2, i2] = this.pacman.position;
    const chemin = this.determinePlusCourtChemin(i1, j1, i2, j2);

    // Calcul du prochain déplacement
    if (chemin.length > 1) {
      // element 1 est la prochaine étape
      const [nextI, nextJ] = chemin[1]; 
      fantome.position = [nextJ, nextI];
    }
  }

  /**
   * Pacman rencontre un fantôme
   */
  rencontrerFantome() {
    for (let fantome of this.listeFantomes) {
      if (
        this.pacman.position[0] === fantome.position[0]
        && this.pacman.position[1] === fantome.position[1]
      ) {
        return true;  
      }
    }

    return false;
  }

  ajouterFruitAleatoirement() {
    let x, y;
    // fruit dans case point/energie/vide
    do {
        x = Math.floor(Math.random() * this.grille[0].length);  
        y = Math.floor(Math.random() * this.grille.length);   
    } while (
        this.grille[y][x] !== ElementType.POINT &&
        this.grille[y][x] !== ElementType.ENERGIE &&
        this.grille[y][x] !== ElementType.VIDE ||  
        (this.pacman.position[0] === x && this.pacman.position[1] === y) || 
        this.listeFantomes.some(fantome => fantome.position[0] === x && fantome.position[1] === y) 
      );  

    const fruits = ["pomme", "orange", "cerise", "banane"];
    const fruitNom = fruits[Math.floor(Math.random() * fruits.length)];
    const fruit = new Fruit(fruitNom, [x, y]);
    this.fruits.push(fruit);  
   
    setTimeout(function(fruit_,y,x, listeFruits) {
      let index=listeFruits.indexOf(fruit_);
      if (index != -1) {
        listeFruits.splice(index, 1);
      }
    }, 10000, fruit, y, x, this.fruits);

    return fruit;
  }

  demarrerAjouterFruits() {
    setInterval(() => {
      this.ajouterFruitAleatoirement();
    }, 10000);
  }

  fruitPosition(x, y) {
    for (let i = 0; i < this.fruits.length; i++) {
      if (this.fruits[i].position[0] == x && this.fruits[i].position[1] == y) {
        return this.fruits[i];
      }
    }
   
    return null; 
  }

}

export default PlateauJeu; 