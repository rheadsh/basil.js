//Shapes

/**
 * Add solid to composition.
 * @cat AfterEffects
 * @subcat Shapes
 * @method solid
 * @param {String} [name] Name of the solid
 * @param {Number} x x-coordinate of the solid
 * @param {Number} y y-coordinate of the solid
 * @param {Number} [z] z-coordinate of the solid
 * @param {Number} w Width of the solid
 * @param {Number} h Height of the solid
 * @param {Number} [duration] Duration of the solid in seconds
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created solid reference.
 */
pub.solid = function (name, x, y, z, w, h, dur) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3],
        e = arguments[4],
        f = arguments[5],
        g = arguments[6];

    var newSolid;
    if (!curr3DMode) {
        switch (arguments.length) {
            case 0:
                newSolid = createSolid(thisComp, "solid", pub.width / 2, pub.height / 2, 0, pub.width, pub.height, pub.getDuration());
                newSolid.name = "solid_" + (thisComp.numLayers).toString();
                return newSolid;
            case 1:
                if (typeof a === "string") {
                    newSolid = createSolid(thisComp, a, pub.width / 2, pub.height / 2, 0, pub.width, pub.height, pub.getDuration());
                    return newSolid;
                } else {
                    newSolid = createSolid(thisComp, "solid", pub.width / 2, pub.height / 2, 0, pub.width, pub.height, a);
                    newSolid.name = "solid_" + (thisComp.numLayers).toString();
                    return newSolid;
                }
            case 4:
                newSolid = createSolid(thisComp, "solid", a, b, 0, c, d, pub.getDuration());
                newSolid.name = "solid_" + (thisComp.numLayers).toString();
                return newSolid;
            case 5:
                if (typeof a === "string") {
                    newSolid = createSolid(thisComp, a, b, 0, c, d, e, pub.getDuration());
                    return newSolid;
                } else {
                    newSolid = createSolid(thisComp, "solid", a, b, 0, c, d, e);
                    newSolid.name = "solid_" + (thisComp.numLayers).toString();
                    return newSolid;
                }
        }
    } else {
        switch (arguments.length) {
            case 5:
                newSolid = createSolid(thisComp, "solid", a, b, c, d, e, pub.getDuration());
                newSolid.name = "solid_" + (thisComp.numLayers).toString();
                return newSolid;
            case 6:
                if (typeof a === "string") {
                    newSolid = createSolid(thisComp, a, b, c, d, e, f, pub.getDuration());
                    return newSolid;
                } else {
                    newSolid = createSolid(thisComp, "solid", a, b, c, d, e, f);
                    newSolid.name = "solid_" + (thisComp.numLayers).toString();
                    return newSolid;
                }
        }
    }
};


function createSolid(comp, name, x, y, z, w, h, dur) {
    var newSolid, obb;

    obb = new Properties();

    newSolid = comp.layers.addSolid(currFillColor, name, w, h, 1, dur);
    obb.layer = newSolid;

    if (curr3DMode) {
        newSolid.threeDLayer = true;
        obb.orientation = newSolid.property("Orientation");
        obb.rotationx = newSolid.property("X Rotation");
        obb.rotationy = newSolid.property("Y Rotation");
        obb.rotationz = newSolid.property("Z Rotation");
    }

    if (currSolidMode === pub.CENTER) {
        obb.anchor = newSolid.property("Anchor Point");
        obb.position = newSolid.property("Position");
        obb.position.setValue([x, y, z]);
    } else if (currSolidMode === pub.CORNER) {
        obb.anchor = newSolid.property("Anchor Point");
        obb.anchor.setValue([0, 0]);
        obb.position = newSolid.property("Position");
        obb.position.setValue([x, y, z]);
    }

    obb.opacity = newSolid.property("Opacity");
    obb.opacity.setValue(currOpacity);
    obb.scale = newSolid.property("Scale");
    obb.rotation = newSolid.property("Rotation");

    newSolid.blendingMode = currBlendMode;

    return obb;
}



/**
 * Draws a rectangle to the composition.
 * @cat AfterEffects
 * @subcat Shapes
 * @method rect
 * @param {Number} x x-coordinate of the rectangle
 * @param {Number} y y-coordinate of the rectangle
 * @param {Number} [z] z-coordinate of the rectangle
 * @param {Number} w Width of the rectangle
 * @param {Number} h Height of the rectangle
 * @param {Number} [roundness] Roundness value of the rectangle
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity, size, fill, stroke, weight, round].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Shape layer reference.
 */
pub.rect = function (x, y, z, w, h, round) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3],
        e = arguments[4],
        f = arguments[5];

    var shape;
    if (!curr3DMode) {
        switch (arguments.length) {
            case 2:
                shape = drawRectShape(thisComp, a, b, 0, pub.width, pub.height, 0);
                return shape;
            case 4:
                shape = drawRectShape(thisComp, a, b, 0, c, d, 0);
                return shape;
            case 5:
                shape = drawRectShape(thisComp, a, b, 0, c, d, e);
                return shape;
        }
    } else {
        switch (arguments.length) {
            case 3:
                shape = drawRectShape(thisComp, a, b, c, pub.width, pub.height, 0);
                return shape;
            case 5:
                shape = drawRectShape(thisComp, a, b, c, d, e, 0);
                return shape;
            case 6:
                shape = drawRectShape(thisComp, a, b, c, d, e, f);
                return shape;
        }
    }
};

function drawRectShape(comp, x, y, z, w, h, round) {
    var rect;

    this.obb = new Properties();

    this.shape = comp.layers.addShape();
    this.obb.layer = shape;

    if (curr3DMode) {
        shape.threeDLayer = true;
        this.obb.orientation = this.shape.property("Orientation");
        this.obb.rotationx = this.shape.property("X Rotation");
        this.obb.rotationy = this.shape.property("Y Rotation");
        this.obb.rotationz = this.shape.property("Z Rotation");
    }

    this.shapeGroup = this.shape.property("Contents").addProperty("ADBE Vector Group");
    rect = this.shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
    this.obb.size = rect.property("ADBE Vector Rect Size");
    this.obb.size.setValue([w, h]);
    this.obb.round = rect.property("ADBE Vector Rect Roundness");
    this.obb.round.setValue(round);

    if (currStrokeState) {
        createStroke();
    }

    if (currFillState) {
        createFill();
    }

    if (currRectMode === pub.CENTER) {
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    } else if (currRectMode === pub.CORNER) {
        var bounds = shape.sourceRectAtTime(this.shape.inPoint, false);
        this.obb.anchor = this.shape.property("Anchor Point");
        this.obb.anchor.setValue([-bounds.width / 2, -bounds.height / 2]);
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    }
    this.obb.opacity = this.shape.property("Opacity");
    this.obb.opacity.setValue(currOpacity);
    
    this.shape.blendingMode = currBlendMode;

    this.obb.scale = this.shape.property("Scale");
    this.obb.rotation = this.shape.property("Rotation");

    return this.obb;
}

/**
 * Draws an ellipse to the composition.
 * @cat AfterEffects
 * @subcat Shapes
 * @method ellipse
 * @param {Number} x x-coordinate of the ellipse
 * @param {Number} y y-coordinate of the ellipse
 * @param {Number} [z] z-coordinate of the ellipse
 * @param {Number} w Width of the ellipse
 * @param {Number} h Height of the ellipse
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity, size, fill, stroke, weight].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Shape layer reference.
 */
pub.ellipse = function (x, y, z, w, h) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3],
        e = arguments[4];

    var shape;
    if (!curr3DMode) {
        switch (arguments.length) {
            case 2:
                shape = drawEllipseShape(thisComp, a, b, 0, pub.width, pub.height);
                return shape;
            case 4:
                shape = drawEllipseShape(thisComp, a, b, 0, c, d);
                return shape;
        }
    } else {
        switch (arguments.length) {
            case 3:
                shape = drawEllipseShape(thisComp, a, b, c, pub.width, pub.height);
                return shape;
            case 5:
                shape = drawEllipseShape(thisComp, a, b, c, d, e);
                return shape;
        }
    }
};

function drawEllipseShape(comp, x, y, z, w, h) {
    var ell;

    this.obb = new Properties();

    this.shape = comp.layers.addthis.Shape();
    this.obb.layer = shape;
    if (curr3DMode) {
        shape.threeDLayer = true;
        this.obb.orientation = this.shape.property("Orientation");
        this.obb.rotationx = this.shape.property("X Rotation");
        this.obb.rotationy = this.shape.property("Y Rotation");
        this.obb.rotationz = this.shape.property("Z Rotation");
    }

    this.shapeGroup = shape.property("Contents").addProperty("ADBE Vector Group");
    ell = this.shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");
    this.obb.size = ell.property("ADBE Vector Ellipse Size");
    this.obb.size.setValue([w, h]);

    if (currStrokeState) {
        createStroke();
    }

    if (currFillState) {
        createFill();
    }

    if (currRectMode === pub.CENTER) {
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    } else if (currRectMode === pub.CORNER) {
        var bounds = shape.sourceRectAtTime(this.shape.inPoint, false);
        this.obb.anchor = this.shape.property("Anchor Point");
        this.obb.anchor.setValue([-bounds.width / 2, -bounds.height / 2]);
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    }
    this.obb.opacity = this.shape.property("Opacity");
    this.obb.opacity.setValue(currOpacity);

    this.shape.blendingMode = currBlendMode;

    this.obb.scale = this.shape.property("Scale");
    this.obb.rotation = this.shape.property("Rotation");

    return this.obb;
};

/**
 * Draws a line to the composition (currently only 2D mode supported).
 * @cat AfterEffects
 * @subcat Shapes
 * @method line
 * @param {Number} x1 x-coordinate of the first point 
 * @param {Number} y1 y-coordinate of the first point
 * @param {Number} x2 x-coordinate of the second point
 * @param {Number} y2 y-coordinate of the second point
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity, stroke, weight].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Shape layer reference.
 */
pub.line = function (x1, y1, x2, y2) {
    shape = drawLineShape(thisComp, x1, y1, x2, y2);
    return shape;
};

function drawLineShape(comp, x1, y1, x2, y2) {
    var line;

    this.obb = new Properties();

    this.shape = comp.layers.addShape();
    this.obb.layer = shape;

    this.shapeGroup = this.shape.property("Contents").addProperty("ADBE Vector Group");
    line = this.shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var drawing = new Shape();
    drawing.vertices = [[x1, y1], [x2, y2]];
    this.obb.path = line.property("Path");
    this.obb.path.setValue(drawing);

    createStroke();

    var bounds = this.shape.sourceRectAtTime(this.shape.inPoint, false);
    if (currLineMode === pub.CENTER) {
        this.obb.anchor = this.shape.property("Anchor Point");
        this.obb.anchor.setValue([x1 + bounds.width / 2, y1 + bounds.height / 2]);
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x1 + bounds.width / 2, y1 + bounds.height / 2]);
    } else if (currLineMode === pub.CORNER) {
        this.obb.anchor = this.shape.property("Anchor Point");
        this.obb.anchor.setValue([x1, y1]);
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x1, y1]);
    }
    this.obb.opacity = this.shape.property("Opacity");
    this.obb.opacity.setValue(currOpacity);
    
    this.shape.blendingMode = currBlendMode;

    this.obb.scale = this.shape.property("Scale");
    this.obb.rotation = this.shape.property("Rotation");

    return this.obb;
};

/**
 * Draws an n-gon to the composition.
 * @cat AfterEffects
 * @subcat Shapes
 * @method polygon
 * @param {Number} x x-coordinate of the polygon 
 * @param {Number} y y-coordinate of the polygon
 * @param {Number} [z] z-coordinate of the polygon 
 * @param {Number} r Radius of the polygon 
 * @param {Number} n Number of sides
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity, points, radius, fill, stroke, weight].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Shape layer reference.
 */
pub.polygon = function (x, y, z, r, n) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3],
        e = arguments[4];

    var shape;
    if (!curr3DMode) {
        switch (arguments.length) {
            case 2:
                shape = drawPolygonShape(thisComp, a, b, 0, pub.width, pub.height);
                return shape;
            case 4:
                shape = drawPolygonShape(thisComp, a, b, 0, c, d);
                return shape;
        }
    } else {
        switch (arguments.length) {
            case 3:
                shape = drawPolygonShape(thisComp, a, b, c, pub.width, pub.height);
                return shape;
            case 5:
                shape = drawPolygonShape(thisComp, a, b, c, d, e);
                return shape;
        }
    }
};

function drawPolygonShape(comp, x, y, z, r, n) {
    var gon;

    this.obb = new Properties();

    this.shape = comp.layers.addShape();
    this.obb.layer = shape;
    if (curr3DMode) {
        this.shape.threeDLayer = true;
        this.obb.orientation = this.shape.property("Orientation");
        this.obb.rotationx = this.shape.property("X Rotation");
        this.obb.rotationy = this.shape.property("Y Rotation");
        this.obb.rotationz = this.shape.property("Z Rotation");
    }

    this.shapeGroup = this.shape.property("Contents").addProperty("ADBE Vector Group");
    gon = this.shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Star");
    gon.property("ADBE Vector Star Type").setValue(2);

    this.obb.points = gon.property("ADBE Vector Star Points");
    this.obb.points.setValue(n);

    this.obb.radius = gon.property("ADBE Vector Star Outer Radius");
    this.obb.radius.setValue(r);

    if (currStrokeState) {
        createStroke();
    }

    if (currFillState) {
        createFill();
    }

    if (currRectMode === pub.CENTER) {
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    } else if (currRectMode === pub.CORNER) {
        var bounds = shape.sourceRectAtTime(this.shape.inPoint, false);
        this.obb.anchor = this.shape.property("Anchor Point");
        this.obb.anchor.setValue([-bounds.width / 2, -bounds.height / 2]);
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([x, y, z]);
    }
    this.obb.opacity = shape.property("Opacity");
    this.obb.opacity.setValue(currOpacity);
    
    this.shape.blendingMode = currBlendMode;

    this.obb.scale = shape.property("Scale");
    this.obb.rotation = shape.property("Rotation");

    return this.obb;
};

/**
 * Draws a shape to the composition.
 * @cat AfterEffects
 * @subcat Shapes
 * @method shape
 * @param {Array} vertices List of vertices
 * @param {Boolean} closed Open or closed shape
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity, path, fill, stroke, weight].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Shape layer reference.
 */
pub.shape = function (vertices, closed) {
    var shape;
    shape = drawShape(thisComp, vertices, closed);
    return shape;
};

function drawShape(comp, v, closed) {
    var gon;

    this.obb = new Properties();

    this.shape = comp.layers.addShape();
    this.obb.layer = shape;

    if (curr3DMode) {
        this.shape.threeDLayer = true;
        this.obb.orientation = this.shape.property("Orientation");
        this.obb.rotationx = this.shape.property("X Rotation");
        this.obb.rotationy = this.shape.property("Y Rotation");
        this.obb.rotationz = this.shape.property("Z Rotation");
    }

    this.shapeGroup = this.shape.property("Contents").addProperty("ADBE Vector Group");
    line = this.shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Group");
    var drawing = new Shape();
    drawing.vertices = v;
    drawing.closed = closed;
    line.property("Path").setValue(drawing); 

    if (currStrokeState) {
        createStroke();
    }

    if (closed) {
        createFill();
    }

    if (currShapeMode === pub.CENTER) {
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([b.width/2, b.height/2, 0]);
    } else if (currShapeMode === pub.CORNER) {
        this.obb.position = this.shape.property("Position");
        this.obb.position.setValue([0, 0, 0]);
    }

    this.obb.opacity = this.shape.property("Opacity");
    this.obb.opacity.setValue(currOpacity);

    this.shape.blendingMode = currBlendMode;

    this.obb.anchor = this.shape.property("Anchor Point");
    this.obb.scale = this.shape.property("Scale");
    this.obb.rotation = this.shape.property("Rotation");
    this.obb.path = this.shape.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Group").property("ADBE Vector Shape");

    return this.obb;
};

/**
 * Creates a new null object.
 * @cat AfterEffects
 * @subcat Shapes
 * @method null
 * @param {Number} [duration] Duration in seconds of null object
 * @return {AVLayer} Null object created
 */
pub.null = function (duration) {
    var a = arguments[0],
        b = arguments[1];

    var nullObject;
    switch (arguments.length) {
        case 0:
            nullObject = createNullObject(thisComp, pub.getDuration());
            return nullObject;
        case 1:
            nullObject = createNullObject(thisComp, a);;
            return nullObject;
    }
}

function createNullObject(comp, duration) {
    var nullObject;
    nullObject = comp.addNull(duration);
    if (curr3DMode) {
        nullObject.threeDLayer = true;
    }
    return nullObject;
}



//Function for creating stroke and fill 
function createStroke() {
    var stroke = this.shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Stroke");
    this.obb.stroke = stroke.property("Color");
    this.obb.stroke.setValue(currStrokeColor);
    this.obb.weight = stroke.property("Stroke Width");
    this.obb.weight.setValue(currStrokeWeight);
};

function createFill() {
    var fill = this.shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");
    this.obb.fill = fill.property("Color");
    this.obb.fill.setValue(currFillColor);
};


//______________________________________________________________________________________________________________________
// Shape Layer FX

/**
 * Add Trim Paths effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeTrimPaths
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset].
 */
pub.addShapeTrimPaths = function(shape) {
    var obb = new Properties();
    var trim = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - Trim");
    obb.start = trim.property("Start");
    obb.end = trim.property("End");
    obb.offset = trim.property("Offset");

    return obb;
};

/**
 * Add Twist effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeTwist
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [angle, center].
 */
pub.addShapeTwist = function(shape) {
    var obb = new Properties();
    var twist = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - Twist");
    obb.angle = twist.property("Angle");
    obb.center = twist.property("Center");

    return obb;
}

/**
 * Add Wiggle Path effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeWigglePaths
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [size, detail, points, wiggles, correlation, temporalPhase, spatialPhase, seed].
 */
pub.addShapeWigglePaths = function(shape) {
    var obb = new Properties();
    var wiggle = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - Roughen");
    obb.size = wiggle.property("Size");
    obb.detail = wiggle.property("Detail");
    obb.points = wiggle.property("Points");
    obb.wiggles = wiggle.property("Wiggles/Seconds");
    obb.correlation = wiggle.property("Correlation");
    obb.temporalPhase = wiggle.property("Temporal Phase");
    obb.spatialPhase = wiggle.property("Spatial Phase");
    obb.seed = wiggle.property("Random Seed");

    return obb;
}


/**
 * Add Wiggle Transform effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeWiggleTransform
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [wiggles, correlation, temporalPhase, spatialPhase, seed, anchor, position, scale, rotation].
 */
pub.addShapeWiggleTransform = function(shape) {
    var obb = new Properties();
    var wiggle = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - Wiggler");
    obb.wiggles = wiggle.property("Wiggles/Seconds");
    obb.correlation = wiggle.property("Correlation");
    obb.temporalPhase = wiggle.property("Temporal Phase");
    obb.spatialPhase = wiggle.property("Spatial Phase");
    obb.seed = wiggle.property("Random Seed");

    obb.anchor = wiggle.property("Transform").property("Anchor Point");
    obb.position = wiggle.property("Transform").property("Position");
    obb.scale = wiggle.property("Transform").property("Scale");
    obb.rotation = wiggle.property("Transform").property("Rotation");

    return obb;
}

/**
 * Add Zig Zag effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeZigZag
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [size, ridges, points].
 */
pub.addShapeZigZag = function(shape) {
    var obb = new Properties();
    var zz = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Zigzag Points");
    obb.size = zz.property("Size");
    obb.ridges = zz.property("Ridges per segment");
    obb.points = zz.property("Points");

    return obb;
}

/**
 * Add Repeater effects to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapeRepeater
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [copies, offset, composite, anchor, position, scale, rotation, startOpacity, endOpacity].
 */
pub.addShapeRepeater = function(shape) {
    var obb = new Properties();
    var repeater = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - Repeater");
    obb.copies = repeater.property("Copies");
    obb.offset = repeater.property("Offset");
    obb.composite = repeater.property("Composite");

    obb.anchor = repeater.property("Transform").property("Anchor Point");
    obb.position = repeater.property("Transform").property("Position");
    obb.scale = repeater.property("Transform").property("Scale");
    obb.rotation = repeater.property("Transform").property("Rotation");
    obb.startOpacity = repeater.property("Transform").property("Start Opacity");
    obb.endOpacity = repeater.property("Transform").property("End Opacity");

    return obb;
}

/**
 * Add Pucker & Bloat effect to shape layer.
 * @cat AfterEffects
 * @subcat Shapes
 * @method addShapePuckerBloat
 * @param {ShapeLayer} shape Shape layer to add effect to
 * @return {Properties} Properties object with attributes [amount].
 */
pub.addShapePuckerBloat= function(shape) {
    var obb = new Properties();
    var pb = shape.property("Contents").property(1).property("Contents").addProperty("ADBE Vector Filter - PB");
    obb.amount = pb.property("Amount");

    return obb;
}