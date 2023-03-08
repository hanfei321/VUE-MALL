(function (mod) {
    if (typeof exports === "object" && typeof module === "object") // CommonJS
        module.exports = mod(require("LSGlobe"));
    else if (typeof define === "function" && define.amd) // AMD
        return define(["LSGlobe", 'require'], mod);
    else // Plain browser env
        LSGlobe.AnimationLineMaterialProperty = mod(LSGlobe);
})(function (LSGlobe, require) {
    "use strict";

    /**
     * 流动纹理线
     * 
     * @alias AnimationLineMaterialProperty
     * 
     * @example
     * viewer.entities.add({
     *  name: 'PolylineTrail',
     *  polyline: {
     *      positions: LSGlobe.Cartesian3.fromDegreesArrayHeights([lon, lat, 2500,
     *          lon + 10, lat, 2500,
     *          lon + 10, lat + 10, 2500,
     *      ]),
     *      width: 15,
     *      material: new LSGlobe.LSAnimationLineMaterialProperty({
     *          // color: LSGlobe.Color.ORANGE,
     *          duration: 3000,
     *          url: "./img/colors.png",
     *          // repeat:new LSGlobe.Cartesian2(30,1),
	 *			axisY: true
     *          })
     *      }
     *  });
     * 
     * @param {Object} options options具有以下属性的对象：
     * @param {Object} [options.color] 忽略图片的rgb，强制设置其颜色。Alpha不受影响
     * @param {Number} [options.duration] 循环一次需要的时间，毫秒。数字越小越快
     * @param {String} [options.url] 材质的图片，一般为箭头等
     * @param {Object} [options.repeat] 材质图片的重复次数 LSGlobe.Cartesian2
     * @param {Number} [options.axisY] 是否旋转Y轴
     */
    function AnimationLineMaterialProperty(options) {
        options = LSGlobe.defaultValue(options, {});
        if (!LSGlobe.defined(options.url)) {
            throw new LSGlobe.DeveloperError('options.url is required.');
        }
        if (!LSGlobe.defined(options.axisY)) {
            options.axisY = false;
        }
        var e = this.getImageMaterial(options.url, options.repeat, options.axisY)
        this._definitionChanged = new LSGlobe.Event();
        this._color = undefined;
        this._colorSubscription = undefined;
        this.color = options.color;
        this.duration = options.duration;
        this.axisY = options.axisY;
        this._time = (new Date()).getTime();
        this._materialImage = e.image;
        this._materialType = e.type;
        this._version = "1.2.190920"
    }

    // 此插件相对路径的获取方法
    var baseUrl;
    if (typeof define === "function" && define.amd && !define.amd.toUrlUndefined &&
        typeof require.toUrl === "function") {
        baseUrl = require.toUrl('./');
    } else {
        var scriptRegex = /((?:.*\/)|^)AnimationLineMaterialProperty[\w-]*\.js(?:\W|$)/i;
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, len = scripts.length; i < len; ++i) {
            var src = scripts[i].getAttribute('src');
            var result = scriptRegex.exec(src);
            if (result !== null) {
                baseUrl = result[1];
                break;
            }
        }
    }

    Object.defineProperties(AnimationLineMaterialProperty.prototype, {
        isConstant: {
            get: function () {
                return false;
            }
        },
        definitionChanged: {
            get: function () {
                return this._definitionChanged;
            }
        },
        Version: {
            get: function () {
                return this._version;
            }
        },
        color: LSGlobe.createPropertyDescriptor('color'),
    });
    AnimationLineMaterialProperty.prototype.getType = function (time) {
        return this._materialType;
    }
    AnimationLineMaterialProperty.prototype.getValue = function (time, result) {
        if (!LSGlobe.defined(result)) {
            result = {};
        }
        result.color = LSGlobe.Property.getValueOrClonedDefault(this._color, time, LSGlobe.Color.WHITE.withAlpha(0), result.color);
        result.image = this._materialImage;
        result.time = ((new Date()).getTime() - this._time) / this.duration;
        result.axisY = this.axisY;
        return result;
    }
    AnimationLineMaterialProperty.prototype.equals = function (other) {
        return this === other ||
            (other instanceof AnimationLineMaterialProperty &&
                (!this._hasEquals && (this._color === other._color && this._materialImage == other._materialImage)) ||
                (this._hasEquals && this._color.equals(other._color) && this._materialImage.equals(other._materialImage)))
    }
    let _animationLineMaterialCount = 0;
    AnimationLineMaterialProperty.prototype.getImageMaterial = function (url, repeat, axisY) {
        _animationLineMaterialCount++;
        let type = "AnimationLineType" + _animationLineMaterialCount;
        return LSGlobe.Material._materialCache.addMaterial(type, {
            fabric: {
                type: type,
                uniforms: {
                    color: new LSGlobe.Color(1.0, 0.0, 0.0, 1),
                    image: url,
                    time: 0,
                    axisY: axisY,
                    repeat: repeat || new LSGlobe.Cartesian2(1, 1)
                },
                source: "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                    {\n\
                        czm_material material = czm_getDefaultMaterial(materialInput);\n\
                        vec2 st = repeat * materialInput.st;\n\
                        vec4 colorImage = texture2D(image, vec2(fract((axisY?st.t:st.s) - time), st.t));\n\
                        if(color.a == 0.0)\n\
                        {\n\
                            material.alpha = colorImage.a;\n\
                            material.diffuse = colorImage.rgb; \n\
                        }\n\
                        else\n\
                        {\n\
                            material.alpha = colorImage.a * color.a;\n\
                            material.diffuse = max(color.rgb * material.alpha * 3.0, color.rgb); \n\
                        }\n\
                        return material;\n\
                    }"
            },
            translucent: function (material) {
                return true;
            }
        }), {
            type: type,
            image: url
        };
    }

    // 作为LSGlobe的属性提供
    LSGlobe.AnimationLineMaterialProperty = AnimationLineMaterialProperty;

    return AnimationLineMaterialProperty;
});