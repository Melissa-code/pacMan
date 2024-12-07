class Vue {

    constructor(plateauDeJeu, document, tailleCarreau) {
        this.plateauDeJeu = plateauDeJeu;
        this.myCanva = document.getElementById("myCanvas");; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");
        
        this.myCanva.width = this.plateauDeJeu.grille[0].length * this.tailleCarreau;
        this.myCanva.height = this.plateauDeJeu.grille.length * this.tailleCarreau;
    
        this.imageEnergie = new Image();
        this.imageEnergie.src = 'assets/images/bleu.svg'; 
        this.imagesFantomes = [];
        this.chargerImagesFantomes();
        this.imagePacman = ''; 
        this.chargerImagePacman(); 
        this.afficherPlateauJeu();
        this.initControl(document); 
    }

    chargerImagesFantomes() {
        // this.imageEnergie.addEventListener("load", () => {
        //     // 
        // }, false);

        this.imagesFantomes=[];
        for (const fantome of this.plateauDeJeu.listeFantomes) {
            const image = new Image();

            // Charge l'image
            image.addEventListener("load", () => {
                // 
            }, false);

            image.src = 'assets/images/' + fantome.couleur + '.svg';   
            this.imagesFantomes.push(image);
        }
    }

   
    
    chargerImagePacman() {
        const image = new Image();
        // Charge l'image
        image.addEventListener("load", () => {
            this.ctx.drawImage(image, this.plateauDeJeu.pacman.position[0] * this.tailleCarreau + (0.25 * this.tailleCarreau), this.plateauDeJeu.pacman.position[1] * this.tailleCarreau + (0.25 * this.tailleCarreau), this.tailleCarreau/2, this.tailleCarreau/2);
        }, false);

        image.src = 'assets/images/pacman.svg'; 
        this.imagePacman = image;
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
        //this.chargerImagesFantomes();

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
                    default:
                        console.log("Erreur d'affichage de la grille de jeu.");
                }
            }
        }
        this.ctx.fillStyle = 'black';
        this.ctx.font = '22px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Score: ' + this.plateauDeJeu.pacman.score, this.myCanva.width/2, this.tailleCarreau/2)

        // Affiche les fantômes 
        let image;

        for (let i = 0; i < this.imagesFantomes.length; i++) {
            if (this.plateauDeJeu.etatEnergie == true) {
                image = this.imageEnergie;
                console.log("fantome bleu")
            } else {
                image = this.imagesFantomes[i];
                console.log("fantome couleur")
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
        if (this.imagePacman.complete) {
            const pacman = this.plateauDeJeu.pacman;

            this.ctx.save();
            
            let angle = 0;
            switch (pacman.direction) {
                case Directions.HAUT:
                    angle = -Math.PI / 2; 
                    break;
                case Directions.BAS:
                    angle = Math.PI / 2;  
                    break;
                case Directions.GAUCHE:
                    angle = Math.PI;     
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
            this.ctx.drawImage(this.imagePacman, -this.tailleCarreau / 4, -this.tailleCarreau / 4, this.tailleCarreau / 2, this.tailleCarreau / 2);
            //this.ctx.drawImage(this.imagePacman, pacman.position[0] * this.tailleCarreau + (0.25 * this.tailleCarreau), pacman.position[1] * this.tailleCarreau + (0.25 * this.tailleCarreau), this.tailleCarreau / 2, this.tailleCarreau / 2);
        
            this.ctx.restore();
        }
        
        setTimeout(() => this.afficherPlateauJeu(), 200);
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



