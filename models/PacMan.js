class PacMan {
  position; //[x, y]
  direction;
  invincible;
  score;

  constructor(position, direction = null, invincible) {
    this.position = position;
    this.direction = direction;
    this.invincible = invincible;
    this.score = 0;
  }
}

export default PacMan;