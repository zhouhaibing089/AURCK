var cheerio = require("cheerio");
var exec = require("child_process").exec;
var request = require("request");

var URL_BASE = "https://aur.archlinux.org/packages/?O=0&SeB=N&K=";

exports.getLatestVersion = function(name, callback) {
    request.get(URL_BASE + name, function(err, response, body) {
        var $ = cheerio.load(body);
        callback($(".odd").children()[2].children[0].data);
    });
};

exports.getPkgList = function(callback) {
    // Run the command
    exec("pacman -Qm", function(error, output, stderr) {
        var pkgList = output.split("\n");
        var ret = [];
        pkgList.forEach(function(pkgInfo) {
            if (!pkgInfo) {
                return;
            }
            var fields = pkgInfo.split(" ");
            ret.push({name: fields[0], version: fields[1]});
        });
        if (callback) {
            callback(ret);
        }
    });
};
