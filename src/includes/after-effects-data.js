//Data

/**
 * Add items to project from a folder using dialog box
 * @cat AfterEffects
 * @subcat Data
 * @method itemsFromFolderGUI
 * @param {String} name New folder name in items
 * @return {ItemCollection} Last added items
 */
pub.itemsFromFolderGUI = function (name) {
    pub.beginUndo("Items from folder");
    var targetFolder = Folder.selectDialog();
    var files = targetFolder.getFiles();
    for (i = 0; i < files.length; i++) {
        try {
            var importOptions = new ImportOptions(files[i]);
            proj.importFile(importOptions);
        } catch (error) { alert(error.toString()); }
    }
    var thisSelection = proj.selection;
    var folderPath = proj.items.addFolder(name);
    for (var i = 0; i < thisSelection.length; i++) {
        thisSelection[i].parentFolder = folderPath;
    }
    pub.endUndo();
    return thisSelection;
};

/**
 * Add items to project from a full path
 * @cat AfterEffects
 * @subcat Data
 * @method itemsFromFolder
 * @param {String} path Folder full path
 * @param {String} name New folder name in items
 * @return {ItemCollection} Last added items
 */
pub.itemsFromFolder = function (path, name) {
    var folder = new Folder(path);
    var files = folder.getFiles();
    for (i = 0; i < files.length; i++) {
        try {
            var importOptions = new ImportOptions(files[i]);
            proj.importFile(importOptions);
        } catch (error) { alert(error.toString()); }
    }
    var thisSelection = proj.selection;
    var folderPath = proj.items.addFolder(name);
    for (var i = 0; i < thisSelection.length; i++) {
        thisSelection[i].parentFolder = folderPath;
    }

    return thisSelection;
};


/**
 * Add's item to composition
 * @cat AfterEffects
 * @subcat Data
 * @method loadItem
 * @param {String} path Item's path from data folder
 * @param {Number} inPoint Layer's in point 
 * @param {Number} outPoint Layer's out point
 * @return {Layer} Item as created layer
 */
pub.loadItem = function (path, inPoint, outPoint) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3];

    var layer;
    switch (arguments.length) {
        case 1:
            layer = importItem(thisComp, a, 0, pub.getDuration());
            return layer;
        case 2:
            layer = importItem(thisComp, a, b, pub.getDuration());
            return layer;
        case 3:
            layer = importItem(thisComp, a, b, c);
            return layer;
    }
};

function importItem(comp, path, inPoint, outPoint) {
    var data = initDataFile(path, true),
        importOptions = new ImportOptions(data),
        item = proj.importFile(importOptions),
        layer = comp.layers.add(item);
    layer.inPoint = inPoint;
    layer.outPoint = outPoint;

    return layer;
};

/**
 * Load image sequence to composition
 * @cat AfterEffects
 * @subcat Data
 * @method loadSequence
 * @param {String} path Sequence path to data folder 
 * @param {Number} startTime Layer's start time
 * @param {Number} outPoint Layer's out point
 * @return {Layer} Item as created layer
 */
pub.loadSequence = function(path, startTime, outPoint) {
    var a = arguments[0],
        b = arguments[1],
        c = arguments[2],
        d = arguments[3];

    var layer;
    switch (arguments.length) {
        case 1:
            layer = importSequence(thisComp, a, 0, pub.getDuration());
            return layer;
        case 2:
            layer = importSequence(thisComp, a, b, pub.getDuration());
            return layer;
        case 3:
            layer = importSequence(thisComp, a, b, c);
            return layer;
    }
};

function importSequence(comp, path, inPoint, outPoint) {
    var data = initDataFile(path, true),
        importOptions = new ImportOptions(data);
    
    if (importOptions.canImportAs(ImportAsType.FOOTAGE))
        importOptions.importAs = ImportAsType.FOOTAGE;
    else
        error("Item is not a sequence...")

    importOptions.sequence = true;
    importOptions.forceAlphabetical = true;

    var item = proj.importFile(importOptions),
        layer = comp.layers.add(item);

    layer.startTime = inPoint;
    layer.outPoint = outPoint;
    
    return layer;
};