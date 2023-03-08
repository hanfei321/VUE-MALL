// sdk 配置
// var LSGlobeUrlPre = 'https://bim.flhdev.cn/LSGlobe/Build'
// var wish3DEarthApiPre = 'https://bim.flhdev.cn'

var LSGlobeUrlPre = 'http://show.wish3d.com/SDK/LSGlobe-2.0.0.641';
var wish3DEarthApiPre = 'http://service.tuxingis.com';

var wish3DEarthLicenseUrl =
  wish3DEarthApiPre + '/wish3dearth/api/access/v1.0.0';

loadJsOrCssFile(LSGlobeUrlPre + '/LSGlobe/Widgets/bucket.css');
loadJsOrCssFile(LSGlobeUrlPre + '/LSGlobe/LSGlobe.js');

// 引用导航插件
loadJsOrCssFile(LSGlobeUrlPre + '/Plugins/Navigation/Navigation.css');
loadJsOrCssFile(LSGlobeUrlPre + '/Plugins/Navigation/Navigation.js');

var licenseCode = getLicenseCode();
var viewer = null;

/**
 * 初始化球
 */
function initEarth() {
  // eslint-disable-next-line no-undef
  viewer = new LSGlobe.Viewer('lsGlobe', {
    guid: 2065914777,
    licenseUrl: 'http://101.200.199.135:12358/pconvert/api/license/v1/',
    targetFrameRate: 120,
    // licenseUrl: wish3DEarthLicenseUrl
  });
}

/**
 * 加载全国30m地形
 */
function load30mDEM() {
  var terrainLayer = new LSGlobe.LSLRPTerrainProvider({
    url: 'http://e0.wish3d.com/servicedata/30m/30m.ltc',
    tileUrlTemplate:
      'http://{s}.wish3d.com/servicedata/30m/{level}/{col}/{row}',
    metadataUrl: 'http://e0.wish3d.com/servicedata/30m/30m.ltc',
    subdomains: ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'],
    requestVertexNormals: true,
  });
  viewer.terrainLayers.addTerrainProvider(terrainLayer);
}

/**
 * 回到初始视角
 */
function gotoHome() {
  viewer.camera.setView({
    destination: new LSGlobe.Cartesian3(
      -373168.5303255626,
      5558852.545278356,
      3106490.155085405
    ),
    orientation: {
      heading: LSGlobe.Math.toRadians(0),
      pitch: LSGlobe.Math.toRadians(-45),
    },
  });
}

/**
 * 添加天地图影像
 */
function loadTdtImagery() {
  var lrc = new LSGlobe.LSLRCImageryProvider(
    '../../Datas/lrc/skyLandLayer.lrc'
  );
  viewer.imageryLayers.addImageryProvider(lrc, 1);
}

/**
 * 添加新图影像
 */
function loadTxImagery() {
  var lrc = new LSGlobe.LSLRCImageryProvider('../../Datas/lrc/图新卫星.lrc');
  viewer.imageryLayers.addImageryProvider(lrc, 1);
}

/**
 * 加载苏州中科院倾斜
 */
function loadSuzhouzhongkeyuanPageLod() {
  var tileset = new LSGlobe.LSPageLOD({
    url:
      'http://earthdata.wish3d.com/example_online/Examples/Datas/suzhouzhongkeyuan/model.json?1535616937566',
    shadows: LSGlobe.ShadowMode.ENABLED,
    viewer: viewer,
  });
  viewer.scene.pageLODLayers.add(tileset);
}
