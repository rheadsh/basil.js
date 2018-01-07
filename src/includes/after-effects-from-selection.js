//FromSelections

/**
 * Generate frame offset between selected layers
 * @cat AfterEffects
 * @subcat FromSelections
 * @method moveFrames
 * @param {Number} n (int) Number of frames to offset each selected layer beginning at playhead position
 */
pub.moveFrames = function(n) {
    pub.beginUndo("Mover");
    var sel = layersSelection();
    if (sel.length > 0) {
        for (i=0; i<sel.length; i++) {
            sel[i].startTime = frameMove(n) * i;
        }
    } else {
        println("select at least one layer");
    }
    pub.endUndo();
};