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
      this.makeMenu();
    };
  }
}

EmptyPlot.prototype.makeMenu = function() {
  const buttonFunctions = [
    () => {console.log('option1')},
    () => {console.log('option2')},
    () => {console.log('option3')},
    () => {console.log('option4')}
  ];
  let buttons = [];
  for(var i = 0; i < buttonFunctions.length; i++) {
    buttons.push(new Button((i + 1) * 180 + (width/3 - 180), 650, buttonFunctions[i]));
  }
  UI = new Menu(buttons[0], buttons[1], buttons[2], buttons[3]);
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

Plot.prototype.update = function() {
  drawSprite(this.building.sprite);
}
