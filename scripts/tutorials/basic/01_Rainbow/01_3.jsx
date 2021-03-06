#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.noStroke();
  
  var steps = 20; // this will be executed in three for loops... equals 3x20 = 60!
  
  var c1 = b.color( 255, 0, 0 );
  var c2 = b.color( 255, 255, 0);
  var c3 = b.color( 0, 255, 255 );
  var c4 = b.color( 0, 0, 255 );  
  
  // four colors are necessary, that makes three transitions:
  
  // red to yellow
  for( var i = 0; i < steps; i++ ) {
    
    var mixColor = b.lerpColor( c1, c2, i / steps );
    b.fill( mixColor );
    b.rect( 
      0, 
      b.height / steps / 3 * i, 
      b.width, 
      b.height / steps / 3 
    );    
  }

  // yellow to cyan
  for( var i = 0; i < steps; i++ ) {
    
    var mixColor = b.lerpColor( c2, c3, i / steps );
    b.fill( mixColor );
    b.rect( 
      0, 
      b.height / steps / 3 * i + b.height / 3, 
      b.width, 
      b.height / steps / 3
    );
  }

  // cyan to blue
  for( var i = 0; i < steps; i++ ) {
    
    var mixColor = b.lerpColor( c3, c4, i / steps );
    b.fill( mixColor );
    b.rect( 
      0, 
      b.height / steps / 3 * i + b.height / 3 * 2, 
      b.width, 
      b.height / steps / 3
    );
  }

  
}

b.go();

  