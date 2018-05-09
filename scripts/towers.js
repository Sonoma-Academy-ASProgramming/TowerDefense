//EMPTY PLOT
//This is the default tower type, it exists only to make building other towers easier
class EmptyPlot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50);
        plotImg.resize(50, 50);
        this.sprite.addImage(plotImg);
        this.sprite.onMousePressed = () => {
            UI.delete();
            selectedTower = this;
            this.makeMenu();
        };
    }
}

EmptyPlot.prototype.setBuilding = function(building) {
    for (let i = 0; i < Towers.length; i++) {
        if (Towers[i] === this) {
            Towers.splice(i, 1);
            Towers.push(building);
        }
    }
};

EmptyPlot.prototype.makeMenu = function() {
    const buttonFunctions = [
        () => {
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1, 1));
        },
        () => {
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1, 0))
        },
        () => {
            UI.delete();
            this.setBuilding(new PowerUp(this.xPos, this.yPos, 1));
        },
        () => {
            UI.delete();
            console.log('option4')
        }
    ];
    let buttons = [];
    for (let i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 1) * 180 + (width / 3 - 180), 650, buttonFunctions[i]));
    }
    UI.menu = new Menu(buttons[0], buttons[1], buttons[2], buttons[3]);
};

EmptyPlot.prototype.update = function() {
    this.sprite.display();
}

//CANNON CLASS
//This is the simpliest type of combat tower. It shoot the bullets. That is all.
class Cannon {
    constructor(xPosition, yPosition, towerLevel, towerType) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = towerLevel;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50);
        this.sprite.color = (towerType === 0) ? 'black' : 'pink';
        this.gun = new Shoot(this.xPos, this.yPos, this.level, towerType);
        this.sprite.onMousePressed = () => {
          UI.delete();
            try {
                selectedTower.exitCode(this);
            } catch (e) {

            }
            selectedTower = this;
        }
        // this.gun.fire();
        // setInterval(function(){this.gun.fire()},1000);
    }
}

Cannon.prototype.update = function() {
  this.sprite.display();
    if (frameCount % 6 === 0) {
        this.gun.fire();
    }
    this.gun.draw();
};

class PowerUp {
    constructor(xPosition, yPosition, towerLevel) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = towerLevel;
        this.target = null;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50);
        this.sprite.color = 'lightblue';
        this.sprite.onMousePressed = () => {
            selectedTower = this;
        }
    }
}

PowerUp.prototype.update = function() {
    this.sprite.display();
};

PowerUp.prototype.exitCode = function(towerToPower) {
    this.target = towerToPower;
    this.target.level = constrain(this.target.level + 1, 1, this.target.level + 1);
};
