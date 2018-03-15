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
        this.option1 = _option1;
        this.option2 = _option2;
        this.option3 = _option3;
        this.option4 = _option4;
        this.options = [this.option1, this.option2, this.option3, this.option4];
    }
}

Menu.prototype.draw = function() {
    for (var i = 0; i < this.options.length; i++) {
        this.options[i].draw();
    }
}
