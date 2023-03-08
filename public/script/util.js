
/**
 * JS/CSS文件导入
 * @param filePath　文件路径
 * @param fileType　文件类型（js、css）
 * @return
 */
function loadJsOrCssFile(filePath) {
    var isJsFile = /js$/i.test(filePath);
    var fileType = isJsFile ? "js" : "css";

    if (isIncludeFile(filePath, isJsFile)) {
        return;
    }

    if (fileType == "js") {
        var fileRef = document.createElement('script')
        fileRef.setAttribute("type", "text/javascript")
        fileRef.setAttribute("src", filePath)
        // fileRef.setAttribute("defer ", true)
        fileRef.async = false
    } else if (fileType == "css") {
        var fileRef = document.createElement("link")
        fileRef.setAttribute("rel", "stylesheet")
        fileRef.setAttribute("type", "text/css")
        fileRef.setAttribute("href", filePath)
    }

    if (typeof fileRef != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileRef)
    }
}

/**
 * 判断JS/CSS文件是否导入
 * @param fileName　文件名
 * @return 是否导入
 */
function isIncludeFile(fileName, isJsFile) {
    var fileRefArray = document.getElementsByTagName(isJsFile ? 'script' : 'link');
    for (var i = 0, len = fileRefArray.length; i < len; i++) {
        if (fileRefArray[i][isJsFile ? 'src' : 'href'].indexOf(fileName) != -1) return true;
    }
    return false;
}


$(document).on("click", ".pop-close", function(){
    $(this).closest(".line-pop").hide()
})
/**
* @Description: 加入3dtiles
* @Param: item
* @return:
* @Author: Mr.WK
* @Date: 2020/10/29
*/
function fnInsert3DTiles(item){
    var tileset;
    var oTilesetOption={
        url: item.url,//3DTiles 请求路径
        maximumScreenSpaceError: 1
    };
    if(item.transform){
        oTilesetOption.transform=item.transform;
    }
    if(item.modelMatrix){
        oTilesetOption.modelMatrix=item.modelMatrix;
    }

    tileset = new LSGlobe.Cesium3DTileset(oTilesetOption);
    tileset.id=item.id;
    tileset.level=item.level;
    viewer.scene.primitives.add(tileset);
    tileset.readyPromise.then(function (tileset) {
        item.tileset=tileset;
        if(item&&item.callback){
            item.callback(tileset,true);
        }
    });
}

/**
 * @Description: 添加marker
 * @Param: mod
 * @return:
 * @Author: Mr.WK
 * @Date: 2020/10/28
 */
function fnInsertMarker(item,datasource){

    var oLabelPixelOffset=new LSGlobe.Cartesian2(-114, -55);
    if(item.marker.label&&item.marker.label.pixelOffset){
        oLabelPixelOffset = new LSGlobe.Cartesian2(item.marker.label.pixelOffset[0], item.marker.label.pixelOffset[1]);
    }

    var oLabelHorizontalOrigin=LSGlobe.HorizontalOrigin.LEFT;
    if(item.marker.label&&item.marker.label.horizontalOrigin){
        oLabelHorizontalOrigin = LSGlobe.HorizontalOrigin[item.marker.label.horizontalOrigin];
    }else{
        oLabelHorizontalOrigin = LSGlobe.HorizontalOrigin.LEFT;
    }


    var oBillboardHorizontalOrigin=LSGlobe.HorizontalOrigin.LEFT;
    if(item.marker.label&&item.marker.billboard.horizontalOrigin){
        oBillboardHorizontalOrigin = LSGlobe.HorizontalOrigin[item.marker.billboard.horizontalOrigin];
    }else{
        oBillboardHorizontalOrigin=LSGlobe.HorizontalOrigin.CENTER;
    }

    var iBilboardWidth=249;

    var iImgSubLevel=1;
    if(item.marker.width){
        iBilboardWidth=item.marker.width;
    }else{
        if(item.name.length<11){
            iBilboardWidth=249;
            iImgSubLevel=1;
        }else if(item.name.length>11&&item.name.length<16){
            iBilboardWidth=336;
            iImgSubLevel=2;
        }else{
            iBilboardWidth=459;
            iImgSubLevel=3;
        }
    }
    iBilboardWidth=272;
    item.marker.height=77;

    var img = "images/community.png";
    if(item.marker.img){
        img=item.marker.img;
    }else{
       img="images/buildmarker/"+item["图标ID"]+".png"
    }

    var bData = {
        id: item.id,
        name: item.name,
        show: true,
        position: LSGlobe.Cartesian3.fromDegrees(item.marker.position.x * 1.0, item.marker.position.y * 1.0, item.marker.position.z*1.0),
        label: {
            text: item.name,
            font: "bold 40px Microsoft YaHei",
            fillColor:LSGlobe.Color.WHITE,
            style: LSGlobe.LabelStyle.FILL_AND_OUTLINE,
            distanceDisplayCondition: new LSGlobe.DistanceDisplayCondition(0, 2000),
            scaleByDistance: new LSGlobe.NearFarScalar(300, 1, 2000, 0.0),
            pixelOffsetScaleByDistance: new LSGlobe.NearFarScalar(300, 1, 2000, 0.0),
            disableDepthTestDistance: 300,
            horizontalOrigin: oLabelHorizontalOrigin,
            verticalOrigin: LSGlobe.VerticalOrigin.CENTER,
            scale: 0.5,
            pixelOffset: oLabelPixelOffset
        },
        billboard: {
            image: img,
            width: iBilboardWidth,
            height: item.marker.height||161,
            horizontalOrigin: oBillboardHorizontalOrigin, // default
            verticalOrigin: LSGlobe.VerticalOrigin.BOTTOM, // default: CENTER
            pixelOffset: new LSGlobe.Cartesian2(0, 0),   //偏移量
            scaleByDistance: new LSGlobe.NearFarScalar(300, 1, 2000, 0.0),
            disableDepthTestDistance:300,
            heightReference: LSGlobe.HeightReference.NONE,
            distanceDisplayCondition: new LSGlobe.DistanceDisplayCondition(0, 2000)
        }
    };
    var oSource=datasource||viewer;
    var oMarkerEntity=oSource.entities.add(bData);
    return oMarkerEntity;
}

/**
* @Description: 添加光幕
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/10/29
*/
function fnInsertWall(item,datasource){
    var oDegreePosition=[];
    for (var i = 0; i < item.position.length; i++) {
        var oDegree=fnCartesian2Degreen(item.position[i]);
        oDegreePosition.push(oDegree.lng);
        oDegreePosition.push(oDegree.lat);
        oDegreePosition.push(item.wallheight);
    }
    var oEntitiesCollection=(datasource&&datasource.entities)||viewer.entities;
    var oWall=oEntitiesCollection.add( new LSGlobe.Entity({
        id: item.id,
        wall: new LSGlobe.WallGraphics({
            positions: LSGlobe.Cartesian3.fromDegreesArrayHeights(oDegreePosition),
            material: new LSGlobe.AnimationLineMaterialProperty({
                color: LSGlobe.Color.fromCssColorString(item.color),
                duration: 4e3,
                url: 'images/bg-wall-material.png',
                repeat: new LSGlobe.Cartesian2(1, 1),
                axisY: true
            })
        }),
        show:item.show
    }));
}
//笛卡尔积转经纬度
function fnCartesian2Degreen(oCartesian){
    var ellipsoid=viewer.scene.globe.ellipsoid;
    var cartesian3=new LSGlobe.Cartesian3(oCartesian.x,oCartesian.y,oCartesian.z);
    var cartograhphic=ellipsoid.cartesianToCartographic(cartesian3);
    var lat=LSGlobe.Math.toDegrees(cartograhphic.latitude);
    var lng=LSGlobe.Math.toDegrees(cartograhphic.longitude);
    var alt=cartograhphic.height;
    return {lng:lng,lat:lat,alt:alt}
}

/**
* @Description: 添加流动线
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/10/29
*/
function fnIsertRoadLine(item){
    var promise = LSGlobe.GeoJsonDataSource.load(item.url, {clampToGround:true});
    promise.then(function (dataSource) {
        viewer.dataSources.add(dataSource);
        var entities = dataSource.entities._entities._array;
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            var WaterId = entity.id;
            var WaterName = entity.name;
            if (entity.polyline) {
                entity.polyline.width = item.width ? item.width : 5;
                var oPolylineColor;
                if(item.width){
                    oPolylineColor= entity.polyline.material.color.getValue();
                }
                entity.polyline.material=new LSGlobe.PolylineStressRoadMaterialProperty(oPolylineColor?oPolylineColor:item.color?item.color:LSGlobe.Color.YELLOW, 10000, 10);
                entity.polyline.distanceDisplayCondition=new LSGlobe.DistanceDisplayCondition(0.0, 100000.0)
            }
        }
        item.callback?item.callback(dataSource):null;
    }).otherwise(function (error) {
        console.log(error);
    });
}

/**
* @Description: 扩散
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/10/30
*/
function fnInsertCircleScanPostStage (viewer, cartographicCenter, maxRadius, scanColor, duration, name, typeName) {
    var _this = this;

    var ScanSegmentShader =
        "uniform sampler2D colorTexture;\n" +
        "uniform sampler2D depthTexture;\n" +
        "varying vec2 v_textureCoordinates;\n" +
        "uniform vec4 u_scanCenterEC;\n" +
        "uniform vec3 u_scanPlaneNormalEC;\n" +
        "uniform float u_radius;\n" +
        "uniform vec4 u_scanColor;\n" +

        "vec4 toEye(in vec2 uv, in float depth)\n" +
        " {\n" +
        " vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n" +
        " vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n" +
        " posInCamera =posInCamera / posInCamera.w;\n" +
        " return posInCamera;\n" +
        " }\n" +

        "vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point)\n" +
        "{\n" +
        "vec3 v01 = point -planeOrigin;\n" +
        "float d = dot(planeNormal, v01) ;\n" +
        "return (point - planeNormal * d);\n" +
        "}\n" +

        "float getDepth(in vec4 depth)\n" +
        "{\n" +
        "float z_window = czm_unpackDepth(depth);\n" +
        "z_window = czm_reverseLogDepth(z_window);\n" +
        "float n_range = czm_depthRange.near;\n" +
        "float f_range = czm_depthRange.far;\n" +
        "return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n" +
        "}\n" +

        "void main()\n" +
        "{\n" +
        "gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n" +
        "float depth = getDepth( texture2D(depthTexture, v_textureCoordinates));\n" +
        "vec4 viewPos = toEye(v_textureCoordinates, depth);\n" +
        "vec3 prjOnPlane = pointProjectOnPlane(u_scanPlaneNormalEC.xyz, u_scanCenterEC.xyz, viewPos.xyz);\n" +
        "float dis = length(prjOnPlane.xyz - u_scanCenterEC.xyz);\n" +
        "if(dis < u_radius)\n" +
        "{\n" +
        "float f = 1.0 -abs(u_radius - dis) / u_radius;\n" +
        "f = pow(f, 4.0);\n" +
        "gl_FragColor = mix(gl_FragColor, u_scanColor, f);\n" +
        "}\n" +
        "}\n";

    var _Cartesian3Center = LSGlobe.Cartographic.toCartesian(cartographicCenter);
    var _Cartesian4Center = new LSGlobe.Cartesian4(_Cartesian3Center.x, _Cartesian3Center.y, _Cartesian3Center.z, 1);

    var _CartographicCenter1 = new LSGlobe.Cartographic(cartographicCenter.longitude, cartographicCenter.latitude, cartographicCenter.height + 500);
    var _Cartesian3Center1 = LSGlobe.Cartographic.toCartesian(_CartographicCenter1);
    var _Cartesian4Center1 = new LSGlobe.Cartesian4(_Cartesian3Center1.x, _Cartesian3Center1.y, _Cartesian3Center1.z, 1);

    var _time = (new Date()).getTime();

    var _scratchCartesian4Center = new LSGlobe.Cartesian4();
    var _scratchCartesian4Center1 = new LSGlobe.Cartesian4();
    var _scratchCartesian3Normal = new LSGlobe.Cartesian3();

    var scanPostStage = new LSGlobe.PostProcessStage({
        name: name,
        type: typeName,
        fragmentShader: ScanSegmentShader,
        uniforms: {
            u_scanCenterEC: function () {
                return LSGlobe.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
            },
            u_scanPlaneNormalEC: function () {
                var temp = LSGlobe.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center, _scratchCartesian4Center);
                var temp1 = LSGlobe.Matrix4.multiplyByVector(viewer.camera._viewMatrix, _Cartesian4Center1, _scratchCartesian4Center1);
                _scratchCartesian3Normal.x = temp1.x - temp.x;
                _scratchCartesian3Normal.y = temp1.y - temp.y;
                _scratchCartesian3Normal.z = temp1.z - temp.z;

                LSGlobe.Cartesian3.normalize(_scratchCartesian3Normal, _scratchCartesian3Normal);
                return _scratchCartesian3Normal;
            },
            u_radius: function () {
                return maxRadius * (((new Date()).getTime() - _time) % duration) / duration;
            },
            u_scanColor: scanColor
        }
    });
    scanPostStage.type = _this.layerId;
    viewer.scene.postProcessStages.add(scanPostStage);

    //网上扩散圆圈
    /*var oDcCenter=new LSGlobe.Cartesian3(-2847059.379331341, 4658438.059428268,3286754.0632132962);
    let ScanPostStage = new LSGlobe.PostProcessStage({
        fragmentShader: `uniform sampler2D colorTexture;
       uniform sampler2D depthTexture;
       varying vec2 v_textureCoordinates;
       uniform vec3 centerWC;
       uniform vec3 normalWC;
       uniform float radius;
       uniform vec4 color;
       uniform float speed;

       float getDepth(){
          float z_window = czm_unpackDepth(texture2D(depthTexture, v_textureCoordinates));
          z_window = czm_reverseLogDepth(z_window);
          float n_range = czm_depthRange.near;
          float f_range = czm_depthRange.far;
          return  (2.0 * z_window - n_range - f_range) / (f_range - n_range);
       }

       vec4 toEye(in vec2 uv, in float depth){
          vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));
          vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);
          posInCamera = posInCamera / posInCamera.w;
          return posInCamera;
       }

      vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){
        vec3 v01 = point - planeOrigin;
        float d = dot(planeNormal, v01) ;
        return (point - planeNormal * d);
      }

     void main() {
        gl_FragColor = texture2D(colorTexture, v_textureCoordinates);
        float depth = getDepth();
        vec4 viewPos = toEye(v_textureCoordinates, depth);
        vec4 center = czm_view * vec4(centerWC,1);
        vec4 planeNormal = czm_view * vec4(normalWC,0);
        vec3 prjOnPlane = pointProjectOnPlane(planeNormal.xyz, center.xyz, viewPos.xyz);
        float dis = length(prjOnPlane.xyz - center.xyz);
        float time = fract(czm_frameNumber * speed / 1000.0);
        float temp = radius * time;
        if(dis < temp)  {
           float f = 1.0 - abs(temp - dis) / temp;
           f = pow(f, 4.0);
           gl_FragColor = mix(gl_FragColor, color, f);
        }
      }`,
        uniforms: {
            centerWC: function() {
                return oDcCenter
            },
            normalWC: function() {
                return LSGlobe.Ellipsoid.WGS84.geodeticSurfaceNormal(
                    oDcCenter,
                    new LSGlobe.Cartesian3()
                )
            },
            radius: function() {
                return maxRadius
            },
            speed: function() {
                return 5 || 2
            },
            color: function() {
                return LSGlobe.Color.fromCssColorString("#00e4ff").withAlpha(0.1);
            }
        }
    })
    viewer.scene.postProcessStages.add(ScanPostStage);*/
}

/**
* @Description: 根据俩点生成添加抛物线
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/11/3
*/
function fnInsertParabolaLine(options){
    /**
     *
     * @param {Object} options options具有以下属性的对象：
     * @param {Object} [options.pt1] 起始点
     * @param {Object} [options.pt2] 终止点
     * @param {Object} [options.height] 抛物线的最高点
     * @param {Object} [options.num] 生成采样点的个数
     * @param {Array} resultOut 生成的采样点
     */
    function fnParabolaEquation(options, resultOut) {
        //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
        var h = options.height /*&& options.height > 5000 ? options.height : 5000;*/
        var L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(
            options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat);
        var num = options.num && options.num > 50 ? options.num : 50;
        var result = [];
        var dlt = L / num;
        if (Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat)) { //以lon为基准
            var delLat = (options.pt2.lat - options.pt1.lat) / num;
            if (options.pt1.lon - options.pt2.lon > 0) {
                dlt = -dlt;
            }
            for (var i = 0; i < num; i++) {
                var tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
                var lon = options.pt1.lon + dlt * i;
                var lat = options.pt1.lat + delLat * i;
                result.push([lon, lat, tempH]);
            }
        } else { //以lat为基准
            var delLon = (options.pt2.lon - options.pt1.lon) / num;
            if (options.pt1.lat - options.pt2.lat > 0) {
                dlt = -dlt;
            }
            for (var i = 0; i < num; i++) {
                var tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
                var lon = options.pt1.lon + delLon * i;
                var lat = options.pt1.lat + dlt * i;
                result.push([lon, lat, tempH]);
            }
        }
        if (resultOut != undefined) {
            resultOut = result;
        }
        return result;
    }

    var material = new LSGlobe.AnimationLineMaterialProperty({
        color: LSGlobe.Color.WHITE,
        duration: 7000,
        url: 'images/colors1.png'
    });

    const item = options.points;

    var points = fnParabolaEquation({
        pt1: item[0].position,
        pt2: item[1].position,
        height: 300,
        num: 100
    });

    var pointArr = [];
    for (var j = 0; j < points.length; j++) {
        pointArr.push(points[j][0], points[j][1], points[j][2]);
    }
    viewer.entities.add({
        name: 'PolylineTrailLink' + i,
        polyline: {
            positions: LSGlobe.Cartesian3.fromDegreesArrayHeights(pointArr),
            width: 2,
            material: material,
            distanceDisplayCondition: new LSGlobe.DistanceDisplayCondition(0, 999999999)
        }
    });
}

/**
* @Description: 根据经纬度定位
* @Param: odeg
* @return:
* @Author: Mr.WK
* @Date: 2020/11/12
*/
function fnFlyToDegree(odeg) {
    viewer.camera.flyTo({
        destination: LSGlobe.Cartesian3.fromDegrees(odeg.x, odeg.y, odeg.z),
        orientation: {
            heading: LSGlobe.Math.toRadians(0.0),
            pitch: LSGlobe.Math.toRadians(-90.0),
            roll: 0.0
        }
    });
}

/**
* @Description: 创建音频实例
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/12/18
*/
function fnCreatMusicInstance(soundsrc,soundname){
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound(soundsrc,soundname);
    createjs.Sound.on("fileload", function(event){
        if(event.src.indexOf("bgmusic")>=0){
            //createjs.Sound.play("bgmusic");
        }
    });
    return createjs.Sound.createInstance(soundname);
}

/**
* @Description: 插入Redmarker
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2020/12/24
*/
function fnInsertRedMarker(item,datasource){
    var bData = {
        show: true,
        position: LSGlobe.Cartesian3.fromDegrees(item.marker.position.x * 1.0, item.marker.position.y * 1.0, item.marker.position.z*1.0),
        billboard: {
            image: "images/buildmarker/red-blank.png",
            width: 64,
            height: 64,
            horizontalOrigin: LSGlobe.HorizontalOrigin.CENTER, // default
            verticalOrigin: LSGlobe.VerticalOrigin.BOTTOM, // default: CENTER
            pixelOffset: new LSGlobe.Cartesian2(0, 0),   //偏移量
            scaleByDistance: new LSGlobe.NearFarScalar(1500, 1, 40000, 0.0),
            disableDepthTestDistance:300,
            heightReference: LSGlobe.HeightReference.NONE,
            distanceDisplayCondition: new LSGlobe.DistanceDisplayCondition(1500, 40000),
            scale: 0.5,
        },
        show:false
    };
    return datasource.entities.add(bData);
}
/**
 * @Description: 插入RedFlag
 * @Param: mod
 * @return:
 * @Author: Mr.WK
 * @Date: 2020/12/24
 */
function fnInsertRedFlagMarker(item,datasource){
    var bData = {
        id:"flag"+item.ID,
        show: true,
        position: LSGlobe.Cartesian3.fromDegrees(item.marker.position.x * 1.0, item.marker.position.y * 1.0, item.marker.position.z*1.0),
        billboard: {
            image: "images/buildmarker/red-flag.png?"+new Date().getTime(),
            width: 48,
            height: 48,
            horizontalOrigin: LSGlobe.HorizontalOrigin.CENTER, // default
            verticalOrigin: LSGlobe.VerticalOrigin.BOTTOM, // default: CENTER
            pixelOffset: new LSGlobe.Cartesian2(0,-80),   //偏移量
            pixelOffsetScaleByDistance: new LSGlobe.NearFarScalar(300, 1, 2000, 0.0),
            scaleByDistance: new LSGlobe.NearFarScalar(1000, 1, 40000, 0.0),
            disableDepthTestDistance:300,
            heightReference: LSGlobe.HeightReference.NONE,
            distanceDisplayCondition: new LSGlobe.DistanceDisplayCondition(0, 40000),
            scale: 0.5,
        },
        show:true
    };
    return datasource.entities.add(bData);
}
/**
 * 雷达扫描
 * 插件ScanningEffectMaterialProperty.js
 * @param color:雷达扫描颜色
 */
function computeGeometryPos(center,radius,fromA,toA,length) {
    var res = [];
    var interval = (toA - fromA)*Math.PI/180/length;
    var startA = fromA * Math.PI /180;

    var mm = LSGlobe.Transforms.eastNorthUpToFixedFrame(center);
    var startPos = new LSGlobe.Cartesian3();
    for(var i =0;i<length;i++){
        var a = startA + interval * i;
        var p = new LSGlobe.Cartesian3(Math.sin(a)*radius,Math.cos(a)*radius,0.);
        res.push(LSGlobe.Matrix4.multiplyByPoint(mm,p,new LSGlobe.Cartesian3));
        if (i === 0) {
            startPos = LSGlobe.Matrix4.multiplyByPoint(mm,p,new LSGlobe.Cartesian3);
        }
    }
    res.push(startPos);

    return res;
}

/**
* @Description: 三大功能区目标面
* @Param: mod
* @return:
* @Author: Mr.WK
* @Date: 2021/4/27
*/
function fnThreeTargetPolygon(oentity){
    oFunctionalSource.entities.add({
        //特殊字段该字段会保存下来，可以是字符串也可以是个对象
        name: '目标面'+oentity.name,
        //面的唯一标识会存储下来，再次加载也不改变,用于查找
        id: "target"+oentity.id,
        polygon: {
            hierarchy: {
                //面的点集合
                positions: oentity.polygon.hierarchy.getValue().positions,
            },
            //面的材质
            material: LSGlobe.Color.fromCssColorString("rgba(255,166,33,0.3)"),
            //是否填充面
            fill: true,
            //是否显示面的外边框（仅空间面有效）
            outline: true,
            //面的外边框的材质
            outlineColor: LSGlobe.Color.fromCssColorString("rgb(0,186,255)"),
            //面的外边框的宽度（暂不支持非1）
            outlineWidth:1,
            //面的类型
            classificationType: LSGlobe.ClassificationType.BOTH,
            //LSGlobe.ClassificationType.BOTH           即可贴地又可贴模型
            //LSGlobe.ClassificationType.TERRAIN        仅贴地
            //LSGlobe.ClassificationType.CESIUM_3D_TILE 仅贴模型
            //undefined 空间面
            perPositionHeight:false//是否绝对高度（当设置非空间面时候一定要设置false，空间面一定要设置true）
        },
        show:false
    });
}

// var center = new LSGlobe.Cartesian3.fromRadians(2.1208980215153845, 0.5450726579947579, 0);
// var radius = 150.
// var fromA = 270;
// var toA = -90;
// var res = computeGeometryPos(center,radius,fromA,toA,360);

// var polygon = new LSGlobe.PolygonGeometry({
//     polygonHierarchy: new LSGlobe.PolygonHierarchy(res)
// });
//
// var instance = new LSGlobe.GeometryInstance({
//     geometry:polygon,
//     id:'id'
// });
//
// var primitive = new LSGlobe.GroundPrimitive({
//     geometryInstances: [instance],
//     appearance: new LSGlobe.EllipsoidSurfaceAppearance({
//         material: LSGlobe.Material.fromType(LSGlobe.Material.RadarScanDynamicType, {
//             color: LSGlobe.Color.YELLOW
//         })
//     })
// });
// viewer.scene.primitives.add(primitive);

/**
 * @Descripttion: 获取日期
 * @param {*} separator
 * @return {*}
 * @Author: TinaZ
 * @Date: 2020-11-11
 */
 /**
  * @description
  * @author TinaZ
  * @date 2021-06-16
  * @param {*} separator
  */
 function fnGetCurrentDate(separator) {
    var separator = separator || '-';
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var H = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    var sDate = Y + separator + M + separator + D;
    var sDatetime = Y + separator + M + separator + D + ' ' + H + ':' + m + ':' + s;
    // return {date: sDate, datetime: sDatetime};
    $('#date').html(sDatetime);
}
/**
 * 根据entity的name批量删除
 * @param viewer
 * @param entityName
 */
function fnRemoveEntityByName(viewer, entityName) {
    var matchIds = [];
    for(var i = 0; i < viewer.entities.values.length; i++) {
        if (viewer.entities.values[i].name == entityName) {
            matchIds.push(viewer.entities.values[i].id);
        }
    }

    for(var i = 0; i < matchIds.length; i++) {
        viewer.entities.removeById(matchIds[i])
    }
}

function fnGetEntityByName(viewer, entityName) {
    var matchArray = [];
    for(var i = 0; i < viewer.entities.values.length; i++) {
        if (viewer.entities.values[i].name == entityName) {
            matchArray.push(viewer.entities.values[i].id);
        }
    }
    return matchArray;
}

function fnRemovePrimitiveByName(viewer, primitiveName){
    var len = viewer.scene.primitives.length;
    var matchArray = [];
    var pArr = viewer.scene.primitives._primitives;
    for (var i = 0; i < pArr.length; i++) {
        if (pArr[i].name == primitiveName) {
            matchArray.push(pArr[i]);
        }
    }
    for(var i = 0; i < matchArray.length; i++) {
        viewer.scene.primitives.remove(matchArray[i])
    }
}


/**
 * @description  自定义飞行
 * @author TinaZ
 * @date 2021-06-23
 * @param {*} entities
 * @param {*} alt
 * @returns {*}
 */
function fnFlyToLocation(entities,alt){
    if(entities.length == 0) return;
    var iX=0, iY=0, iZ=0;
    var num = entities.length;
    for(var i=0; i<entities.length; i++){
        var entity = entities[i];
        if(entity.billboard || entity.model){
            // 世界坐标
            var oPos = entity.position.getValue();
            iX = oPos.x + iX;
            iY = oPos.y + iY;
            iZ = oPos.z + iZ;
        }
    }
    iX = iX/num;
    iY = iY/num;
    iZ = iZ/num;

    // 世界坐标转经纬度
    var WorlsPos = new LSGlobe.Cartesian3(iX, iY, iZ);
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var oDegree = ellipsoid.cartesianToCartographic(WorlsPos);
    var lng = LSGlobe.Math.toDegrees(oDegree.longitude);
    var lat = LSGlobe.Math.toDegrees(oDegree.latitude);
    var alt = alt;
    // 飞行
    viewer.camera.flyTo({
        destination: LSGlobe.Cartesian3.fromDegrees(lng, lat, alt),//currentheight
        orientation : {
            heading: LSGlobe.Math.toRadians(0.0),
            pitch: LSGlobe.Math.toRadians(-90.0),
            roll: 0.0
        },
        duration: 3
    })
}

    // function oWorldCoordinate2oCoordinates(oWorld){
    //     // 世界坐标转经纬度
    //     var ellipsoid=viewer.scene.globe.ellipsoid;
    //     var cartographic=LSGlobe.Cartographic.fromDegrees(longitude,latitude,height);
    //     //longitude经度 latitude维度 height高度
    //     var cartesian3=ellipsoid.cartographicToCartesian(cartographic);
    //     return  {x:lng, y:lat, z:alt}
    // }

function  oWorldCoordinate2oCoordinates(WorlsPos){
        // 世界坐标转经纬度
        var WorlsPos = new LSGlobe.Cartesian3(WorlsPos.x, WorlsPos.y, WorlsPos.z)
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var oDegree = ellipsoid.cartesianToCartographic(WorlsPos);
        var lng = LSGlobe.Math.toDegrees(oDegree.longitude);
        var lat = LSGlobe.Math.toDegrees(oDegree.latitude);
        var alt = alt;
        // var ellipsoid = viewer.scene.globe.ellipsoid;
        // var oDegree = ellipsoid.cartesianToCartographic(WorlsPos);
        // var lng = LSGlobe.Math.toDegrees(oDegree.longitude);
        // var lat = LSGlobe.Math.toDegrees(oDegree.latitude);
        // var alt = alt;
        return  {x:lng, y:lat, z:alt}
}

/**
 * 位置偏移
 * @param point
 * @param x
 * @param y
 * @param z
 */
function positionOffset(origin, x, y, z){
    // 基于原有点构建正东、北、上的向量
    var transform = LSGlobe.Transforms.eastNorthUpToFixedFrame(origin);
    //取逆，把世界坐标变化到本地坐标
    var invTransform = new LSGlobe.Matrix4();
    LSGlobe.Matrix4.inverse(transform, invTransform);
    // 世界坐标系下的一个点

    // 转换到以origin为原点的本地坐标系下的局部坐标---temp值
    var localPos = new LSGlobe.Cartesian3();
    // 计算中间变量
    LSGlobe.Matrix4.multiplyByPoint(invTransform, origin, localPos);
    // 沿本地坐标系的x轴移动一段距离
    localPos.x += x || 0; // distance表示移动的距离
    localPos.y += y || 0;
    localPos.z += z || 0;
    // 移动后的点转换到世界坐标系下
    var worldPos = new LSGlobe.Matrix4();
    // 中间值正向转换，取得最终的世界坐标
    LSGlobe.Matrix4.multiplyByPoint(transform, localPos, worldPos);

    return worldPos;
}
