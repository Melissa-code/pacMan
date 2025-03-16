class Fruit {
  nom;
  nbPoints;
  image;
  position;

  constructor(nom, position) {
    this.nom = nom;
    this.position = position;
    this.nbPoints = nom === "pomme" ? 100 : (nom === "orange" ? 150 : (nom === "cerise" ? 200 : 250));
    this.image  = nom.toLowerCase() + ".svg";
  }
}

export default Fruit;