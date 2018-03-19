class EmptyPlot {
  constructor(_parent, xPosition, yPosition) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.parent = _parent;
    this.selected = false;
    this.sprite = createSprite(this.xPos, this.yPos, 150, 150);
    this.menu = new EmptyPlotMenu(this.xPos, this.yPos);
    this.sprite.setCollider('rectangle', 0, 0, 150, 150);
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

//PLOT CLASS
class Plot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.selected = false;
        this.building = new EmptyPlot(this, this.xPos, this.yPos);
    }
}

Plot.prototype.setSelected = function(booleanValue) {
  this.selected = booleanValue;
}

Plot.prototype.setBuilding = function(_building) {
    this.building = _building;
}

Plot.prototype.draw = function() {
    this.building.draw();
    // drawBullets()
}

Plot.prototype.showMenu = function() {
    this.building.showMenu();
}
