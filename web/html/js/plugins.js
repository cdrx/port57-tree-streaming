// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.



/**
 * jquery.snow - jQuery Snow Effect Plugin
 *
 * Available under MIT licence
 *
 * @version 1 (21. Jan 2012)
 * @author Ivan Lazarevic
 * @requires jQuery
 * @see http://workshop.rs
 *
 * @params minSize - min size of snowflake, 10 by default
 * @params maxSize - max size of snowflake, 20 by default
 * @params newOn - frequency in ms of appearing of new snowflake, 500 by default
 * @params flakeColor - color of snowflake, #FFFFFF by default
 * @example $.fn.snow({ maxSize: 200, newOn: 1000 });
 */

(function($) {
  $.fn.snow = function(options) {
    var $flake = $('<div id="flake" />').css({
      'position': 'absolute',
      'top': '-50px'
    }).html('&#10052;'),
        documentHeight = $(document).height(),
        documentWidth = $(document).width(),
        defaults = {
        minSize: 10,
        maxSize: 20,
        newOn: 500,
        flakeColor: "#FFFFFF"
        },
        options = $.extend({}, defaults, options);
    var interval = setInterval(function() {
      var startPositionLeft = Math.random() * documentWidth - 100,
          startOpacity = 0.5 + Math.random(),
          sizeFlake = options.minSize + Math.random() * options.maxSize,
          endPositionTop = documentHeight - 5000,
          endPositionLeft = startPositionLeft - 100 + Math.random() * 200,
          durationFall = documentHeight * 5 + Math.random() * 5000;
      $flake.clone().appendTo('body').css({
        left: startPositionLeft,
        opacity: startOpacity,
        'font-size': sizeFlake,
        color: options.flakeColor
      }).animate({
        top: endPositionTop,
        left: endPositionLeft,
        opacity: 0.2
      }, durationFall, 'linear', function() {
        $(this).remove()
      });
    }, options.newOn);
  };
})(jQuery);





// IN VIEW

/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function($) {
  function getViewportHeight() {
    var height = window.innerHeight; // Safari, Opera
    var mode = document.compatMode;

    if ((mode || !$.support.boxModel)) { // IE, Gecko
      height = (mode == 'CSS1Compat') ? document.documentElement.clientHeight : // Standards
      document.body.clientHeight; // Quirks
    }

    return height;
  }

  $(window).scroll(function() {
    var vpH = getViewportHeight(),
        scrolltop = (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop),
        elems = [];

    // naughty, but this is how it knows which elements to check for
    $.each($.cache, function() {
      if (this.events && this.events.inview) {
        elems.push(this.handle.elem);
      }
    });

    if (elems.length) {
      $(elems).each(function() {
        var $el = $(this),
            top = $el.offset().top,
            height = $el.height(),
            inview = $el.data('inview') || false;

        if (scrolltop > (top + height) || scrolltop + vpH < top) {
          if (inview) {
            $el.data('inview', false);
            $el.trigger('inview', [false]);
          }
        } else if (scrolltop < (top + height)) {
          if (!inview) {
            $el.data('inview', true);
            $el.trigger('inview', [true]);
          }
        }
      });
    }
  });

  // kick the event to pick up any elements already in view.
  // note however, this only works if the plugin is included after the elements are bound to 'inview'
  $(function() {
    $(window).scroll();
  });
})(jQuery);


