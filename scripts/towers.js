class EmptyPlot {
  constructor(_parent, xPosition, yPosition) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.parent = _parent;
    this.sprite = createSprite(this.xPos, this.yPos, 100, 100);
    this.sprite.shapeColor = 'red';
    this.sprite.onMouseOver = () => {
      this.sprite.shapeColor = 'yellow';
    };
    this.sprite.onMouseOut = () => {
      this.sprite.shapeColor = 'red';
    }
    this.sprite.onMousePressed = () => {
      UI.setFunction(1, () => {console.log('tttttttt')});
      UI.setIcon(1, cannonImg);
    };
  }
}

////using Shoot:

////init
// let gun = new Shoot(towerX, towerY, howManyframesForTheBulletToGetToTheEnemy, BulletType);
////every time you want to fire a bullet:

//PLOT CLASS
class Plot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.building = new EmptyPlot(this, this.xPos, this.yPos);
    }
}

Plot.prototype.setBuilding = function(_building) {
    this.building = _building;
}
