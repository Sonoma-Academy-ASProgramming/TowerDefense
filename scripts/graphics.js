const defaultWidth = 50;
const defaultHeight = 50;
let spriteCount = 0;
let Sprites = [];

let checkSpritesClicked = () => {
    for (let i = Sprites.length - 1; i > -1; i -= 1) {
        let currentSprite = Sprites[i];
        //checks to see if the mouse is within the bounds of the sprite
        if (mouseInRect(
                currentSprite.xPos - currentSprite.xOffSet,
                currentSprite.xPos + currentSprite.xOffSet,
                currentSprite.yPos - currentSprite.yOffSet,
                currentSprite.yPos + currentSprite.yOffSet
            )) {
            try {
                currentSprite.onMousePressed();
            } catch (e) {

            }
            break;
        }
    }
};
//listens for mouse clicks then checks to see if the mouse was within the bounds of a sprite
document.addEventListener('click', (event) => {
    checkSpritesClicked();
});

const mouseInRect = (xMin, xMax, yMin, yMax) => {
    return (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax);
};

class Supersprite {
    constructor(xPosition, yPosition, width, height, image) {
        spriteCount++;
        this.stackOrder();
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.width = width || defaultWidth;
        this.height = height || defaultHeight;
        this.image = image || null;
        this.xOffSet = width / 2 || null;
        this.yOffSet = height / 2 || null;
        this.color = (random(255), random(255), random(255));
        this.onMouseOver = null;
        this.onMouseOut = null;
        this.onMousePressed = null;
        this.mousedOver = false;
    }
}

Supersprite.prototype.stackOrder = function () {
    if (Sprites.length < spriteCount) {
        Sprites.push(this);
    }
};

Supersprite.prototype.delete = function () {
    spriteCount -= 1;
    for (let x = 0; x < Sprites.length; x++) {
        if (Sprites[x].xPos === this.xPos && Sprites[x].yPos === this.yPos) {
            Sprites.splice(x, 1);
            break;
        }
    }
};

Supersprite.prototype.eventHandler = function () {
    //if the mouse is within the rect area of our sprite
    if (mouseInRect(this.xPos - this.xOffSet, this.width, this.yPos - this.yOffSet, this.height)) {
        //sprites remember their current mouse state
        this.mousedOver = true;
        try {
            this.onMouseOver();
        } catch (e) {

        }
        //if the mouse is NOT within the rect area of our sprite
    } else {
        //if mouse was just hovered over
        this.mousedOver = false;
        if (this.mousedOver) {
            try {
                this.onMouseOut();
            } catch (e) {

            }
        }
    }
};

Supersprite.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
    this.xOffSet = this.width / 2;
    this.yOffSet = this.height / 2;
    try {
        this.image.resize(this.width, this.height);
    } catch (e) {

    }
};

Supersprite.prototype.addImage = function (newImage) {
    newImage.resize(this.width, this.height);
    this.image = newImage;
};

Supersprite.prototype.display = function () {
    this.eventHandler();
    try {
        image(this.image, this.xPos - this.xOffSet, this.yPos - this.yOffSet);
    } catch (e) {
        fill(this.color);
        rect(this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height);
    }
};
