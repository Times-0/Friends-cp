/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */
(function(b){var d={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click",buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},a=!1;b(window).bind("load.jcarousel",function(){a=!0});b.jcarousel=function(r,p){this.options=b.extend({},d,p||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!p||p.rtl===void 0){this.options.rtl=(b(r).attr("dir")||b("html").attr("dir")||"").toLowerCase()=="rtl"}this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical?this.options.rtl?"right":"left":"top";for(var q="",o=r.className.split(" "),m=0;m<o.length;m++){if(o[m].indexOf("jcarousel-skin")!=-1){b(r).removeClass(o[m]);q=o[m];break}}r.nodeName.toUpperCase()=="UL"||r.nodeName.toUpperCase()=="OL"?(this.list=b(r),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=b(r),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0){this.clip=this.list.wrap("<div></div>").parent()}if(this.container.size()===0){this.container=this.clip.wrap("<div></div>").parent()}q!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+q+'"></div>');this.buttonPrev=b(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null){this.buttonPrev=b(this.options.buttonPrevHTML).appendTo(this.container)}this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext=b(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null){this.buttonNext=b(this.options.buttonNextHTML).appendTo(this.container)}this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"});!this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var g=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,q=this.list.children("li"),n=this;if(q.size()>0){var l=0,k=this.options.offset;q.each(function(){n.format(this,k++);l+=n.dimension(this,g)});this.list.css(this.wh,l+100+"px");if(!p||p.size===void 0){this.options.size=q.size()}}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display","block");this.funcNext=function(){n.next()};this.funcPrev=function(){n.prev()};this.funcResize=function(){n.resizeTimer&&clearTimeout(n.resizeTimer);n.resizeTimer=setTimeout(function(){n.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!a&&b.browser.safari?(this.buttons(!1,!1),b(window).bind("load.jcarousel",function(){n.setup()})):this.setup()};var c=b.jcarousel;c.fn=c.prototype={jcarousel:"0.2.8"};c.fn.extend=c.extend=b.extend;c.fn.extend({setup:function(){this.prevLast=this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var e=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(e,!1);b(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt,"0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,c.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var f=this,h=Math.ceil(this.clipping()/this.options.visible),e=0,g=0;this.list.children("li").each(function(i){e+=f.dimension(this,h);i+1<f.first&&(g=e)});this.list.css(this.wh,e+"px");this.list.css(this.lt,-g+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(e){if(e!==void 0){this.options.size=e,this.locked||this.buttons()}return this.options.size},has:function(f,h){if(h===void 0||!h){h=f}if(this.options.size!==null&&h>this.options.size){h=this.options.size}for(var e=f;e<=h;e++){var g=this.get(e);if(!g.length||g.hasClass("jcarousel-item-placeholder")){return !1}}return !0},get:function(e){return b(">.jcarousel-item-"+e,this.list)},add:function(g,m){var f=this.get(g),l=0,k=b(m);if(f.length===0){for(var h,i=c.intval(g),f=this.create(g);;){if(h=this.get(--i),i<=0||h.length){i<=0?this.list.prepend(f):h.after(f);break}}}else{l=this.dimension(f)}k.get(0).nodeName.toUpperCase()=="LI"?(f.replaceWith(k),f=k):f.empty().append(m);this.format(f.removeClass(this.className("jcarousel-item-placeholder")),g);k=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null;l=this.dimension(f,k)-l;g>0&&g<this.first&&this.list.css(this.lt,c.intval(this.list.css(this.lt))-l+"px");this.list.css(this.wh,c.intval(this.list.css(this.wh))+l+"px");return f},remove:function(f){var g=this.get(f);if(g.length&&!(f>=this.first&&f<=this.last)){var e=this.dimension(g);f<this.first&&this.list.css(this.lt,c.intval(this.list.css(this.lt))+e+"px");g.remove();this.list.css(this.wh,c.intval(this.list.css(this.wh))-e+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1):this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(e){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var f=c.intval(this.list.css(this.lt)),f=!e?f-this.tail:f+this.tail;this.inTail=!e;this.prevFirst=this.first;this.prevLast=this.last;this.animate(f)}},scroll:function(e,f){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(e),f))},pos:function(B,z){var A=c.intval(this.list.css(this.lt));if(this.locked||this.animating){return A}this.options.wrap!="circular"&&(B=B<1?1:this.options.size&&B>this.options.size?this.options.size:B);for(var y=this.first>B,w=this.options.wrap!="circular"&&this.first<=1?1:this.first,t=y?this.get(w):this.get(this.last),x=y?w:w-1,v=null,u=0,s=!1,r=0;y?--x>=B:++x<B;){v=this.get(x);s=!v.length;if(v.length===0&&(v=this.create(x).addClass(this.className("jcarousel-item-placeholder")),t[y?"before":"after"](v),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(x<=0||x>this.options.size))){t=this.get(this.index(x)),t.length&&(v=this.add(x,t.clone(!0)))}t=v;r=this.dimension(v);s&&(u+=r);if(this.first!==null&&(this.options.wrap=="circular"||x>=1&&(this.options.size===null||x<=this.options.size))){A=y?A+r:A-r}}for(var w=this.clipping(),q=[],f=0,p=0,t=this.get(B-1),x=B;++f;){v=this.get(x);s=!v.length;if(v.length===0){v=this.create(x).addClass(this.className("jcarousel-item-placeholder"));if(t.length===0){this.list.prepend(v)}else{t[y?"before":"after"](v)}if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(x<=0||x>this.options.size)){t=this.get(this.index(x)),t.length&&(v=this.add(x,t.clone(!0)))}}t=v;r=this.dimension(v);if(r===0){throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")}this.options.wrap!="circular"&&this.options.size!==null&&x>this.options.size?q.push(v):s&&(u+=r);p+=r;if(p>=w){break}x++}for(v=0;v<q.length;v++){q[v].remove()}u>0&&(this.list.css(this.wh,this.dimension(this.list)+u+"px"),y&&(A-=u,this.list.css(this.lt,c.intval(this.list.css(this.lt))-u+"px")));u=B+f-1;if(this.options.wrap!="circular"&&this.options.size&&u>this.options.size){u=this.options.size}if(x>u){f=0;x=u;for(p=0;++f;){v=this.get(x--);if(!v.length){break}p+=this.dimension(v);if(p>=w){break}}}x=u-f+1;this.options.wrap!="circular"&&x<1&&(x=1);if(this.inTail&&y){A+=this.tail,this.inTail=!1}this.tail=null;if(this.options.wrap!="circular"&&u==this.options.size&&u-f+1>=1&&(y=c.intval(this.get(u).css(!this.options.vertical?"marginRight":"marginBottom")),p-y>w)){this.tail=p-w-y}if(z&&B===this.options.size&&this.tail){A-=this.tail,this.inTail=!0}for(;B-->x;){A+=this.dimension(this.get(B))}this.prevFirst=this.first;this.prevLast=this.last;this.first=x;this.last=u;return A},animate:function(g,j){if(!this.locked&&!this.animating){this.animating=!0;var e=this,i=function(){e.animating=!1;g===0&&e.list.css(e.lt,0);!e.autoStopped&&(e.options.wrap=="circular"||e.options.wrap=="both"||e.options.wrap=="last"||e.options.size===null||e.last<e.options.size||e.last==e.options.size&&e.tail!==null&&!e.inTail)&&e.startAuto();e.buttons();e.notify("onAfterAnimation");if(e.options.wrap=="circular"&&e.options.size!==null){for(var f=e.prevFirst;f<=e.prevLast;f++){f!==null&&!(f>=e.first&&f<=e.last)&&(f<1||f>e.options.size)&&e.remove(f)}}};this.notify("onBeforeAnimation");if(!this.options.animation||j===!1){this.list.css(this.lt,g+"px"),i()}else{var h=!this.options.vertical?this.options.rtl?{right:g}:{left:g}:{top:g},i={duration:this.options.animation,easing:this.options.easing,complete:i};if(b.isFunction(this.options.animationStepCallback)){i.step=this.options.animationStepCallback}this.list.animate(h,i)}}},startAuto:function(e){if(e!==void 0){this.options.auto=e}if(this.options.auto===0){return this.stopAuto()}if(this.timer===null){this.autoStopped=!1;var f=this;this.timer=window.setTimeout(function(){f.next()},this.options.auto*1000)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null){window.clearTimeout(this.timer),this.timer=null}},buttons:function(f,g){if(f==null&&(f=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&&this.last>=this.options.size)){f=this.tail!==null&&!this.inTail}if(g==null&&(g=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1)){g=this.tail!==null&&this.inTail}var e=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),f&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext),this.buttonNext[f?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",f?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=f&&this.buttonNext.each(function(){e.options.buttonNextCallback(e,this,f)}).data("jcarouselstate",f)):this.options.buttonNextCallback!==null&&this.buttonNextState!=f&&this.options.buttonNextCallback(e,null,f);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),g&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[g?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",g?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=g&&this.buttonPrev.each(function(){e.options.buttonPrevCallback(e,this,g)}).data("jcarouselstate",g)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=g&&this.options.buttonPrevCallback(e,null,g);this.buttonNextState=f;this.buttonPrevState=g},notify:function(e){var f=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",e,f);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",e,f,this.first),this.callback("itemFirstOutCallback",e,f,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",e,f,this.last),this.callback("itemLastOutCallback",e,f,this.prevLast));this.callback("itemVisibleInCallback",e,f,this.first,this.last,this.prevFirst,this.prevLast);this.callback("itemVisibleOutCallback",e,f,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(t,r,s,q,o,l,p){if(!(this.options[t]==null||typeof this.options[t]!="object"&&r!="onAfterAnimation")){var n=typeof this.options[t]=="object"?this.options[t][r]:this.options[t];if(b.isFunction(n)){var m=this;if(q===void 0){n(m,s,r)}else{if(o===void 0){this.get(q).each(function(){n(m,this,q,s,r)})}else{for(var t=function(e){m.get(e).each(function(){n(m,this,e,s,r)})},g=q;g<=o;g++){g!==null&&!(g>=l&&g<=p)&&t(g)}}}}}},create:function(e){return this.format("<li></li>",e)},format:function(f,h){for(var f=b(f),e=f.get(0).className.split(" "),g=0;g<e.length;g++){e[g].indexOf("jcarousel-")!=-1&&f.removeClass(e[g])}f.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+h)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",h);return f},className:function(e){return e+" "+e+(!this.options.vertical?"-horizontal":"-vertical")},dimension:function(f,h){var e=b(f);if(h==null){return !this.options.vertical?e.outerWidth(!0)||c.intval(this.options.itemFallbackDimension):e.outerHeight(!0)||c.intval(this.options.itemFallbackDimension)}else{var g=!this.options.vertical?h-c.intval(e.css("marginLeft"))-c.intval(e.css("marginRight")):h-c.intval(e.css("marginTop"))-c.intval(e.css("marginBottom"));b(e).css(this.wh,g+"px");return this.dimension(e)}},clipping:function(){return !this.options.vertical?this.clip[0].offsetWidth-c.intval(this.clip.css("borderLeftWidth"))-c.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-c.intval(this.clip.css("borderTopWidth"))-c.intval(this.clip.css("borderBottomWidth"))},index:function(e,f){if(f==null){f=this.options.size}return Math.round(((e-1)/f-Math.floor((e-1)/f))*f)+1}});c.extend({defaults:function(e){return b.extend(d,e||{})},intval:function(e){e=parseInt(e,10);return isNaN(e)?0:e},windowLoaded:function(){a=!0}});b.fn.jcarousel=function(f){if(typeof f=="string"){var g=b(this).data("jcarousel"),e=Array.prototype.slice.call(arguments,1);return g[f].apply(g,e)}else{return this.each(function(){var h=b(this).data("jcarousel");h?(f&&b.extend(h.options,f),h.reload()):b(this).data("jcarousel",new c(this,f))})}}})(jQuery);(function(a){Drupal.behaviors.jcarousel={};Drupal.behaviors.jcarousel.attach=function(b,c){c=c||Drupal.settings;if(!c.jcarousel||!c.jcarousel.carousels){return}a.each(c.jcarousel.carousels,function(f,d){var e=a(d.selector+":not(.jcarousel-processed)",b);if(!e.length){return}a.each(d,function(h){if(h.match(/Callback$/)&&typeof d[h]=="string"){var i=window;var g=d[h].split(".");a.each(g,function(j){i=i[g[j]]});d[h]=i}});if(d.ajax&&!d.itemLoadCallback){d.itemLoadCallback=Drupal.jcarousel.ajaxLoadCallback}if(d.auto&&d.autoPause&&!d.initCallback){d.initCallback=function(h,g){Drupal.jcarousel.autoPauseCallback(h,g)}}if(!d.setupCallback){d.setupCallback=function(g){Drupal.jcarousel.setupCarousel(g);if(d.navigation){Drupal.jcarousel.addNavigation(g,d.navigation)}};if(d.navigation&&!d.itemVisibleInCallback){d.itemLastInCallback={onAfterAnimation:Drupal.jcarousel.updateNavigationActive}}}if(!d.hasOwnProperty("buttonNextHTML")&&!d.hasOwnProperty("buttonPrevHTML")){d.buttonNextHTML=Drupal.theme("jCarouselButton","next");d.buttonPrevHTML=Drupal.theme("jCarouselButton","previous")}e.addClass("jcarousel-processed").jcarousel(d)})};Drupal.jcarousel={};Drupal.jcarousel.ajaxLoadCallback=function(b,g){if(g=="init"||b.has(b.first,b.last)){return}var e=b.list;var i=e.parents(".view:first");var c=Drupal.settings.jcarousel.ajaxPath;var h=i.get(0);var f;a.each(Drupal.settings.jcarousel.carousels,function(j,k){if(e.is("."+j)){f=k.view_options}});var d={js:1,first:b.first-1,last:b.last};a.extend(d,f);a.ajax({url:c,type:"GET",data:d,success:function(j){Drupal.jcarousel.ajaxResponseCallback(b,h,j)},error:function(j){Drupal.jcarousel.ajaxErrorCallback(j,c)},dataType:"json"})};Drupal.jcarousel.autoPauseCallback=function(e,d){function c(){e.stopAuto()}function b(){e.startAuto()}e.clip.hover(c,b);e.buttonNext.hover(c,b);e.buttonPrev.hover(c,b)};Drupal.jcarousel.setupCarousel=function(c){c.pageSize=c.last-(c.first-1);var b=c.options.size?c.options.size:a(c.list).children("li").length;c.pageCount=Math.ceil(b/c.pageSize);c.pageNumber=1;if(c.pageCount==1){c.buttonNext.addClass("jcarousel-next-disabled").attr("disabled",true);c.buttonPrev.addClass("jcarousel-prev-disabled").attr("disabled",true)}c.buttonNext.css("display","");c.buttonPrev.css("display","")};Drupal.jcarousel.addNavigation=function(g,c){if(g.pageCount<=1){return}a(g.list).parents(".jcarousel-container:first").addClass("jcarousel-navigation-"+c);var b=a('<ul class="jcarousel-navigation"></ul>');for(var d=1;d<=g.pageCount;d++){var f=a(Drupal.theme("jCarouselPageLink",d));var e=a("<li></li>").attr("jcarousel-page",d).append(f);b.append(e);if(d===1){e.addClass("active")}f.bind("click",function(){var i=a(this).parent().attr("jcarousel-page");var h=(i-g.pageNumber)*g.pageSize;if(h){g.scroll(g.first+h)}return false})}a(g.list).parents(".jcarousel-clip:first")[c](b)};Drupal.jcarousel.updateNavigationActive=function(h,f,b,g){var d=a(h.list).parents(".jcarousel-container:first").find(".jcarousel-navigation li");if(d.length==0){return}var c=Math.ceil(b/h.pageSize);if(c<=0||c>h.pageCount){c=c%h.pageCount;c=c==0?h.pageCount:c;c=c<0?c+h.pageCount:c}h.pageNumber=c;var e=d.get(h.pageNumber-1);d.not(e).removeClass("active");a(e).addClass("active")};Drupal.jcarousel.ajaxResponseCallback=function(b,e,c){if(c.debug){alert(c.debug)}var d=a(e);var b=d.find("ul.jcarousel").data("jcarousel");a("ul.jcarousel > li",c.display).each(function(f){var g=this.className.replace(/.*?jcarousel-item-(\d+).*/,"$1");b.add(g,this.innerHTML)});Drupal.attachBehaviors(b.list.get(0));if(c.messages){d.find(".views-messages").remove().end().prepend(c.messages)}};Drupal.jcarousel.ajaxErrorCallback=function(d,c){var b="";if((d.status==500&&d.responseText)||d.status==200){b=d.responseText;b=b.replace("/&(lt|gt);/g",function(e,f){return(f=="lt")?"<":">"});b=b.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");b=b.replace(/[\n]+\s+/g,"\n")}else{if(d.status==500){b=d.status+": "+Drupal.t("Internal server error. Please see server or PHP logs for error information.")}else{b=d.status+": "+d.statusText}}alert(Drupal.t("An error occurred at @path.\n\nError Description: @error",{"@path":c,"@error":b}))};Drupal.theme.prototype.jCarouselButton=function(b){return'<a href="javascript:void(0)"></a>'};Drupal.theme.prototype.jCarouselPageLink=function(b){return'<a href="javascript:void(0)"><span>'+(b)+"</span></a>"}})(jQuery);(function(a){Drupal.behaviors.colorbox_close_prehide={attach:function(b,c){a(".cboxElement").colorbox({onOpen:function(){a("#cboxClose, #cboxNext, #cboxPrevious").hide()}})}};Drupal.behaviors.colorbox_close_hide={attach:function(b,c){a(".cboxElement").colorbox({onLoad:function(){a("#cboxClose, #cboxNext, #cboxPrevious").hide(3)}})}};Drupal.behaviors.coorbox_close_show={attach:function(b,c){a(".cboxElement").colorbox({onComplete:function(){setTimeout(function(){a("#cboxClose, #cboxNext, #cboxPrevious").show()},0)}})}}})(jQuery);(function(a){Drupal.behaviors.ajaxfix=(function(){return{attach:function(b,c){a.ajaxSetup({beforeSend:function(e,d){d.error=function(f,h,g){}}})}}})()})(jQuery);