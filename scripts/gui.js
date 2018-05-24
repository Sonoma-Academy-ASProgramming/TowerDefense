class GUI {
    constructor() {
        this.menu = null;
    }
}

GUI.prototype.delete = function () {
    if (this.menu !== null) {
        this.menu.delete();
        this.menu = null;
    } else {
    }
};

GUI.prototype.update = function () {
    if (this.menu) {
        this.menu.update();
    }
};

class Button {
    constructor(xPosition, yPosition, _onClicked, buttonTower) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.onClicked = _onClicked;
        this.sprite = new Supersprite(this.xPos, this.yPos, 80, 80, {type: 'button', tower: TOWER_CONST[buttonTower]});
        this.sprite.addImage(towerImages[buttonTower]);
        this.sprite.onMousePressed = _onClicked;
    }
}

//update this code later to make it work with any number of buttons, it will be more efficient - Liev
class Menu {
    constructor(buttons) {
        this.buttons = buttons;
    }
}

Menu.prototype.update = function () {
    this.buttons.forEach((button) => {
        button.sprite.display();
    });
};

Menu.prototype.delete = function () {
    for (let i = 0; i < this.buttons.length; i++) {
        this.buttons[i].sprite.delete();
    }
    this.buttons = [];
};
