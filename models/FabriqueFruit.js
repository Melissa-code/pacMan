import Fruit from './Fruit.js';

class FabriqueFruit {
  static nomsFruits = ["pomme", "orange", "cerise", "banane"];

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
      case "pomme":
        fruit = new Fruit(nomFruit, 100, "pomme.svg", 0, 0);
        break;
      case "orange":
        fruit = new Fruit(nomFruit, 150, "orange.svg", 0, 0);
        break;
      case "cerise":
        fruit = new Fruit(nomFruit, 200, "cerise.svg", 0, 0);
        break;
      case "banane":
        fruit = new Fruit(nomFruit, 250, "banane.svg", 0, 0);
        break;
      default:
        console.log("Erreur: Fruit ", nomFruit, " inconnu.");
        return null;
    }

    return fruit;
  }
}

export default FabriqueFruit; 