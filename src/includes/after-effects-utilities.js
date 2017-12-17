//_____________________________________________________________
//_____________________________________________________________
//_____________________________________________________________
//_____________________________________________________________
//_____________________________________________________________
//_____________________________________________________________
//After effects expansion

var proj = app.project;

var thisComp = app.project.activeItem;

var layersSelection = function() {
    var comp = thisComp;
    return comp.selectedLayers;
};

var frameMove = function(frame) {
    return frame * thisComp.frameDuration
};
