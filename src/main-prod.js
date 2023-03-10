import Vue from 'vue';
/* 根组件 */
import App from './App.vue';
/* VueRouter的配置 */
import router from './router';
// import './assets/css/element-variables.scss';
/* 全局样式 */
import './assets/css/index.css';
/* import './assets/reset.css' */
import 'tailwindcss/tailwind.css';
/* element相关的配置 */
/* import './config/element' */
// import '../public/Build/LSGlobe/Widgets/widgets.css';
// require('../public/Build/LSGlobe/LSGlobe');
/* 树形表格 */
import ZkTable from 'vue-table-with-tree-grid';
/* 富文本编辑器 */
import VueQuillEditor from 'vue-quill-editor';
/* 富文本编辑器的样式 */
import 'quill/dist/quill.core.css'; // import styles
import 'quill/dist/quill.snow.css'; // for snow theme
import 'quill/dist/quill.bubble.css'; // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */);

Vue.component(ZkTable.name, ZkTable);

/* 时间戳格式化 */
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal * 1000);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0 ');

  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
