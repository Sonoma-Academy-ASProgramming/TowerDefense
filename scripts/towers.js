class EmptyPlot {
  constructor(_parent, xPosition, yPosition) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.parent = _parent;
    this.selected = false;
    this.sprite = createSprite(this.xPos, this.yPos, 100, 100);
    this.sprite.shapeColor = 'green';
    this.sprite.onMouseOver = () => {
      this.sprite.shapeColor = 'darkgreen';
    };
    this.sprite.onMouseOut = () => {
      this.sprite.shapeColor = 'green';
    }
    this.menu = new EmptyPlotMenu(this.xPos, this.yPos);
    this.sprite.onMousePressed = () => {
      this.selected = true;
    };
  }
}

EmptyPlot.prototype.draw = function() {
  drawSprite(this.sprite);
  if(this.selected) {
    this.menu.draw();
  }
}

EmptyPlot.prototype.setSelected = function(value) {
  this.selected = value;
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

Plot.prototype.setSelected = function(value) {
  this.building.setSelected(value);
}

Plot.prototype.setBuilding = function(_building) {
    this.building = _building;
}

Plot.prototype.draw = function() {
    this.building.draw();
    // drawBullets()
}
