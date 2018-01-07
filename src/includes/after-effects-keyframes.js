//Keyframes

var keyModes = {
    interpolation: KeyframeInterpolationType.BEZIER
};


/**
 * Create keyframe at time and value.
 * @cat AfterEffects
 * @subcat Keyframes
 * @method setKey
 * @param {Property} prop Property reference 
 * @param {Number} [time] Time in seconds to set keyframe 
 * @param {Number|Array} value Property keyframe value. Number or array depending on the property dimensions
 * @return {Number} index of last created keyframe 
 */
pub.setKey = function (prop, time, value) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2];

    switch (arguments.length) {
        case 2:
            a.setValue(b);
            return a.numKeys;
            break;

        case 3:
            a.setValueAtTime(b, c);
            a.setInterpolationTypeAtKey(a.numKeys, keyModes.interpolation, keyModes.interpolation);
            return a.numKeys;
            break;
    }
};


/**
 * Set global keyframe inerpolation mode.
 * @cat AfterEffects
 * @subcat Keyframes
 * @method setKeyInterpolationMode
 * @param {BEZIER|LINEAR|HOLD} mode 
 */
pub.setKeyInterpolationMode = function(mode) {
    if (mode === "BEZIER") {
        keyModes = KeyframeInterpolationType.BEZIER;
    } else if (mode === "LINEAR") {
        keyModes = KeyframeInterpolationType.LINEAR;
    } else if (mode === "HOLD") {
        keyModes = KeyframeInterpolationType.LINEAR;
    }
};

/**
 * Creates ease for keyrames.
 * @cat AfterEffects
 * @subcat Keyframes
 * @method ease
 * @param {Number} speed The speed value of the keyframe. The units depend on the type of keyframe, and are displayed in the Keyframe Velocity dialog box
 * @param {Number} influence Range[0.1..100.0] The influence value of the keyframe, as shown in the Keyframe Velocity dialog box
 * @return {KeyFrameEase}
 */
pub.ease = function(speed, influence) {
    var ease = new KeyframeEase(speed, influence);
    return ease;
};

/**
 * Manipulates keyframe property speed.
 * @cat AfterEffects
 * @subcat Keyframes
 * @method speed
 * @param {Property} prop Property reference
 * @param {Number} index Keyframe index
 * @param {KeyframeEase} easeIn Ease in object to apply
 * @param {KeyframeEase} easeOut Ease out object to apply
 */
pub.speed = function(prop, index, easeIn, easeOut) {
    if (easeIn instanceof Array) {
        prop.setTemporalEaseAtKey(index, easeIn, easeOut);
    } else {
        prop.setTemporalEaseAtKey(index, [easeIn], [easeOut]);
    }
};



/**
 * Set all keyframes of a property with the same speed and influence.
 * @cat AfterEffects
 * @subcat Keyframes
 * @method speedAll
 * @param {Property} prop Property reference
 * @param {Number} speed The speed value of the keyframe. The units depend on the type of keyframe, and are displayed in the Keyframe Velocity dialog box
 * @param {Number} influence Range[0.1..100.0] The influence value of the keyframe, as shown in the Keyframe Velocity dialog box
 */
pub.speedAll = function(prop, speed, influence) {
    var _ease = pub.ease(speed, influence);
    var easeArr = [];
    var n = (prop.value.length) ? prop.value.length : 1;
    for (var i=0; i<n; i++) {
        easeArr.push(_ease);
    }
    for (var i =1; i<=prop.numKeys; i++) {
        pub.speed(prop, i, easeArr, easeArr);
    }
};