define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./AttributeCompression-8a5fa32d","./GeometryPipeline-635df242","./EncodedCartesian3-96cc4460","./IndexDatatype-523f50d6","./IntersectionTests-cc1722b0","./Plane-bb97f210","./GeometryInstance-9c4aba48","./arrayRemoveDuplicates-f05ed775","./EllipsoidTangentPlane-86347fa6","./OrientedBoundingBox-6de788ea","./CoplanarPolygonGeometryLibrary-a109caa1","./ArcType-90391c26","./EllipsoidRhumbLine-b25fd372","./PolygonPipeline-bd17f470","./PolygonGeometryLibrary-a80bacff"],function(a,e,t,r,i,n,y,o,l,c,p,u,s,d,f,b,m,g,h,P,G,v,L,C,E,T,k,H,w,A){"use strict";function D(e){e=(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=A.PolygonGeometryLibrary.computeHierarchyPackedLength(e)+1}D.fromPositions=function(e){return new D({polygonHierarchy:{positions:(e=a.defaultValue(e,a.defaultValue.EMPTY_OBJECT)).positions}})},D.pack=function(e,t,r){return r=a.defaultValue(r,0),t[r=A.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r)]=e.packedLength,t};var I={polygonHierarchy:{}};return D.unpack=function(e,t,r){t=a.defaultValue(t,0);var n=A.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=n.startingIndex,delete n.startingIndex;t=e[t];return a.defined(r)||(r=new D(I)),r._polygonHierarchy=n,r.packedLength=t,r},D.createGeometry=function(e){var t=e._polygonHierarchy,e=t.positions,e=L.arrayRemoveDuplicates(e,i.Cartesian3.equalsEpsilon,!0);if(!(e.length<3)&&T.CoplanarPolygonGeometryLibrary.validOutline(e)){var r=A.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==r.length){for(var n=[],a=0;a<r.length;a++){var o=new v.GeometryInstance({geometry:function(e){for(var t=e.length,r=new Float64Array(3*t),n=h.IndexDatatype.createTypedArray(t,2*t),a=0,o=0,i=0;i<t;i++){var y=e[i];r[a++]=y.x,r[a++]=y.y,r[a++]=y.z,n[o++]=i,n[o++]=(i+1)%t}var l=new f.GeometryAttributes({position:new u.GeometryAttribute({componentDatatype:p.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:r})});return new u.Geometry({attributes:l,indices:n,primitiveType:u.PrimitiveType.LINES})}(r[a])});n.push(o)}e=m.GeometryPipeline.combineInstances(n)[0],t=y.BoundingSphere.fromPoints(t.positions);return new u.Geometry({attributes:e.attributes,indices:e.indices,primitiveType:e.primitiveType,boundingSphere:t})}}},function(e,t){return a.defined(t)&&(e=D.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),D.createGeometry(e)}});
