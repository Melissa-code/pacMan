class Vue {

    constructor(plateauDeJeu, document, tailleCarreau) {
        this.plateauDeJeu = plateauDeJeu;
        this.myCanva = document.getElementById("myCanvas");; 
        this.tailleCarreau = tailleCarreau; 
        this.ctx = this.myCanva.getContext("2d");

        this.myCanva.width = this.plateauDeJeu.grille[0].length * this.tailleCarreau;
        this.myCanva.height = this.plateauDeJeu.grille.length * this.tailleCarreau;
    
        // images des fantômes
        this.imagesFantomes = [];
        this.chargerImagesFantomes();

        this.afficherPlateauJeu();
    }

    chargerImagesFantomes() {
        for (const fantome of this.plateauDeJeu.listeFantomes) {
            let image = new Image();

            image.addEventListener("load", () => {
                this.ctx.drawImage(image, fantome.position[0] * this.tailleCarreau + (0.25 * this.tailleCarreau), fantome.position[1] * this.tailleCarreau + (0.25 * this.tailleCarreau), this.tailleCarreau/2, this.tailleCarreau/2);
            }, false);
    
            image.src = 'assets/images/' + fantome.couleur + '.svg'; 
            this.imagesFantomes.push(image);
        }
    }

    afficherPlateauJeu() {
        for (let y = 0; y < this.plateauDeJeu.grille.length; y++) {
            for (let x = 0; x < this.plateauDeJeu.grille[y].length; x++) {
                // choisir l'élément à afficher 
                switch (this.plateauDeJeu.grille[y][x]) {
                    case 0:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tailleCarreau, y * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau);
                        break;
                    case 1:
                        this.ctx.fillStyle = 'white';
                        this.ctx.fillRect(x * this.tailleCarreau, y * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau);
                        break;
                    case 2:
                        this.drawCircle(this.ctx, x * this.tailleCarreau + 0.5 * this.tailleCarreau, y * this.tailleCarreau  + 0.5 * this.tailleCarreau, this.tailleCarreau/10, 'yellow', 'yellow', 2)
                        break;
                    case 3:
                        this.drawCircle(this.ctx, x * this.tailleCarreau + 0.5 * this.tailleCarreau, y * this.tailleCarreau  + 0.5 * this.tailleCarreau, this.tailleCarreau/5, 'red', 'red', 2)
                        break;
                    default:
                        console.log("Erreur d'affichage de la grille de jeu.");
                }
            }
        }

        // Affiche les fantômes 
        for (let i = 0; i < this.plateauDeJeu.listeFantomes.length; i++) {
            let fantome = this.plateauDeJeu.listeFantomes[i];
            let image = this.imagesFantomes[i];
       
            if (image) {
                let position = fantome.position; // [x, y]
                this.ctx.drawImage(image, position[0] * this.tailleCarreau, position[1] * this.tailleCarreau, this.tailleCarreau, this.tailleCarreau);
            }
        }
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