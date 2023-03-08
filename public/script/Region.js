var Region = {
    highlightEntityMaterial: null,
    highlightEntityId: null,
    towerGlow: null,
    entityIds: [],

    geojsonUrl: {
        city: '../../Datas/江苏省/江苏省.geojson',
        county: '../../Datas/江苏省/无锡市.geojson',
        town: '../../Datas/江苏省/无锡市行政区划.geojson'
    },

    /**
     * 初始化--预加载
     * @param {*} viewer 
     */
    init: function(viewer, isCallback) {
        for (var level in this.geojsonUrl) {
            console.log('行政区划', level, '加载开始')
            var dateSoureLoader = LSGlobe.GeoJsonDataSource.load(this.geojsonUrl[level], {
                name: 'Region_' + level,
                show: true,
                stroke: LSGlobe.Color.BLACK.withAlpha(0.2),
                strokeWidth: 1,
                fill: LSGlobe.Color.RED.withAlpha(0.0)
            });
            dateSoureLoader.then(function(dataSource) {
                viewer.dataSources.add(dataSource);
                console.log('行政区划', level, '加载完成');
            }).otherwise(function(error) {
                console.log("加载行政区划错误", level, error);
            });
        }
        isCallback ? isCallback() : null
    },

    /**
     * 拉伸
     * @param {*} viewer 
     * @param {*} level 
     * @param {*} options liake {'regionName': {heigh: 10, color: LSGlobe.Color.RED}}
     */
    laShen: function(viewer, level, options, countyName) {
        if (!options) {
            return;
        }
        var dataSource = this.getDataSourcesByName(viewer, 'Region_' + level)[0];
        if (!dataSource) {
            console.warn('行政区划数据还没有加载完成，请稍等');
            return;
        }
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
            // 用于点击事件 判断
            this.entityIds.push(entities[i].id);
            var opt = null;
            if (level == 'county') {
                opt = options[entities[i].name];
            } else if (level == 'town') {
                opt = options[entities[i].properties.JD._value];
            }
            if (!opt) {
                // 同一个区的乡镇补白
                if (countyName == entities[i].properties.Q._value.trim()) {
                    opt = {
                        heigh: 200,
                        color: LSGlobe.Color.WHITE
                    }
                } else {
                    entities[i].show = false;
                    continue;
                }
            }
            entities[i].show = true;
            entities[i].polygon.extrudedHeight = opt.heigh
            entities[i].polygon.material = opt.color
            entities[i].polygon.outline = opt.outline && opt.outline.toString() ? opt.outline : true;
        }
        dataSource.show = true;
        // 若拉伸区内街道
        if (level == 'town' && countyName) {
            viewer.flyTo(dataSource);
        } else {
            var oCameraPos = {
                position: { x: -2892349.5480463672, y: 4752345.589620389, z: 3258006.362958059 },
                direction: { x: 0.4160813397252361, y: -0.9011313700053247, z: 0.12181368036792606 },
                up: { x: -0.1957719816514606, y: 0.04204669459132006, z: 0.9797476239696652 }
            }
            viewer.camera.flyTo({
                destination: new LSGlobe.Cartesian3(oCameraPos.position.x, oCameraPos.position.y, oCameraPos.position.z),
                orientation: {
                    direction: new LSGlobe.Cartesian3(oCameraPos.direction.x, oCameraPos.direction.y, oCameraPos.direction.z),
                    up: new LSGlobe.Cartesian3(oCameraPos.up.x, oCameraPos.up.y, oCameraPos.up.z)
                }
            });
        }

    },
    /**
     * 绘制动态幕墙
     * @param viewer
     * @param positions
     * @param height
     * @param color
     */
    drawDynamicWall: function(viewer, positions, height, color) {
        var degreesArray = [];
        var maximumHeights = [];
        var minimumHeights = [];
        for (var j = 0; j < positions.length; j++) {
            var ellipsoid = viewer.scene.globe.ellipsoid;
            var cartographic = ellipsoid.cartesianToCartographic(positions[j]);
            var lat = LSGlobe.Math.toDegrees(cartographic.latitude);
            var lng = LSGlobe.Math.toDegrees(cartographic.longitude);
            var alt = cartographic.height;
            degreesArray.push(lng);
            degreesArray.push(lat);
            maximumHeights.push(height || 200);
            minimumHeights.push(0);
        }
        viewer.entities.add({
            name: '行政区划幕墙',
            wall: {
                positions: LSGlobe.Cartesian3.fromDegreesArray(degreesArray),
                maximumHeights: maximumHeights,
                minimumHeights: minimumHeights,
                material: new LSGlobe.WallDynamicMaterialProperty({
                    color: color || new LSGlobe.Color.fromCssColorString('#FFFF00').withAlpha(0.5)
                }),
                outline: false
            }
        });
    },

    /**
     * 绘制动态幕墙
     * @param viewer
     * @param level 绘制的级别
     * @param regionName 区域名称 ： 区县名-街道名
     * @param height 高度
     * @param color 颜色
     */
    drawRegionWall1: function(viewer, level, regionName, height, color) {
        var dataSource = this.getDataSourcesByName(viewer, 'Region_' + level)[0];
        if (!dataSource) {
            console.warn('行政区划数据还没有加载完成，请稍等');
            return;
        }
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {
            if (regionName) {
                var _regName = null;
                if (level == 'county') {
                    _regName = entities[i].name;
                } else if (level == 'town') {
                    var countyName = entities[i].properties.Q._value.trim(),
                        townName = entities[i].properties.JD._value.trim();
                    _regName = countyName + townName;
                }
                if (regionName != _regName) {
                    continue;
                }
            }
            var posArr = entities[i].polygon._hierarchy._value.positions;
            this.drawDynamicWall(viewer, posArr, height, color)
        }
    },

    /**
     * 隐藏
     * @param {*} viewer 
     * @param {*} level 
     */
    hide: function(viewer, level) {
        if (level) {
            var ds = this.getDataSourcesByName(viewer, 'Region_' + level);
            if (ds && ds.length > 0) {
                ds[0].show = false;
            }
        } else {
            for (var level in this.geojsonUrl) {
                var dt = this.getDataSourcesByName(viewer, 'Region_' + level);
                if (dt && dt.length > 0) {
                    dt[0].show = false;
                }
            }
            var ds = this.getDataSourcesByName(viewer, 'Region_town');
            if (ds && ds.length > 0) {
                ds[0].show = false;
            }
        }

        // 移除卡片
        fnRemoveEntityByName(viewer, '光柱卡片');
        fnRemoveEntityByName(viewer, '行政区划幕墙');
        // GuangZhu.removeAll(viewer);
        Region.towerGlow && Region.towerGlow.destroy()
    },

    getDataSourcesByName: function(viewer, name) {
        var arr = [];
        for (var j = 0; j < viewer.dataSources._dataSources.length; j++) {
            if (viewer.dataSources._dataSources[j].name != name) {
                continue;
            }
            arr.push(viewer.dataSources._dataSources[j]);
        }
        return arr;
    },


    /**
     * 高亮
     * @param {*} pickedObject
     */
    highlightEntity: function(viewer, pickedObject, movement, highlightColor) {
        var regionName = this.getRegionName(pickedObject);
        var level = regionName.town ? 'town' : 'county';
        // 移除高亮
        this.removeHighlight(viewer, level);

        // 高亮拾取对象
        if (LSGlobe.defined(pickedObject)) {
            Region.highlightEntityMaterial = pickedObject.polygon.material
            Region.highlightEntityId = pickedObject.id



            //获取的坐标上添加标绘点，具体的坐标获取参照坐标转换
            // var Pos = viewer.scene.pickGlobe(movement.position);
            // var polyCenter = new LSGlobe.Cartesian3(Pos.x, Pos.y, Pos.z)

            // 鼠标拾取对象的高度
            // var polyHeight = pickedObject.polygon.extrudedHeight._value;
            // 高亮色
            if (highlightColor) {
                pickedObject.polygon.material = highlightColor;
            }

            // GuangZhu.load(viewer, polyCenter, 500, polyHeight, polyHeight + 1000, regionName);
            try {
                // var cartographic = LSGlobe.Cartographic.fromCartesian(polyCenter);
                //经度、纬度
                // var longitude = LSGlobe.Math.toDegrees(cartographic.longitude);
                // var latitude = LSGlobe.Math.toDegrees(cartographic.latitude);
                // Region.towerGlow= new TowerGlow(
                //     viewer,
                //     new LSGlobe.Cartesian3.fromDegrees(longitude, latitude, polyHeight),
                //     800.0,
                //     10000.0,
                //     LSGlobe.Color.YELLOW
                // );

                // this.addTopLabel(viewer, new LSGlobe.Cartesian3.fromDegrees(longitude, latitude, polyHeight + 5000), countyName, townName);

            } catch (e) {
                console.error(e)
            }

        }
    },

    /**
     * 移除高亮
     * @param {*} viewer 
     * @param {*} level 
     */
    removeHighlight: function(viewer, level) {
        if (!Region.highlightEntityId) {
            return
        }
        var entities = this.getDataSourcesByName(viewer, 'Region_' + level)[0].entities.values
        for (var i = 0; i < entities.length; i++) {
            if (entities[i].id == Region.highlightEntityId) {
                entities[i].polygon.material = Region.highlightEntityMaterial;

                Region.highlightEntityId = null;
                Region.highlightEntityMaterial = null;
            }
        }
    },


    buildMenu: function(viewer, level) {
        var dataSource = this.getDataSourcesByName(viewer, 'Region_' + level)[0];
        var entities = dataSource.entities.values;
        var menus = []
        for (var i = 0; i < entities.length; i++) {
            menus.push({
                "id": entities[i].id,
                "zhname": entities[i].name,
                "engname": entities[i].id,
                "isSelected": false,
                "children": null
            })
        }
        return menus
    },

    /**
     * 从行政区划geojson数据生成菜单数据
     * @returns 
     */
    generateMenuData() {
        var menus = [];

        var countyEntities = this.getDataSourcesByName(viewer, 'Region_county')[0].entities.values;
        var townEntities = this.getDataSourcesByName(viewer, 'Region_town')[0].entities.values;

        for (var i = 0; i < countyEntities.length; i++) {
            var countyName = countyEntities[i].name.trim()
            var countyId = countyEntities[i].id;
            var _menu = {
                // "id": countyId,
                "zhname": countyName,
                // "engname": countyName,
                // "isSelected": false,
                "children": [],
                "pid": "2"
            };
            menus.push(_menu);

            for (var j = 0; j < townEntities.length; j++) {
                var _countyName = townEntities[j].properties.Q._value.trim();
                var _townName = townEntities[j].properties.JD._value;

                if (_countyName == countyName) {
                    _menu.children.push({
                        // "id": townEntities[j].id,
                        "zhname": _townName,
                        "engname": _townName,
                        // "isSelected": false,
                        // "pid": countyId
                    });
                }
            }
        }
        console.log(JSON.stringify(menus));
        return menus;
    },

    /**
     * 从对象中解析区划名称
     * @param {*} obj 
     */
    getRegionName: function(obj) {
        var regionName = {};
        var countyName = obj.name; // 行政区划geojson数据处理的原因，区县有name，乡镇没有
        var townName = null;
        if (countyName) {
            regionName.county = countyName;
        } else {
            countyName = obj.properties.Q._value.trim();
            townName = obj.properties.JD._value.trim();
            regionName.county = countyName;
            regionName.town = townName;
        }
        return regionName;
    },
    /**
     * 根据行政区划名获取行政区划对象
     * @param {*} viewer 
     * @param {*} countyName 
     * @param {*} townName 
     * @returns 
     */
    getRegionObj: function(viewer, countyName, townName) {
        var level = townName ? 'town' : 'county';
        var entities = this.getDataSourcesByName(viewer, 'Region_' + level)[0].entities.values;
        for (var i = 0; i < entities.length; i++) {
            if (level == 'county') {
                if (countyName == entities[i].name) {
                    return entities[i];
                }
            } else {
                var _countyName = entities[i].properties.Q._value.trim();
                var _townName = entities[i].properties.JD._value.trim();
                if (countyName == _countyName && townName == _townName) {
                    return entities[i];
                }
            }

        }
    },


    /**
     * options: [{}]
     * @param viewer
     * @param level
     * @param options
     */
    drawChangYe: function(viewer, cylxArr) {

        cylxArr = ['sds', 'sdsd']
        var dataSource = this.getDataSourcesByName(viewer, 'Region_county')[0];
        if (!dataSource) {
            console.warn('行政区划数据还没有加载完成，请稍等');
            return;
        }
        var entities = dataSource.entities.values;
        for (var i = 0; i < entities.length; i++) {

            var countyName = entities[i].name;

            // 选中的区块中心添加光柱
            var polyPositions = entities[i].polygon.hierarchy.getValue(LSGlobe.JulianDate.now()).positions;
            var polyCenter0 = LSGlobe.BoundingSphere.fromPoints(polyPositions).center;
            var polyCenter = LSGlobe.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter0);


            viewer.entities.add({
                position: polyCenter,
                point: {
                    show: true,
                    pixelSize: 10,
                    color: LSGlobe.Color.RED,
                    disableDepthTestDistance: 2220000
                },
                label: {
                    text: countyName,
                    //标注文字描述
                    font: "32px Microsoft YaHei",
                    //标注文字大小、字体
                    style: LSGlobe.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 6,
                    // translucencyByDistance: new LSGlobe.NearFarScalar(1.5e2, 1.0, 1.5e5, 1.0),
                    //根据告诉改变透明度
                    horizontalOrigin: LSGlobe.HorizontalOrigin.LEFT,
                    pixelOffset: new LSGlobe.Cartesian2(15, -15),
                    //标注的遮挡距离设置为100则视角与标注的距离大于100米时会有遮挡
                    disableDepthTestDistance: 0,
                    scale: 0.5
                },
                //标注唯一标识
                show: true //标绘点对象的true显示,false隐藏属性
            });
            var hys = XingZhengQuHua.countyHangYeData[countyName]
            for (var j in hys) {
                if (!ReginData.chanYeColor[hys[j].hy]) {
                    console.log(hys[j].hy)
                }
                viewer.entities.add({
                    position: positionOffset(polyCenter, 100 * j, 0, 0),
                    point: {
                        show: true,
                        pixelSize: 10,
                        color: ReginData.chanYeColor[hys[j].hy] ? LSGlobe.Color.fromCssColorString(ReginData.chanYeColor[hys[j].hy]) : LSGlobe.Color.RED,
                        disableDepthTestDistance: 2220000
                    },
                    // label: {
                    //     text: hys[j].hy,
                    //     //标注文字描述
                    //     font: "32px Microsoft YaHei",
                    //     //标注文字大小、字体
                    //     style: LSGlobe.LabelStyle.FILL_AND_OUTLINE,
                    //     outlineWidth: 6,
                    //     // translucencyByDistance: new LSGlobe.NearFarScalar(1.5e2, 1.0, 1.5e5, 1.0),
                    //     //根据告诉改变透明度
                    //     horizontalOrigin: LSGlobe.HorizontalOrigin.CENTER,
                    //     pixelOffset: new LSGlobe.Cartesian2(0, 15),
                    //     disableDepthTestDistance: 0,
                    //     scale: 0.5
                    // },
                    show: true
                });
            }


            entities[i].show = true;
            // entities[i].polygon.extrudedHeight = opt.heigh
            // entities[i].polygon.material = opt.color
            entities[i].polygon.outline = true;
        }
        dataSource.show = true;
        viewer.flyTo(dataSource);
    }
}