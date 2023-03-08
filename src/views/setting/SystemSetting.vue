<template>
  <div class="system-setting">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="form">
        <el-form-item label="系统组件视觉大小">
          <el-radio-group v-model="form.eleSize">
            <el-radio-button label="medium">正常</el-radio-button>
            <el-radio-button label="small">小号</el-radio-button>
            <el-radio-button label="mini">超小号</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="收起导航菜单">
          <el-switch v-model="form.isCollapse"></el-switch>
        </el-form-item>
        <el-form-item label="主页显示地图">
          <el-switch v-model="form.showMap"></el-switch>
        </el-form-item>
        <el-form-item label="">
          <template>
            <el-tooltip
              :disabled="disabled"
              content="点击关闭 tooltip 功能"
              placement="bottom"
              effect="light"
            >
              <el-button @click="toolBtnClick"
                >点击{{ disabled ? '开启' : '关闭' }} tooltip 功能</el-button
              >
            </el-tooltip>
          </template>
        </el-form-item>

        <el-form-item style="display: flex; justify-content:flex-end;">
          <el-button type="primary" @click="onSubmit">保存并应用</el-button>
          <el-button type="primary" @click="$router.go(-1)">回退</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        eleSize: '',
        isCollapse: false,
        showMap: true,
      },
      disabled: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    toolBtnClick() {
      this.disabled = !this.disabled;
      this.$store.state.tooltipOpen = this.disabled;
    },
    init() {
      this.form.eleSize = localStorage.getItem('eleSize')
        ? localStorage.getItem('eleSize')
        : 'medium';
      this.form.isCollapse =
        localStorage.getItem('isCollapse') === 'true' ? true : false;
      this.form.showMap =
        localStorage.getItem('showMap') === 'false' ? false : true;
    },
    onSubmit() {
      localStorage.setItem('eleSize', this.form.eleSize);
      localStorage.setItem('isCollapse', this.form.isCollapse);
      localStorage.setItem('showMap', this.form.showMap);
      window.location.reload();
    },
  },
};
</script>

<style></style>
