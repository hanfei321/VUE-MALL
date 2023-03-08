define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./IndexDatatype-523f50d6","./createTaskProcessorWorker","./GeometryOffsetAttribute-a79c4b79","./VertexFormat-15410d3c","./BoxGeometry-a21db16b","./CylinderGeometryLibrary-09be0acd","./CylinderGeometry-fe450d53","./EllipsoidGeometry-c9a45448","./Color-7f022f58"],function(S,e,t,n,V,a,T,F,r,i,o,d,s,c,f,k,l,u,h,M,b,B,w,R){"use strict";function D(e){this.offset=e.offset,this.count=e.count,this.color=e.color,this.batchIds=e.batchIds}var p=new V.Cartesian3,y=F.Matrix4.packedLength+V.Cartesian3.packedLength,x=F.Matrix4.packedLength+2,g=F.Matrix4.packedLength+V.Cartesian3.packedLength,C=V.Cartesian3.packedLength+1,m={modelMatrix:new F.Matrix4,boundingVolume:new T.BoundingSphere};function A(e,t){var n=t*y,t=V.Cartesian3.unpack(e,n,p);n+=V.Cartesian3.packedLength;n=F.Matrix4.unpack(e,n,m.modelMatrix);F.Matrix4.multiplyByScale(n,t,n);n=m.boundingVolume;return V.Cartesian3.clone(V.Cartesian3.ZERO,n.center),n.radius=Math.sqrt(3),m}function O(e,t){var n=t*x,a=e[n++],t=e[n++],t=V.Cartesian3.fromElements(a,a,t,p),n=F.Matrix4.unpack(e,n,m.modelMatrix);F.Matrix4.multiplyByScale(n,t,n);n=m.boundingVolume;return V.Cartesian3.clone(V.Cartesian3.ZERO,n.center),n.radius=Math.sqrt(2),m}function L(e,t){var n=t*g,t=V.Cartesian3.unpack(e,n,p);n+=V.Cartesian3.packedLength;n=F.Matrix4.unpack(e,n,m.modelMatrix);F.Matrix4.multiplyByScale(n,t,n);n=m.boundingVolume;return V.Cartesian3.clone(V.Cartesian3.ZERO,n.center),n.radius=1,m}function E(e,t){var n=t*C,t=e[n++],n=V.Cartesian3.unpack(e,n,p),n=F.Matrix4.fromTranslation(n,m.modelMatrix);F.Matrix4.multiplyByUniformScale(n,t,n);n=m.boundingVolume;return V.Cartesian3.clone(V.Cartesian3.ZERO,n.center),n.radius=1,m}var Z=new V.Cartesian3;function U(e,t,n,a,r){if(S.defined(t)){for(var i=n.length,o=a.attributes.position.values,d=a.indices,s=e.positions,c=e.vertexBatchIds,f=e.indices,l=e.batchIds,u=e.batchTableColors,h=e.batchedIndices,b=e.indexOffsets,p=e.indexCounts,y=e.boundingVolumes,x=e.modelMatrix,g=e.center,C=e.positionOffset,m=e.batchIdIndex,v=e.indexOffset,I=e.batchedIndicesOffset,k=0;k<i;++k){var M=r(t,k),B=M.modelMatrix;F.Matrix4.multiply(x,B,B);for(var w=n[k],A=o.length,O=0;O<A;O+=3){var L=V.Cartesian3.unpack(o,O,Z);F.Matrix4.multiplyByPoint(B,L,L),V.Cartesian3.subtract(L,g,L),V.Cartesian3.pack(L,s,3*C+O),c[m++]=w}for(var E=d.length,U=0;U<E;++U)f[v+U]=d[U]+C;var G=k+I;h[G]=new D({offset:v,count:E,color:R.Color.fromRgba(u[w]),batchIds:[w]}),l[G]=w,b[G]=v,p[G]=E,y[G]=T.BoundingSphere.transform(M.boundingVolume,B),C+=A/3,v+=E}e.positionOffset=C,e.batchIdIndex=m,e.indexOffset=v,e.batchedIndicesOffset+=i}}var G=new V.Cartesian3,P=new F.Matrix4;function q(e,t,n){var a=n.length,r=2+a*T.BoundingSphere.packedLength+1+function(e){for(var t=e.length,n=0,a=0;a<t;++a)n+=R.Color.packedLength+3+e[a].batchIds.length;return n}(t),i=new Float64Array(r),o=0;i[o++]=e,i[o++]=a;for(var d=0;d<a;++d)T.BoundingSphere.pack(n[d],i,o),o+=T.BoundingSphere.packedLength;var s=t.length;i[o++]=s;for(var c=0;c<s;++c){var f=t[c];R.Color.pack(f.color,i,o),o+=R.Color.packedLength,i[o++]=f.offset,i[o++]=f.count;var l=f.batchIds,u=l.length;i[o++]=u;for(var h=0;h<u;++h)i[o++]=l[h]}return i}return l(function(e,t){var n=S.defined(e.boxes)?new Float32Array(e.boxes):void 0,a=S.defined(e.boxBatchIds)?new Uint16Array(e.boxBatchIds):void 0,r=S.defined(e.cylinders)?new Float32Array(e.cylinders):void 0,i=S.defined(e.cylinderBatchIds)?new Uint16Array(e.cylinderBatchIds):void 0,o=S.defined(e.ellipsoids)?new Float32Array(e.ellipsoids):void 0,d=S.defined(e.ellipsoidBatchIds)?new Uint16Array(e.ellipsoidBatchIds):void 0,s=S.defined(e.spheres)?new Float32Array(e.spheres):void 0,c=S.defined(e.sphereBatchIds)?new Uint16Array(e.sphereBatchIds):void 0,f=S.defined(n)?a.length:0,l=S.defined(r)?i.length:0,u=S.defined(o)?d.length:0,h=S.defined(s)?c.length:0,b=M.BoxGeometry.getUnitBox(),p=B.CylinderGeometry.getUnitCylinder(),y=w.EllipsoidGeometry.getUnitEllipsoid(),x=b.attributes.position.values,g=p.attributes.position.values,C=y.attributes.position.values,m=x.length*f;m+=g.length*l,m+=C.length*(u+h);var v=b.indices,I=p.indices,x=y.indices,g=v.length*f;return g+=I.length*l,g+=x.length*(u+h),C=new Float32Array(m),v=new Uint16Array(m/3),I=k.IndexDatatype.createTypedArray(m/3,g),x=f+l+u+h,m=new Uint16Array(x),g=new Array(x),f=new Uint32Array(x),l=new Uint32Array(x),u=new Array(x),h=e.packedBuffer,x=new Float64Array(h),h=0,V.Cartesian3.unpack(x,0,G),h+=V.Cartesian3.packedLength,F.Matrix4.unpack(x,h,P),U(e={batchTableColors:new Uint32Array(e.batchTableColors),positions:C,vertexBatchIds:v,indices:I,batchIds:m,batchedIndices:g,indexOffsets:f,indexCounts:l,boundingVolumes:u,positionOffset:0,batchIdIndex:0,indexOffset:0,batchedIndicesOffset:0,modelMatrix:P,center:G},n,a,b,A),U(e,r,i,p,O),U(e,o,d,y,L),U(e,s,c,y,E),u=q(I.BYTES_PER_ELEMENT,g,u),t.push(C.buffer,v.buffer,I.buffer),t.push(m.buffer,f.buffer,l.buffer),t.push(u.buffer),{positions:C.buffer,vertexBatchIds:v.buffer,indices:I.buffer,indexOffsets:f.buffer,indexCounts:l.buffer,batchIds:m.buffer,packedBuffer:u.buffer}})});