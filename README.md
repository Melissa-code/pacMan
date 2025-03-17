# Pac-Man

Pac-Man est un jeu d'arcade sorti en 1980. Dans ce jeu, le joueur doit éviter les fantômes tout en collectant toutes les pastilles pour progresser à travers les niveaux.

Ce jeu est codé en JavaScript et est déployé sur Netlify: **[🔗 jouer à Pac-Man en ligne](https://new-pacman-game.netlify.app/)**
 
⚠️ **Ce jeu est optimisé pour ordinateur** et nécessite l'utilisation des flèches du clavier. Il n'est pas compatible avec les appareils mobiles ou tablettes.

---

## Aperçu 

<div style="display: flex; gap: 3rem;">
  <img src="./assets/images/pacman_desktop.svg" alt="Aperçu du jeu sur desktop" style="max-width: 100%;  height: auto;" />
  <img src="./assets/images/pacman_mobile.svg" alt="Aperçu du jeu sur mobile - non jouable" style="max-width: 100%; height: auto;" />
</div>

---- 

## 1. But du jeu 

Le but du jeu est de manger toutes les pastilles dans le labyrinthe tout en évitant les fantômes. 


## 2. Éléments du jeu

### 2.1 Pac-Man: 

Le joueur contrôle Pac-Man qui peut se déplacer dans 4 directions (haut, bas, gauche, droite) pour manger des pastilles dans le labyrinthe.

### 2.2. Les fantômes: 

4 fantômes colorés poursuivent Pac-Man. Si un fantôme touche Pac-Man, ce dernier perd. 

1. **Blinky (rouge):** il suit directement Pac-Man cherchant à le rattraper à tout prix. Ce fantôme est le plus agressif du jeu.

2. **Clyde (orange):** il avance de manière aléatoire, changeant de direction chaque fois qu'il rencontre un obstacle. 

3. **Pinky (rose):** il agit presque comme Blinky. Il se superpose à Blinky parfois. 

4. **Inky (bleu clair):** il alterne entre le comportement de Blinky et celui de Clyde, ce qui le rend particulièrement difficile à prévoir. 


### 2.3. Les pastilles/points:

De petites pastilles/points sont réparties dans le labyrinthe. Pac-Man doit toutes les manger pour gagner. Chaque pastille mangée rapporte 10 points.


### 2.4. Les super-pastilles/énergies:

Il y en a 4 dans chaque niveau. Elles sont situées dans les coins du labyrinthe et rapportent 50 points chacune.

Lorsque Pac-Man en mange une, **les fantômes deviennent bleus pendant un temps limité** ce qui permet à Pac-Man de les manger. Manger un fantôme donne des points bonus, mais après un certain temps, les fantômes reviennent à la normale et recommencent à poursuivre Pac-Man.


### 2.5. Les fruits: 

Des fruits apparaissent dans le labyrinthe à intervalles réguliers et donnent entre 100 et 250 points selon le fruit mangé.


### 2.6. Les tunnels/vides:

Il y a des tunnels de téléportation aux extrémités du labyrinthe. Si Pac-Man entre dans un tunnel, il ressort de l'autre côté du labyrinthe.

---

## 3. Installation 

```
  git clone https://github.com/Melissa-code/pacMan.git
  cd pacMan
  Ouvrir le fichier `index.html` dans le navigateur pour commencer à jouer
```

---

## 4. Technologies : 

- **[HTML](https://developer.mozilla.org/fr/docs/Web/HTML)** : Structure du jeu
- **[CSS](https://developer.mozilla.org/fr/docs/Web/CSS)** : Design et mise en page
- **[JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)** : Logique du jeu 
- **[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)** : Rendu du jeu

--- 

## 5. Architecture et patterns : 

### 5.1. Architecture 

Structure du projet:
```
📂 pacMan
┣ 📜 index.html → Structure du jeu
┣ 📜 style.css → Styles et mise en page
┣ 📂 models → Contient les classes du jeu
│ ┣ 📜 Fantome.js → Représente un fantôme
│ ┣ 📜 PacMan.js → Représente Pac-Man
│ ┣ 📜 Fruit.js → Représente un fruit
│ ┣ 📜 FabriqueFruit.js → Gère la création des fruits
│ ┣ 📜 PlateauJeu.js → Gère le plateau de jeu
│ ┗ 📜 Directions.js → Enum des directions
│ ┗ 📜 ElementType.js → Enum des éléments (mur, vide, point, energie, fruit)
┣ 📜 Vue.js → Gère l'affichage du jeu et les interactions utilisateur
┗ 📜 controller.js → Point d’entrée, initialise le jeu et la logique principale
┗ 📜 images → Contient les images du jeu
```

### 5.2. Patterns utilisés

- **1. MVC (Model-View-Controller)**  
  - `models/` contient la logique du jeu (Modèle) 
  - `Vue.js` Gère l'affichage et l'interface utilisateur (Vue)
  - `controller.js` relie la logique du jeu et l'affichage en gérant les interactions (Contrôleur)

✔️ **Le pattern MVC** permet de séparer la logique du jeu et l'affichage facilitant ainsi 
la maintenance et l'évolution du projet.

- **2. Factory Pattern**  
  - `FabriqueFruit.js` est une **fabrique** qui crée dynamiquement les différents fruits du jeu en fonction du type demandé

✔️ **Le pattern Factory** permet d'ajouter facilement de nouveaux fruits sans modifier le code principal.

---

## 6. Algorithmes 

### 6.1. Déplacement des fantômes 👻

Chaque fantôme a un comportement unique basé sur un algorithme spécifique: 

**1. Déplacement aléatoire (Fantôme orange Clyde):**

Il se déplace de manière aléatoire en changeant de direction s'il rencontre un mur. S'il peut avancer, il continue dans la même direction. 

**2. Algorithme de plus court chemin (Fantôme rouge Blinky):**

Il utilise l'algorithme de Breadth-First Search ***(BFS)*** pour déterminer le chemin le plus rapide jusqu'à Pac-Man. Cet algorithme explore les cases adjacentes en priorité pour garantir le trajet le plus court sans obstacles.

 **3. Comportement hybride (Fantôme bleu clair Inky)**:

Il alterne entre un suivi direct de Pac-Man (comme Blinky) et un mouvement aléatoire (comme Clyde). Un timer lui permet de changer de stratégie à intervalles réguliers.

**4. Anticipation (Fantôme rose Pinky)**:

Il tente de prévoir la position future de Pac-Man en fonction de sa direction actuelle. Il cherche à intercepter Pac-Man en avançant vers une case située quelques déplacements devant lui.


### 6.2. Gestion des collisions 🧱

**1. Pour éviter que Pac-Man traverse les murs**, une fonction de détection de collision vérifie si la case suivante est un mur.

**2. Si PacMan rencontre un fantôme**, la partie est perdue.

**3. Si Pac-Man mange une super-pastille**, les fantômes deviennent vulnérables (bleus) temporairement et rapportent des points.


### 6.3. Apparition et gestion des fruits 🍒

**1. Les fruits apparaissent à intervalles réguliers à des positions aléatoires** dans le labyrinthe. L'algorithme vérifie que la position sélectionnée ne contient ni mur, ni fantôme, ni Pac-Man avant de placer un fruit.

### 6.4. Algorithme de boucle du jeu ➰

Le jeu fonctionne en boucle continue:

**1. Pac-Man** avance selon la direction choisie. 

**2. Le programme vérifie les collisions** et interactions (mur, pastille, fantôme, fruit).

**3. Chaque fantôme** calcule son prochain déplacement selon son algorithme propre.

**4. La boucle se répète** jusqu'à ce que Pac-Man ait mangé toutes les pastilles ou perdu.


### 6.5. Affichage du jeu 🆑

L'affichage du jeu repose sur un algorithme de rendu qui met à jour le canvas à chaque instant:

**1. Effacer l'écran** (clearRect) pour éviter les superpositions.

**2. Dessiner la grille du jeu** en parcourant plateauDeJeu.grille et en affichant les murs, pastilles, fruits et cases vides.

**3. Afficher les personnages**: Pac-Man est dessiné avec sa direction actuelle. Les fantômes changent d'apparence s’ils sont vulnérables. 

**4. Affichage du score** et de l’état du jeu (Game Over ou Victoire).

**5. Boucle de rafraîchissement**: L’appel récurrent à setTimeout() permet d’actualiser l’affichage toutes les 100ms.

---

## 7. Author 

- Melissa-code