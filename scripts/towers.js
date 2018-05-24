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

EmptyPlot.prototype.setBuilding = function (building) {
    for (let i = 0; i < Towers.length; i++) {
        if (Towers[i] === this) {
            Towers.splice(i, 1);
            Towers.push(building);
        }
    }
};

EmptyPlot.prototype.makeMenu = function () {
    const buttonFunctions = [
        () => {
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1));
        },
        () => {
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 2))
        },
        () => {
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 3))
        },
        () => {
            UI.delete();
            this.setBuilding(new Mine(this.xPos, this.yPos, 1));
        }
    ];
    let buttons = [];
    for (let i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 1) * 180 + (width / 3 - 180), 670, buttonFunctions[i], i + 1));
    }
    UI.menu = new Menu([buttons[0], buttons[1], buttons[2], buttons[3]]);
};

EmptyPlot.prototype.update = function () {
    this.sprite.display();
};

//CANNON CLASS
//This is the simpliest type of combat tower. It shoot the bullets. That is all.
class Cannon {
    constructor(xPosition, yPosition, towerType) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.rangeLevel = 1;
        this.frequencyLevel = 1;
        this.forceLevel = 1;
        this.towerType = towerType;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50, true);
        this.sprite.addImage(towerImages[towerType]);
        this.gun = new Shoot(this.xPos, this.yPos, towerType, this.sprite);
        this.sprite.onMousePressed = () => {
            UI.delete();
            selectedTower = this;
            this.makeMenu();
        }
    }
}

Cannon.prototype.update = function () {
    if (selectedTower === this) {
        fill(0, 0, 255, 45);
        ellipse(this.xPos, this.yPos, 150 * this.rangeLevel * 2);
    }
    this.sprite.display();
    if (this.towerType === 1) {
        if (frameCount % constrain(10 - this.frequencyLevel, 0, 10) === 0) {
            this.gun.fire();
        }
    }
    else if (this.towerType === 2) {
        if (frameCount % constrain(10 - this.frequencyLevel, 0, 10) === 0) {
            this.gun.fire();
        }
    } else if (this.towerType === 3) {
        if (frameCount % constrain(20 - this.frequencyLevel, 0, 20) === 0) {
            this.gun.fire();
        }
    }
    this.gun.draw();
};

class Mine {
    constructor(xPosition, yPosition, towerLevel) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = towerLevel;
        this.range = 0;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50);
        this.sprite.color = 'lightblue';
        this.sprite.addImage(towerImages[4]);
        this.sprite.onMousePressed = () => {
            selectedTower = this;
            this.makeMenu();
        };
        cashSound.play();
    }
}

Mine.prototype.update = function () {
    this.sprite.display();
    if (frameCount % 60 === 0) {
        Game.money += 2 + this.level;
    }
};

Mine.prototype.upgrade = function () {
    this.level += 1;
    Game.money -= 5;
    UI.delete();
};

Mine.prototype.sell = function () {
    UI.delete();
    Towers[Towers.indexOf(this)] = new EmptyPlot(this.xPos, this.yPos);
}

Mine.prototype.makeMenu = function () {
    let buttonFunctions = [
      () => {
        this.upgrade();
          },
      () => {
        this.sell();
        }
      ];
    let upgradeButtons = [
        new Button(horizontal(40), vertical(91), buttonFunctions[0]),
        new Button(horizontal(60), vertical(91), buttonFunctions[1])
    ];
    UI.menu = new Menu([upgradeButtons[0], upgradeButtons[1]]);
};

//FIXME Figure out correct level up amounts
Cannon.prototype.forceLevelUp = function () {
    this.forceLevel += 1;
    this.gun.force = this.forceLevel;
    this.gun.areaDamage = (this.gun.type === 2) ? 0.5 * this.force : 0;
};
Cannon.prototype.frequencyLevelUp = function () {
    this.frequencyLevel += 1;
};
Cannon.prototype.rangeLevelUp = function () {
    this.rangeLevel += 1;
    this.gun.range = 150 * this.rangeLevel;
    this.gun.areaDamageRange = (this.gun.type === 2) ? this.range / 3 : 0;
};

Cannon.prototype.makeMenu = function () {
  let buttonFunctions = [
  () => {
    this.forceLevelUp();
    UI.delete();
    },
  () => {
    this.rangeLevelUp();
    UI.delete();
    },
  () => {
    this.frequencyLevelUp();
    UI.delete();
    }
];
  let upgradeButtons = [
    new Button(horizontal(20), vertical(91), buttonFunctions[0]),
    new Button(horizontal(40), vertical(91), buttonFunctions[1]),
    new Button(horizontal(60), vertical(91), buttonFunctions[2]),
    new Button(horizontal(80), vertical(91), buttonFunctions[3])
  ];
  UI.menu = new Menu([upgradeButtons[0], upgradeButtons[1], upgradeButtons[2], upgradeButtons[3]]);
}
