// CONFIG //

requirejs.config({
    //By default load any module IDs from js/lib
    // baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: "vendor/jquery-1.9.1",
        jqueryui: "vendor/jquery-ui",
        jqueryui_punch: "vendor/jquery-ui-touch-punch",
        underscore: "vendor/underscore/underscore"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jqueryui: {
            deps: ['jquery']
        },
        jqueryui_punch: {
            deps: ['jquery']
        },
    }
});


// APP //

require([
    "require",
    "jquery",
    // "jqueryui",
    // "jqueryui_punch",
    "poll"
], function(
    req,
    $,
    // jqueryui,
    // jqueryui_punch,
    pollApp
) {
    pollApp.Poll.init($('div.main'));

});