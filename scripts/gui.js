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

/*The menu class is a set of four buttons that appear as options when the user selects a Plot/Building object in the game.
They should be attatched to the building object of a plot rather than the plot itself as every building will need its own set of options.
Examples of options are 'build(typeofbuilding), selll current building, or upgrade current building'
*/
