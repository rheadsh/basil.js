// Environment

//______________________________________________________________________________________________________________________
// Composition methods

/**
* Create new composition.
* @cat AfterEffects
* @method createComp
* @param {String} name Name of the composition
* @param {Number} w Width of the composition
* @param {Number} h Height of the composition
* @param {Number} duration Duration in seconds of the composition
* @param {Number} frameRate Frame rate of the composition
* @return {CompItem} Created composition
*/
pub.createComp = function (name, w, h, dur, fr) {
    var comp = proj.items.addComp(name, w, h, 1, dur, fr);
    thisComp = comp;
    pub.width = comp.width;
    pub.height = comp.height;
    return comp;
};

/**
 * Starts undo block.
 * @cat AfterEffects
 * @method beginUndo
 * @param {String} [name] Undo name GUI identifier
 */
pub.beginUndo = function (name) {
    switch (arguments.length) {
        case 0:
            app.beginUndoGroup("Baffects");
            break;
        case 1:
            app.beginUndoGroup(name);
            break;
    }
};

/**
 * Ends undo block
 * @cat AfterEffects
 * @method endUndo
 */
pub.endUndo = function () {
    app.endUndoGroup();
};

/**
 * Get composition reference by name.
 * @cat AfterEffects
 * @method getComp
 * @param {String} name Name of the composition to retrieve
 * @return {CompItem|null} Composition found
 */
pub.getComp = function (name) {
    var Number = 0;
    for (var i = 1; i <= proj.numItems; i++) {
        if ((proj.item(i) instanceof CompItem) && (proj.item(i).name === name)) {
            Number = i;
            break;
        }
    }
    if (Number > 0) {
        return proj.item(Number);
    }
    else {
        error("Comp not found!");
        return null;
    }
};

/**
 * Clean composition layers and items references.
 * @cat AfterEffects
 * @method cleanComp
 */
pub.cleanComp = function () {
    var layers, names;
    layers = pub.getAllLayers();
    if (layers.length > 0) {
        while (layers.length > 0) {
            var source = layers[layers.length].source;
            layers[layers.length].remove();
            if (source != null)
                source.remove();
        }
    }
};

/**
 * Sets background color for the composition.
 * @cat AfterEffects
 * @method background
 * @param {Color|Number} color 
 */
pub.background = function (color) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2];

    switch (arguments.length) {
        case 1:
            var col = pub.color(a);
            thisComp.bgColor = col;
            break;
        case 3:
            var col = pub.color(a, b, c);
            thisComp.bgColor = col;
            break;
    }
};

/**
 * Get the total number of frames from composition.
 * @cat AfterEffects
 * @method getTotalFrames
 * @return {Number} Total number of frames
 */
pub.getTotalFrames = function () {
    return thisComp.duration * thisComp.frameRate;
};

/**
 * Return duration in seconds.
 * @cat AfterEffects
 * @method getDuration
 * @return {Number} Total duration in seconds
 */
pub.getDuration = function () {
    return thisComp.duration;
};

/**
 * Total number of layers in the composition
 * @cat AfterEffects
 * @method numLayers
 * @return {Number} Total number of layers
 */
pub.numLayers = function() {
    return thisComp.numLayers;
}




//______________________________________________________________________________________________________________________
// Item methods

/**
 * Get item reference by name.
 * @cat AfterEffects
 * @method getItem
 * @param {String} name Name of item to retrieve
 * @return {Item|null} Item found
 */
pub.getItem = function (name) {
    var Number = 0;
    for (var i = 1; i <= proj.numItems; i++) {
        if (!((proj.item(i) instanceof CompItem)) && (proj.item(i).name === name)) {
            Number = i;
            break;
        }
    }
    if (Number > 0) {
        return proj.item(Number);
    }
    else {
        error("Item not found!");
        return null;
    }
};

/**
 * Adds item to comp (for ease of use loadItem() is better suited for this task).
 * @cat AfterEffects
 * @method addItemToComp
 * @param {CompItem} [comp] Composition reference
 * @param {Item} item Item to add to composition
 * @return {Layer} Item added as layer
 */
pub.addItemToComp = function (item) {
    var layer = thisComp.layers.add(item);
    return layer;
};





//______________________________________________________________________________________________________________________
// Layer methods

/**
 * Get layer reference by name.
 * @cat AfterEffects
 * @method getLayer
 * @param {String} name Name of layer to retrieve 
 * @return {Layer} Layer found
 */
pub.getLayer = function (name) {
    var layersCollection = pub.getAllLayers();
    var n = 0;
    if (layersCollection.length > 0) {
        for (var i = 1; i <= layersCollection.length; i++) {
            if (layersCollection[i].name === name) {
                n = i;
                break;
            }
        }
    } else {
        error("Zero layers in comp");
    }
    if (n > 0) {
        return layersCollection[n];
    } else {
        error("Layer name not found");
    }
};

/**
 * Get all layers from composition.
 * @cat AfterEffects
 * @method getAllLayers
 * @return {LayerCollection}
 */
pub.getAllLayers = function () {
    return thisComp.layers;
};

/**
 * Get layers by range.
 * @cat AfterEffects
 * @method getLayers
 * @param {Number} min Minimum index of layer collection
 * @param {Number} max Maximum index of layer collection
 * @return {LayerCollection} Layers in range
 */
pub.getLayers = function (min, max) {
    var layers = pub.getAllLayers();
    return layers.slice(min - 1, max);
};

/**
 * Gets a property from a specified layer.
 * @cat AfterEffects
 * @method getProperty
 * @param {Layer} layer Layer reference
 * @param {String} path Full path to property 
 * @return {Property} Property reference
 */
pub.getProperty = function (layer, path) {
    var pathStr = path.split("/");
    var prop = layer.property(pathStr[0]);
    for (var i = 1; i < pathStr.length; i++) {
        prop = prop.property(pathStr[i]);
    }
    return prop;
};

/**
 * Add FX to a specific layer.
 * @cat AfterEffects
 * @method addFx
 * @param {Layer} layer Layer to add effect to
 * @param {String} fx Name of the effects to add to layer
 * @return {String} Path to current added effect
 */
pub.addFX = function (layer, fx) {
    layer.effect.addProperty(fx);
    var path = "Effects/" + fx + "/";
    return path;
};

/**
 * Sets track matte function in layer.
 * @cat AfterEffects
 * @method trackMatte
 * @param {Layer} layer 
 * @param {String} mode 
 */
pub.trackMatte = function (layer, mode) {
    layer.trackMatteType = mode;
};

/**
 * Precompose layers.
 * @cat AfterEffects
 * @method preComp
 * @param {Array} index The position indexes of the layers to be collected. An array of integers
 * @param {String} name Name of the new composition
 */
pub.preComp = function (index, name) {
    var newComp = thisComp.layers.precompose(index, name, true);
    return newComp;
};

/**
 * Return only selected layers from composition. This is a 0-based array (the first object is at index 0).
 * @cat AfterEffects
 * @method selectedLayers
 * @return {LayerCollection} Selected layers
 * 
 */
pub.selectedLayers = function () {
     var sel = thisComp.selectedLayers;
     if (sel.length > 0)
        return sel;
    else
        error("Select at least one layer")
};

/**
 * Duplicate a layer n times.
 * @cat AfterEffects
 * @method duplicator
 * @param {Layer} layer Layer to duplicate
 * @param {Number} n Number of duplicares to generate
 * @param {Boolean} autoComp Precompose all duplicates if true
 * @return {LayerCollection} Created duplicates
 */
pub.duplicator = function (originalLayer, n, autoComp) {
    var copies = [];
    for (var i = 0; i < n; i++) {
        var dup = originalLayer.duplicate();
        copies.push(dup);
    }
    if (autoComp) {
        pub.preComp(indexArray(copies), "Duplicates"+proj.numItems);
    }
    return copies;
};

/**
 * Reverse layers order in timeline.
 * @cat AfterEffects
 * @method reverseLayers
 * @param {LayerCollection} layers Layers to invert order
 */
pub.reverseLayers = function (layers) {
    for (var j = 1; j <= layers.length / 2; j++) {
        var layerToMoveAfter = layers[j];
        var wasLocked = layerToMoveAfter.locked;
        if (wasLocked) {
            layerToMoveAfter.locked = false;
        }
        layerToMoveAfter.moveAfter(layers[layers.length - j + 1]);
        if (wasLocked) {
            layerToMoveAfter.locked = true;
        }
        if (layers.length - j != j) {
            var layerToMoveBefore = layers[layers.length - j];
            wasLocked = layerToMoveBefore.locked;
            if (wasLocked) {
                layerToMoveBefore.locked = false;
            }
            layerToMoveBefore.moveBefore(layers[j]);
            if (wasLocked) {
                layerToMoveBefore.locked = true;
            }
        }
    }
};
 
/**
 * Create parent - child relationship.
 * @cat AfterEffects
 * @method makeParent
 * @param {Layer} parent Parent layer
 * @param {Layer} children Children layer
 */
pub.makeParent = function (parent, children) {
    children.parent = parent;
};

/**
 * Get objects bounds
 * @param {Layer} layer Layer reference
 * @return {Object} A JavaScript object with four attributes, [top, left, width, height]
 */
pub.bounds = function(layer) {
    return layer.sourceRectAtTime(layer.inPoint, false);
};

/**
 * 
 * @param {*} layer 
 */
pub.reposAnchorPoint = function (layer, op) {
    var anchor = layer.anchorPoint;
    var pos = layer.position;
    var bounds = pub.bounds(layer);
    var thirds = bounds.width / 3;

    switch (op) {
        case 1:
            anchor.setValue([bounds.left, bounds.top]);
            pos.setValue([pos.value[0] + bounds.left, pos.value[1] + bounds.top]);
            break;
        case 2:
            anchor.setValue([0, bounds.top]);
            pos.setValue([pos.value[0], pos.value[1] + bounds.top]);
            break;
        case 3:
            anchor.setValue([-bounds.left, bounds.top]);
            pos.setValue([pos.value[0] - bounds.left, pos.value[1] + bounds.top]);
            break;
        case 4:
            break;
        case 5:
            anchor.setValue([0,0]);
            pos.
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            break;
        case 9:
            break;
    }
};

//TO DO
pub.removeAllEffects = function (layer) {
};


/**
 * Remove all keyframes from a layer property.
 * @param {Property} prop 
 */
pub.removeAllKeyframes = function(prop) {
    while (prop.numKeys != 0) {
        prop.removeKey(1);
    }
};





//______________________________________________________________________________________________________________________
// Setter and getter methods for global modes 


/**
 * Set composition to work with.
 * @cat AfterEffects
 * @method setComp
 * @param {CompItem} comp 
 */
pub.setComp = function(comp) {
    thisComp = comp;
};

/**
 * Modifies the location anchor point from which rectangles are drawn by changing the way in which parameters given to rect() are intepreted.
 * @cat AfterEffects
 * @subcat Shapes
 * @method rectMode
 * @param {CENTER|CORNER} mode 
 */
pub.rectMode = function (mode) {
    currRectMode = mode;
};


/**
 * Modifies the location anchor point from which ellipses are drawn by changing the way in which parameters given to ellipse() are intepreted.
 * @cat AfterEffects
 * @subcat Shapes
 * @method ellipseMode
 * @param {CENTER|CORNER} mode 
 */
pub.ellipseMode = function (mode) {
    currEllipseMode = mode;
};

/**
 * Modifies the location  anchor point from which lines are drawn by changing the way in which parameters given to line() are intepreted.
 * @cat AfterEffects
 * @subcat Shapes
 * @method lineMode
 * @param {CENTER|CORNER} mode 
 */
pub.lineMode = function (mode) {
    currLineMode = mode;
};

/**
 * Modifies the location  anchor point from which solids are drawn by changing the way in which parameters given to solid() are intepreted.
 * @cat AfterEffects
 * @subcat Shapes
 * @method solidMode
 * @param {CENTER|CORNER} mode 
 */
pub.solidMode = function (mode) {
    currSolidMode = mode;
};

/**
 * Sets global blend mode.
 * @cat AfterEffects
 * @method blendMode
 * @param {BlendMode} mode 
 */
pub.blendMode = function (mode) {
    currBlendMode = mode;
};

/**
 * Sets global fill state.
 * @cat AfterEffects
 * @subcat Color
 * @method noFill
 */
pub.noFill = function() {
    currFillState = false;
};

/**
 * Sets global stroke state.
 * @cat AfterEffects
 * @subcat Color
 * @method noStroke
 */
pub.noStroke = function() {
    currStrokeState = false;
};

/**
 * Returns the current strokeWeight in points and sets it if argument strokeWeight is given.
 * @cat AfterEffects
 * @subcat Color
 * @method strokeWeight
 * @param {Number} strokeWeight Stroke weight in points to set
 * @return {Number} Current stroke weight
 */
pub.strokeWeight = function(strokeWeight) {
    if (arguments.length === 1) {
        currStrokeWeight = strokeWeight;
    }
    return currStrokeWeight;
}

/**
 * Enables 3D manipulation in layers.
 * @cat AfterEffects
 * @method set3DMode
 * @param {ENABLE3D|DISSABLE3D} mode 
 */
pub.set3DMode = function (mode) {
    curr3DMode = mode;
};

/**
 * Sets layer blending mode.
 * @cat AfterEffects
 * @method layerBlendMode
 * @param {Layer} layer 
 * @param {BlendMode} mode 
 */
pub.layerBlendMode = function (layer, mode) {
    layer.blendingMode = mode;
};



//______________________________________________________________________________________________________________________
// Render methods

/**
 * Add composition to render queue.
 * @cat AfterEffects
 * @method addToRender
 * @param {CompItem} [comp] Reference to composition to render 
 * @param {String} template Name of template to use on render
 * @param {String} path Path to save render file
 */
pub.addToRender = function (comp, template, path) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2];

    switch (arguments.length) {
        case 2:
            addToRenderFunc(thisComp, 1, a, b);
            break;
        case 3:
            addToRenderFunc(a, 1, b, c);
            break;
    }
};

function addToRenderFunc(comp, mod, template, path) {
    var file = initDataFile(path, false);
    var added = queue.items.add(comp);
    added.outputModule(mod).applyTemplate(template);
    added.outputModule(mod).file = file;
}

/**
 * Render all compositions in render queue.
 * @cat AfterEffects
 * @method render
 */
pub.render = function() {
    queue.showWindow(true);
    queue.render();
};

/**
 * Clear all items from render queue.
 * @cat AfterEffects
 * @method clearRenderQueue
 */
pub.clearRenderQueue = function () {
    while (queue.numItems > 0) {
        queue.item(queue.numItems).remove();
    }
};

pub.exportFrameOnly = function(n) {

};

function exportOnlyFrame(comp, mod, n, template, path) {
    var file = initDataFile(path, false);
    var added = queue.items.add(comp);
    added.outputModule(mod).applyTemplate(template);
    added.outputModule(mod).file = file;
};