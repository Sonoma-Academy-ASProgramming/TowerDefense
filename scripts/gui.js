class Button {
    constructor(xPosition, yPosition, _onclicked) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.onClicked = _onclicked;
        this.sprite = createSprite(this.xPos, this.yPos, 80, 80);
        this.sprite.onMousePressed = () => {
            this.onClicked();
        };
    }
}

//Displays the button object to the screen
Button.prototype.draw = function() {
  drawSprite(this.sprite);
}

/*The menu class is a set of four buttons that appear as options when the user selects a Plot/Building object in the game.
They should be attatched to the building object of a plot rather than the plot itself as every building will need its own set of options.
Examples of options are 'build(typeofbuilding), selll current building, or upgrade current building'
*/
class Menu {
    constructor(_option1, _option2, _option3, _option4) {
        this.options = [_option1, _option2, _option3, _option4];
    }
}

Menu.prototype.draw = function() {
  this.options.forEach((option) => {
    option.draw();
  });
}

class EmptyPlotMenu {
  constructor(xPosition, yPosition) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.button1 = new Button(this.xPos - 150, this.yPos - 150, () => {console.log('clicked top left')});
    this.button2 = new Button(this.xPos + 150, this.yPos - 150, () => {console.log('clicked top right')});
    this.button3 = new Button(this.xPos - 150, this.yPos + 150, () => {console.log('clicked bot left')});
    this.button4 = new Button(this.xPos + 150, this.yPos + 150, () => {console.log('clicked bot right')});
    this.menu = new Menu(this.button1, this.button2, this.button3, this.button4);
  }
}

EmptyPlotMenu.prototype.draw = function() {
  this.menu.draw();
}
