var pkg = require("./package");

pkg.getPkgList(function(pkgList) {
    var updateList = [];

    var process = function(index) {
        if (index === pkgList.length) {
            console.log("Summary: ");
            console.log("[" + updateList + "] need to be updated.");
            return;
        }
        var pkgInfo = pkgList[index];
        console.log("Checking: " + pkgInfo.name + "\n    Current Version: " +
            pkgInfo.version);
        pkg.getLatestVersion(pkgInfo.name, function(version) {
            console.log("    Latest Version: " + version + "\n");
            if (version !== pkgInfo.version) {
                updateList.push(pkgInfo.name);
            }
            process(++index);
        });
    };

    process(0);
});
