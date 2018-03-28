class Button {
    constructor(xPosition, yPosition, _onClicked) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.onClicked = _onClicked;
        this.sprite = createSprite(this.xPos, this.yPos, 80, 80);
        this.sprite.onMousePressed = () => {
            this.onClicked();
        };
    }
}

class Menu {
  constructor(_button1, _button2, _button3, _button4) {
    this.buttons = [_button1, _button2, _button3, _button4];
  }
}

Menu.prototype.update = function() {
  this.buttons.forEach((button) => {
    drawSprite(button.sprite);
  });
}
