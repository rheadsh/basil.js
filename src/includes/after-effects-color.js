// Color

/**
 * Creates new RGBA color
 * @cat AfterEffects
 * @subcat Color
 * @method color;
 * @param {Number} red (int) Range[0,255] or (float) Range[0,1] Red value
 * @param {Number} green (int) Range[0,255] or (float) Range[0,1] Green value
 * @param {Number} blue (int) Range[0,255] or (float) Range[0,1] Blue value
 * @param {Number} alpha (int) Range[0,255] or (float) Range[0,1] Opacity value
 * @return {Color} RGBA color 
 */
pub.color = function (red, green, blue, alpha) {
    var col = [];
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3];

    a = pub.constrain(a, 0, 255);
    b = pub.constrain(b, 0, 255);
    c = pub.constrain(c, 0, 255);
    d = pub.constrain(d, 0, 100);

    if (arguments.length === 1) {
        if (a > 1) {
            col = [a / 255, a / 255, a / 255];
        } else {
            col = [a, a, a];
        }
    } else if (arguments.length === 3) {
        if (a > 1 || b > 1 || c > 1) {
            col = [a / 255, b / 255, c / 255];
        } else {
            col = [a, b, c];
        }
    } else if (arguments.length === 2) {
        if (a > 1) {
            col = [a / 255, a / 255, a / 255];
            currOpacity = b;
        } else {
            col = [a, a, a];
            currOpacity = b * 100;
        }
    } else if (arguments.length === 4) {
        if (a > 1 || b > 1 || c > 1) {
            col = [a / 255, b / 255, c / 255];
            currOpacity = d;
        } else {
            col = [a, b, c];
            currOpacity = d * 100;
        }
    }
    return col;
};

/**
 * Sets the color used to fill shapes
 * @cat AfterEffects
 * @subcat Color
 * @method fill
 * @param {Number} red (int) Range[0,255] or (float) Range[0,1] Red value
 * @param {Number} green (int) Range[0,255] or (float) Range[0,1] Green value
 * @param {Number} blue (int) Range[0,255] or (float) Range[0,1] Blue value
 * @param {Number} alpha (int) Range[0,255] or (float) Range[0,1] Opacity value
 */
pub.fill = function (r, g, b, a) {
    currFillState = true;
    if (arguments.length === 1) {
        currFillColor = pub.color(arguments[0]);
    } else if (arguments.length === 2) {
        currFillColor = pub.color(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
        currFillColor = pub.color(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        currFillColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3]);
    }
};

/**
 * Sets the color used to draw lines and borders around shapes.
 * @cat AfterEffects
 * @subcat Color
 * @method stroke
 * @param {Number} red (int) Range[0,255] or (float) Range[0,1] Red value
 * @param {Number} green (int) Range[0,255] or (float) Range[0,1] Green value
 * @param {Number} blue (int) Range[0,255] or (float) Range[0,1] Blue value
 * @param {Number} alpha (int) Range[0,255] or (float) Range[0,1] Opacity value 
 */
pub.stroke = function (r, g, b, a) {
    currStrokeState = true;
    if (arguments.length === 1) {
        currStrokeColor = pub.color(arguments[0]);
    } else if (arguments.length === 2) {
        currStrokeColor = pub.color(arguments[0], arguments[1]);
    } else if (arguments.length === 3) {
        currStrokeColor = pub.color(arguments[0], arguments[1], arguments[2]);
    } else if (arguments.length === 4) {
        currStrokeColor = pub.color(arguments[0], arguments[1], arguments[2], arguments[3]);
    }
};


/**
 * Converts from HSBA color mode to RGBA
 * @cat AfterEffects
 * @subcat Color
 * @method hsbaToRgba
 * @param {Number} hue Range[0,1] Hue value
 * @param {Number} saturation Range[0,1] Saturation value
 * @param {Number} brightness Range[0,1] Brightness value
 * @param {Number} alpha Range[0,1] Alpha value
 * @return {Color} Converted color
 */
//Adapted from p5.js 
pub.hsbaToRgba = function (h, s, b, a) {
    var hue = h * 6; // We will split hue into 6 sectors.
    var sat = s;
    var val = b;

    var RGBA = [];

    if (sat === 0) {
        RGBA = [val, val, val, a]; // Return early if grayscale.
    } else {
        var sector = Math.floor(hue);
        var tint1 = val * (1 - sat);
        var tint2 = val * (1 - sat * (hue - sector));
        var tint3 = val * (1 - sat * (1 + sector - hue));
        var red, green, blue;
        if (sector === 1) {
            // Yellow to green.
            red = tint2;
            green = val;
            blue = tint1;
        } else if (sector === 2) {
            // Green to cyan.
            red = tint1;
            green = val;
            blue = tint3;
        } else if (sector === 3) {
            // Cyan to blue.
            red = tint1;
            green = tint2;
            blue = val;
        } else if (sector === 4) {
            // Blue to magenta.
            red = tint3;
            green = tint1;
            blue = val;
        } else if (sector === 5) {
            // Magenta to red.
            red = val;
            green = tint1;
            blue = tint2;
        } else {
            // Red to yellow (sector could be 0 or 6).
            red = val;
            green = tint3;
            blue = tint1;
        }
    }
    return pub.color(red, gree, blue, a);
};