/**
 * Add items to project from a folder with dialog
 * @method itemsFromFolderGUI
 * @param {string} name new folder name in items
 * @return {Items Collection} last added items for convenience
 */
pub.itemsFromFolderGUI = function(name) {
    pub.beginUndo("Items from folder");
    var targetFolder = Folder.selectDialog();
    var files = targetFolder.getFiles();
    for (i=0; i<files.length; i++) {
        try {
            var importOptions = new ImportOptions(files[i]);
            proj.importFile(importOptions);
        }catch(error){alert(error.toString());}
    }
    var thisSelection = proj.selection;
    var folderPath = proj.items.addFolder(name);
    for (var i=0; i<thisSelection.length; i++) {
        thisSelection[i].parentFolder = folderPath;
    }
    pub.endUndo();
    return thisSelection;
};

/**
 * Add items to project from a folder with dialog
 * @method itemsFromFolderGUI
 * @param {string} path folder full path
 * @param {string} name new folder name in items
 * @return {Items Collection} last added items for convenience
 */
pub.itemsFromFolder = function(path, name) {
    pub.beginUndo("Items from folder");
    var folder = new Folder(path);
    var files = folder.getFiles();
    for (i=0; i<files.length; i++) {
        try {
            var importOptions = new ImportOptions(files[i]);
            proj.importFile(importOptions);
        }catch(error){alert(error.toString());}
    }
    var thisSelection = proj.selection;
    var folderPath = proj.items.addFolder(name);
    for (var i=0; i<thisSelection.length; i++) {
        thisSelection[i].parentFolder = folderPath;
    }
    pub.endUndo();
    return thisSelection;
};
