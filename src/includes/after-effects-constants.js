/**
 * Used with b.colorMode() to set the color space.
 * @property RGB {String}
 * @cat Color
 */
pub.RGB = "rgb";

/**
 * Used with b.colorMode() to set the color space.
 * @property CMYK {String}
 * @cat Color
 */
pub.CMYK = "cmyk";

/**
 * Corner, used for drawing modes.
 * @property CORNER {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CORNER = "corner";

/**
 * Corners, used for drawing modes.
 * @property CORNERS {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CORNERS = "corners";

/**
 * Center, used for drawing modes.
 * @property CENTER {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CENTER = "center";

/**
 * Radius, used for drawing modes.
 * @property RADIUS {String}
 * @cat Document
 * @subcat Primitives
 */
pub.RADIUS = "radius";

/**
 * Close, used for endShape() modes.
 * @property CLOSE {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CLOSE = "close";

/**
 * Open, used for arc() modes.
 * @property OPEN {String}
 * @cat Document
 * @subcat Primitives
 */
pub.OPEN = "open";

/**
 * Chord, used for arc() modes.
 * @property CHORD {String}
 * @cat Document
 * @subcat Primitives
 */
pub.CHORD = "chord";

/**
 * Pie, used for arc() modes.
 * @property PIE {String}
 * @cat Document
 * @subcat Primitives
 */
pub.PIE = "pie";

/**
 * Two Pi
 * @property TWO_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.TWO_PI = Math.PI*2;

/**
 * Pi
 * @property PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.PI = Math.PI;

/**
 * Half Pi
 * @property HALF_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.HALF_PI = Math.PI/2;

/**
 * Quarter Pi
 * @property QUARTER_PI {Number}
 * @cat Math
 * @subcat Constants
 */
pub.QUARTER_PI = Math.PI/4;

/**
 * Sin Cos Length
 * @property SINCOS_LENGTH {Number}
 * @cat Math
 * @subcat Constants
 */
pub.SINCOS_LENGTH = 720;

/**
 * Epsilon
 * @property EPSILON {Number}
 * @cat Math
 * @subcat Constants
 */
pub.EPSILON = 10e-12;

/**
 * Kappa
 * @property KAPPA {Number}
 * @cat Math
 * @subcat Constants
 */
// Kappa, see: http://www.whizkidtech.redprince.net/bezier/circle/kappa/
pub.KAPPA = (4.0 * (Math.sqrt(2.0) - 1.0) / 3.0);
