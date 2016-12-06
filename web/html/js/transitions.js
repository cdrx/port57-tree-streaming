(function($) {

    if (jQuery(window).width() > 1024) {
    
    jQuery.fn.trans = function() {
        var a = arguments[0],
            b = arguments[1] || "";
        if (a) {
            jQuery.each(this, function(c, d) {
                jQuery(["-webkit-", "-moz-", "-o-", "-ms-", ""]).each(function(e, f) {
                    jQuery(d).css(f + "transition" + b, a)
                })
            })
        }
    };



    if ($(window).width() > 1030) {
        var win_w = jQuery(window).width();
        if (win_w > 767) {
            if (Modernizr.csstransitions) {
                function preloadImages(e, d) {
                    var c = [],
                        b = e.length,
                        a = 0;
                    if (jQuery(e).length) {
                        jQuery(e).each(function(h, g) {
                            var f = document.createElement("img");
                            f.onload = function() {
                                if (++a == b) {
                                    d()
                                }
                            };
                            f.src = jQuery(g).attr("src");
                            c.push(f)
                        })
                    } else {
                        d()
                    }
                }

                jQuery(function() {
                    preloadImages(jQuery(".container.animationStart img"), function() {
                        jQuery(".container.animationStart, .full_container_slider.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery(".section_featured_texts.animationStart img"), function() {
                        jQuery(".section_featured_texts.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 400,
                                    b = 600,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0,
                                    d = (a * jQuery(this).data("delay") + 200);
                                jQuery(this).children().each(function(f, g) {
                                    if (f == 0) {
                                        jQuery(g).trans(d + "ms", "-delay")
                                    } else {
                                        jQuery(g).trans(f * a + c + "ms", "-delay")
                                    }
                                });
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery(".info_block.animationStart img"), function() {
                        jQuery(".info_block.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 400,
                                    b = 1000,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0;
                                jQuery(this).find(".info_item").each(function(d, f) {
                                    jQuery(f).trans(d * a + c + "ms", "-delay")
                                });
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery(".client_info_holder.animationStart img"), function() {
                        jQuery(".client_info_holder.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 200,
                                    b = 400,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0;
                                jQuery(this).children().each(function(d, f) {
                                    jQuery(f).trans(d * a + "ms", "-delay")
                                });
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery("#portfolio_items.animationStart img"), function() {
                        jQuery("#portfolio_items.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 200,
                                    b = 400,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0;
                                jQuery(this).find(".pic_info").each(function(d, f) {
                                    jQuery(f).trans(d * a + c + "ms", "-delay")
                                });
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery(".portfolio_page .columns .pic img"), function() {
                        jQuery(".portfolio_page .columns .pic.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 400,
                                    b = 1000,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0;
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    });
                    preloadImages(jQuery(".team_block_content.animationStart img"), function() {
                        jQuery(".team_block_content.animationStart").appear({
                            once: true,
                            forEachVisible: function(a, b) {
                                jQuery(b).data("delay", a)
                            },
                            appear: function() {
                                var a = 200,
                                    b = 400,
                                    c = b * parseInt(jQuery(this).data("delay")) || 0;
                                jQuery(this).children(".pic").each(function(d, f) {
                                    jQuery(f).trans(d * a + c + "ms", "-delay")
                                });
                                jQuery(this).removeClass("animationStart")
                            }
                        })
                    })
                })
            }
        } else {}
        jQuery(document).ready(function() {
            setTimeout(function() {
                jQuery(".container.startNow").removeClass("animationStart")
            }, 600);
            jQuery(".rev_slider_wrapper").parents(".animationStart:first").addClass("immediateShow")
        })
    }
    
}

})(jQuery);