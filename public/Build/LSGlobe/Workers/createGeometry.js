define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./AttributeCompression-8a5fa32d","./GeometryPipeline-635df242","./EncodedCartesian3-96cc4460","./IndexDatatype-523f50d6","./IntersectionTests-cc1722b0","./Plane-bb97f210","./PrimitivePipeline-29f29e08","./WebMercatorProjection-d1a748fe","./createTaskProcessorWorker"],function(s,e,r,t,a,n,o,i,f,c,b,u,d,l,m,p,y,P,k,v,C,h,G,W){"use strict";var A={};return W(function(e,r){for(var t=e.subTasks,a=t.length,n=new Array(a),o=0;o<a;o++){var i=t[o],f=i.geometry,c=i.moduleName;s.defined(c)?(c=function(e){var r=A[e];return s.defined(r)||("object"==typeof exports?A[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){A[r=e]=e})),r}(c),n[o]=c(f,i.offset)):n[o]=f}return d.when.all(n,function(e){return h.PrimitivePipeline.packCreateGeometryResults(e,r)})})});
