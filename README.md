# Pac-Man

Pac-Man est un jeu d'arcade sorti en 1980. 

C'est un jeu de stratégie et de réflexion dans lequel le joueur doit jongler entre l'évitement des fantômes et la collecte de toutes les pastilles pour progresser dans les niveaux.

Joue au jeu : [New Pacman Game](https://new-pacman-game.netlify.app/)


<img src="./assets/pacman.png" alt="Pac-Man" width="600"/>


## But du jeu 

Le but du jeu de Pac-Man est de manger toutes les pastilles dans le labyrinthe tout en évitant les fantômes. 

Le joueur passe au niveau supérieur lorsque toutes les pastilles d'un niveau sont mangées. 



## Éléments du jeu


### Pac-Man: 

Le joueur peut se déplacer dans quatre directions (haut, bas, gauche, droite) pour manger des pastilles dans le labyrinthe.


### Les fantômes: 

Quatre fantômes colorés poursuivent Pac-Man. Si un fantôme touche Pac-Man, ce dernier perd une vie.

- Blinky (rouge): c'est le plus agressif. Il suit directement Pac-Man.

- Pinky (rose): il essaie de prendre Pac-Man en embuscade.

- Inky (bleu): son comportement alterne entre celui de Blinky et celui de Pinky. 

- Clyde (orange): il se comporte comme le fantôme rouge Blinky et imite Pinky quand Pacman mange une énergie. 


### Les pastilles/points:

De petites pastilles/points sont réparties dans tout le labyrinthe. Pac-Man doit toutes les manger pour passer au niveau supérieur.

Chaque pastille mangée rapporte 10 points.


### Les super-pastilles/énergies:

Il y en a 4 dans chaque niveau. Elles sont situées dans les coins du labyrinthe. 

- Lorsque Pac-Man en mange une, les fantômes deviennent bleus pendant un temps limité ce qui permet à Pac-Man de les manger. 

Elles rapportent 50 points.

- Manger un fantôme donne des points bonus, mais après un certain temps, les fantômes reviennent à la normale et recommencent à poursuivre Pac-Man.

Manger un fantôme après une Super-pastille : Le premier fantôme donne 200 points, le deuxième 400 points, le troisième 800 points, et le quatrième 1600 points.


### Les fruits: 

Des fruits apparaissent parfois au centre du labyrinthe. Lorsque Pac-Man les mange, il gagne des points supplémentaires.

Les fruits bonus apparaissent à intervalles réguliers et donnent entre 100 et 250 points selon le fruit.


### Les tunnels/vides:

Il y a des tunnels de téléportation aux extrémités du labyrinthe. Si Pac-Man (ou un fantôme) entre dans un tunnel, il ressort de l'autre côté du labyrinthe.


_______________________________________________________


Design pattern : MVC (model, view, index)

- Create all the classes in the model

- Display the game in the view

