define(["exports","./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb"],function(e,o,t,i,r,a){"use strict";function n(e){this._ellipsoid=o.defaultValue(e,a.Ellipsoid.WGS84),this._semimajorAxis=this._ellipsoid.maximumRadius,this._oneOverSemimajorAxis=1/this._semimajorAxis}Object.defineProperties(n.prototype,{ellipsoid:{get:function(){return this._ellipsoid}}}),n.mercatorAngleToGeodeticLatitude=function(e){return i.CesiumMath.PI_OVER_TWO-2*Math.atan(Math.exp(-e))},n.geodeticLatitudeToMercatorAngle=function(e){n.MaximumLatitude<e?e=n.MaximumLatitude:e<-n.MaximumLatitude&&(e=-n.MaximumLatitude);e=Math.sin(e);return.5*Math.log((1+e)/(1-e))},n.MaximumLatitude=n.mercatorAngleToGeodeticLatitude(Math.PI),n.prototype.project=function(e,t){var i=this._semimajorAxis,a=e.longitude*i,i=n.geodeticLatitudeToMercatorAngle(e.latitude)*i,e=e.height;return o.defined(t)?(t.x=a,t.y=i,t.z=e,t):new r.Cartesian3(a,i,e)},n.prototype.unproject=function(e,t){var i=this._oneOverSemimajorAxis,a=e.x*i,i=n.mercatorAngleToGeodeticLatitude(e.y*i),e=e.z;return o.defined(t)?(t.longitude=a,t.latitude=i,t.height=e,t):new r.Cartographic(a,i,e)},e.WebMercatorProjection=n});
