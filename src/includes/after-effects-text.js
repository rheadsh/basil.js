//Text

/**
 * Add text to composition.
 * @cat AfterEffects
 * @subcat Text
 * @method text
 * @param {String} text Text to add
 * @param {Number} x x-coordinate of the textbox
 * @param {Number} y y-coordinate of the textbox
 * @param {Number} [z] z-coordinate of the textbox
 * @return {Properties} Properties object with attributes [layer, anchor, position, scale, rotation, orientation, rotationx, rotationy, rotationz, opacity].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created solid reference.
 */
pub.text = function (text, x, y, z) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3];

    var textLayer;
    if (!curr3DMode) {
        switch (arguments.length) {
            case 3:
                textLayer = createText(thisComp, a, b, c, 0);
                return textLayer;
        }
    } else {
        switch (arguments.length) {
            case 4:
                textLayer = createText(thisComp, a, b, c, d);
                return textLayer;
        }
    }
};

function createText(comp, text, x, y, z) {
    var obb = new Properties();

    var textLayer = comp.layers.addText(text);
    obb.layer = textLayer;

    if (curr3DMode) {
        textLayer.threeDLayer = true;
        obb.orientation = textLayer.property("Orientation");
        obb.rotationx = textLayer.property("X Rotation");
        obb.rotationy = textLayer.property("Y Rotation");
        obb.rotationz = textLayer.property("Z Rotation");
    }

    var textLayerProps = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    var textLayerDoc = textLayerProps.value;
    textLayerDoc.font = currFont;
    textLayerDoc.fontSize = currFontSize;
    textLayerDoc.applyFill = currFillState;
    textLayerDoc.fillColor = currFillColor;
    textLayerDoc.applyStroke = currStrokeState;
    textLayerDoc.strokeColor = currStrokeColor;
    textLayerDoc.justification = currJustification;
    textLayerProps.setValue(textLayerDoc);

    var bounds = textLayer.sourceRectAtTime(textLayer.inPoint, false);
    if (currSolidMode === pub.CENTER) {
        obb.anchor = textLayer.property("Anchor Point");
        obb.position = textLayer.property("Position");
        obb.position.setValue([x, y, z]);
    } else if (currSolidMode === pub.CORNER) {
        obb.anchor = textLayer.property("Anchor Point");
        obb.anchor.setValue([0, 0]);
        obb.position = textLayer.property("Position");
        obb.position.setValue([x, y, z]);
    }
    obb.opacity = textLayer.property("Opacity");
    obb.opacity.setValue(currOpacity);
    obb.scale = textLayer.property("Scale");
    obb.rotation = textLayer.property("Rotation");

    textLayer.blendingMode = currBlendMode;

    return obb;
}

/**
 * Sets the current text alignment.
 * @cat AfterEffects
 * @subcat Text
 * @method textAlign
 * @param {J_LEFT|J_RIGHT|J_CENTER|J_FULL_LEFT|J_FULL_RIGHT|J_FULL_CENTER|J_FULL} mode Text justification mode
 */
pub.textAlign = function (mode) {
    currJustification = mode;
};

/**
 * Returns the current font size in points and sets it if argument pointSize is given.
 * @cat AfterEffects
 * @subcat Text
 * @method textSize
 * @param {Number} pointSize The size in points to set
 * @return {Number}          The current point size
 */
pub.textSize = function (pointSize) {
    if (arguments.length === 1) {
        currFontSize = pointSize;
    }
    return currFontSize;
};

/**
 * Returns the current font and sets it if argument fontName is given.
 * @cat AfterEffects
 * @subcat Text
 * @method textFont
 * @param {string} fontName The name of the font to set e.g. Helvetica
 * @return {string}         The name of the current font
 */
pub.textFont = function(fontName) {
    if (arguments.length === 1) {
        currFont = fontName;
    }
    return currFont;
};


//Not ready
pub.character = function (text) {
    var textPos = text.position.value,
        textString = text.sourceText.value.toString(),
        textBox = text.sourceRectAtTime(text.inPoint, false),
        textJustification = text.property("ADBE Text Properties").property("ADBE Text Document").value.justification,
        textOffset = 0;

    if (textJustification === pub.J_CENTER)
        textOffset -= textBox.width / 2;
    else if (textJustification === pub.J_RIGHT)
        textOffset -= textBox.width;

    var textStartPos = textPos + textOffset;
    var lastLength = 0;

    layers = [];

    for (var i = 0; i < textString.length; i++) {
        var character = textString.charAt(i);
        if (character.match(/\s+/)) {
            continue;
        }
        var newText = text.duplicate();
        newText.name = character;

        if (curr3DMode) {
            shape.threeDLayer = true;
        }

        newText.sourceText.setValue(character);
        if (textJustification === pub.J_CENTER) {
            var newTextBox = newText.sourceRectAtTime(newText.inPoint, false);
            var newPos = textStartPos + [(textBox.width * (i / textString.length)) + (newTextBox.width / 2), 0, 0];
            newText.position.setValue(newPos);
        } else if (textJustification === pub.J_RIGHT) {
            var newTextBox = newText.sourceRectAtTime(newText.inPoint, false);
            var newPos = textStartPos + [textBox.width * (i / textString.length), 0, 0];
            newText.position.setValue(newPos);
        }

        layers.push(newText);
    }
    text.enabled = false;
    return layers;
};



//______________________________________________________________________________________________________________________
// Text Layer FX

/**
 * Add Anchor Point effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextAnchorPoint
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, anchor].
 */
pub.addTextAnchorPoint = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.anchor = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Anchor Point 3D");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Position effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextPosition
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, position].
 */
pub.addTextPosition = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.position = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Scale effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextScale
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, scale].
 */
pub.addTextScale = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.scale = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Scale 3D");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Skew effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextSkew
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, skew, skewAxis].
 */
pub.addTextSkew = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.skew = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Skew");
    obb.skewAxis = animator.property("ADBE Text Animator Properties").addProperty("Skew Axis");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Rotation effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextRotation
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, skew, skewAxis].
 */
pub.addTextRotation = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.rotation = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Rotation");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};


/**
 * Add Opacity effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextOpacity
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, opacity].
 */
pub.addTextOpacity = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.opacity = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add All Transform Properties effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextOpacity
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, anchor, position, scale, skew, skewAxis, rotation, opacity].
 */
pub.addTextAllTransform = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.anchor = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Anchor Point 3D");
    obb.position = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");
    obb.scale = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Scale 3D");
    obb.skew = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Skew");
    obb.skewAxis = animator.property("ADBE Text Animator Properties").addProperty("Skew Axis");
    obb.rotation = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Rotation");
    obb.opacity = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Fill Color effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextFill
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, fill].
 */
pub.addTextFill = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.fill = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Fill Color");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Stroke Color effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextStroke
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, stroke].
 */
pub.addTextStroke = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.stroke = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Stroke Color");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Stroke Width effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextStrokeWidth
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, width].
 */
pub.addTextStrokeWidth = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.width = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Stroke Width");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Tracking effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextStroke
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, tracking, amount].
 */
pub.addTextTracking = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.tracking = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Track Type");
    obb.amount = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Tracking Amount");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Character Offset effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextCharacterOffset
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, alignment, range, offset].
 */
pub.addTextCharacterOffset = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.alignment = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Change Type");
    obb.range = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Range");
    obb.offset = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Offset");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Character Value effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextCharacterValue
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, alignment, range, value].
 */
pub.addTextCharacterValue = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.alignment = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Change Type");
    obb.range = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Range");
    obb.value = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Character Replace");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};

/**
 * Add Blur effect to text layer.
 * @cat AfterEffects
 * @subcat Text
 * @method addTextBlur
 * @param {TextLayer} text Shape layer to add effect to
 * @return {Properties} Properties object with attributes [start, end, offset, blur].
 */
pub.addTextBlur = function(txt) {
    var obb = new Properties();
    var animator = txt.Text.Animators.addProperty("ADBE Text Animator");
    var range = animator.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    obb.blur = animator.property("ADBE Text Animator Properties").addProperty("ADBE Text Blur");

    obb.start = range.property("Start");
    obb.end = range.property("End");
    obb.offset = range.property("Offset");

    return obb;
};