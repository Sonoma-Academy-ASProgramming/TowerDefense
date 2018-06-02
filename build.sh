#npm install uglify-es -g
mkdir build
mkdir build/assets
uglifyjs main.js \
         scripts/enemies.js \
         scripts/game.js \
         scripts/graphics.js \
         scripts/gui.js \
         scripts/leaderboard.js \
         scripts/score.js \
         scripts/towers.js \
         scripts/weapons.js \
-o build/script.min.js --compress --mangle

cp -r sounds/ fonts/ images/ build/assets/
cp -r libs/ build/libs/
cp index.html build/
exec $SHELL