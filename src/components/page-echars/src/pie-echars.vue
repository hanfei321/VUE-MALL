<template>
  <div class="pie-echarts">
    <BaseEchars :options="options"></BaseEchars>
  </div>
</template>

<script>
import BaseEchars from '@/components/echarts/index';
export default {
  data() {
    return {
      options: {
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
            data: this.pirData,
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
  components: {
    BaseEchars,
  },
  props: {
    pirData: {
      type: Array,
    },
  },
};
</script>

<style scoped></style>
