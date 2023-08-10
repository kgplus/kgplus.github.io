+(function($){var pending_ajax=false;var weDocs={initialize:function(){$('.wedocs-feedback-wrap').on('click','a',this.feedback);$('#top-search-form .dropdown-menu').on('click','a',this.searchForm);$('a.wedocs-print-article').on('click',this.printArticle);$('a#wedocs-stuck-modal').on('click',this.showModal);$('a#wedocs-modal-close').on('click',this.closeModal);$('#wedocs-modal-backdrop').on('click',this.closeModal);$('form#wedocs-contact-modal-form').on('submit',this.contactHelp);},feedback:function(e){e.preventDefault();if(pending_ajax){return;}
pending_ajax=true;var self=$(this),wrap=self.closest('.wedocs-feedback-wrap'),data={post_id:self.data('id'),type:self.data('type'),action:'wedocs_ajax_feedback',_wpnonce:weDocs_Vars.nonce};wrap.append('&nbsp; <i class="wedocs-icon wedocs-icon-refresh wedocs-icon-spin"></i>');$.post(weDocs_Vars.ajaxurl,data,function(resp){wrap.html(resp.data);pending_ajax=false;});},searchForm:function(e){e.preventDefault();var param=$(this).attr("href").replace("#","");var concept=$(this).text();$('#top-search-form span#search_concept').text(concept);$('.input-group #search_param').val(param);},printArticle:function(e){e.preventDefault();console.log('print article');var article=$(this).closest('article');var mywindow=window.open('','my div','height=600,width=800');mywindow.document.write('<html><head><title>Print Article</title>');mywindow.document.write('<link rel="stylesheet" href="'+weDocs_Vars.style+'" type="text/css" media="all" />');mywindow.document.write('</head><body >');mywindow.document.write(article.html());mywindow.document.write('<div class="powered-by">'+weDocs_Vars.powered+'</div>');mywindow.document.write('</body></html>');mywindow.document.close();mywindow.focus();mywindow.print();mywindow.close();return true;},showModal:function(e){e.preventDefault();$('#wedocs-modal-backdrop').show();$('#wedocs-contact-modal').show();},closeModal:function(e){e.preventDefault();$('#wedocs-modal-backdrop').hide();$('#wedocs-contact-modal').hide();},contactHelp:function(e){e.preventDefault();var self=$(this),submit=self.find('input[type=submit]'),body=self.closest('.wedocs-modal-body'),data=self.serialize()+'&_wpnonce='+weDocs_Vars.nonce;submit.prop('disabled',true);$.post(weDocs_Vars.ajaxurl,data,function(resp){if(resp.success===false){submit.prop('disabled',false);$('#wedocs-modal-errors',body).empty().append('<div class="wedocs-alert wedocs-alert-danger">'+resp.data+'</div>')}else{body.empty().append('<div class="wedocs-alert wedocs-alert-success">'+resp.data+'</div>');}});}};$(function(){weDocs.initialize();});})(jQuery);
;!function(a,b){"use strict";function c(){if(!e){e=!0;var a,c,d,f,g=-1!==navigator.appVersion.indexOf("MSIE 10"),h=!!navigator.userAgent.match(/Trident.*rv:11\./),i=b.querySelectorAll("iframe.wp-embedded-content");for(c=0;c<i.length;c++){if(d=i[c],!d.getAttribute("data-secret"))f=Math.random().toString(36).substr(2,10),d.src+="#?secret="+f,d.setAttribute("data-secret",f);if(g||h)a=d.cloneNode(!0),a.removeAttribute("security"),d.parentNode.replaceChild(a,d)}}}var d=!1,e=!1;if(b.querySelector)if(a.addEventListener)d=!0;if(a.wp=a.wp||{},!a.wp.receiveEmbedMessage)if(a.wp.receiveEmbedMessage=function(c){var d=c.data;if(d.secret||d.message||d.value)if(!/[^a-zA-Z0-9]/.test(d.secret)){var e,f,g,h,i,j=b.querySelectorAll('iframe[data-secret="'+d.secret+'"]'),k=b.querySelectorAll('blockquote[data-secret="'+d.secret+'"]');for(e=0;e<k.length;e++)k[e].style.display="none";for(e=0;e<j.length;e++)if(f=j[e],c.source===f.contentWindow){if(f.removeAttribute("style"),"height"===d.message){if(g=parseInt(d.value,10),g>1e3)g=1e3;else if(~~g<200)g=200;f.height=g}if("link"===d.message)if(h=b.createElement("a"),i=b.createElement("a"),h.href=f.getAttribute("src"),i.href=d.value,i.host===h.host)if(b.activeElement===f)a.top.location.href=d.value}else;}},d)a.addEventListener("message",a.wp.receiveEmbedMessage,!1),b.addEventListener("DOMContentLoaded",c,!1),a.addEventListener("load",c,!1)}(window,document);