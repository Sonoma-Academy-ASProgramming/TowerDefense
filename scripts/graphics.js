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
    constructor(xPosition, yPosition, width, height, options) {
        spriteCount++;
        this.stackOrder();
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.rotation = 0;
        this.width = width || defaultWidth;
        this.height = height || defaultHeight;
        this.options = options || {};
        this.image = null;
        this.xOffSet = width / 2 || null;
        this.yOffSet = height / 2 || null;
        this.color = "black";
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
Supersprite.prototype.setRotation = function (value) {
    this.rotation = value;
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
    if (!image) return null;
    this.width = width;
    this.height = height;
    this.xOffSet = this.width / 2;
    this.yOffSet = this.height / 2;

    this.image.resize(this.width, this.height);
};

Supersprite.prototype.addImage = function (newImage) {
    this.image = newImage;
};
Supersprite.prototype.display = function () {
    this.eventHandler();
    if (this.image !== null && this.image !== undefined) {
        if (this.options.type === 'tower') {
            push();
            imageMode(CENTER);
            translate(this.xPos, this.yPos);
            rotate(radians(this.rotation));
            image(this.image, 0, 0, this.width, this.height);
            pop();
        } else if (this.options.type === 'upgrade') {
            let level = selectedTower[`${this.options.upgrade}Level`];
            let towerType, price, name;
            if (this.options.hasOwnProperty('tower')) {
                towerType = this.options.towerType;
                price = this.options.tower.price;
                name = this.options.tower.name;

            } else {
                towerType = this.options.towerType;
                price = 20;
                name = this.options.upgrade;
            }
            //console.log(towerType, price, name, level, selectedTower);
            push();
            stroke('#736357');
            strokeWeight(4);
            fill('#afa095');
            rect(this.xPos - this.xOffSet - 10, this.yPos - this.yOffSet - 40, this.width + 20, this.height + 50, 10, 10, 10, 10);
            image(this.image, this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height);
            textSize(20);
            fill('#736357');
            noStroke();
            text(price, this.xPos - this.xOffSet - 10, this.yPos - this.yOffSet);
            image(score.coinIMG, this.xPos - this.xOffSet - 10, this.yPos - this.yOffSet, 10, 10);
            textSize(30);
            text(name, this.xPos - this.xOffSet - 10, this.yPos - this.yOffSet - 40);
            pop();
        } else {
            image(this.image, this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height);
        }
    } else {
        if (this.options.type === 'button') {
            push();
            stroke('#736357');
            strokeWeight(4);
            fill('#afa095');
            rect(this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height, 10, 10, 10, 10);
            textSize(30);
            fill('#736357');
            noStroke();
            textAlign(CENTER, CENTER);
            text(this.options.text, this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height);
            pop();
        } else {
            fill(this.color);
            rect(this.xPos - this.xOffSet, this.yPos - this.yOffSet, this.width, this.height);
        }
    }
};

function horizontal(percent) {
    return (percent / 100) * window.innerWidth;
}

function vertical(percent) {
    return (percent / 100) * window.innerHeight;
}
