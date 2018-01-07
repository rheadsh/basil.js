/**
 * Creates camera layer.
 * @method camera
 * @param {String} name Name of the camera
 * @param {Array} interest 2-D array to set point of interest
 * @return {Properties} Properties object with attributes [layer, interest, position, orientation, rotationx, rotationy, rotationz, zoom, dof, focusDist, aperture, blurLevel, irisShape, irisRotation, irisRound, irisAspect, irisDiffraction, highlightGain, highlightThresh, highlightSat].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Camera layer reference.
 */
pub.camera = function (name, interest) {
    var a = arguments[0],
        b = arguments[1];
    var cam;
    switch (arguments.length) {
        case 0:
            cam = createCam("Camera", [0, 0]);
            return cam;
        case 1:
            cam = createCam(a, [0, 0]);
            return cam;
        case 2:
            cam = createCam(a, b);
            return cam;
    }

};

function createCam(name, point) {
    var obb = new Properties();
    var cam = thisComp.layers.addCamera(name, point);
    obb.layer = cam;

    obb.interest = cam.property("Point of Interest");
    obb.position = cam.property("Position");
    obb.orientation = cam.property("Orientation");
    obb.rotationx = cam.property("X Rotation");
    obb.rotationy = cam.property("Y Rotation");
    obb.rotationz = cam.property("Z Rotation");

    obb.zoom = cam.property("Camera Options").property("Zoom");
    obb.dof = cam.property("Camera Options").property("Depth of Field");
    obb.focusDist = cam.property("Camera Options").property("Focus Distance");
    obb.aperture = cam.property("Camera Options").property("Aperture");
    obb.blurLevel = cam.property("Camera Options").property("Blur Level");
    obb.irisShape = cam.property("Camera Options").property("Iris Shape");
    obb.irisRotation = cam.property("Camera Options").property("Iris Rotation");
    obb.irisRound = cam.property("Camera Options").property("Iris Roundness");
    obb.irisAspect = cam.property("Camera Options").property("Iris Aspect Ratio");
    obb.irirDiffraction = cam.property("Camera Options").property("Iris Diffraction Fringe");
    obb.highlightGain = cam.property("Camera Options").property("Highlight Gain");
    obb.highlightThresh = cam.property("Camera Options").property("Highlight Threshold");
    obb.highlightSat = cam.property("Camera Options").property("Highlight Saturation");

    return obb;
};

/**
 * Creates light layer.
 * @method camera
 * @param {String} name Name of the camera
 * @param {Array} interest 2-D array to set point of interest
 * @return {Properties} Properties object with attributes [layer, interest, position, orientation, rotationx, rotationy, rotationz, type, intensity, color, coneAngle, coneFeather, fallOff, radius, falloffDist, castsShadows, shadowDark, shadowDiffusion].
 *                      Each attribute is a Property object for convenience in animation, except of layer which is the new created Light layer reference.
 */
pub.light = function (name, interest, type) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2];

    switch (arguments.length) {
        case 0:
            light = createLight("Light", [0, 0], pub.POINT);
            return light;
        case 1:
            light = createLight("Light", [0, 0], a);
            return light;
        case 2:
            light = createLight(a, [0,0], b);
            return light;
        case 3:
            light = createLight(a, b, c);
            return light;
    }

};

function createLight(name, point, type) {
    var obb = new Properties();
    var light

    var light = thisComp.layers.addLight(name, point);
    light.lightType = type;
    obb.layer = light;

    obb.interest = light.property("Point of Interest");
    obb.position = light.property("Position");
    obb.orientation = light.property("Orientation");
    obb.rotationx = light.property("X Rotation");
    obb.rotationy = light.property("Y Rotation");
    obb.rotationz = light.property("Z Rotation");

    obb.type = light.lightType;
    obb.intensity = light.property("Light Options").property("Intensity");
    obb.color = light.property("Light Options").property("Color");
    obb.coneAngle = light.property("Light Options").property("Cone Angle");
    obb.coneFeather = light.property("Light Options").property("Cone Feather");
    obb.fallOff = light.property("Light Options").property("Falloff");
    obb.radius = light.property("Light Options").property("Radius");
    obb.falloffDist = light.property("Light Options").property("Falloff Distance");
    obb.castsShadows = light.property("Light Options").property("Casts Shadows");
    obb.shadowDark = light.property("Light Options").property("Shadow Darkness");
    obb.shadowDiffusion = light.property("Light Options").property("Shadow Diffusion");

    return obb;
};