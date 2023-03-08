<template>
  <div id="line-main" style="width: 100%;height:360px;"></div>
</template>

<script>
import * as echarts from 'echarts';

// import _ from 'lodash';
import { getReportsdata } from '../../../api/axios';
export default {
  data() {
    return {
      lineData: [],
      legendData: [],
      xAxisData: [],
      yAxisData: [],
      option: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: this.legendData,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData,
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: this.lineData[0].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)',
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: this.lineData[0].value,
          },
          {
            name: this.lineData[1].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: this.lineData[1].value,
          },
          {
            name: this.lineData[2].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: this.lineData[2].value,
          },
          {
            name: this.lineData[3].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)',
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: this.lineData[3].value,
          },
          {
            name: this.lineData[4].name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)',
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: this.lineData[4].value,
          },
        ],
      },
    };
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('line-main'));
    getReportsdata()
      .then((res) => {
        // this.lineData = res.data.data;
        this.xAxisData = res.data.data.xAxis[0].data;
        this.legendData = res.data.data.series.map((item) => {
          return { name: item.name };
        });
        this.lineData = res.data.data.series.map((item) => {
          return { name: item.name, value: item.data };
        });
        console.log(res.data.data);
        console.log(this.lineData);
        this.option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985',
              },
            },
          },
          legend: {
            data: this.legendData,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: this.xAxisData,
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: this.lineData[0].name,
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(128, 255, 165)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(1, 191, 236)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: this.lineData[0].value,
            },
            {
              name: this.lineData[1].name,
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(0, 221, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(77, 119, 255)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: this.lineData[1].value,
            },
            {
              name: this.lineData[2].name,
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(55, 162, 255)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(116, 21, 219)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: this.lineData[2].value,
            },
            {
              name: this.lineData[3].name,
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 0, 135)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(135, 0, 157)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: this.lineData[3].value,
            },
            {
              name: this.lineData[4].name,
              type: 'line',
              stack: 'Total',
              smooth: true,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              label: {
                show: true,
                position: 'top',
              },
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(255, 191, 0)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(224, 62, 76)',
                  },
                ]),
              },
              emphasis: {
                focus: 'series',
              },
              data: this.lineData[4].value,
            },
          ],
        };
        myChart.setOption(this.option, true);
      })
      .catch((err) => {
        this.$message.error(`${err}获取折线图数据失败`);
      });

    // if (res.meta.status !== 200) return;

    // const myOption = _.merge(res.data, this.options);

    // 使用刚指定的配置项和数据显示图表。
  },
};
</script>

<style></style>
