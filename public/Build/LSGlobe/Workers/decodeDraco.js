define(["./defaultValue-bcb5baf7","./DeveloperError-b273b01a","./Check-f9a1a1be","./Math-588d98f6","./RuntimeError-1b5fbc4d","./WebGLConstants-667a4a5e","./ComponentDatatype-ec1abf38","./when-ae2a7552","./IndexDatatype-523f50d6","./createTaskProcessorWorker"],function(d,e,t,r,f,n,c,a,y,o){"use strict";var A;function b(e,t,r){var n,a=e.num_points(),o=r.num_components(),i=new A.AttributeQuantizationTransform;if(i.InitFromAttribute(r)){for(var u=new Array(o),s=0;s<o;++s)u[s]=i.min_value(s);n={quantizationBits:i.quantization_bits(),minValues:u,range:i.range(),octEncoded:!1}}A.destroy(i),(i=new A.AttributeOctahedronTransform).InitFromAttribute(r)&&(n={quantizationBits:i.quantization_bits(),octEncoded:!0}),A.destroy(i);a*=o,t=d.defined(n)?function(e,t,r,n,a){var o,i;n.quantizationBits<=8?(i=new A.DracoUInt8Array,o=new Uint8Array(a),t.GetAttributeUInt8ForAllPoints(e,r,i)):(i=new A.DracoUInt16Array,o=new Uint16Array(a),t.GetAttributeUInt16ForAllPoints(e,r,i));for(var u=0;u<a;++u)o[u]=i.GetValue(u);return A.destroy(i),o}(e,t,r,n,a):function(e,t,r,n){var a,o;switch(r.data_type()){case 1:case 11:o=new A.DracoInt8Array,a=new Int8Array(n),t.GetAttributeInt8ForAllPoints(e,r,o);break;case 2:o=new A.DracoUInt8Array,a=new Uint8Array(n),t.GetAttributeUInt8ForAllPoints(e,r,o);break;case 3:o=new A.DracoInt16Array,a=new Int16Array(n),t.GetAttributeInt16ForAllPoints(e,r,o);break;case 4:o=new A.DracoUInt16Array,a=new Uint16Array(n),t.GetAttributeUInt16ForAllPoints(e,r,o);break;case 5:case 7:o=new A.DracoInt32Array,a=new Int32Array(n),t.GetAttributeInt32ForAllPoints(e,r,o);break;case 6:case 8:o=new A.DracoUInt32Array,a=new Uint32Array(n),t.GetAttributeUInt32ForAllPoints(e,r,o);break;case 9:case 10:o=new A.DracoFloat32Array,a=new Float32Array(n),t.GetAttributeFloatForAllPoints(e,r,o)}for(var i=0;i<n;++i)a[i]=o.GetValue(i);return A.destroy(o),a}(e,t,r,a),a=c.ComponentDatatype.fromTypedArray(t);return{array:t,data:{componentsPerAttribute:o,componentDatatype:a,byteOffset:r.byte_offset(),byteStride:c.ComponentDatatype.getSizeInBytes(a)*o,normalized:r.normalized(),quantization:n}}}function i(e){var t=new A.Decoder,r=["POSITION","NORMAL","COLOR","TEX_COORD"];if(e.dequantizeInShader)for(var n=0;n<r.length;++n)t.SkipAttributeTransform(A[r[n]]);var a=e.bufferView,o=new A.DecoderBuffer;if(o.Init(e.array,a.byteLength),t.GetEncodedGeometryType(o)!==A.TRIANGULAR_MESH)throw new f.RuntimeError("Unsupported draco mesh geometry type.");var i=new A.Mesh,a=t.DecodeBufferToMesh(o,i);if(!a.ok()||0===i.ptr)throw new f.RuntimeError("Error decoding draco mesh geometry: "+a.error_msg());A.destroy(o);var u,s,d={},c=e.compressedAttributes;for(u in c)c.hasOwnProperty(u)&&(s=c[u],s=t.GetAttributeByUniqueId(i,s),d[u]=b(i,t,s));e={indexArray:function(e,t){for(var r=e.num_points(),n=e.num_faces(),a=new A.DracoInt32Array,o=3*n,i=y.IndexDatatype.createTypedArray(r,o),u=0,s=0;s<n;++s)t.GetFaceFromMesh(e,s,a),i[u+0]=a.GetValue(0),i[u+1]=a.GetValue(1),i[u+2]=a.GetValue(2),u+=3;return A.destroy(a),{typedArray:i,numberOfIndices:o}}(i,t),attributeData:d};return A.destroy(i),A.destroy(t),e}function u(e){return(d.defined(e.primitive)?i:function(e){var t=new A.Decoder;e.dequantizeInShader&&(t.SkipAttributeTransform(A.POSITION),t.SkipAttributeTransform(A.NORMAL));var r=new A.DecoderBuffer;if(r.Init(e.buffer,e.buffer.length),t.GetEncodedGeometryType(r)!==A.POINT_CLOUD)throw new f.RuntimeError("Draco geometry type must be POINT_CLOUD.");var n=new A.PointCloud,a=t.DecodeBufferToPointCloud(r,n);if(!a.ok()||0===n.ptr)throw new f.RuntimeError("Error decoding draco point cloud: "+a.error_msg());A.destroy(r);var o,i,u={},s=e.properties;for(o in s)s.hasOwnProperty(o)&&(i=s[o],i=t.GetAttributeByUniqueId(n,i),u[o]=b(n,t,i));return A.destroy(n),A.destroy(t),u})(e)}function s(e){A=e,self.onmessage=o(u),self.postMessage(!0)}return function(e){var t=e.data.webAssemblyConfig;if(d.defined(t))return require([t.modulePath],function(e){d.defined(t.wasmBinaryFile)?(d.defined(e)||(e=self.DracoDecoderModule),e(t).then(function(e){s(e)})):s(e())})}});
