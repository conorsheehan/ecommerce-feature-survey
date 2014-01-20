require(["vendor/underscore/underscore-min", "vendor/jquery-1.9.1", "vendor/jquery-ui", "vendor/jquery-ui-touch-punch", "poll"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    
    // var modules = [
    //     "RequireJS",
    //     "Underscore",
    //     "Zepto",
    // ];

    // var $moduleList = $("#module-list");
    // $moduleList.empty();
    // _.each(modules, function(module) {
    //     $moduleList.append("<li>" + module + "</li>");
    // });

    $('ul.features');

    window.pollApp.Poll.init($('div.main'));

});