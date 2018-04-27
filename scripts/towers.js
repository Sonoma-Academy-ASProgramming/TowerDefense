//EMPTY PLOT
//This is the default tower type, it exists only to make building other towers easier
class EmptyPlot {
    constructor(xPosition, yPosition) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.sprite = createSprite(this.xPos, this.yPos, 50, 50);
        plotImg.resize(50, 50);
        this.sprite.addImage("EmptyPlot", plotImg);
        this.sprite.onMouseOver = () => {
            this.sprite.scale = 1.2;
        };
        this.sprite.onMouseOut = () => {
            this.sprite.scale = 1;
        };
        this.sprite.onMousePressed = () => {
            selectedTower = this;
            this.makeMenu();
        };
    }
}

EmptyPlot.prototype.setBuilding = function(building) {
    for (var i = 0; i < Towers.length; i++) {
        console.log(this);
        if (Towers[i] === this) {
            Towers.splice(i, 1);
            Towers.push(building);
        }
    }
}

EmptyPlot.prototype.makeMenu = function() {
    const buttonFunctions = [
        () => {
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1, 1));
            UI = null;
        },
        () => {
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1, 0));
            UI = null;
        },
        () => {
            this.setBuilding(new PowerUp(this.xPos, this.yPos, 1));
            UI = null;
        },
        () => {
            console.log('option4')
        }
    ];
    let buttons = [];
    for (var i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 1) * 180 + (width / 3 - 180), 650, buttonFunctions[i]));
    }
    UI = new Menu(buttons[0], buttons[1], buttons[2], buttons[3]);
}

EmptyPlot.prototype.update = function() {
    drawSprite(this.sprite);
};

//CANNON CLASS
//This is the simpliest type of combat tower. It shoot the bullets. That is all.
class Cannon {
    constructor(xPosition, yPosition, towerLevel, towerType) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = towerLevel;
        this.sprite = createSprite(this.xPos, this.yPos, 50, 50);
        this.sprite.shapeColor = (towerType === 0) ? 'black' : 'pink';
        this.gun = new Shoot(this.xPos, this.yPos, this.level, towerType);
        this.sprite.onMousePressed = () => {
            try {
                selectedTower.exitCode(this);
            } catch (e) {

            }
            selectedTower = this;
            console.log('clicked a cannon');
        }
        // this.gun.fire();
        // setInterval(function(){this.gun.fire()},1000);
    }
}

Cannon.prototype.update = function() {
    // console.log(this.gun)
    drawSprite(this.sprite);
    if (frameCount % 6 === 0) {
        this.gun.fire();
    }
    this.gun.draw();
}

class PowerUp {
    constructor(xPosition, yPosition, towerLevel) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = towerLevel;
        this.target = null;
        this.sprite = createSprite(this.xPos, this.yPos, 50, 50);
        this.sprite.shapeColor = 'lightblue';
        this.sprite.onMousePressed = () => {
            selectedTower = this;
            console.log('clicked a powerup tower');
        }
    }
}

PowerUp.prototype.update = function() {
    drawSprite(this.sprite);
}

PowerUp.prototype.exitCode = function(towerToPower) {
    this.target = towerToPower;
    this.target.level = constrain(this.target.level + 1, 1, this.target.level + 1);
}
