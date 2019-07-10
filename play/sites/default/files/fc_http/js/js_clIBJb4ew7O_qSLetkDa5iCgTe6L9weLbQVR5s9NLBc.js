Drupal.locale={strings:{"":{"Please wait...":"Espera un momento...","By @name":"Por @name",Submit:"Enviar",Cancel:"Cancelar","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"El archivo %filename no pudo ser enviado. Se aceptan archivos %extensions solamente. ",Close:"CERRAR",Sunday:"Domingo",Monday:"Lunes",Tuesday:"Martes",Wednesday:"Mi\u00e9rcoles",Thursday:"Jueves",Friday:"Viernes",Saturday:"S\u00e1bado",reply:"responder",Download:"Descargar",OK:"ACEPTAR",Next:"Siguiente",January:"Enero",February:"Febrero",March:"Marzo",April:"Abril",May:"Mayo",June:"Junio",July:"Julio",August:"Agosto",September:"Septiembre",October:"Octubre",November:"Noviembre",December:"Diciembre",Pause:"Pausar",On:"Encendido",Off:"Apagado","Apple, the Apple logo, and iTunes are trademarks of Apple Inc. registered in the U.S. and other countries.":"Apple y iTunes son marcas de Apple Inc., registradas en Estados Unidos y otros pa\u00edses.","On Now!":"\u00a1AHORA!","Change Penguin":"Cambiar de ping\u00fcino","The Parent emails need to match.":"Los correos paternos deben coincidir.","The emails need to match.":"Los correos paternos deben coincidir.",Play:"Reproducir",Stop:"Detener","Download FREE Song":"Descargar canci\u00f3n GRATIS","Submit Your Pledge":"Env\u00eda tu promesa","Please download the Club Penguin app to login and play on this device.":"Por favor, descargue la aplicaci\u00f3n Club Penguin para conectarse y jugar desde este dispositivo.","By clicking below you are leaving Club Penguin and are about to go to appstore.com where a different Terms of Use and Privacy Policy will apply.":"Si hace clic en el bot\u00f3n de abajo saldr\u00e1 de Club Penguin y entrar\u00e1 a appstore.com, que se rige por sus propios T\u00e9rminos de uso y Pol\u00edtica de privacidad.",Spooky:"Escalofriante","Oops! Club Penguin needs a newer version of your web browser. Ask a parent to help you upgrade. Visit the FAQ to find out which browsers you can use.":"\u00a1Uy! Debes tener una versi\u00f3n m\u00e1s reciente de tu navegador para ingresar a Club Penguin. P\u00eddele a alg\u00fan adulto que te ayude a actualizarlo. Consulta la secci\u00f3n Preguntas Frecuentes para saber qu\u00e9 navegadores puedes usar.","Log off":"Cerrar sesi\u00f3n","Incorrect, please try again.":"Incorrecto, intenta otra vez."}}};(function(a){Drupal.behaviors.video={attach:function(b,c){if(a.fn.media){a(".jmedia").media()}if(c.video){a.fn.media.defaults.flvPlayer=c.video.flvplayer}a(".video-box").each(function(){var e=a(this).attr("href");var h=a(this).metadata();var g=h.width;var d=h.height;var f=c.video.player;a(this).colorbox({html:'<a id="video-overlay" href="'+e+'" style="height:'+d+"; width:"+g+'; display: block;"></a>',onComplete:function(){if(f=="flowplayer"){flowplayer("video-overlay",c.video.flvplayer,{clip:{autoPlay:c.video.autoplay,autoBuffering:c.video.autobuffer}})}else{a("#video-overlay").media({flashvars:{autostart:c.video.autoplay},width:g,height:d})}}})})}};Drupal.behaviors.videoEdit=function(b){a(".video-thumbnails input").each(function(){var d=a(this).val();if(a(this).is(":checked")){var c=a(this).attr("rel");var f=a(this).attr("id");var e=a('label[for="'+f+'"]').find("img").attr("src");a("."+c+" img").attr("src",e)}})}})(jQuery);(function(g){var i=this,n={},j,l,m,d=false,f={autoLoad:true,page:1,content:".content",link:"a[rel=next]",insertBefore:null,appendTo:null,start:function(){},load:function(){},disabled:false};g.autopager=function(o){var s=this.autopager;if(typeof o==="string"&&g.isFunction(s[o])){var q=Array.prototype.slice.call(arguments,1),r=s[o].apply(s,q);return r===s||r===undefined?this:r}o=g.extend({},f,o);s.option(o);j=g(o.content).filter(":last");if(j.length){if(!o.insertBefore&&!o.appendTo){var p=j.next();if(p.length){k("insertBefore",p)}else{k("appendTo",j.parent())}}}e();return this};g.extend(g.autopager,{option:function(p,q){var o=p;if(typeof p==="string"){if(q===undefined){return n[p]}o={};o[p]=q}g.each(o,function(r,s){k(r,s)});return this},enable:function(){k("disabled",false);return this},disable:function(){k("disabled",true);return this},destroy:function(){this.autoLoad(false);n={};j=l=m=undefined;return this},autoLoad:function(o){return this.option("autoLoad",o)},load:function(){if(d||!m||n.disabled){return}d=true;n.start(c(),h());g.get(m,a);return this}});function k(o,p){switch(o){case"autoLoad":if(p&&!n.autoLoad){g(i).scroll(b)}else{if(!p&&n.autoLoad){g(i).unbind("scroll",b)}}break;case"insertBefore":if(p){n.appendTo=null}break;case"appendTo":if(p){n.insertBefore=null}break}n[o]=p}function e(o){l=m||i.location.href;m=g(n.link,o).attr("href")}function b(){if(j.offset().top+j.height()<g(document).scrollTop()+g(i).height()){g.autopager.load()}}function a(q){var o=n,p=g("<div/>").append(q.replace(/<script(.|\s)*?\/script>/g,"")),r=p.find(o.content);k("page",o.page+1);e(p);if(r.length){if(o.insertBefore){r.insertBefore(o.insertBefore)}else{r.appendTo(o.appendTo)}o.load.call(r.get(),c(),h());j=r.filter(":last")}d=false}function c(){return{page:n.page,url:l}}function h(){return{page:n.page+1,url:m}}})(jQuery);(function(a){var b=false;Drupal.behaviors.views_infinite_scroll={attach:function(){if(a.autopager){if(!b){b=true;if(Drupal.settings.views_infinite_scroll.length==1){var d=Drupal.settings.views_infinite_scroll[0];var m=false;if(Drupal.settings.views&&Drupal.settings.views.ajaxViews){a.each(Drupal.settings.views.ajaxViews,function(p,q){if((q.view_name==d.view_name)&&(q.view_display_id==d.display)){m=true}})}if(!m){var c="div.view-id-"+d.view_name+".view-display-id-"+d.display;var j=c+" > "+d.content_selector;var i=j+" "+d.items_selector;var n=c+" > div.item-list "+d.pager_selector;var l=c+" "+d.next_selector;var k=c+" > div.view-content";var h=d.img_path;var f='                      <div id="views_infinite_scroll-ajax-loader">                        <div class="square">                          <div class="square-part square-green"></div>                          <div class="square-part square-pink"></div>                          <div class="square-blend"></div>                        </div>                      </div>';a(n).hide();var g=a.autopager({appendTo:j,content:i,link:l,page:0,start:function(){a(k).after(f)},load:function(){a("div#views_infinite_scroll-ajax-loader").remove();Drupal.attachBehaviors(this)}});var e=a(j).height();do{var o=a(i).filter(":last");if(o.offset().top+o.height()<a(document).scrollTop()+a(window).height()){o=a(i).filter(":last");g.autopager("load")}else{break}}while(a(j).height()>e)}else{alert(Drupal.t('Views infinite scroll pager is not compatible with Ajax Views. Please disable "Use Ajax" option.'))}}else{if(Drupal.settings.views_infinite_scroll.length>1){alert(Drupal.t("Views Infinite Scroll module can't handle more than one infinite view in the same page."))}}}}else{alert(Drupal.t("Autopager jquery plugin in not loaded."))}}}})(jQuery);