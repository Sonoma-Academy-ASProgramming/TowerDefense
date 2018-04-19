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
  this.building.update();
}

//EMPTY PLOT
//This is the default tower type, it exists only to make building other towers easier
class EmptyPlot {
  constructor(_parent, xPosition, yPosition) {
    this.parent = _parent;
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.sprite = createSprite(this.xPos, this.yPos, 50, 50);
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
    () => {
      removeSprite(this.sprite);
      this.parent.setBuilding(new Cannon(this.xPos, this.yPos, 1));
    },
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

EmptyPlot.prototype.update = function() {
  drawSprite(this.sprite);
}

//CANNON CLASS
//This is the simpliest type of combat tower. It shoot the bullets. That is all.
class Cannon {
  constructor(xPosition, yPosition, towerLevel) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.level = towerLevel;
    this.sprite = createSprite(this.xPos, this.yPos, 50, 50);
    this.sprite.shapeColor = 'black';
    this.gun = new Shoot(this.xPos, this.yPos, this.level);
    console.log(typeof(this.gun));
    console.log(this.gun);
    this.sprite.onMousePressed = () => {
      console.log('clicked a cannon');
    }
    // this.gun.fire();
    // setInterval(function(){this.gun.fire()},1000);
  }
}

Cannon.prototype.update = function() {
  drawSprite(this.sprite);
  if(frameCount % 6 === 0) {
    this.gun.fire();
  }
  this.gun.draw();
}
