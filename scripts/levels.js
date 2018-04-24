let LEVEL = 1;
let levelBackground = "green";
function nextLevel(){
  nextLevelAnimation();
}

function nextLevelAnimation(){
  let radius = 20;
  ellipseMode('CENTER');
  while(radius < windowWidth){
    console.log('HERE')
    fill('yellow');
    ellipse(width/2, height/2, radius+=5);
  }
}
