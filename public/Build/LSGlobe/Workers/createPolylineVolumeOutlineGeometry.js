define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./IndexDatatype-523f50d6","./IntersectionTests-cc1722b0","./Plane-bb97f210","./arrayRemoveDuplicates-f05ed775","./BoundingRectangle-7fd61f33","./EllipsoidTangentPlane-86347fa6","./EllipsoidRhumbLine-b25fd372","./PolygonPipeline-bd17f470","./PolylineVolumeGeometryLibrary-a52c795b","./EllipsoidGeodesic-8f6c0327","./PolylinePipeline-74d8353e"],function(d,e,i,t,u,c,y,a,n,r,f,h,o,l,g,m,s,p,b,E,v,P,_,k,C,L){"use strict";function T(e){var i=(e=d.defaultValue(e,d.defaultValue.EMPTY_OBJECT)).polylinePositions,a=e.shapePositions;this._positions=i,this._shape=a,this._ellipsoid=c.Ellipsoid.clone(d.defaultValue(e.ellipsoid,c.Ellipsoid.WGS84)),this._cornerType=d.defaultValue(e.cornerType,k.CornerType.ROUNDED),this._granularity=d.defaultValue(e.granularity,t.CesiumMath.RADIANS_PER_DEGREE),this._workerName="createPolylineVolumeOutlineGeometry";i=1+i.length*u.Cartesian3.packedLength;i+=1+a.length*u.Cartesian2.packedLength,this.packedLength=i+c.Ellipsoid.packedLength+2}T.pack=function(e,i,a){var t;a=d.defaultValue(a,0);var n=e._positions,r=n.length;for(i[a++]=r,t=0;t<r;++t,a+=u.Cartesian3.packedLength)u.Cartesian3.pack(n[t],i,a);var o=e._shape,r=o.length;for(i[a++]=r,t=0;t<r;++t,a+=u.Cartesian2.packedLength)u.Cartesian2.pack(o[t],i,a);return c.Ellipsoid.pack(e._ellipsoid,i,a),a+=c.Ellipsoid.packedLength,i[a++]=e._cornerType,i[a]=e._granularity,i};var D=c.Ellipsoid.clone(c.Ellipsoid.UNIT_SPHERE),G={polylinePositions:void 0,shapePositions:void 0,ellipsoid:D,height:void 0,cornerType:void 0,granularity:void 0};T.unpack=function(e,i,a){i=d.defaultValue(i,0);for(var t=e[i++],n=new Array(t),r=0;r<t;++r,i+=u.Cartesian3.packedLength)n[r]=u.Cartesian3.unpack(e,i);t=e[i++];var o=new Array(t);for(r=0;r<t;++r,i+=u.Cartesian2.packedLength)o[r]=u.Cartesian2.unpack(e,i);var l=c.Ellipsoid.unpack(e,i,D);i+=c.Ellipsoid.packedLength;var s=e[i++],p=e[i];return d.defined(a)?(a._positions=n,a._shape=o,a._ellipsoid=c.Ellipsoid.clone(l,a._ellipsoid),a._cornerType=s,a._granularity=p,a):(G.polylinePositions=n,G.shapePositions=o,G.cornerType=s,G.granularity=p,new T(G))};var R=new E.BoundingRectangle;return T.createGeometry=function(e){var i=e._positions,a=b.arrayRemoveDuplicates(i,u.Cartesian3.equalsEpsilon),t=e._shape,t=k.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(t);if(!(a.length<2||t.length<3)){_.PolygonPipeline.computeWindingOrder2D(t)===_.WindingOrder.CLOCKWISE&&t.reverse();i=E.BoundingRectangle.fromPoints(t,R);return function(e,i){var a=new g.GeometryAttributes;a.position=new h.GeometryAttribute({componentDatatype:f.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:e});var t=i.length,i=a.position.values.length/3,n=e.length/3/t,r=m.IndexDatatype.createTypedArray(i,2*t*(1+n)),o=0,l=0,s=l*t;for(u=0;u<t-1;u++)r[o++]=u+s,r[o++]=u+s+1;for(r[o++]=t-1+s,r[o++]=s,s=(l=n-1)*t,u=0;u<t-1;u++)r[o++]=u+s,r[o++]=u+s+1;for(r[o++]=t-1+s,r[o++]=s,l=0;l<n-1;l++)for(var p=t*l,d=p+t,u=0;u<t;u++)r[o++]=u+p,r[o++]=u+d;return new h.Geometry({attributes:a,indices:m.IndexDatatype.createTypedArray(i,r),boundingSphere:y.BoundingSphere.fromVertices(e),primitiveType:h.PrimitiveType.LINES})}(k.PolylineVolumeGeometryLibrary.computePositions(a,t,i,e,!1),t)}},function(e,i){return d.defined(i)&&(e=T.unpack(e,i)),e._ellipsoid=c.Ellipsoid.clone(e._ellipsoid),T.createGeometry(e)}});
