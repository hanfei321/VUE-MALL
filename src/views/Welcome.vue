<template>
  <div class="welcome">
    <!-- <div v-if="showMap">为您带来今天的信息:</div> -->
    <div class="cov-wrap" v-if="showMap">
      <!-- <iframe src="http://139.196.8.83:80/w?s=AfEzIf" frameborder="0"></iframe> -->
      <div id="lsGlobe"></div>
    </div>

    <!-- <h1>欢迎进入商城管理系统欢迎页</h1>
    <h1>系统主要有以下几个方面的功能或特点：</h1>
    <section>
      <ol>
        <li>
          基于RBAC(Role-Based Access
          Control)的访问控制，将权限与角色相关联，赋予角色相应权限，通过给不同用于配置角色实现权限管理
        </li>
        <li>基于Element UI快速搭建的后台界面</li>
        <li>
          商品管理（对商品的参数，类别，商品本身的管理）、订单管理（地址更改、物流查询）
        </li>
        <li>使用echarts对用户来源的一个可视化展示</li>
      </ol>
    </section>
    <h1>gitee地址</h1>
    <section>
      <a href="https://gitee.com/crazybox521/vue-admin" target="_blank"
        >vue后台管理系统</a
      >
    </section> -->
  </div>
</template>

<script>
// import { initEarth } from '../../public/script/common';
import { getviewer } from '@/utils/LSGlobever.js';
export default {
  name: 'Welcome',
  data() {
    return {
      userName: 'NULL',
      showMap: true,
    };
  },
  created() {
    this.showMap = localStorage.getItem('showMap') === 'false' ? false : true;
    this.userName = sessionStorage.getItem('userName');
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

      let pickedFeature = viewer.scene.pick(movement.position);
      if (highlightFace) {
        highlightFace.material = highlightFace.material0;
      }
      pickedFeature.id.polygon.material0 = pickedFeature.id.polygon.material;
      pickedFeature.id.polygon.material = LSGlobe.Color.WHITE;
      highlightFace = pickedFeature.id.polygon;
      showDivPositionOld = pickedFeature.id.properties;

      if (typeof pickedFeature != 'undefined')
        //鼠标是否点到面上

        var id = pickedFeature.id;
      var fn = new hightlightLine();

      fn.linehHghtlight(id);
    }, LSGlobe.ScreenSpaceEventType.LEFT_CLICK);
  },
};
</script>

<style lang="less" scoped>
.welcome-title {
  font-weight: bold;
  font-size: 18px;
}
.cov-wrap {
  width: 100%;
  height: 750px;
  border-radius: 15px;
  overflow: hidden;
}
iframe {
  width: 100%;
  height: 100%;
}
// 0 20px 19px 0 rgb(177 247 139 / 8%);
</style>
