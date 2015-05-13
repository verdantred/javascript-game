
Crafty.scene('Game', function() {
 var z,x,y;
  // A 3D array to keep track of all occupied tiles
  this.occupied = new Array(4);
  for(z = 0; z < Game.map_grid.z; z++){
    this.occupied[z] = new Array(Game.map_grid.width);
    for(x = 0; x < Game.map_grid.width; x++){
      this.occupied[z][x] = new Array(Game.map_grid.height);
      for(y = 0; y < Game.map_grid.height; y++){
        this.occupied[z][x][y] = false;
      }
    }
  }

  console.log(this.occupied);

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(5, 5);
  this.occupied[0][this.player.at().x][this.player.at().y] = true;
  var max_villages = 5;

  // Place objects to the map
  for (x = 0; x < Game.map_grid.width; x++) {
    for (y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x === 0 || x === Game.map_grid.width - 1 || y === 0 ||
        y === Game.map_grid.height - 1;

      if (at_edge && !this.occupied[0][x][y]) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y);
        this.occupied[0][x][y] = true;
      }
      else if (Math.random() < 0.06 && !this.occupied[0][x][y]) {
        // Place a bush entity at the current tile
        Crafty.e('Bush').at(x, y);
        this.occupied[0][x][y] = true;
      }
      // Generate up to five villages on the map in random locations
      else if(Math.random() < 0.02 && !this.occupied[0][x][y] &&
              Crafty('Village').length < max_villages){
        Crafty.e('Village').at(x, y);
        this.occupied[0][x][y] = true;
      }
    }
  }
  //play and repeat forever
  Crafty.audio.play("beep", -1);

  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  this.unbind('VillageVisited', this.show_victory);
});


Crafty.scene('Victory', function() {
  Crafty.e('2D, DOM, Text')
    .attr({ x: 0, y: 0 })
    .text('Victory!')
    .textFont({
      weight: 'bold'
    });

  this.restart_game = this.bind('KeyDown', function() {
    Crafty.scene('Game');
  });
}, function() {
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css($text_css);
    var assetsObj = {
      "audio": {
          "beep": "assets/music/benign.mp3"
      },
      "sprites": {
        'assets/sprites/spritesheet-v1.png': {
              "tile":  32,
              "tileh": 32,
              "map": {
                "sprBush": [5,0,1,1], "sprVillage": [5,1,1,1],
                "sprTree": [4,0,1,2], "sprPC": [2,0,1,2]
              }
          }//,
          //'assets/sprites/spritesheet-1.png': {
          //    "tile": 32,
          //    "tileh": 64,
          //    "map": { "sprTree": [4,1], "sprPC": [2,1] }
          //}
      },
  };
  // Load our sprite map image
  Crafty.load(assetsObj, function(){
    // Once the image is loaded...


    // Now that our sprites are ready to draw, start the game
    Crafty.scene('Game');
  });
});
