var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,d){a!=Array.prototype&&a!=Object.prototype&&(a[c]=d.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(c){return $jscomp.SYMBOL_PREFIX+(c||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(a){var c=0;return $jscomp.iteratorPrototype(function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.makeIterator=function(a){$jscomp.initSymbolIterator();$jscomp.initSymbol();$jscomp.initSymbolIterator();var c=a[Symbol.iterator];return c?c.call(a):$jscomp.arrayIterator(a)};
$jscomp.polyfill=function(a,c,d,e){if(c){d=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var b=a[e];b in d||(d[b]={});d=d[b]}a=a[a.length-1];e=d[a];c=c(e);c!=e&&null!=c&&$jscomp.defineProperty(d,a,{configurable:!0,writable:!0,value:c})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function c(){this.batch_=null}function d(a){return a instanceof b?a:new b(function(b,g){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;c.prototype.asyncExecute=function(b){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(b);return this};c.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})};var e=$jscomp.global.setTimeout;c.prototype.asyncExecuteFunction=function(b){e(b,
0)};c.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var b=this.batch_;this.batch_=[];for(var a=0;a<b.length;++a){var c=b[a];delete b[a];try{c()}catch(k){this.asyncThrow_(k)}}}this.batch_=null};c.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;})};var b=function(b){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var a=this.createResolveAndReject_();try{b(a.resolve,a.reject)}catch(h){a.reject(h)}};b.prototype.createResolveAndReject_=
function(){function b(b){return function(e){c||(c=!0,b.call(a,e))}}var a=this,c=!1;return{resolve:b(this.resolveTo_),reject:b(this.reject_)}};b.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof b)this.settleSameAsPromise_(a);else{a:switch(typeof a){case "object":var c=null!=a;break a;case "function":c=!0;break a;default:c=!1}c?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};b.prototype.resolveToNonPromiseObj_=function(b){var a=
void 0;try{a=b.then}catch(h){this.reject_(h);return}"function"==typeof a?this.settleSameAsThenable_(a,b):this.fulfill_(b)};b.prototype.reject_=function(b){this.settle_(2,b)};b.prototype.fulfill_=function(b){this.settle_(1,b)};b.prototype.settle_=function(b,a){if(0!=this.state_)throw Error("Cannot settle("+b+", "+a|"): Promise already settled in state"+this.state_);this.state_=b;this.result_=a;this.executeOnSettledCallbacks_()};b.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var b=
this.onSettledCallbacks_,a=0;a<b.length;++a)b[a].call(),b[a]=null;this.onSettledCallbacks_=null}};var f=new c;b.prototype.settleSameAsPromise_=function(b){var a=this.createResolveAndReject_();b.callWhenSettled_(a.resolve,a.reject)};b.prototype.settleSameAsThenable_=function(b,a){var c=this.createResolveAndReject_();try{b.call(a,c.resolve,c.reject)}catch(k){c.reject(k)}};b.prototype.then=function(a,c){function e(b,a){return"function"==typeof b?function(a){try{d(b(a))}catch(n){f(n)}}:a}var d,f,g=new b(function(b,
a){d=b;f=a});this.callWhenSettled_(e(a,d),e(c,f));return g};b.prototype.catch=function(b){return this.then(void 0,b)};b.prototype.callWhenSettled_=function(b,a){function c(){switch(e.state_){case 1:b(e.result_);break;case 2:a(e.result_);break;default:throw Error("Unexpected state: "+e.state_);}}var e=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(function(){f.asyncExecute(c)})};b.resolve=d;b.reject=function(a){return new b(function(b,c){c(a)})};b.race=function(a){return new b(function(b,
c){for(var e=$jscomp.makeIterator(a),f=e.next();!f.done;f=e.next())d(f.value).callWhenSettled_(b,c)})};b.all=function(a){var c=$jscomp.makeIterator(a),e=c.next();return e.done?d([]):new b(function(b,a){function f(a){return function(c){g[a]=c;k--;0==k&&b(g)}}var g=[],k=0;do g.push(void 0),k++,d(e.value).callWhenSettled_(f(g.length-1),a),e=c.next();while(!e.done)})};return b},"es6","es3");
$jscomp.executeAsyncGenerator=function(a){function c(c){return a.next(c)}function d(c){return a.throw(c)}return new Promise(function(e,b){function f(a){a.done?e(a.value):Promise.resolve(a.value).then(c,d).then(f,b)}f(a.next())})};$jscomp.arrayFromIterator=function(a){for(var c,d=[];!(c=a.next()).done;)d.push(c.value);return d};$jscomp.arrayFromIterable=function(a){return a instanceof Array?a:$jscomp.arrayFromIterator($jscomp.makeIterator(a))};
$jscomp.owns=function(a,c){return Object.prototype.hasOwnProperty.call(a,c)};$jscomp.polyfill("Object.assign",function(a){return a?a:function(a,d){for(var c=1;c<arguments.length;c++){var b=arguments[c];if(b)for(var f in b)$jscomp.owns(b,f)&&(a[f]=b[f])}return a}},"es6","es3");
$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,d,e){var b=this.length||0;0>d&&(d=Math.max(0,b+d));if(null==e||e>b)e=b;e=Number(e);0>e&&(e=Math.max(0,b+e));for(d=Number(d||0);d<e;d++)this[d]=a;return this}},"es6","es3");
$jscomp.checkStringArgs=function(a,c,d){if(null==a)throw new TypeError("The 'this' value for String.prototype."+d+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+d+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,d){var c=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var b=c.length,f=a.length;d=Math.max(0,Math.min(d|0,c.length));for(var g=0;g<f&&d<b;)if(c[d++]!=a[g++])return!1;return g>=f}},"es6","es3");
var sb2Loader=function(a){this.options=Object.assign({greenFlagSelector:"#greenFlag",stopButtonSelector:"#btnStop",jsIndentSize:4},a);this.btnGreenFlag=document.querySelector(this.options.greenFlagSelector);this.btnStop=document.querySelector(this.options.stopButtonSelector);this.prjScratch=null;this.dicChildren={};this.zipLoader=new JSZip;this.jsCode="";this.greeFlagFuncs=[];this.keyPressFuncs={};this.btnGreenFlag&&this.btnGreenFlag.addEventListener("click",this.greenFlagClick);this.btnStop&&this.btnStop.addEventListener("click",
this.stop)};
sb2Loader.prototype.load=function(a){var c=this;return $jscomp.executeAsyncGenerator(function(){function d(d,h,l){for(;;)switch(e){case 0:return e=1,{value:c.zipLoader.loadAsync(a),done:!1};case 1:if(1!=d){e=2;break}e=-1;throw l;case 2:return g=m=h,e=3,{value:g.file("project.json").async("string"),done:!1};case 3:if(1!=d){e=4;break}e=-1;throw l;case 4:b=f=h;c.prjScratch=JSON.parse(b);if(c.prjScratch.children){e=5;break}e=-1;throw Error('cannot found "children".');case 5:c.prjScratch.children.forEach(function(a){a.scripts&&c.convertToJS(a.scripts,
a.objName)}),e=-1;default:return{value:void 0,done:!0}}}var e=0,b,f,g,m,h={next:function(a){return d(0,a,void 0)},throw:function(a){return d(1,void 0,a)},return:function(a){throw Error("Not yet implemented");}};$jscomp.initSymbolIterator();h[Symbol.iterator]=function(){return this};return h}())};sb2Loader.prototype.jsIndent=function(a){return[].concat($jscomp.arrayFromIterable(Array(a))).fill("\t").join("")};
sb2Loader.prototype.convertToJS=function(a,c,d,e){var b=this;d=void 0===d?0:d;e=void 0===e?"":e;0===d?a.forEach(function(a,g){e=c.replace(/\s/g,"_")+"_"+g+"_Func";b.jsCode+="async function "+e+"() {\n";b.convertToJS(a[2],c,d+1,e);b.jsCode+="}\n"}):a.forEach(function(a){a[0].startsWith("when")||(b.jsCode+=b.jsIndent(d));switch(a[0]){case "whenGreenFlag":b.greeFlagFuncs.push(e);break;case "say:duration:elapsed:from:":b.jsCode+=c+".say('"+a[1]+"', "+a[2]+");\n";break;case "doRepeat":b.jsCode+="[...Array("+
a[1]+")].forEach(_ => {\n";b.convertToJS(a[2],c,d+1,e);b.jsCode+=b.jsIndent(d)+");\n";break;case "forward:":b.jsCode+="scratchObjects['"+c+"'].x += "+a[1]+";\n";break;case "playDrum":b.jsCode+="await scratchObjects['"+c+"'].playDrum("+a[1]+", "+a[2]+");\n";break;case "changeXposBy:":b.jsCode+="scratchObjects['"+c+"'].x += "+a[1]+";\n";break;case "whenKeyPressed":b.keyPressFuncs[a[1]]=b.keyPressFuncs[a[1]]||[];b.keyPressFuncs[a[1]].push(e);break;case "changeGraphicEffect:by:":b.jsCode+="scratchObjects['"+
c+"']["+a[1]+"] = scratchColors["+a[2]+"];\n";break;case "playSound:":b.jsCode+="await scratchSounds['"+a[1]+"'].play();\n";break;case "doForever":b.jsCode+="while(true){\n";b.convertToJS(a[1],c,d+1,e);b.jsCode+=b.jsIndent(d)+"}\n";break;case "nextCostume":b.jsCode+="scratchObjects['"+c+"'].nextCostume();\n";break;case "wait:elapsed:from:":b.jsCode+="await scratchObjects['"+c+"'].wait("+a[1]+");\n"}})};
sb2Loader.prototype.preLoadFiles=function(a){return this.loadFiles(a,"dicSounds","sounds","soundName","soundID","md5").then(this.loadFiles(a,"dicCostumes","costumes","costumeName","baseLayerID","baseLayerMD5"))};
sb2Loader.prototype.loadFiles=function(a,c,d,e,b,f){var g=this;return a[d]?(this.children[a.objName][c]={},a[d].reduce(promise,function(d){g.children[a.objName][c][d[e]]=d;return promise.then(function(a){a=d[f].substr(d[f].lastIndexOf(".")+1);return g.zipLoader.file(d[b]+"."+a).async("blob").then(function(a){d.blob=a})})},Promise.resolve())):Promise.resolve()};sb2Loader.prototype.execute=function(){};sb2Loader.prototype.stop=function(){};sb2Loader.prototype.greenFlagClick=function(){};
