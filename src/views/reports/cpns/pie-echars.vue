<template>
  <div id="main" style="width: 100%;height:360px;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getcategoryGoodsCount } from '../../../api/reports';
export default {
  data() {
    return {
      pieData: [],
      option: {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
        },
        series: [
          {
            name: '分类数据',
            type: 'pie',
            radius: '50%',
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    };
  },
  created() {
    // this.$store.dispatch('Dashboard/getDashboardDataAction');
    //获取饼图（玫瑰图）数据
    // this.pieData = this.$store.state.Dashboard.categoryGoodsCount.map(
    //   (item) => {
    //     return { name: item.name, value: item.goodsCount };
    //   }
    // );
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    getcategoryGoodsCount().then((res) => {
      this.pieData = res.data.data.map((item) => {
        return { name: item.name, value: item.goodsCount };
      });
      console.log(this.pieData);
      this.option.series = [
        {
          name: '分类数据',
          type: 'pie',
          radius: '50%',
          data: this.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ];
      // myChart.setOption(this.option, true);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option, true);
    });
  },
};
</script>

<style></style>
