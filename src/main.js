
/*
  ..-  --.- ..- -.... -..-- .-..-. -.-..---.-.-....--.-- -....-.... -..-- .-.-..-.-.... .- .--

  B A S I L . J S
  Bringing the spirit of the Processing visualization language to Adobe Indesign.

  License        - MIT

  Core
                 - Ted Davis http://teddavis.org
                 - Benedikt Groß http://benedikt-gross.de
                 - Ludwig Zeller http://ludwigzeller.de
  Members
                 - Philipp Adrian http://www.philippadrian.com/
                 - be:screen GmbH http://bescreen.de
                 - Stefan Landsbek http://47nord.de
                 - Ken Frederick http://kennethfrederick.de/

  Web Site       - http://basiljs.ch
  Github Repo.   - https://github.com/basiljs/basil.js
  Processing     - http://processing.org
  Processing.js  - http://processingjs.org

  basil.js was conceived and is generously supported by
  The Visual Communication Institute / The Basel School of Design
  Department of the Academy of Art and Design Basel (HGK FHNW)

  http://thebaselschoolofdesign.ch

  Please note: Big general parts e.g. random() of the basil.js source code are copied
  from processing.js by the Processing.js team. We would have had a hard time
  to figure all of that out on our own!

  Supported Adobe Indesign versions: CS 5, CS 5.5 and CS 6

  .--.--.- .-.-......-....--.-- -.... -..---.-.... .-- . .---.- -... -.-..---.-. ..--.-- -.. -
*/

/*
    B A F F E C T S . J S
    Baffects.js (Basil for After Effects) is built on top of the Basil.js library to bring the spirit of the Processing visualization language to Adobe After Effects.
    
    License        - MIT

    Core
                  - Roberto Cabezas H http://instagram.com/rheadsh bbetoo@gmail.com
    

    random() and noise() functions were adapted from p5.js code.

    Currently debugging on Mac OSX 10.12.6 and AfterEffects CC 2018
*/

#target "AfterEffects";

(function(glob, app, undef) {

  /**
   * @class b
   * @static
   */
  var pub = {};

  /**
   * The basil version
   * @property VERSION {String}
   * @cat Environment
   */
  pub.VERSION = "1.0.10";

  /**
   * The baffects version
   * @property VERSION {String}
   * @cat Environment
   */
  pub.VERSION_BAFFECTS = "0.1";

  #include "includes/public-vars.js";
  #include "includes/private-vars.js";
  #include "includes/global-functions.js";

  #include "includes/core.js";

  #include "includes/structure.js";
  #include "includes/data.js";
  #include "includes/math.js";
  #include "includes/math_random_noise.js";
  #include "includes/transformation.js";
  #include "includes/environment.js"

  //AfterEffects implementations
  #include "includes/after-effects-utilities.js";
  #include "includes/after-effects-environment.js";
  #include "includes/after-effects-constants.js";
  #include "includes/after-effects-data.js";
  #include "includes/after-effects-color.js";
  #include "includes/after-effects-text.js";
  #include "includes/after-effects-keyframes.js";
  #include "includes/after-effects-masks.js";
  #include "includes/after-effects-shapes.js";
  #include "includes/after-effects-lightsandcam.js"

  init();

})(this, app);
