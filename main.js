let Towers = [],
    Enemies = [],
    Bullets = [];
let Time = 0;

//SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);
    Towers.push(new Plot(250, 250));
    generateEnemies(12);
}

//GAME LOGIC
function draw() {
    Time += 1;
    background(255, 255, 255);
    drawSprites();
    Towers.forEach((tower) => {
        tower.draw();
    });
    Enemies.forEach((enemy) => {
        enemy.draw();
    });
    Bullets.forEach((bullet) => {
        bullet.draw();
    });
    Towers.forEach((tower) => {
        tower.draw();
    });
    testButton.draw();
}

//MOUSE EVENT HANDLING
function mousePressed() {
    Towers.forEach((tower) => {
        if (tower.isClicked()) {
            console.log('clicked a tower');
        }
    });
}

//------------------------FUNCTIONS-----------------------------------------

function getPosition(t) {
    //y=width/2
    // x=t
    return {
        x: t,
        y: width / 2
    };
}

function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            case val >= 100:
                val -= 100;
                Enemies.push(new Enemy(100));
                break;
            case val >= 50:
                val -= 50;
                Enemies.push(new Enemy(50));
                break;
            case val >= 25:
                val -= 25;
                Enemies.push(new Enemy(25));
                break;
            case val >= 10:
                val -= 10;
                Enemies.push(new Enemy(10));
                break;
            case val >= 5:
                val -= 5;
                Enemies.push(new Enemy(5));
                break;
            case val >= 1:
                val -= 1;
                Enemies.push(new Enemy(1));
                break;
        }
    }
}

//CLASSES ------------------------------------------------------------------------------

class Enemy {
    constructor(value) {
      this.xPos = 0;
      this.yPos = width/2;
        switch (value) {
            case 1:
                this.color = 'green';
                this.speed = 0.5;
                break;
            case 5:
                this.color = 'blue';
                this.speed = 0.4;
                break;
            case 10:
                this.color = 'red';
                this.speed = 0.3;
                break;
            case 25:
                this.color = 'purple';
                this.speed = 0.2;
                break;
            case 50:
                this.color = 'orange';
                this.speed = 0.1;
                break;
            case 100:
                this.color = 'black';
                this.speed = 0.05;
                break;
        }
    }
}
Enemy.prototype.hit = function() {
    //Collision
}

Enemy.prototype.draw = function() {
  console.log(this.xPos);
    this.time += this.speed;
    //this.xPos = getPosition(this.time).x;
    //this.yPos = getPosition(this.time).y;
this.xPos = this.time;
this.yPos = 0;
    noStroke();
    fill(this.color);
    ellipse(this.yPos, this.xPos, 50, 50);
}

var mouseInArea = (xMin, xMax, yMin, yMax) => {
    if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
        return true;
    }
}

class Shoot {
    constructor(putYourTowerObjHere, howManyframesForTheBulletToGetToTheEnemy) {
        this.bullets = [];
        this.x = putYourTowerObjHere.x;
        this.y = putYourTowerObjHere.y;
        this.type = putYourTowerObjHere.type;
        this.time = howManyframesForTheBulletToGetToTheEnemy || 2000;
    }
}
// Shoot.prototype.findEnemy = function() {
// let best = {
//     index: -1,
//     distance: 65535
// };
// Enemies.forEach((item, index) => {
//     let distance = getDistance(x, y, item.xPos, item.yPos)
//     if (distance < best.distance) {
//         best = {
//             index,
//             distance
//         }
//     }
// });
// return best;
// return Enemies[0];
// }
// Shoot.prototype.getDistance = function(x1, y1, x2, y2) {
//     return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
// }
Shoot.prototype.fire = function() {
    let target = findEnemy();
    let enemy = Enemies[0];
    if (target.index = -1) {
        //no enemies are in range
        return;
    }
    let aimFor = getPosition(enemy.time + this.time);
    let Xinc = (aimFor.x - this.x) / this.time,
        Yinc = (aimFor.y - this.y) / this.time;
    bullets.push({
        x,
        y,
        aimX: aimFor.x,
        aimY: aimFor.y,
        Xinc,
        Yinc,
        type
    });
}

Shoot.prototype.update = function() {
    bullets.forEach((item) => {
        item.x += item.Xinc;
        item.y += item.Yinc;
        if (((item.Xinc >= 0) && (item.x > item.aimX)) || ((item.Xinc < 0) && (item.x < item.aimX))) {
            if (((item.Yinc >= 0) && (item.y > item.aimY)) || ((item.Yinc < 0) && (item.y < item.aimY))) {
                //hit
            }
        }
    });
}

Shoot.prototype.draw = function() {
    bullets.forEach((item) => {
        ellipse(item.x, item.y, 10, 10);
    });
}
