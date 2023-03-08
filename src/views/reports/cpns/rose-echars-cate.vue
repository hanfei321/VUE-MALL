<template>
  <div id="rose" style="width: 100%;height:800px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getCataList } from '../../../api/goods';
export default {
  data() {
    return {
      roseCateData: [],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 999,
      },
      option: {
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: this.roseCateData,
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById('rose'));
    getCataList(this.queryInfo).then((res) => {
      this.roseCateData = res.data.data.result.map((item) => {
        return { name: item.cat_name, value: item.cat_value };
      });
      console.log(this.roseCateData);
      (this.option.series = [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8,
          },
          data: this.roseCateData,
        },
      ]),
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option, true);
    });
  },
};
</script>

<style></style>
