<template>
  <div class="reports">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>

      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="grid-container">
      <div class="pie">
        <el-card>
          <pieEchars />
        </el-card>
      </div>
      <div class="bar">
        <el-card>
          <barEchars></barEchars>
        </el-card>
      </div>
      <div class="rose">
        <el-card>
          <roseEcharsCate />
        </el-card>
      </div>
      <div class="line">
        <el-card>
          <lineEcharsMall />
        </el-card>
      </div>
      <div class="map">
        <div id="lsGlobe"></div>
      </div>
    </div>
    <div class="digo-show" :style="{ display: displayTyle }" id="digoRef">
      123
    </div>
  </div>
</template>

<script>
import {
  pieEchars,
  lineEcharsMall,
  roseEcharsCate,
  barEchars,
} from './cpns/index';
import { getviewer } from '@/utils/LSGlobever.js';
export default {
  name: 'reports',
  data() {
    return {
      categoryCountData: [],
      displayTyle: 'none',
    };
  },
  components: {
    pieEchars,
    lineEcharsMall,
    roseEcharsCate,
    barEchars,
  },

  mounted() {
    const viewer = getviewer();
    //开启半透明
    viewer.scene.globe.translucency.enabled = true;
    //设置透明度
    viewer.scene.globe.translucency.frontFaceAlpha = 0.2;

    //计算每个片段而不是每个顶点的气氛。这会产生外观更好的环境，但性能会有所下降。
    viewer.scene.skyAtmosphere.perFragmentAtmosphere = true;

    viewer.scene.imageryLayers.get(0).show = false;

    viewer.scene.skyBox = new LSGlobe.SkyBox({
      sources: {
        positiveX: 'SkyBox/test.jpg',
        negativeX: 'SkyBox/test.jpg',
        positiveY: 'SkyBox/test.jpg',
        negativeY: 'SkyBox/test.jpg',
        positiveZ: 'SkyBox/test.jpg',
        negativeZ: 'SkyBox/test.jpg',
      },
    });

    var ping = LSGlobe.GeoJsonDataSource.load(
      'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
      { name: 'json' }
    );
    var datasource = viewer.dataSources.add(ping);
    viewer.zoomTo(datasource);

    var highlightFace = null;

    var handler = new LSGlobe.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function(movement) {
      //movement.position当前的屏幕坐标
      var Pos = viewer.scene.pickGlobe(movement.position);
      var cartographic = LSGlobe.Cartographic.fromCartesian(Pos);

      function hightlightLine() {
        this.temp = new Array();
      }
      hightlightLine.prototype.linehHghtlight = function linehHghtlight(
        nameId
      ) {
        var exists = this.temp.indexOf(nameId);
        if (exists <= -1) {
          this.temp.push(nameId);
        } else {
          this.temp.splice(exists, 1); //删除对应的nameID
        }
      };
      // eslint-disable-next-line no-debugger
      debugger;

      let pickedFeature = viewer.scene.pick(movement.position);
      console.log(pickedFeature.id._name);
      this.displayTyle = 'block';

      if (highlightFace) {
        highlightFace.material = highlightFace.material0;
      }
      pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material;
      pickedFeature.id.polygon.material = LSGlobe.Color.WHITE;
      highlightFace = pickedFeature.id.polygon;
      // showDivPositionOld = pickedFeature.id.properties;

      if (typeof pickedFeature != 'undefined')
        //鼠标是否点到面上

        var id = pickedFeature.id;
      var fn = new hightlightLine();

      fn.linehHghtlight(id);
    }, LSGlobe.ScreenSpaceEventType.LEFT_CLICK);
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 0.8fr 0.9fr 1.2fr;
  grid-gap: 10px 20px;

  padding: 10px;
}
/* .grid-container > div {
  padding: 20px 0;
} */
/* .grid-container .rose {
  width: 500px;
} */
.rose {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 3;
  grid-column-end: 4;
}
.line {
  grid-column-start: 1;
  grid-column-end: 3;
}
.map {
  grid-column-start: 1;
  grid-column-end: 4;
  /* width: 100%; */
  height: 750px;
  border-radius: 15px;
  overflow: hidden;
}
#digoRef {
  width: 50px;
  height: 50px;
  background: red;
  text-align: center;
  /* position: absolute; */
  display: none;
}
</style>
