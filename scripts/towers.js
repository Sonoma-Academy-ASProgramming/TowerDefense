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
            let cost = TOWER_CONST[1].price;
            if (Game.money < cost) {
                score.addPrompts("Not enough money");
                return;
            }
            Game.money -= cost;
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 1));
        },
        () => {
            let cost = TOWER_CONST[2].price;
            if (Game.money < cost) {
                score.addPrompts("Not enough money");
                return;
            }
            Game.money -= cost;
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 2))
        },
        () => {
            let cost = TOWER_CONST[3].price;
            if (Game.money < cost) {
                score.addPrompts("Not enough money");
                return;
            }
            Game.money -= cost;
            UI.delete();
            this.setBuilding(new Cannon(this.xPos, this.yPos, 3))
        },
        () => {
            let cost = TOWER_CONST[4].price;
            if (Game.money < cost) {
                score.addPrompts("Not enough money");
                return;
            }
            Game.money -= cost;
            UI.delete();
            this.setBuilding(new Mine(this.xPos, this.yPos, 4));
        }
    ];
    let buttons = [];
    for (let i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 1) * 180 + (width / 3 - 180), 670, buttonFunctions[i], i + 1));
    }
    UI.menu = new Menu(buttons);
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
        this.speedLevel = 1;
        this.forceLevel = 1;
        this.price = TOWER_CONST[towerType].price;
        this.towerType = towerType;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50, {type: 'tower'});
        this.sprite.addImage(towerImages[towerType]);
        this.gun = new Shoot(this.xPos, this.yPos, towerType, this.sprite);
        this.sprite.onMousePressed = () => {
            UI.delete();
            selectedTower = this;
            rangeValue = 20;
            towerSelectedSound.play();
            this.makeMenu();
        }
    }
}

Cannon.prototype.update = function () {
    if (selectedTower === this) {
        fill(0, 0, 255, 45);
        let fullRange = 150 * this.rangeLevel * 2;
        if (rangeValue < fullRange) {
            rangeValue += 40;
        }
        ellipse(this.xPos, this.yPos, rangeValue, rangeValue);
    }
    this.sprite.display();
    if (!freezeGame) {
        if (this.towerType === 1) {
            if (frameCount % constrain(10 - this.speedLevel, 0, 10) === 0) {
                this.gun.fire();
            }
        }
        else if (this.towerType === 2) {
            if (frameCount % constrain(10 - this.speedLevel, 0, 10) === 0) {
                this.gun.fire();
            }
        } else if (this.towerType === 3) {
            if (frameCount % constrain(20 - this.speedLevel, 0, 20) === 0) {
                this.gun.fire();
            }
        }
    }
    this.gun.draw();
};

class Mine {
    constructor(xPosition, yPosition, towerType) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.level = 1;
        this.range = 0;
        this.price = TOWER_CONST[towerType].price;
        this.sprite = new Supersprite(this.xPos, this.yPos, 50, 50, {type: 'tower'});
        this.sprite.color = 'lightblue';
        this.sprite.addImage(towerImages[towerType]);
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
        Game.money += 2 + this.level * this.level;
    }
};

Mine.prototype.makeMenu = function () {
    let buttonFunctions = [
        () => {
            this.upgrade();
        },
        () => {
            this.sell();
        }
    ];
    let buttons = [];
    for (let i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 2) * 180 + (width / 3 - 180), 670, buttonFunctions[i], [5, 8][i]));
    }
    UI.menu = new Menu(buttons);
};

Mine.prototype.upgrade = function () {
    let cost = selectedTower.price * 2 * this.level * this.level;
    if (Game.money < cost) {
        score.addPrompts("Not enough money");
        return;
    } else if (this.level > 4) {
        score.addPrompts("Level at MAX");
        return;
    }
    this.level += 1;
    Game.money -= cost;
};

Mine.prototype.sell = function () {
    Towers[Towers.indexOf(this)] = new EmptyPlot(this.xPos, this.yPos);
    let totalUpgrade = 50 * Math.pow(this.level - 1, 2);
    Game.money += totalUpgrade + this.price / 5;
};

Cannon.prototype.sell = function () {
    UI.delete();
    Towers[Towers.indexOf(this)] = new EmptyPlot(this.xPos, this.yPos);
    let totalUpgrade = 50 * (Math.pow(this.rangeLevel - 1, 2) + Math.pow(this.speedLevel - 1, 2) + Math.pow(this.forceLevel - 1, 2));
    Game.money += totalUpgrade + this.price / 5;
};
Cannon.prototype.forceLevelUp = function () {
    let cost = Math.round(this.price * 2 * this.forceLevel * this.forceLevel);
    if (Game.money < cost) {
        score.addPrompts("Not enough money");
        return;
    } else if (this.forceLevel > 4) {
        score.addPrompts("Force level at MAX");
        return;
    }
    Game.money -= cost;
    this.forceLevel += 1;
    console.log("forcelevel", this.forceLevel);
    this.gun.force = this.forceLevel;
    this.gun.areaDamage = (this.gun.type === 2) ? 0.5 * this.forceLevel : 0;
};
Cannon.prototype.frequencyLevelUp = function () {
    let cost = Math.round(this.price * 2 * this.speedLevel * this.speedLevel);
    if (Game.money < cost) {
        score.addPrompts("Not enough money");
        return;
    } else if (this.speedLevel > 4) {
        score.addPrompts("Speed level at MAX");
        return;
    }
    Game.money -= cost;
    this.speedLevel += 1;
};
Cannon.prototype.rangeLevelUp = function () {
    let cost = Math.round(this.price * 2 * this.rangeLevel * this.rangeLevel);
    if (Game.money < cost) {
        score.addPrompts("Not enough money");
        return;
    } else if (this.rangeLevel > 4) {
        score.addPrompts("Range level at MAX");
        return;
    }
    Game.money -= cost;
    this.rangeLevel += 1;
    this.gun.range = 150 * this.rangeLevel;
    this.gun.areaDamageRange = (this.gun.type === 2) ? this.gun.range / 3 : 0;
    console.log(this.gun.areaDamageRange);
};

Cannon.prototype.makeMenu = function () {
    let buttonFunctions = [
        () => {
            this.forceLevelUp();
        },
        () => {
            this.rangeLevelUp();
        },
        () => {
            this.frequencyLevelUp();
        },
        () => {
            this.sell();
            cashSound.play();
        }
    ];
    let buttons = [];
    for (let i = 0; i < buttonFunctions.length; i++) {
        buttons.push(new Button((i + 1) * 180 + (width / 3 - 180), 670, buttonFunctions[i], i + 5));
    }
    UI.menu = new Menu(buttons);
};
