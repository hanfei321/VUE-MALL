<template>
  <div class="base-echars">
    <div ref="echarsDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>
<script>
import useEchart from '@/components/echarts/hook/useEchart';
export default {
  data() {
    return {};
  },
  props: {
    options: {
      type: Array,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '360px',
    },
  },
  mounted() {
    const { setOptions } = useEchart(this.$refs.echarsDivRef);
    setOptions(this.options);
  },
};
</script>

<style scoped></style>
