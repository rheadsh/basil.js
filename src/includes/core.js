// all initialisations should go here
var init = function () {
  glob.b = pub;

  welcome();

  // -- init internal state vars --
  startTime = Date.now();

  //3D
  curr3DMode = pub.DISSABLE3D;

  //Fill
  currFillState = true;
  currFillColor = [1, 1, 1];

  //Stroke
  currStrokeState = true;
  currStrokeWeight = 1;
  currStrokeColor = [0, 0, 0];

  //Opacity
  currOpacity = 100;

  //Shape
  currRectMode = pub.CENTER;
  currEllipseMode = pub.CENTER;
  currLineMode = pub.CENTER;
  currSolidMode = pub.CENTER;
  currShapeMode = pub.CORNER;

  //Text & Font 
  currFont = 'Helvetica';
  currFontSize = 100;
  currJustification = pub.J_CENTER;
  currTextMode = pub.CENTER;

  //Blend
  currBlendMode = pub.NORMAL;
};


// ----------------------------------------
// execution

/**
 * Run the sketch with a composition selected to adop processing language familiarities
 * @method go
 */
pub.go = function (clear) {
  try {
    pub.beginUndo();
    if (typeof glob.setup === 'function') {
      thisComp = (proj.activeItem instanceof CompItem) ? proj.activeItem : null;
      if (thisComp === null) {
        thisComp = pub.createComp("untitled", 1920, 1080, 10, 24);
      }
      pub.width = thisComp.width;
      pub.height = thisComp.height;
      pub.println("Running Setup...");
      runAfterEffectsSetup();
      thisComp.openInViewer();
    };

    //draw function not yet ready
    if (typeof glob.draw === 'function') {
      pub.println("Running Draw...");
      runAfterEffectsDraw()
    };
    pub.endUndo();
  } catch (e) {
    alert(e);
  }
};


// ----------------------------------------
// all private from here

var runAfterEffectsSetup = function () {
  glob.setup();
};

var runAfterEffectsDraw = function () {
  var frameDur = thisComp.frameDuration;
  var totalFrames = thisComp.duration * thisComp.frameRate;
  frameCount = 0;
  frameTime = 0;

  for (var i = 0; i < totalFrames; i++) {
    pub.frameCount++;
    pub.frameTime += frameDur;
    glob.draw();
  }
};

var welcome = function () {
  clearConsole();
  println("Using basil.js " + pub.VERSION + " ...");
  println("Using baffects.js " + pub.VERSION_BAFFECTS + " ...");
};

var error = pub.error = function (msg) {
  println(ERROR_PREFIX + msg);
  throw new Error(ERROR_PREFIX + msg);
};

var warning = pub.warning = function (msg) {
  println(WARNING_PREFIX + msg);
};

var clearConsole = function () {
  var bt = new BridgeTalk();
  bt.target = "estoolkit";
  bt.body = "app.clc()"; // works just with cs6
  bt.onError = function (errObj) { };
  bt.onResult = function (resObj) { };
  bt.send();
};
