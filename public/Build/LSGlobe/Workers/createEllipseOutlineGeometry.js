define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./Cartesian2-10213add","./Rectangle-de996bfb","./Transforms-2b063051","./Matrix4-c981b715","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./GeometryAttribute-49fe2445","./when-ae2a7552","./buildModuleUrl-cd6b3599","./GeometryAttributes-a8cf4ac9","./IndexDatatype-523f50d6","./GeometryOffsetAttribute-a79c4b79","./EllipseGeometryLibrary-b1f9c41d","./EllipseOutlineGeometry-89e87d59"],function(r,e,t,a,i,n,l,o,b,c,d,f,s,u,p,m,y,G,E){"use strict";return function(e,t){return r.defined(t)&&(e=E.EllipseOutlineGeometry.unpack(e,t)),e._center=i.Cartesian3.clone(e._center),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),E.EllipseOutlineGeometry.createGeometry(e)}});