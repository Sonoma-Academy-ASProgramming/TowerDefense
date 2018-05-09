class GUI {
  constructor(){
    this.menu = null;
  }
}

GUI.prototype.delete = function() {
  if(this.menu != null) {
    this.menu.delete();
    this.menu = null;
  }else{
    console.log('no menu to delete');
  }
}

GUI.prototype.update = function() {
  try {
    this.menu.update();
  } catch(e) {

  }
}

class Button {
    constructor(xPosition, yPosition, _onClicked) {
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.onClicked = _onClicked;
        this.sprite = new Supersprite(this.xPos, this.yPos, 80, 80);
        this.sprite.onMousePressed = _onClicked;
    }
}

class Menu {
  constructor(_button1, _button2, _button3, _button4) {
    this.buttons = [_button1, _button2, _button3, _button4];
  }
}

Menu.prototype.update = function() {
  this.buttons.forEach((button) => {
    button.sprite.display();
  });
}

Menu.prototype.delete = function(){
  console.log(this.buttons.length)
  for(var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].sprite.delete();
  }
  this.buttons = [];
}
