;
/*!
 * @license MIT
 * @preserve
 *
 * vUnit.js: A vanilla JS alternative for vh and vw CSS units.
 * Version: 0.2.0
 * https://github.com/joaocunha/v-unit/
 *
 * @author João Cunha - joao@joaocunha.net - twitter.com/joaocunha
 */
(function(win,doc,undefined){'use strict';win.vUnit=function(options){var vunit=this;var opts=options||{};vunit.options={stylesheetId:opts.stylesheetId||'v-unit-stylesheet',viewportObserverInterval:opts.viewportObserverInterval||100,CSSMap:opts.CSSMap||null,onResize:opts.onResize||function(){}};vunit.viewportSize={height:0,width:0};vunit.init=function(){if(opts.CSSMap){return win.setInterval((function viewportObserver(){if(viewportHasChanged()){var stylesheet=createStylesheet();var CSSRules=createCSSRules();appendCSSRulesToStylesheet(CSSRules,stylesheet);appendStylesheetOnHead(stylesheet);vunit.options.onResize(vunit.viewportSize);}
return viewportObserver;})(),vunit.options.viewportObserverInterval);}else{return false;}};var viewportHasChanged=function(){var currentViewportSize=calculateViewportSize();var differentHeight=(currentViewportSize.height!==vunit.viewportSize.height);var differentWidth=(currentViewportSize.width!==vunit.viewportSize.width);vunit.viewportSize=currentViewportSize;return(differentHeight||differentWidth);};var createStylesheet=function(){var stylesheet=doc.createElement('style');stylesheet.setAttribute('rel','stylesheet');stylesheet.setAttribute('type','text/css');stylesheet.setAttribute('media','screen');stylesheet.setAttribute('id',vunit.options.stylesheetId);return stylesheet;};var createCSSRules=function(){var computedHeight=(vunit.viewportSize.height/100);var computedWidth=(vunit.viewportSize.width/100);var vmin=Math.min(computedWidth,computedHeight);var vmax=Math.max(computedWidth,computedHeight);var map=vunit.options.CSSMap;var CSSRules='';var value=0;for(var selector in map){var property=map[selector].property;for(var range=1;range<=100;range++){switch(map[selector].reference){case'vw':value=computedWidth*range;break;case'vh':value=computedHeight*range;break;case'vmin':value=vmin*range;break;case'vmax':value=vmax*range;break;}
var CSSRuleTemplate='_SELECTOR__RANGE_{_PROPERTY_:_VALUE_px}\n';CSSRules+=CSSRuleTemplate.replace('_SELECTOR_',selector).replace('_RANGE_',range).replace('_PROPERTY_',property).replace('_VALUE_',value);}}
return CSSRules;};var appendCSSRulesToStylesheet=function(CSSRules,stylesheet){if(stylesheet.styleSheet){stylesheet.styleSheet.cssText=CSSRules;}else{stylesheet.appendChild(doc.createTextNode(CSSRules));}};var appendStylesheetOnHead=function(stylesheet){var head=doc.head||doc.getElementsByTagName('head')[0]||doc.documentElement;var legacyStylesheet=doc.getElementById(vunit.options.stylesheetId);if(legacyStylesheet){head.removeChild(legacyStylesheet);}
head.appendChild(stylesheet);};var calculateViewportSize=function(){var viewportSize={height:doc.documentElement.clientHeight,width:doc.documentElement.clientWidth};return viewportSize;};};})(window,document);