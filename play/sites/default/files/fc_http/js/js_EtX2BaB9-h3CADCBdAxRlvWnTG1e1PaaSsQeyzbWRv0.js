var FORMALIZE=(function(f,e,b,g){var d="placeholder" in b.createElement("input");var c="autofocus" in b.createElement("input");var a=!!(f.browser.msie&&parseInt(f.browser.version,10)===6);var h=!!(f.browser.msie&&parseInt(f.browser.version,10)===7);return{go:function(){for(var j in FORMALIZE.init){FORMALIZE.init[j]()}},init:{ie6_skin_inputs:function(){if(!a||!f("input, select, textarea").length){return}var i=/button|submit|reset/;var j=/date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;f("input").each(function(){var k=f(this);if(this.getAttribute("type").match(i)){k.addClass("ie6-button");if(this.disabled){k.addClass("ie6-button-disabled")}}else{if(this.getAttribute("type").match(j)){k.addClass("ie6-input");if(this.disabled){k.addClass("ie6-input-disabled")}}}});f("textarea, select").each(function(){if(this.disabled){f(this).addClass("ie6-input-disabled")}})},autofocus:function(){if(c||!f(":input[autofocus]").length){return}f(":input[autofocus]:visible:first").focus()},placeholder:function(){if(d||!f(":input[placeholder]").length){return}FORMALIZE.misc.add_placeholder();f(":input[placeholder]").each(function(){var i=f(this);var j=i.attr("placeholder");i.focus(function(){if(i.val()===j){i.val("").removeClass("placeholder-text")}}).blur(function(){FORMALIZE.misc.add_placeholder()});i.closest("form").submit(function(){if(i.val()===j){i.val("").removeClass("placeholder-text")}}).bind("reset",function(){setTimeout(FORMALIZE.misc.add_placeholder,50)})})}},misc:{add_placeholder:function(){if(d||!f(":input[placeholder]").length){return}f(":input[placeholder]").each(function(){var i=f(this);var j=i.attr("placeholder");if(!i.val()||i.val()===j){i.val(j).addClass("placeholder-text")}})}}}})(jQuery,this,this.document);jQuery(document).ready(function(){FORMALIZE.go()});Drupal.omega=Drupal.omega||{};(function(c){var d;var b;var a=function(e){e=parseInt(e);b=d;d=Drupal.settings.omega.layouts.order.hasOwnProperty(e)?Drupal.settings.omega.layouts.order[e]:"mobile";if(b!=d){c("body").removeClass("responsive-layout-"+b).addClass("responsive-layout-"+d);c.event.trigger("responsivelayout",{from:b,to:d})}};Drupal.omega.getCurrentLayout=function(){return d};Drupal.omega.getPreviousLayout=function(){return b};Drupal.omega.crappyBrowser=function(){return c.browser.msie&&parseInt(c.browser.version,10)<9};Drupal.omega.checkLayout=function(f){if(Drupal.settings.omega.layouts.queries.hasOwnProperty(f)&&Drupal.settings.omega.layouts.queries[f]){var e=Drupal.omega.checkQuery(Drupal.settings.omega.layouts.queries[f]);if(!e&&f==Drupal.settings.omega.layouts.primary){var g=c('<div id="omega-check-query"></div>').prependTo("body");g.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');g.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-check-query { z-index: 100; }</style><![endif]-->');e=parseInt(g.css("z-index"))==100;g.remove()}return e}return false};Drupal.omega.checkQuery=function(f){var g=c('<div id="omega-check-query"></div>').prependTo("body");g.append('<style media="all">#omega-check-query { position: relative; z-index: -1; }</style>');g.append('<style media="'+f+'">#omega-check-query { z-index: 100; }</style>');var e=parseInt(g.css("z-index"))==100;g.remove();return e};Drupal.behaviors.omegaMediaQueries={attach:function(e){c("body",e).once("omega-mediaqueries",function(){var g=c.inArray(Drupal.settings.omega.layouts.primary,Drupal.settings.omega.layouts.order);var h=c('<div id="omega-media-query-dummy"></div>').prependTo("body");h.append('<style media="all">#omega-media-query-dummy { position: relative; z-index: -1; }</style>');h.append('<!--[if (lt IE 9)&(!IEMobile)]><style media="all">#omega-media-query-dummy { z-index: '+g+"; }</style><![endif]-->");for(var f in Drupal.settings.omega.layouts.order){h.append('<style media="'+Drupal.settings.omega.layouts.queries[Drupal.settings.omega.layouts.order[f]]+'">#omega-media-query-dummy { z-index: '+f+"; }</style>")}c(window).bind("resize.omegamediaqueries",function(){a(h.css("z-index"))}).load(function(){c(this).trigger("resize.omegamediaqueries")})})}}})(jQuery);if(typeof CP==="undefined"){CP={}}(function(a){Drupal.behaviors.cp_newsfeed={attach:function(b,c){a("#newsfeed-main-panel .panel-col-last .inside",b).once("newsfeedresultsloaded",function(){var d="          <div class='newsfeed-totals'>            <span class='newsfeed-count'>"+c.newsfeed.count_total+"</span>            <span class='newsfeed-text'>"+c.newsfeed.count_text+"</span>          </div>          <div class='separator'></div>        ";a("#newsfeed-main-panel .panel-col-last .inside").prepend(d)});if(a(".newsfeed-wrapper .view-content a").length%2){a(".newsfeed-wrapper .view-content").append('<a href="#" class="views-row newsfeed-item" style="visibility:hidden;"></a>')}if(c.newsfeed.img_resp=="true"){a(".newsfeed-img img",b).each(function(){a(this).removeAttr("width").removeAttr("height").width("100%").height("auto").fadeIn()})}a(".newsfeed-filters",b).once("newsfeedfilterloaded",function(){if(c.newsfeed.theme=="frostbite"||c.newsfeed.theme=="cp_stark"){a(".newsfeed-filters").before('<div class="newsfeed-filters-dropdown"><div class="dd-active"></div><div class="dd-options"></div></div>');var g=a(".newsfeed-filters a:not(.active)").clone();var e=a(".newsfeed-filters a.active").clone();var d=a(".newsfeed-filters-dropdown .dd-options");var f=a(".newsfeed-filters-dropdown .dd-active");d.append(g);f.append(e);f.find("a").append('<span class="dd-indicator"></span>');f.find("a").click(function(h){h.preventDefault();d.slideToggle()})}})}};CP.newsfeed=function(b){this.options={};a.extend(true,this.options,b);this.logCustomBI=Drupal.settings.newsfeed.log_custom_bi;this.inAppView=Drupal.settings.newsfeed.mobile_app;this.load()};CP.newsfeed.prototype.load=function(){if(this.inAppView){setCookie("nochrome","1")}}})(window.jQuery);window.jQuery(document).ready(function(a){window.newsfeed=new CP.newsfeed()});