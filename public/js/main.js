;(function() {
    "use strict";
 
    var global = {}; 
    var leftMenu = {}; //namespace
    //...

    leftMenu.showMenu = function() {

        var actionClass = 'is-left-menu-show';
        var htmlEl = $('html');
        var menuButtonEl = $('.js-menu-button');
        var leftMenuEl = $('.js-left-menu');

        function showLeftMenu() {
            htmlEl.addClass(actionClass);
        }

        function hideLeftMenu() {
            htmlEl.removeClass(actionClass);
        }

        menuButtonEl.on('click', function(e) {

            if (!htmlEl.hasClass(actionClass)) {
                showLeftMenu();
            } else {
                hideLeftMenu();
            }

        });

    }


    global.init = function() {
        leftMenu.showMenu();
        //...
    };

    $(function() {
        global.init();
    });

})();
