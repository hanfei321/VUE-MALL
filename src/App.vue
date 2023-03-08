<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style scoped lang="less">
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
/deep/ .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  margin-top: 25px;
  box-shadow: 0 10px 30px 0 rgba(173, 247, 134, 0.2);
  // box-shadow: 0 14px 26px -12px rgb(0 188 212 / 42%),
  //   0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 188 212 / 20%);
}
/deep/ .el-card,
.el-message {
  border-radius: 15px;
  overflow: hidden;
}
/deep/ .el-breadcrumb {
  margin-left: 15px;
}

//按钮
/deep/ .el-button--primary {
  color: #fff;
  background-color: #53a500;
  border-color: #53a500;
}
/deep/ .el-button--primary.is-active,
/deep/ .el-button--primary:active {
  background: #53a500;
  border-color: #53a500;
  color: #fff;
}
/deep/ .el-button--primary:focus,
/deep/ .el-button--primary:hover {
  background: #53a500;
  border-color: #53a500;
  color: #fff;
  box-shadow: 0 14px 26px -12px rgb(83 165 0 / 42%),
    0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(83 165 0 / 20%);
}
/deep/ .el-button--primary.is-disabled,
.el-button--primary.is-disabled:active,
.el-button--primary.is-disabled:focus,
/deep/ .el-button--primary.is-disabled:hover {
  color: #fff;
  background-color: #52a50077;
  border-color: #65c90171;
}
</style>

<!-- <style>
@import './assets/sass/element-variables.scss';
</style> -->
