npm install uglify-es -g

mkdir build
#Copy all Files and Assets
cp -r assets/ build/assets
cp buildindex.html build/index.html

#Minify Javascript
uglifyjs main.js \
         scripts/enemies.js \
         scripts/game.js \
         scripts/graphics.js \
         scripts/gui.js \
         scripts/leaderboard.js \
         scripts/score.js \
         scripts/towers.js \
         scripts/weapons.js \
-o build/script.min.js -c -m