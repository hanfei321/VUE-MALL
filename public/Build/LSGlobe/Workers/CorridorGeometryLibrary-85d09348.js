define(["exports","./defaultValue-bcb5baf7","./Math-588d98f6","./Cartesian2-10213add","./Transforms-2b063051","./Matrix4-c981b715","./PolylineVolumeGeometryLibrary-a52c795b","./PolylinePipeline-74d8353e"],function(a,s,V,O,u,d,R,Q){"use strict";var e={},U=new O.Cartesian3,c=new O.Cartesian3,p=new O.Cartesian3,m=new O.Cartesian3,G=[new O.Cartesian3,new O.Cartesian3],I=new O.Cartesian3,q=new O.Cartesian3,j=new O.Cartesian3,k=new O.Cartesian3,F=new O.Cartesian3,H=new O.Cartesian3,J=new O.Cartesian3,K=new O.Cartesian3,W=new O.Cartesian3,X=new O.Cartesian3,g=new u.Quaternion,h=new d.Matrix3;function Y(a,e,r,n,t){var i,s=O.Cartesian3.angleBetween(O.Cartesian3.subtract(e,a,U),O.Cartesian3.subtract(r,a,c)),o=n===R.CornerType.BEVELED?1:Math.ceil(s/V.CesiumMath.toRadians(5))+1,n=3*o,l=new Array(n);l[n-3]=r.x,l[n-2]=r.y,l[n-1]=r.z,i=t?d.Matrix3.fromQuaternion(u.Quaternion.fromAxisAngle(O.Cartesian3.negate(a,U),s/o,g),h):d.Matrix3.fromQuaternion(u.Quaternion.fromAxisAngle(a,s/o,g),h);var C=0;e=O.Cartesian3.clone(e,U);for(var y=0;y<o;y++)e=d.Matrix3.multiplyByVector(i,e,e),l[C++]=e.x,l[C++]=e.y,l[C++]=e.z;return l}function Z(a,e,r,n){var t=U;return[(t=(n||(e=O.Cartesian3.negate(e,e)),O.Cartesian3.add(a,e,t))).x,t.y,t.z,r.x,r.y,r.z]}function $(a,e,r,n){for(var t=new Array(a.length),i=new Array(a.length),s=O.Cartesian3.multiplyByScalar(e,r,U),o=O.Cartesian3.negate(s,c),l=0,C=a.length-1,y=0;y<a.length;y+=3){var u=O.Cartesian3.fromArray(a,y,p),d=O.Cartesian3.add(u,o,m);t[l++]=d.x,t[l++]=d.y,t[l++]=d.z;u=O.Cartesian3.add(u,s,m);i[C--]=u.z,i[C--]=u.y,i[C--]=u.x}return n.push(t,i),n}e.addAttribute=function(a,e,r,n){var t=e.x,i=e.y,e=e.z;s.defined(r)&&(a[r]=t,a[r+1]=i,a[r+2]=e),s.defined(n)&&(a[n]=e,a[n-1]=i,a[n-2]=t)};var _=new O.Cartesian3,aa=new O.Cartesian3;e.computePositions=function(a){var e=a.granularity,r=a.positions,n=a.ellipsoid,t=a.width/2,i=a.cornerType,s=a.saveAttributes,o=I,l=q,C=j,y=k,u=F,d=H,c=J,p=K,m=W,g=X,h=[],f=s?[]:void 0,w=s?[]:void 0,x=r[0],z=r[1],l=O.Cartesian3.normalize(O.Cartesian3.subtract(z,x,l),l),o=n.geodeticSurfaceNormal(x,o),y=O.Cartesian3.normalize(O.Cartesian3.cross(o,l,y),y);s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),c=O.Cartesian3.clone(x,c),x=z,C=O.Cartesian3.negate(l,C);for(var b,P,A,B,v,E,S,D=[],M=r.length,T=1;T<M-1;T++){o=n.geodeticSurfaceNormal(x,o),z=r[T+1],l=O.Cartesian3.normalize(O.Cartesian3.subtract(z,x,l),l),u=O.Cartesian3.normalize(O.Cartesian3.add(l,C,u),u);var N=O.Cartesian3.multiplyByScalar(o,O.Cartesian3.dot(l,o),_);O.Cartesian3.subtract(l,N,N),O.Cartesian3.normalize(N,N);var L=O.Cartesian3.multiplyByScalar(o,O.Cartesian3.dot(C,o),aa);O.Cartesian3.subtract(C,L,L),O.Cartesian3.normalize(L,L),V.CesiumMath.equalsEpsilon(Math.abs(O.Cartesian3.dot(N,L)),1,V.CesiumMath.EPSILON7)||(u=O.Cartesian3.cross(u,o,u),u=O.Cartesian3.cross(o,u,u),u=O.Cartesian3.normalize(u,u),N=t/Math.max(.25,O.Cartesian3.magnitude(O.Cartesian3.cross(u,C,U))),L=R.PolylineVolumeGeometryLibrary.angleIsGreaterThanPi(l,C,x,n),u=O.Cartesian3.multiplyByScalar(u,N,u),L?(p=O.Cartesian3.add(x,u,p),g=O.Cartesian3.add(p,O.Cartesian3.multiplyByScalar(y,t,g),g),m=O.Cartesian3.add(p,O.Cartesian3.multiplyByScalar(y,2*t,m),m),G[0]=O.Cartesian3.clone(c,G[0]),G[1]=O.Cartesian3.clone(g,G[1]),h=$(Q.PolylinePipeline.generateArc({positions:G,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),d=O.Cartesian3.clone(m,d),y=O.Cartesian3.normalize(O.Cartesian3.cross(o,l,y),y),m=O.Cartesian3.add(p,O.Cartesian3.multiplyByScalar(y,2*t,m),m),c=O.Cartesian3.add(p,O.Cartesian3.multiplyByScalar(y,t,c),c),i===R.CornerType.ROUNDED||i===R.CornerType.BEVELED?D.push({leftPositions:Y(p,d,m,i,L)}):D.push({leftPositions:Z(x,O.Cartesian3.negate(u,u),m,L)})):(m=O.Cartesian3.add(x,u,m),g=O.Cartesian3.add(m,O.Cartesian3.negate(O.Cartesian3.multiplyByScalar(y,t,g),g),g),p=O.Cartesian3.add(m,O.Cartesian3.negate(O.Cartesian3.multiplyByScalar(y,2*t,p),p),p),G[0]=O.Cartesian3.clone(c,G[0]),G[1]=O.Cartesian3.clone(g,G[1]),h=$(Q.PolylinePipeline.generateArc({positions:G,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),d=O.Cartesian3.clone(p,d),y=O.Cartesian3.normalize(O.Cartesian3.cross(o,l,y),y),p=O.Cartesian3.add(m,O.Cartesian3.negate(O.Cartesian3.multiplyByScalar(y,2*t,p),p),p),c=O.Cartesian3.add(m,O.Cartesian3.negate(O.Cartesian3.multiplyByScalar(y,t,c),c),c),i===R.CornerType.ROUNDED||i===R.CornerType.BEVELED?D.push({rightPositions:Y(m,d,p,i,L)}):D.push({rightPositions:Z(x,u,p,L)})),C=O.Cartesian3.negate(l,C)),x=z}return o=n.geodeticSurfaceNormal(x,o),G[0]=O.Cartesian3.clone(c,G[0]),G[1]=O.Cartesian3.clone(x,G[1]),h=$(Q.PolylinePipeline.generateArc({positions:G,granularity:e,ellipsoid:n}),y,t,h),s&&(f.push(y.x,y.y,y.z),w.push(o.x,o.y,o.z)),i===R.CornerType.ROUNDED&&(P=I,A=q,B=j,v=(b=h)[1],A=O.Cartesian3.fromArray(b[1],v.length-3,A),B=O.Cartesian3.fromArray(b[0],0,B),E=Y(P=O.Cartesian3.midpoint(A,B,P),A,B,R.CornerType.ROUNDED,!1),S=b.length-1,a=b[S-1],v=b[S],A=O.Cartesian3.fromArray(a,a.length-3,A),B=O.Cartesian3.fromArray(v,0,B),B=[E,Y(P=O.Cartesian3.midpoint(A,B,P),A,B,R.CornerType.ROUNDED,!1)]),{positions:h,corners:D,lefts:f,normals:w,endPositions:B}},a.CorridorGeometryLibrary=e});
