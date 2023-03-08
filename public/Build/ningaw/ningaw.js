
!(function () {
    var Js = "./Build/LSGlobe/LSGlobe.js";
    var Cs= './Build/LSGlobe/Widgets/widgets.css'
    var j = Js.split(",");
    var c = Cs.split(",");
    for (let i = 0; i < j.length; i++) {
        addScript(j[i]);
    }
    for (let i = 0; i < c.length; i++) {
        addCSS(c[i]);
    }
    function addScript(url) {
        var script = '<script type="text/javascript" src="' + url + '"></script>';
        document.writeln(script);
    }
    function addCSS(url) {
        var css = '<link rel="stylesheet" type="text/css" href="' + url + '">';
        document.writeln(css);
    }
})();
