import * as echarts from 'echarts'
import ChinaMapData from '../data/china.json'

echarts.registerMap('china', ChinaMapData)

export default function (el) {
  const echartInstance = echarts.init(el)
  const setOptions = (options) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }

  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
