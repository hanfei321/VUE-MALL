define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./AttributeCompression-8a5fa32d","./GeometryPipeline-635df242","./EncodedCartesian3-96cc4460","./IndexDatatype-523f50d6","./IntersectionTests-cc1722b0","./Plane-bb97f210","./GeometryOffsetAttribute-a79c4b79","./VertexFormat-15410d3c","./GeometryInstance-9c4aba48","./arrayRemoveDuplicates-f05ed775","./BoundingRectangle-7fd61f33","./EllipsoidTangentPlane-86347fa6","./ArcType-90391c26","./EllipsoidRhumbLine-b25fd372","./PolygonPipeline-bd17f470","./PolygonGeometryLibrary-a80bacff","./EllipsoidGeodesic-8f6c0327"],function(z,e,t,W,Y,b,U,j,r,a,Q,q,o,i,n,s,A,l,G,u,c,K,v,O,p,d,V,y,m,D,F,g){"use strict";var Z=new Y.Cartographic,J=new Y.Cartographic;var L=new d.BoundingRectangle,X=new Y.Cartesian3,$=new Y.Cartesian3,ee=new Y.Cartesian3,te=new Y.Cartesian3,re=new Y.Cartesian3,ae=new Y.Cartesian3,oe=new Y.Cartesian3,ie=new Y.Cartesian3,ne=new Y.Cartesian3,se=new Y.Cartesian2,le=new Y.Cartesian2,ue=new Y.Cartesian3,ce=new U.Quaternion,pe=new j.Matrix3,de=new j.Matrix3;function N(e){var t,r=e.vertexFormat,a=e.geometry,o=e.shadowVolume,i=a.attributes.position.values,n=i.length,s=e.wall,l=e.top||s,u=e.bottom||s;if(r.st||r.normal||r.tangent||r.bitangent||o){var c=e.boundingRectangle,p=e.tangentPlane,d=e.ellipsoid,y=e.stRotation,m=e.perPositionHeight,g=se;g.x=c.x,g.y=c.y;var h,f=r.st?new Float32Array(n/3*2):void 0;r.normal&&(h=m&&l&&!s?a.attributes.normal.values:new Float32Array(n));var b,v=r.tangent?new Float32Array(n):void 0,_=r.bitangent?new Float32Array(n):void 0,P=o?new Float32Array(n):void 0,x=0,C=0,w=$,T=ee,I=te,E=!0,A=pe,G=de;G=0!==y?(b=U.Quaternion.fromAxisAngle(p._plane.normal,y,ce),A=j.Matrix3.fromQuaternion(b,A),b=U.Quaternion.fromAxisAngle(p._plane.normal,-y,ce),j.Matrix3.fromQuaternion(b,G)):(A=j.Matrix3.clone(j.Matrix3.IDENTITY,A),j.Matrix3.clone(j.Matrix3.IDENTITY,G));var O=0,V=0;l&&u&&(O=n/2,V=n/3,n/=2);for(var D=0;D<n;D+=3){var F,L,N,H,R,M,S,B,k=Y.Cartesian3.fromArray(i,D,ue);r.st&&(F=j.Matrix3.multiplyByVector(A,k,X),F=d.scaleToGeodeticSurface(F,F),L=p.projectPointOntoPlane(F,le),Y.Cartesian2.subtract(L,g,L),N=W.CesiumMath.clamp(L.x/c.width,0,1),H=W.CesiumMath.clamp(L.y/c.height,0,1),u&&(f[x+V]=N,f[x+1+V]=H),l&&(f[x]=N,f[x+1]=H),x+=2),(r.normal||r.tangent||r.bitangent||o)&&(R=C+1,M=C+2,s?(D+3<n&&(S=Y.Cartesian3.fromArray(i,D+3,re),E&&(B=Y.Cartesian3.fromArray(i,D+n,ae),m&&(t=k,F=S,L=B,N=void 0,N=(H=d).cartesianToCartographic(t,Z).height,(t=H.cartesianToCartographic(F,J)).height=N,H.cartographicToCartesian(t,F),(F=H.cartesianToCartographic(L,J)).height=N-100,H.cartographicToCartesian(F,L)),Y.Cartesian3.subtract(S,k,S),Y.Cartesian3.subtract(B,k,B),w=Y.Cartesian3.normalize(Y.Cartesian3.cross(B,S,w),w),E=!1),Y.Cartesian3.equalsEpsilon(S,k,W.CesiumMath.EPSILON10)&&(E=!0)),(r.tangent||r.bitangent)&&(I=d.geodeticSurfaceNormal(k,I),r.tangent&&(T=Y.Cartesian3.normalize(Y.Cartesian3.cross(I,w,T),T)))):(w=d.geodeticSurfaceNormal(k,w),(r.tangent||r.bitangent)&&(m&&(oe=Y.Cartesian3.fromArray(h,C,oe),ie=Y.Cartesian3.cross(Y.Cartesian3.UNIT_Z,oe,ie),ie=Y.Cartesian3.normalize(j.Matrix3.multiplyByVector(G,ie,ie),ie),r.bitangent&&(ne=Y.Cartesian3.normalize(Y.Cartesian3.cross(oe,ie,ne),ne))),T=Y.Cartesian3.cross(Y.Cartesian3.UNIT_Z,w,T),T=Y.Cartesian3.normalize(j.Matrix3.multiplyByVector(G,T,T),T),r.bitangent&&(I=Y.Cartesian3.normalize(Y.Cartesian3.cross(w,T,I),I)))),r.normal&&(e.wall?(h[C+O]=w.x,h[R+O]=w.y,h[M+O]=w.z):u&&(h[C+O]=-w.x,h[R+O]=-w.y,h[M+O]=-w.z),(l&&!m||s)&&(h[C]=w.x,h[R]=w.y,h[M]=w.z)),o&&(s&&(w=d.geodeticSurfaceNormal(k,w)),P[C+O]=-w.x,P[R+O]=-w.y,P[M+O]=-w.z),r.tangent&&(e.wall?(v[C+O]=T.x,v[R+O]=T.y,v[M+O]=T.z):u&&(v[C+O]=-T.x,v[R+O]=-T.y,v[M+O]=-T.z),l&&(m?(v[C]=ie.x,v[R]=ie.y,v[M]=ie.z):(v[C]=T.x,v[R]=T.y,v[M]=T.z))),r.bitangent&&(u&&(_[C+O]=I.x,_[R+O]=I.y,_[M+O]=I.z),l&&(m?(_[C]=ne.x,_[R]=ne.y,_[M]=ne.z):(_[C]=I.x,_[R]=I.y,_[M]=I.z))),C+=3)}r.st&&(a.attributes.st=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:f})),r.normal&&(a.attributes.normal=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),r.tangent&&(a.attributes.tangent=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),r.bitangent&&(a.attributes.bitangent=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:_})),o&&(a.attributes.extrudeDirection=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P}))}return e.extrude&&z.defined(e.offsetAttribute)&&(y=i.length/3,b=new Uint8Array(y),e.offsetAttribute===K.GeometryOffsetAttribute.TOP?l&&u||s?b=K.arrayFill(b,1,0,y/2):l&&(b=K.arrayFill(b,1)):(y=e.offsetAttribute===K.GeometryOffsetAttribute.NONE?0:1,b=K.arrayFill(b,y)),a.attributes.applyOffset=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b})),a}var h=new Y.Cartographic,f=new Y.Cartographic,_={westOverIDL:0,eastOverIDL:0},P=new g.EllipsoidGeodesic;function x(e,t,r,a,o){if(o=z.defaultValue(o,new b.Rectangle),!z.defined(e)||e.length<3)return o.west=0,o.north=0,o.south=0,o.east=0,o;if(r===y.ArcType.RHUMB)return b.Rectangle.fromCartesianArray(e,t,o);P.ellipsoid.equals(t)||(P=new g.EllipsoidGeodesic(void 0,void 0,t)),o.west=Number.POSITIVE_INFINITY,o.east=Number.NEGATIVE_INFINITY,o.south=Number.POSITIVE_INFINITY,o.north=Number.NEGATIVE_INFINITY,_.westOverIDL=Number.POSITIVE_INFINITY,_.eastOverIDL=Number.NEGATIVE_INFINITY;for(var i,n=1/W.CesiumMath.chordLength(a,t.maximumRadius),s=e.length,l=t.cartesianToCartographic(e[0],f),u=h,c=1;c<s;c++)i=u,u=l,l=t.cartesianToCartographic(e[c],i),P.setEndPoints(u,l),w(P,n,o,_);return i=u,u=l,l=t.cartesianToCartographic(e[0],i),P.setEndPoints(u,l),w(P,n,o,_),o.east-o.west>_.eastOverIDL-_.westOverIDL&&(o.west=_.westOverIDL,o.east=_.eastOverIDL,o.east>W.CesiumMath.PI&&(o.east=o.east-W.CesiumMath.TWO_PI),o.west>W.CesiumMath.PI&&(o.west=o.west-W.CesiumMath.TWO_PI)),o}var C=new Y.Cartographic;function w(e,t,r,a){for(var o=e.surfaceDistance,i=Math.ceil(o*t),n=0<i?o/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,C);s+=n;var c=u.longitude,u=u.latitude;r.west=Math.min(r.west,c),r.east=Math.max(r.east,c),r.south=Math.min(r.south,u),r.north=Math.max(r.north,u);c=0<=c?c:c+W.CesiumMath.TWO_PI;a.westOverIDL=Math.min(a.westOverIDL,c),a.eastOverIDL=Math.max(a.eastOverIDL,c)}}var H=[];function T(e){var t,r=e.polygonHierarchy,a=z.defaultValue(e.vertexFormat,v.VertexFormat.DEFAULT),o=z.defaultValue(e.ellipsoid,b.Ellipsoid.WGS84),i=z.defaultValue(e.granularity,W.CesiumMath.RADIANS_PER_DEGREE),n=z.defaultValue(e.stRotation,0),s=z.defaultValue(e.perPositionHeight,!1),l=s&&z.defined(e.extrudedHeight),u=z.defaultValue(e.height,0),c=z.defaultValue(e.extrudedHeight,u),p=z.defaultValue(e.relativeExtruded,!1);l||p||(t=Math.max(u,c),c=Math.min(u,c),u=t),this._vertexFormat=v.VertexFormat.clone(a),this._ellipsoid=b.Ellipsoid.clone(o),this._granularity=i,this._stRotation=n,this._height=u,this._extrudedHeight=c,this._relativeExtruded=p,this._closeTop=z.defaultValue(e.closeTop,!0),this._closeBottom=z.defaultValue(e.closeBottom,!0),this._polygonHierarchy=r,this._perPositionHeight=s,this._perPositionHeightExtrude=l,this._shadowVolume=z.defaultValue(e.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=e.offsetAttribute,this._arcType=z.defaultValue(e.arcType,y.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=F.PolygonGeometryLibrary.computeHierarchyPackedLength(r)+b.Ellipsoid.packedLength+v.VertexFormat.packedLength+12}T.fromPositions=function(e){return new T({polygonHierarchy:{positions:(e=z.defaultValue(e,z.defaultValue.EMPTY_OBJECT)).positions},height:e.height,extrudedHeight:e.extrudedHeight,relativeExtruded:e.relativeExtruded,vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,closeTop:e.closeTop,closeBottom:e.closeBottom,offsetAttribute:e.offsetAttribute,arcType:e.arcType})},T.pack=function(e,t,r){return r=z.defaultValue(r,0),r=F.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,r),b.Ellipsoid.pack(e._ellipsoid,t,r),r+=b.Ellipsoid.packedLength,v.VertexFormat.pack(e._vertexFormat,t,r),r+=v.VertexFormat.packedLength,t[r++]=e._height,t[r++]=e._extrudedHeight,t[r++]=e._relativeExtruded?1:0,t[r++]=e._granularity,t[r++]=e._stRotation,t[r++]=e._perPositionHeightExtrude?1:0,t[r++]=e._perPositionHeight?1:0,t[r++]=e._closeTop?1:0,t[r++]=e._closeBottom?1:0,t[r++]=e._shadowVolume?1:0,t[r++]=z.defaultValue(e._offsetAttribute,-1),t[r++]=e._arcType,t[r]=e.packedLength,t};var I=b.Ellipsoid.clone(b.Ellipsoid.UNIT_SPHERE),E=new v.VertexFormat,R={polygonHierarchy:{}};return T.unpack=function(e,t,r){t=z.defaultValue(t,0);var a=F.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=a.startingIndex,delete a.startingIndex;var o=b.Ellipsoid.unpack(e,t,I);t+=b.Ellipsoid.packedLength;var i=v.VertexFormat.unpack(e,t,E);t+=v.VertexFormat.packedLength;var n=e[t++],s=e[t++],l=e[t++],u=e[t++],c=e[t++],p=1===e[t++],d=1===e[t++],y=1===e[t++],m=1===e[t++],g=1===e[t++],h=e[t++],f=e[t++],t=e[t];return z.defined(r)||(r=new T(R)),r._polygonHierarchy=a,r._ellipsoid=b.Ellipsoid.clone(o,r._ellipsoid),r._vertexFormat=v.VertexFormat.clone(i,r._vertexFormat),r._height=n,r._extrudedHeight=s,r._relativeExtruded=l,r._granularity=u,r._stRotation=c,r._perPositionHeightExtrude=p,r._perPositionHeight=d,r._closeTop=y,r._closeBottom=m,r._shadowVolume=g,r._offsetAttribute=-1===h?void 0:h,r._arcType=f,r.packedLength=t,r},T.computeRectangle=function(e,t){var r=z.defaultValue(e.granularity,W.CesiumMath.RADIANS_PER_DEGREE),a=z.defaultValue(e.arcType,y.ArcType.GEODESIC),o=e.polygonHierarchy,e=z.defaultValue(e.ellipsoid,b.Ellipsoid.WGS84);return x(o.positions,e,a,r,t)},T.createGeometry=function(e){var t=e._vertexFormat,r=e._ellipsoid,a=e._granularity,o=e._stRotation,i=!e._relativeExtruded,n=e._polygonHierarchy,s=e._perPositionHeight,l=e._closeTop,u=e._closeBottom,c=e._arcType,p=n.positions;if(!(p.length<3)){var d=V.EllipsoidTangentPlane.fromPoints(p,r),n=F.PolygonGeometryLibrary.polygonsFromHierarchy(n,d.projectPointsOntoPlane.bind(d),!s,r),y=n.hierarchy,m=n.polygons;if(0!==y.length){p=y[0].outerRing;var g,p=F.PolygonGeometryLibrary.computeBoundingRectangle(d.plane.normal,d.projectPointOntoPlane.bind(d),p,o,L),h=[],f=e._height,b=e._extrudedHeight,v={perPositionHeight:s,vertexFormat:t,geometry:void 0,tangentPlane:d,boundingRectangle:p,ellipsoid:r,stRotation:o,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:c};if(e._perPositionHeightExtrude||!W.CesiumMath.equalsEpsilon(f,b,0,W.CesiumMath.EPSILON2))for(v.extrude=!0,v.top=l,v.bottom=u,v.shadowVolume=e._shadowVolume,v.offsetAttribute=e._offsetAttribute,g=0;g<m.length;g++){var _,P=function(e,t,r,a,o,i,n,s,l){var u={walls:[]};if(i||n){var c=F.PolygonGeometryLibrary.createGeometryFromPositions(e,t,r,o,s,l),t=c.attributes.position.values,p=c.indices;if(i&&n){var d,i=t.concat(t),y=i.length/3;(d=G.IndexDatatype.createTypedArray(y,2*p.length)).set(p);for(var m=p.length,g=y/2,h=0;h<m;h+=3){var f=d[h]+g,b=d[h+1]+g,v=d[h+2]+g;d[h+m]=v,d[h+1+m]=b,d[h+2+m]=f}c.attributes.position.values=i,o&&s.normal&&(s=c.attributes.normal.values,c.attributes.normal.values=new Float32Array(i.length),c.attributes.normal.values.set(s)),c.indices=d}else if(n){for(y=t.length/3,d=G.IndexDatatype.createTypedArray(y,p.length),h=0;h<p.length;h+=3)d[h]=p[h+2],d[h+1]=p[h+1],d[h+2]=p[h];c.indices=d}u.topAndBottom=new O.GeometryInstance({geometry:c})}var c=a.outerRing,_=V.EllipsoidTangentPlane.fromPoints(c,e).projectPointsOntoPlane(c,H);D.PolygonPipeline.computeWindingOrder2D(_)===D.WindingOrder.CLOCKWISE&&(c=c.slice().reverse());var P=F.PolygonGeometryLibrary.computeWallGeometry(c,e,r,o,l);u.walls.push(new O.GeometryInstance({geometry:P}));var x=a.holes;for(h=0;h<x.length;h++){var C=x[h],_=V.EllipsoidTangentPlane.fromPoints(C,e).projectPointsOntoPlane(C,H);D.PolygonPipeline.computeWindingOrder2D(_)===D.WindingOrder.COUNTER_CLOCKWISE&&(C=C.slice().reverse()),P=F.PolygonGeometryLibrary.computeWallGeometry(C,e,r,o,l),u.walls.push(new O.GeometryInstance({geometry:P}))}return u}(r,m[g],a,y[g],s,l,u,t,c);l&&u?(_=P.topAndBottom,v.geometry=F.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(_.geometry,f,b,r,s,i)):l?((_=P.topAndBottom).geometry.attributes.position.values=D.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,f,r,!s),v.geometry=_.geometry):u&&((_=P.topAndBottom).geometry.attributes.position.values=D.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,b,r,i),v.geometry=_.geometry),(l||u)&&(v.wall=!1,_.geometry=N(v),h.push(_));var x=P.walls;v.wall=!0;for(var C=0;C<x.length;C++){var w=x[C];v.geometry=F.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(w.geometry,f,b,r,s,i),w.geometry=N(v),h.push(w)}}else for(g=0;g<m.length;g++){var T,I,E=new O.GeometryInstance({geometry:F.PolygonGeometryLibrary.createGeometryFromPositions(r,m[g],a,s,t,c)});E.geometry.attributes.position.values=D.PolygonPipeline.scaleToGeodeticHeight(E.geometry.attributes.position.values,f,r,!s),v.geometry=E.geometry,E.geometry=N(v),z.defined(e._offsetAttribute)&&(I=E.geometry.attributes.position.values.length,T=new Uint8Array(I/3),I=e._offsetAttribute===K.GeometryOffsetAttribute.NONE?0:1,K.arrayFill(T,I),E.geometry.attributes.applyOffset=new q.GeometryAttribute({componentDatatype:Q.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:T})),h.push(E)}d=A.GeometryPipeline.combineInstances(h)[0];d.attributes.position.values=new Float64Array(d.attributes.position.values),d.indices=G.IndexDatatype.createTypedArray(d.attributes.position.values.length/3,d.indices);p=d.attributes,o=U.BoundingSphere.fromVertices(p.position.values);return t.position||delete p.position,new q.Geometry({attributes:p,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:o,offsetAttribute:e._offsetAttribute})}}},T.createShadowVolume=function(e,t,r){var a=e._granularity,o=e._ellipsoid,t=t(a,o),r=r(a,o);return new T({polygonHierarchy:e._polygonHierarchy,ellipsoid:o,stRotation:e._stRotation,granularity:a,perPositionHeight:!1,extrudedHeight:t,height:r,vertexFormat:v.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(T.prototype,{rectangle:{get:function(){var e;return z.defined(this._rectangle)||(e=this._polygonHierarchy.positions,this._rectangle=x(e,this._ellipsoid,this._arcType,this._granularity)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return z.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0==t)return[0,0,0,1,1,0];var r=e._ellipsoid,a=e._polygonHierarchy.positions,e=e.rectangle;return q.Geometry._textureCoordinateRotationPoints(a,t,r,e)}(this)),this._textureCoordinateRotationPoints}}}),function(e,t){return z.defined(t)&&(e=T.unpack(e,t)),e._ellipsoid=b.Ellipsoid.clone(e._ellipsoid),T.createGeometry(e)}});
