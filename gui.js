class Button {
    constructor(xPosition, yPosition, _onclicked) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.size = 80;
        this.onclicked = _onclicked;
    }
}

//Displays the button object to the screen
Button.prototype.draw = function() {
  fill(0,0,200);
  rect(this.xPos, this.yPos, this.size, this.size);
}

//Executes the function stored on the button object
Button.prototype.checkClicked = function() {
    //returns true if the mouse is positioned over this button
    if (mouseInArea(this.xPos, this.xPos + this.size, this.yPos, this.yPos + this.size)) {
        this.onclicked();
    }
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
  this.options.forEach((button) => {
    button.draw();
  });
}

//
var emptyPlotFunction = [];

class EmptyPlotMenu {
  constructor(xPosition, yPosition) {
    this.xPos = xPosition;
    this.yPos = yPosition;
    this.button1 = new Button(this.xPos - 50, this.yPos - 50, () => {console.log('t')});
    this.button2 = new Button(this.xPos + 50, this.yPos - 50, () => {console.log('r')});
    this.button3 = new Button(this.xPos - 50, this.yPos + 50, () => {console.log('e')});
    this.button4 = new Button(this.xPos + 50, this.yPos + 50, () => {console.log('w')});
    this.menu = new Menu(this.button1, this.button2, this.button3, this.button4);
  }
}

EmptyPlotMenu.prototype.draw = function() {
  this.menu.draw();
}
