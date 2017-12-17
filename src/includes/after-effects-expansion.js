/**
* Create new composition
* @method createComp
* @param {string} name composition's name
* @param {number} w (int) composition's width
* @param {number} h (int) composition's height
* @param {number} dur (float) composition's duration in seconds
* @param {number} fr: (float) composition's frame rate
* @return {CompItem object}
*/
pub.createComp = function(name, w, h, dur, fr) {
    var comp = proj.items.addComp(name, w, h, 1, dur, fr);
    return comp;
};

/**
 * Starts undo block
 * @method beginUndo
 * @param {string} name undo GUI identifier
 */
pub.beginUndo = function(name) {
    app.beginUndoGroup(name);
};

/**
 * Ends undo block
 * @method endUndo
 */
pub.endUndo = function() {
    app.endUndoGroup();
};

/**
 * Duplictes selected layers
 * @method duplicator
 * @param {number} n (int) number of duplicates to generate
 */
pub.duplicator = function(n) {
    pub.beginUndo("Duplicator");
    var sel = layersSelection();
    if (sel.length >  0) {
        for (var i=0; i<n; i++) {
            sel[0].duplicate();
        }
    } else {
        println("Select at least one layer");
    }
    pub.endUndo();
};

/**
 * Generate frame offset between selected layers
 * @method moveFrames
 * @param {number} n (int) number of frames to offset each selected layer beginning at playhead position
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

/**
 * Get composition reference by name
 * @method getComp
 * @param {string} name composition's name to retrieve
 * @return {CompItem object|null} comp found
 */
pub.getComp = function(name) {
    var number = 0;
    for (var i = 1; i <= proj.numItems; i ++) {
        if ((proj.item(i) instanceof CompItem) && (proj.item(i).name === name)) {
            number = i;
            break;
        }
    }
    if (number > 0) {
        return proj.item(number);
    }
    else {
        println("Comp not found!");
        return null;
    }
};

/**
 * Get item reference by name
 * @method getItem
 * @param {string} name item's name to retrieve
 * @return {Item object|null} item found
 */
pub.getItem = function(name) {
    var number = 0;
    for (var i = 1; i <= proj.numItems; i ++) {
        if (!((proj.item(i) instanceof CompItem)) && (proj.item(i).name === name)) {
            number = i;
            break;
        }
    }
    if (number > 0) {
        return proj.item(number);
    }
    else {
        println("Item not found!");
        return null;
    }
};

/**
 * Add effects to selected layers
 * @method addSameFX
 * @param {string|Array.<string>} names effects names to add to layer
 */
pub.addSameFX = function(names) {
    pub.beginUndo("Add FX");
    var sel = layersSelection();
    if (sel.length > 0) {
        if (isArray(names)) {
            for (var i=0; i<sel.length; i++) {
                for (var k=0; k<names.length; k++) {
                    sel[i].effect.addProperty(names[k]);
                }
            }
        } else {
            for (var i=0; i<sel.length; i++) {
                sel[i].effect.addProperty(names);
            }
        }
    }
    pub.endUndo();
};

/**
 * Get property path to manipulate
 * @method getFXProperty
 * @param {string} path properties path from selected layer effect
 * @return {Property object}
 */
pub.getFXProperty = function(path) {
    var pathStr = path.split("/");
    var prop = layersSelection()[0].property("Effects");
    for (var i=0; i<pathStr.length; i++) {
        prop = prop.property(pathStr[i]);
    }
    return prop;
};

/**
 * Adds item to comp
 * @method addItemToComp
 * @param {Item object} item item to add to comp
 * @param {CompItem object} comp comp to add item to
 * @return {Item object} returns item for convenience
 */
pub.addItemToComp = function(item, comp) {
    c.layers.add(item);
    return item;
};
