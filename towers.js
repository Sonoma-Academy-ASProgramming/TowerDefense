class EmptyPlot {
  constructor(_parent, xPosition, yPosition) {
    this.parent = _parent;
    this.menu = new EmptyPlotMenu(xPosition, yPosition);
  }
};

EmptyPlot.prototype.draw = function(x, y) {
    fill(139, 69, 19);
    noStroke();
    rect(x, y, 100, 100);
    if(this.parent.selected) {
      this.menu.draw();
    }
}

//PLOT CLASS
class Plot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.building = new EmptyPlot(this, this.xPos, this.yPos);
        this.selected = false;
    }
}

Plot.prototype.setSelected = function(booleanValue) {
  this.selected = booleanValue;
}

Plot.prototype.setBuilding = function(_building) {
    this.building = _building;
}

Plot.prototype.draw = function() {
    this.building.draw(this.xPos, this.yPos);
    // drawBullets()
}

Plot.prototype.isClicked = function() {
    if (mouseX > this.xPos && mouseX < this.xPos + 100 && mouseY > this.yPos && mouseY < this.yPos + 100) {
        return true;
    }
}

Plot.prototype.showMenu = function() {
    this.building.showMenu();
}
