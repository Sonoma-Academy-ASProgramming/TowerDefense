let Towers = [],
    Enemies = [],
    Shoots = [];
let Time = 0;
var backgroundSprite;
//SETUP
function setup() {
    //Center all balls
    ellipseMode(CENTER);

    createCanvas(windowWidth, windowHeight);
    backgroundSprite = createSprite(width / 2, height / 2, width, height);
    backgroundSprite.shapeColor = 'green';
    Towers.push(new Plot(250, 250));
    generateEnemies(150);


    Shoots.push(new Shoot(250, 250, 1));
}

setInterval(function() {
    Shoots.forEach((item) => {
        item.fire();
    });
}, 150);

//GAME LOGIC
function draw() {
    drawSprite(backgroundSprite);
    Time += 1;
    push();
    noStroke();
    fill('peru')
    rect(-10, height / 2 - 50, width + 10, 100)
    pop();
    Towers.forEach((tower) => {
        tower.draw();
    });
    Enemies.forEach((enemy) => {
        enemy.draw();
    });
    Shoots.forEach((shoot) => {
        shoot.draw();
    });
    Towers.forEach((tower) => {
        tower.draw();
    });
}

//SPECIAL MOUSE EVENT HANDLING
function mousePressed() {

}

//------------------------FUNCTIONS-----------------------------------------

function getPosition(t) {
    //Math.sin()
    return {
        x: t,
        y: height / 2
    };
}

function generateEnemies(val) {
    while (val > 0) {
        switch (true) {
            // case val >= 100:
            //     val -= 100;
            //     Enemies.push(new Enemy(100));
            //     break;
            // case val >= 50:
            //     val -= 50;
            //     Enemies.push(new Enemy(50));
            //     break;
            // case val >= 25:
            //     val -= 25;
            //     Enemies.push(new Enemy(25));
            //     break;
            // case val >= 10:
            //     val -= 10;
            //     Enemies.push(new Enemy(10));
            //     break;
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
        console.log(value);
        this.xPos = 0;
        this.yPos = height / 2;
        this.radius = 50;
        this.time = random(0, -100);
        this.speed = 1;
        this.value = value;
        this.futureHealth = value;
        switch (value) {
            case 1:
                this.color = 'green';
                //this.speed = 1.5;
                break;
            case 5:
                this.color = 'blue';
                //this.speed = 1.3;
                break;
            case 10:
                this.color = 'red';
                //  this.speed = 1.1;
                break;
            case 25:
                this.color = 'purple';
                //    this.speed = 0.9;
                break;
            case 50:
                this.color = 'orange';
                //      this.speed = 0.7;
                break;
            case 100:
                this.color = 'black';
                //        this.speed = 0.5;
                break;
        }
    }
}
Enemy.prototype.hit = function(force) {
    this.value -= force;
    console.log(this.value, force);
    if (this.value <= 0) {
        this.delete()
    }
}
Enemy.prototype.delete = function() {
    // console.log(Enemies.indexOf(this), this)
    Enemies.splice(Enemies.indexOf(this), 1);
}
Enemy.prototype.draw = function() {
    this.time += this.speed;
    this.xPos = getPosition(this.time).x;
    this.yPos = getPosition(this.time).y;
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.radius, this.radius);
    if (this.xPos > width) {
        this.delete();
    }
}

var mouseInArea = (xMin, xMax, yMin, yMax) => {
    if (mouseX > xMin && mouseX < xMax && mouseY > yMin && mouseY < yMax) {
        return true;
    }
}
class Shoot {
    constructor(towerX, towerY, force, howManyframesForTheBulletToGetToTheEnemy) {
        this.Bullets = [];
        this.x = towerX;
        this.y = towerY;
        this.force = force || 1;
        this.time = howManyframesForTheBulletToGetToTheEnemy || 50;
    }
}

Shoot.prototype.findEnemy = function(howManyth) {
    let sortedEnemies = Enemies.slice(0).sort((a, b) => {
        return b.time - a.time;
    });
    console.log(sortedEnemies)
    return sortedEnemies[howManyth];
}

Shoot.prototype.fire = function() {
    let enemy = null;
    let tmp;
    for (let i = 0; i < Enemies.length; i++) {
      try{
        tmp = this.findEnemy(i);
        if (tmp.futureHealth > 0) {
            enemy = tmp;
            break;
        }
      }catch (e){}
    }
    if (!enemy) { //no valid enemies
        return;
    }
    console.log("futureHealth:", enemy.futureHealth);
    enemy.futureHealth -= this.force;
    let aimFor = getPosition(enemy.time + this.time);
    let Xinc = (aimFor.x - this.x) / this.time,
        Yinc = (aimFor.y - this.y) / this.time;
    let newObj = {
        x: this.x,
        y: this.y,
        aimX: aimFor.x,
        aimY: aimFor.y,
        Xinc,
        Yinc,
        force: this.force,
        type: this.type,
        enemy
    };

    this.Bullets.push(newObj);
    console.log(this);
}

Shoot.prototype.update = function() {
    this.Bullets.forEach((item, index) => {
        item.x += item.Xinc;
        item.y += item.Yinc;
        //CHECK FOR COLLISION
        if (Math.sqrt((item.enemy.xPos - item.x) * (item.enemy.xPos - item.x) + (item.enemy.yPos - item.y) * (item.enemy.yPos - item.y)) < item.enemy.radius / 2) {
            item.enemy.hit(this.force);
            this.Bullets.splice(index, 1);
        }
    });
}

Shoot.prototype.draw = function() {
    this.update();
    this.Bullets.forEach((item) => {
        fill('black');
        ellipse(item.x, item.y, 5, 5);
    });
}
