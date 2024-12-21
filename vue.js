class Vue {

    constructor(plateauDeJeu, document, tailleCarreau) {
        this.plateauDeJeu = plateauDeJeu;
        this.myCanva = document.getElementById("myCanvas");; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");
        
        this.myCanva.width = this.plateauDeJeu.grille[0].length * this.tailleCarreau;
        this.myCanva.height = this.plateauDeJeu.grille.length * this.tailleCarreau;
    
        this.imageEnergie = new Image();
        this.imageEnergie.src = 'assets/images/personnages/bleu.svg'; 
        this.imagesFantomes = [];
        this.chargerImagesFantomes();
        this.imagePacman = ''; 
        this.chargerImagePacman(); 
        this.imagePacmanGauche = new Image();
        this.imagePacmanGauche.src = 'assets/images/personnages/pacmanGauche.svg';
        this.fruitsImages = {};
        this.chargerImagesFruits();

        this.afficherPlateauJeu();
        this.initControl(document);
    }

    chargerImagesFruits() {
        for (const fruit of this.plateauDeJeu.fruits) {
            const image = new Image();
            // Charge l'image
            image.addEventListener("load", () => {}, false);
            image.src = 'assets/images/fruits/' + fruit.image;
            this.fruitsImages[fruit.type] = image;
        }
    }

    chargerImagesFantomes() {
        this.imagesFantomes = [];
        for (const fantome of this.plateauDeJeu.listeFantomes) {
            const image = new Image();
            image.addEventListener("load", () => {}, false);
            image.src = 'assets/images/personnages/' + fantome.couleur + '.svg';   
            this.imagesFantomes.push(image);
        }
    }

    chargerImagePacman() {
        const image = new Image();
        image.addEventListener("load", () => {
            this.ctx.drawImage(
                image, 
                this.plateauDeJeu.pacman.position[0] * this.tailleCarreau + (0.25 * this.tailleCarreau), 
                this.plateauDeJeu.pacman.position[1] * this.tailleCarreau + (0.25 * this.tailleCarreau), 
                this.tailleCarreau/2, 
                this.tailleCarreau/2
            );
        }, false);
        image.src = 'assets/images/personnages/pacman.svg'; 
        this.imagePacman = image;
    }

    afficherFruit(x, y) {
        const fruit = this.plateauDeJeu.fruitPosition(x, y); 
        if (fruit && this.fruitsImages[fruit.type]) {
            const image = this.fruitsImages[fruit.type]; 
            this.ctx.drawImage(
                image,
                x * this.tailleCarreau + (0.25 * this.tailleCarreau),
                y * this.tailleCarreau + (0.25 * this.tailleCarreau),
                this.tailleCarreau / 2,
                this.tailleCarreau / 2
            );
        }
    }
    
    initControl(document) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                this.plateauDeJeu.dirigerPacman('gauche');               
            } else if (event.key === 'ArrowRight') {
                this.plateauDeJeu.dirigerPacman('droite');
            } else if (event.key === 'ArrowDown') {
                this.plateauDeJeu.dirigerPacman('bas');
            } else if (event.key === 'ArrowUp') {
                this.plateauDeJeu.dirigerPacman('haut');
            }
        
           this.afficherPlateauJeu();
        });
    }

    afficherPlateauJeu() {
        // Efface le canvas
        this.ctx.fillStyle = 'white';
        this.ctx.clearRect(0, 0, this.myCanva.width, this.myCanva.height);
        
        for (let y = 0; y < this.plateauDeJeu.grille.length; y++) {
            for (let x = 0; x < this.plateauDeJeu.grille[y].length; x++) {
                // Affiche les éléments du plateau de jeu (mur, energie, vide, point))
                switch (this.plateauDeJeu.grille[y][x]) {
                    case ElementType.MUR:
                        this.ctx.fillStyle = 'yellow';
                        this.ctx.fillRect(x * this.tailleCarreau, y * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau);
                        break;
                    case ElementType.VIDE:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tailleCarreau, y * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau);
                        break;
                    case ElementType.POINT:
                        this.drawCircle(this.ctx, x * this.tailleCarreau + 0.5 * this.tailleCarreau, y * this.tailleCarreau  + 0.5 * this.tailleCarreau, this.tailleCarreau/10, 'pink', 'pink', 2)
                        break;
                    case ElementType.ENERGIE:
                        this.drawCircle(this.ctx, x * this.tailleCarreau + 0.5 * this.tailleCarreau, y * this.tailleCarreau  + 0.5 * this.tailleCarreau, this.tailleCarreau/5, 'red', 'red', 2)
                    break;
                    case ElementType.FRUIT:
                        this.afficherFruit(x,y);
                    break;
                    default:
                        console.log("Erreur d'affichage de la grille de jeu.");
                }
            }
        }

        // Affiche score
        this.ctx.fillStyle = 'black';
        this.ctx.font = '22px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Score: ' + this.plateauDeJeu.pacman.score, this.myCanva.width/2, this.tailleCarreau/2)
        
        // Affiche Game Over 
        if (this.plateauDeJeu.finduJeu) {
            this.ctx.fillStyle = 'red';
            this.ctx.font = 'bold 22px Orbitron';
            this.ctx.fillText('Game Over', this.myCanva.width / 2 + 130, this.tailleCarreau / 2);  // Décale le texte à droite du score
        } 

        // Affiche les fantômes 
        let image;
        for (let i = 0; i < this.imagesFantomes.length; i++) {
            if (this.plateauDeJeu.etatEnergie == true) {
                image = this.imageEnergie;
            } else {
                image = this.imagesFantomes[i];
            }
            const fantome = this.plateauDeJeu.listeFantomes[i];
            if (image.complete) {
                this.ctx.drawImage(
                    image,
                    fantome.position[0] * this.tailleCarreau + (0.25 * this.tailleCarreau),
                    fantome.position[1] * this.tailleCarreau + (0.25 * this.tailleCarreau),
                    this.tailleCarreau / 2,
                    this.tailleCarreau / 2
                );
            }
        }
        
        // Affiche Pacman
        if (this.imagePacman.complete || this.imagePacmanGauche.complete) {
            const pacman = this.plateauDeJeu.pacman;
            this.ctx.save();
            let angle = 0;
            let imageToDraw = this.imagePacman;
            if (pacman.direction === Directions.GAUCHE) {
                imageToDraw = this.imagePacmanGauche;
            }

            switch (pacman.direction) {
                case Directions.HAUT:
                    angle = -Math.PI / 2; 
                    break;
                case Directions.BAS:
                    angle = Math.PI / 2;  
                    break;
                case Directions.GAUCHE:
                    angle = 0;     
                    break;
                case Directions.DROITE:
                    angle = 0; 
                    break;
            }
           
            this.ctx.translate(
                pacman.position[0] * this.tailleCarreau + this.tailleCarreau / 2,
                pacman.position[1] * this.tailleCarreau + this.tailleCarreau / 2
            );

            this.ctx.rotate(angle);
            this.ctx.drawImage(imageToDraw, -this.tailleCarreau / 4, -this.tailleCarreau / 4, this.tailleCarreau / 2, this.tailleCarreau / 2);
            this.ctx.restore();
        }
       
        setTimeout(() => this.afficherPlateauJeu(), 100);
    }
      
    drawCircle(ctx, x, y, rayon, fill, stroke, strokeWidth) {
        ctx.beginPath()
        ctx.arc(x, y, rayon, 0, 2 * Math.PI, false) 
        if (fill) {
          ctx.fillStyle = fill
          ctx.fill()
        }
        if (stroke) {
          ctx.lineWidth = strokeWidth
          ctx.strokeStyle = stroke
          ctx.stroke()
        }
    }
}