//Masks

/**
 * Creates mask on layer
 * @cat AfterEffects
 * @subcat Masks
 * @method mask
 * @param {AVLayer} layer Layer to add mask to
 * @param {Array.<Array.<Number, Number>>} verts Mask vertices 
 * @param {Boolean} closed Mask close property
 * @return {Mask} Created mask
 */
pub.mask = function (layer, verts, closed) {
    var mask = layer.Masks.addProperty("Mask");
    maskPath = mask.property("Mask Path");
    path = maskPath.value;
    path.vertices = verts;
    path.closed = closed;
    maskPath.setValue(path);

    return mask;
};