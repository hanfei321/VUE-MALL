<template>
  <div id="bar" style="width: 100%;height:360px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { categoryGoodsFavor } from '../../../api/reports';
export default {
  data() {
    return {
      xLabels: [],
      yvalues: [],
      option: {
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: this.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#999',
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
            data: this.yvalues,
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    var myChart = echarts.init(document.getElementById('bar'));
    categoryGoodsFavor().then((res) => {
      const CategoryFavorData = res.data.data;

      for (const item of CategoryFavorData) {
        this.xLabels.push(item.name);
        this.yvalues.push(item.goodsFavor);
      }
      console.log(this.xLabels, this.yvalues);
      (this.option = {
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          data: this.xLabels,
          axisLabel: {
            inside: true,
            color: '#fff',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#999',
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
            data: this.yvalues,
          },
        ],
      }),
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option, true);
    });
  },
};
</script>

<style></style>
