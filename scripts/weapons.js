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
    return sortedEnemies[howManyth];
}

Shoot.prototype.fire = function() {
    let enemy = null;
    let tmp;
    for (let i = 0; i < Enemies.length; i++) {
      try{
        tmp = this.findEnemy(i);
        if (tmp.futureHealth > 0 && tmp.time - this.time>0) {
            enemy = tmp;
            break;
        }
      }catch (e){}
    }
    if (!enemy) { //no valid enemies
        return;
    }
    enemy.futureHealth -= this.force;
    let aimFor = getPosition(enemy.time - this.time);
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
