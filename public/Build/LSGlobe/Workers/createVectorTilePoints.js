define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./when-ae2a7552","./AttributeCompression-8a5fa32d","./createTaskProcessorWorker"],function(a,e,r,g,m,C,t,v,n){"use strict";var w=32767,k=new m.Cartographic,y=new m.Cartesian3,A=new C.Rectangle,R=new C.Ellipsoid,M={min:void 0,max:void 0};return n(function(a,e){var r=new Uint16Array(a.positions);!function(a){a=new Float64Array(a);var e=0;M.min=a[e++],M.max=a[e++],C.Rectangle.unpack(a,2,A),e+=C.Rectangle.packedLength,C.Ellipsoid.unpack(a,e,R)}(a.packedBuffer);var t=A,n=R,i=M.min,o=M.max,s=r.length/3,u=r.subarray(0,s),c=r.subarray(s,2*s),l=r.subarray(2*s,3*s);v.AttributeCompression.zigZagDeltaDecode(u,c,l);for(var p=new Float64Array(r.length),f=0;f<s;++f){var b=u[f],d=c[f],h=l[f],b=g.CesiumMath.lerp(t.west,t.east,b/w),d=g.CesiumMath.lerp(t.south,t.north,d/w),h=g.CesiumMath.lerp(i,o,h/w),h=m.Cartographic.fromRadians(b,d,h,k),h=n.cartographicToCartesian(h,y);m.Cartesian3.pack(h,p,3*f)}return e.push(p.buffer),{positions:p.buffer}})});
