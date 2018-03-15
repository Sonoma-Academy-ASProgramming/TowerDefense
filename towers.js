class EmptyPlot {

};

EmptyPlot.prototype.display = function(x, y) {
    fill(139, 69, 19);
    rect(x, y, 100, 100);
}

//PLOT CLASS
class Plot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.building = new EmptyPlot();
    }
}

Plot.prototype.setBuilding = function(_building) {
    this.building = _building;
}

Plot.prototype.draw = function() {
    this.building.display(this.xPos, this.yPos);
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
