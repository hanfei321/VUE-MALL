define(["exports","./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./GeometryAttribute-49fe2445"],function(t,S,n,X,C,Y,a,d){"use strict";var w=Math.cos,M=Math.sin,m=Math.sqrt,r={computePosition:function(t,n,a,r,e,o,s){var i=n.radiiSquared,g=t.nwCorner,u=t.boundingRectangle,h=g.latitude-t.granYCos*r+e*t.granXSin,c=w(h),l=M(h),C=i.z*l,d=g.longitude+r*t.granYSin+e*t.granXCos,n=c*w(d),g=c*M(d),c=i.x*n,i=i.y*g,l=m(c*n+i*g+C*l);o.x=c/l,o.y=i/l,o.z=C/l,a&&(a=t.stNwCorner,S.defined(a)?(h=a.latitude-t.stGranYCos*r+e*t.stGranXSin,d=a.longitude+r*t.stGranYSin+e*t.stGranXCos,s.x=(d-t.stWest)*t.lonScalar,s.y=(h-t.stSouth)*t.latScalar):(s.x=(d-u.west)*t.lonScalar,s.y=(h-u.south)*t.latScalar))}},b=new d.Matrix2,f=new C.Cartesian3,p=new C.Cartographic,G=new C.Cartesian3,R=new a.GeographicProjection;function x(t,n,a,r,e,o,s){var i=Math.cos(n),g=r*i,u=a*i,h=Math.sin(n),c=r*h,l=a*h;f=R.project(t,f),f=C.Cartesian3.subtract(f,G,f);i=d.Matrix2.fromRotation(n,b);f=d.Matrix2.multiplyByVector(i,f,f),f=C.Cartesian3.add(f,G,f),--o,--s;r=(t=R.unproject(f,t)).latitude,a=r+o*l,h=r-g*s,n=r-g*s+o*l,i=Math.max(r,a,h,n),r=Math.min(r,a,h,n),a=t.longitude,h=a+o*u,n=a+s*c,o=a+s*c+o*u;return{north:i,south:r,east:Math.max(a,h,n,o),west:Math.min(a,h,n,o),granYCos:g,granYSin:c,granXCos:u,granXSin:l,nwCorner:t}}r.computeOptions=function(t,n,a,r,e,o,s){var i=t.east,g=t.west,u=t.north,h=t.south,c=!1,l=!1;u===X.CesiumMath.PI_OVER_TWO&&(c=!0),h===-X.CesiumMath.PI_OVER_TWO&&(l=!0);var C,d=u-h,S=(w=i<g?X.CesiumMath.TWO_PI-g+i:i-g)/((C=Math.ceil(w/n)+1)-1),w=d/((M=Math.ceil(d/n)+1)-1),d=Y.Rectangle.northwest(t,o),n=Y.Rectangle.center(t,p);0===a&&0===r||(n.longitude<d.longitude&&(n.longitude+=X.CesiumMath.TWO_PI),G=R.project(n,G));var M,o=w,n=S,e=Y.Rectangle.clone(t,e),l={granYCos:o,granYSin:0,granXCos:n,granXSin:0,nwCorner:d,boundingRectangle:e,width:C,height:M,northCap:c,southCap:l};return 0!==a&&(u=(d=x(d,a,S,w,0,C,M)).north,h=d.south,i=d.east,g=d.west,l.granYCos=d.granYCos,l.granYSin=d.granYSin,l.granXCos=d.granXCos,l.granXSin=d.granXSin,e.north=u,e.south=h,e.east=i,e.west=g),0!==r&&(a-=r,M=x(s=Y.Rectangle.northwest(e,s),a,S,w,0,C,M),l.stGranYCos=M.granYCos,l.stGranXCos=M.granXCos,l.stGranYSin=M.granYSin,l.stGranXSin=M.granXSin,l.stNwCorner=s,l.stWest=M.west,l.stSouth=M.south),l},t.RectangleGeometryLibrary=r});