define(["exports","./buildModuleUrl-cd6b3599"],function(t,_){"use strict";var e={};!function(b){var o,t,l="File format is not recognized.",a="File contains encrypted entry.",c="File is using Zip64 (4gb+ file size).",r="Error while reading zip file.",e="Error while reading file data.",v=524288,M="inflate.js",A="deflate.js",f="text/plain",z="message";try{o=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(t){}function D(){var i=-1,r=this;r.append=function(t){for(var e=r.table,n=0;n<t.length;n++)i=i>>>8^e[255&(i^t[n])]},r.get=function(){return~i}}function S(t,e){var n=new ArrayBuffer(t),t=new Uint8Array(n);return e&&t.set(e,0),{buffer:n,array:t,view:new DataView(n)}}function n(){}function i(i){var r,o=this;o.size=0,o.init=function(t,e){var n=new Blob([i],{type:f});(r=new u(n)).init(function(){o.size=r.size,t()},e)},o.readUint8Array=function(t,e,n,i){r.readUint8Array(t,e,n,i)}}function s(s){var u,n=this;n.size=0,n.init=function(t){for(var e=s.length;"="==s.charAt(e-1);)e--;u=s.indexOf(",")+1,n.size=Math.floor(.75*(e-u)),t()},n.readUint8Array=function(t,e,n){for(var i=S(e),r=4*Math.floor(t/3),o=4*Math.ceil((t+e)/3),a=window.atob(s.substring(r+u,o+u)),c=t-3*Math.floor(r/4),f=c;f<c+e;f++)i.array[f-c]=a.charCodeAt(f);n(i.array)}}function u(o){this.size=0,this.init=function(t){this.size=o.size,t()},this.readUint8Array=function(t,e,n,i){var r;(r=new FileReader).onload=function(t){n(new Uint8Array(t.target.result))},r.onerror=i,r.readAsArrayBuffer((r=t,t=e,(e=o).slice?e.slice(r,r+t):e.webkitSlice?e.webkitSlice(r,r+t):e.mozSlice?e.mozSlice(r,r+t):e.msSlice?e.msSlice(r,r+t):void 0))}}function w(){}function g(i){var r;this.init=function(t){r=new Blob([],{type:f}),t()},this.writeUint8Array=function(t,e){r=new Blob([r,o?t:t.buffer],{type:f}),e()},this.getData=function(e,t){var n=new FileReader;n.onload=function(t){e(t.target.result)},n.onerror=t,n.readAsText(r,i)}}function h(e){var o="",a="";this.init=function(t){o+="data:"+(e||"")+";base64,",t()},this.writeUint8Array=function(t,e){var n,i=a.length,r=a;for(a="",n=0;n<3*Math.floor((i+t.length)/3)-i;n++)r+=String.fromCharCode(t[n]);for(;n<t.length;n++)a+=String.fromCharCode(t[n]);2<r.length?o+=window.btoa(r):a=r,e()},this.getData=function(t){t(o+window.btoa(a))}}function d(n){var i;this.init=function(t){i=new Blob([],{type:n}),t()},this.writeUint8Array=function(t,e){i=new Blob([i,o?t:t.buffer],{type:n}),e()},this.getData=function(t){t(i)}}function y(r){var n=this;n.size=0,n.init=function(t,e){n.size=r.byteLength,t()},n.readUint8Array=function(t,e,n,i){n(new Uint8Array(r.slice(t,t+e)))}}function p(){var r;this.init=function(t,e){r=new Uint8Array,t()},this.writeUint8Array=function(t,e,n){var i=new Uint8Array(r.length+t.length);i.set(r),i.set(t,r.length),r=i,e()},this.getData=function(t){t(r.buffer)}}function L(e,t,n,i,r,o,a,c,f,s){var u,l,w=0;function g(){e.removeEventListener(z,h,!1),c(l)}function h(t){var t=t.data,e=t.data;t.onappend&&(l+=e.length,n.writeUint8Array(e,function(){o(!1,e),d()},s)),t.onflush&&(e?(l+=e.length,n.writeUint8Array(e,function(){o(!1,e),g()},s)):g()),t.progress&&a&&a(u+t.current,r)}function d(){(u=w*v)<r?t.readUint8Array(i+u,Math.min(v,r-u),function(t){e.postMessage({append:!0,data:t}),w++,a&&a(u,r),o(!0,t)},f):e.postMessage({flush:!0})}l=0,e.addEventListener(z,h,!1),d()}function F(i,e,r,o,a,c,f,s,u,l){var w,g=0,h=0;!function n(){var t;(w=g*v)<a?e.readUint8Array(o+w,Math.min(v,a-w),function(t){var e=i.append(t,function(){f&&f(o+w,a)});h+=e.length,c(!0,t),r.writeUint8Array(e,function(){c(!1,e),g++,setTimeout(n,1)},l),f&&f(w,a)},u):(t=i.flush())?(h+=t.length,r.writeUint8Array(t,function(){c(!1,t),s(h)},l)):s(h)}()}function W(t,i,r,o,a,c,f,s,u){var l=0,w=new D;!function e(){var n=l*v;n<o?t.readUint8Array(r+n,Math.min(v,o-n),function(t){a&&w.append(t),f&&f(n,o,t),i.writeUint8Array(t,function(){l++,e()},u)},s):c(o,w.get())}()}function U(t){for(var e,n="",i=["Ç","ü","é","â","ä","à","å","ç","ê","ë","è","ï","î","ì","Ä","Å","É","æ","Æ","ô","ö","ò","û","ù","ÿ","Ö","Ü","ø","£","Ø","×","ƒ","á","í","ó","ú","ñ","Ñ","ª","º","¿","®","¬","½","¼","¡","«","»","_","_","_","¦","¦","Á","Â","À","©","¦","¦","+","+","¢","¥","+","+","-","-","+","-","+","ã","Ã","+","+","-","-","¦","-","+","¤","ð","Ð","Ê","Ë","È","i","Í","Î","Ï","+","+","_","_","¦","Ì","_","Ó","ß","Ô","Ò","õ","Õ","µ","þ","Þ","Ú","Û","Ù","ý","Ý","¯","´","­","±","_","¾","¶","§","÷","¸","°","¨","·","¹","³","²","_"," "],r=0;r<t.length;r++)n+=127<(e=255&t.charCodeAt(r))?i[e-128]:String.fromCharCode(e);return n}function m(t){return decodeURIComponent(escape(t))}function R(t){for(var e="",n=0;n<t.length;n++)e+=String.fromCharCode(t[n]);return e}function B(t,e,n,i,r){t.version=e.view.getUint16(n,!0),t.bitFlag=e.view.getUint16(n+2,!0),t.compressionMethod=e.view.getUint16(n+4,!0),t.lastModDateRaw=e.view.getUint32(n+6,!0),t.lastModDate=function(t){var e=(4294901760&t)>>16,n=65535&t;try{return new Date(1980+((65024&e)>>9),((480&e)>>5)-1,31&e,(63488&n)>>11,(2016&n)>>5,2*(31&n),0)}catch(t){}}(t.lastModDateRaw),1!=(1&t.bitFlag)?(!i&&8==(8&t.bitFlag)||(t.crc32=e.view.getUint32(n+10,!0),t.compressedSize=e.view.getUint32(n+14,!0),t.uncompressedSize=e.view.getUint32(n+18,!0)),4294967295!==t.compressedSize&&4294967295!==t.uncompressedSize?(t.filenameLength=e.view.getUint16(n+22,!0),t.extraFieldLength=e.view.getUint16(n+24,!0)):r(c)):r(a)}function C(z,s){function u(){}return u.prototype.getData=function(h,i,d,v){var y,p=this;function r(t,e){y&&y.terminate(),y=null,t&&t(e)}function U(t,e){var n;v&&(n=e,(e=S(4)).view.setUint32(0,n),p.crc32!=e.view.getUint32(0))?m():h.getData(function(t){r(i,t)})}function m(){r(s,e)}function A(){r(s,"Error while writing file data.")}z.readUint8Array(p.offset,30,function(t){var g,t=S(t.length,t);1347093252==t.view.getUint32(0)?(B(p,t,4,!1,s),g=p.offset+30+p.filenameLength+p.extraFieldLength,h.init(function(){function t(t,e){a&&!t&&w.append(e)}function e(t){c(t,w.get())}var n,i,r,o,a,c,f,s,u,l,w;0===p.compressionMethod?W(z,h,g,p.compressedSize,v,U,d,m,A):(n=z,i=h,r=g,o=p.compressedSize,a=v,c=U,f=d,s=m,u=A,w=new D,b.zip.useWebWorkers?L(l=new Worker(b.zip.workerScriptsPath+M),n,i,r,o,t,f,e,s,u):F(new b.zip.Inflater,n,i,r,o,t,f,e,s,u),y=l)},A)):s(l)},m)},{getEntries:function(f){z.size<22?s(l):function e(n,i){z.readUint8Array(z.size-n,n,function(t){1347093766!=(t=S(t.length,t).view).getUint32(0)?e(n+1,i):i(t)},function(){s(r)})}(22,function(t){var e=t.getUint32(16,!0),c=t.getUint16(8,!0);z.readUint8Array(e,z.size-e,function(t){for(var e,n,i=0,r=[],o=S(t.length,t),a=0;a<c;a++){if(e=new u,1347092738!=o.view.getUint32(i))return void s(l);B(e,o,i+6,!0,s),e.commentLength=o.view.getUint16(i+32,!0),e.directory=16==(16&o.view.getUint8(i+38)),e.offset=o.view.getUint32(i+42,!0),n=R(o.array.subarray(i+46,i+46+e.filenameLength)),e.filename=(2048==(2048&e.bitFlag)?m:U)(n),e.directory||"/"!=e.filename.charAt(e.filename.length-1)||(e.directory=!0),n=R(o.array.subarray(i+46+e.filenameLength+e.extraFieldLength,i+46+e.filenameLength+e.extraFieldLength+e.commentLength)),e.comment=(2048==(2048&e.bitFlag)?m:U)(n),r.push(e),i+=46+e.filenameLength+e.extraFieldLength+e.commentLength}f(r)},function(){s(r)})})},close:function(t){t&&t()}}}function x(t){return unescape(encodeURIComponent(t))}function k(t){for(var e=[],n=0;n<t.length;n++)e.push(t.charCodeAt(n));return e}function E(d,c,v){var y,f={},s=[],u=0;function p(t,e){y&&y.terminate(),y=null,t&&t(e)}function U(){p(c,"Error while writing zip file.")}function m(){p(c,e)}return{add:function(n,l,i,w,g){var r,o,a;function h(t,e){var n=S(16);u+=t||0,n.view.setUint32(0,1347094280),void 0!==e&&(r.view.setUint32(10,e,!0),n.view.setUint32(4,e,!0)),l&&(n.view.setUint32(8,t,!0),r.view.setUint32(14,t,!0),n.view.setUint32(12,l.size,!0),r.view.setUint32(18,l.size,!0)),d.writeUint8Array(n.array,function(){u+=16,p(i)},U)}function t(){var t,e;g=g||{},n=n.trim(),g.directory&&"/"!=n.charAt(n.length-1)&&(n+="/"),f.hasOwnProperty(n)?c("File already exists."):(o=k(x(n)),s.push(n),t=function(){function e(t,e){t&&u.append(e)}function n(t){o(t,u.get())}var i,r,t,o,a,c,f,s,u;l?v||0===g.level?W(l,d,0,l.size,!0,h,w,m,U):(i=l,r=d,t=g.level,o=h,a=w,c=m,f=U,u=new D,b.zip.useWebWorkers?((s=new Worker(b.zip.workerScriptsPath+A)).addEventListener(z,function t(){s.removeEventListener(z,t,!1),L(s,i,r,0,i.size,e,a,n,c,f)},!1),s.postMessage({init:!0,level:t})):F(new b.zip.Deflater,i,r,0,i.size,e,a,n,c,f),y=s):h()},a=g.lastModDate||new Date,r=S(26),f[n]={headerArray:r.array,directory:g.directory,filename:o,offset:u,comment:k(x(g.comment||""))},r.view.setUint32(0,335546376),g.version&&r.view.setUint8(0,g.version),v||0===g.level||g.directory||r.view.setUint16(4,2048),r.view.setUint16(6,(a.getHours()<<6|a.getMinutes())<<5|a.getSeconds()/2,!0),r.view.setUint16(8,(a.getFullYear()-1980<<4|a.getMonth()+1)<<5|a.getDate(),!0),r.view.setUint16(22,o.length,!0),(e=S(30+o.length)).view.setUint32(0,1347093252),e.array.set(r.array,4),e.array.set(o,30),u+=e.array.length,d.writeUint8Array(e.array,t,U))}l?l.init(t,m):t()},close:function(t){for(var e,n,i=0,r=0,o=0;o<s.length;o++)i+=46+(n=f[s[o]]).filename.length+n.comment.length;for(e=S(i+22),o=0;o<s.length;o++)n=f[s[o]],e.view.setUint32(r,1347092738),e.view.setUint16(r+4,5120),e.array.set(n.headerArray,r+6),e.view.setUint16(r+32,n.comment.length,!0),n.directory&&e.view.setUint8(r+38,16),e.view.setUint32(r+42,n.offset,!0),e.array.set(n.filename,r+46),e.array.set(n.comment,r+46+n.filename.length),r+=46+n.filename.length+n.comment.length;e.view.setUint32(r,1347093766),e.view.setUint16(r+8,s.length,!0),e.view.setUint16(r+10,s.length,!0),e.view.setUint32(r+12,i,!0),e.view.setUint32(r+16,u,!0),d.writeUint8Array(e.array,function(){p(function(){d.getData(t)})},U)}}}D.prototype.table=function(){for(var t,e,n=[],i=0;i<256;i++){for(e=i,t=0;t<8;t++)1&e?e=e>>>1^3988292384:e>>>=1;n[i]=e}return n}(),(i.prototype=new n).constructor=i,(s.prototype=new n).constructor=s,(u.prototype=new n).constructor=u,w.prototype.getData=function(t){t(this.data)},(g.prototype=new w).constructor=g,(h.prototype=new w).constructor=h,(d.prototype=new w).constructor=d,(y.prototype=new n).constructor=y,(p.prototype=new w).constructor=p,b.zip={Reader:n,Writer:w,BlobReader:u,Data64URIReader:s,TextReader:i,ArrayBufferReader:y,BlobWriter:d,Data64URIWriter:h,TextWriter:g,ArrayBufferWriter:p,createReader:function(t,e,n){t.init(function(){e(C(t,n))},n)},createWriter:function(t,e,n,i){t.init(function(){e(E(t,n,i))},n)},useWebWorkers:!0},Object.defineProperties(b.zip,{workerScriptsPath:{get:function(){return void 0===t&&(t=_.buildModuleUrl("ThirdParty/Workers/")),t}}})}(e);e=e.zip;t.zip=e});