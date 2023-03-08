<template>
  <el-container class="home-container">
    <!-- 页面头部区域 -->

    <el-aside
      :width="asideWidth"
      style="border-right: 1px solid rgb(238, 238, 238);"
    >
      <div class="login-boss">
        <svg class="squares">
          <path class="top_l" d="M11.35 0H0v11.35h11.35z"></path>
          <path class="top_r" d="M23.88 0H12.53v11.35h11.35z"></path>
          <path class="bom_l" d="M11.35 12.53H0v11.35h11.35z"></path>
          <path class="bom_r" d="M23.88 12.53H12.53v11.35h11.35z"></path>
        </svg>
        <div v-show="!isCollapse" class="title font-mono font-semibold text-lg">
          Supermall.
        </div>
      </div>
      <!-- 页面左侧导航栏菜单 -->
      <el-menu
        :collapse-transition="false"
        unique-opened
        background-color="#fff"
        text-color="#000"
        active-text-color="#53a500"
        :collapse="isCollapse"
        :default-active="activeIndex"
        router
      >
        <!-- 一级菜单 -->
        <el-submenu
          :index="menu.id + ''"
          v-for="menu in menuList"
          :key="menu.id"
        >
          <template slot="title">
            <i :class="iconObj[menu.id]"></i>
            <span>{{ menu.authName }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item-group>
            <el-menu-item
              @click="saveActive(item.path)"
              :index="item.path"
              v-for="item in menu.children"
              :key="item.id"
              class="aside-menu-item"
              ><i class="el-icon-menu"></i>{{ item.authName }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="btn-collapse-wrapper">
        <div class="btn-menu-card" v-show="!isCollapse">
          <div class="btn-left"></div>
          <div class="btn-rad-big">
            <div class="btn-rad-samll">?</div>
          </div>
          <div class="btn-txt">
            <transition enter-active-class="animated fadeInDown">
              <h3 v-if="show">帮助</h3>
            </transition>
            <transition enter-active-class="animated fadeInDown">
              <p v-if="infoShow">这里是一些信息，编不下去了，就这样喽</p>
            </transition>
          </div>
          <div class="btn-btn">
            <el-button
              round
              style="width: 100%;
            background: #ffffff;
            color: #000000;
            font-weight: 500;
            box-shadow: 0 14px 26px -12px rgb(51 51 51 / 20%), 0 4px 23px 0px rgb(0 0 0 / 5%), 0 8px 10px -5px rgb(51 51 51 / 20%);
            "
              >前往帮助</el-button
            >
          </div>
          <div class="btn-right"></div>
        </div>
      </div>
      <div
        @click="handleCollapse"
        class="btn-menu"
        style="cursor: pointer; color: #909399;"
      >
        <h1>
          <i
            v-show="isCollapse"
            class="el-icon-arrow-right"
            style="margin-top: 650px;"
          ></i>
          <i
            v-show="!isCollapse"
            class="el-icon-arrow-left"
            style="position: fixed; bottom: 55px;"
          ></i>
        </h1>
      </div>
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
    </el-aside>
    <!-- 页面主体区域 -->

    <!-- 页面左侧导航栏 -->
    <el-container>
      <el-header>
        <!-- logo区域 -->
        <div :style="{ cursor: 'pointer' }" class="header-logo" @click="toHome">
          <transition enter-active-class="animated bounce">
            <p v-if="show" class="font-mono">welcome to Supermall.</p>
          </transition>
          <!-- <Transition class="animate__animated animate__bounce">
            <span></span>
          </Transition> -->
        </div>
        <div class="btn-wrap">
          <div class="btn-news"><i class="el-icon-bell"></i></div>
          <div class="btn-news"><i class="el-icon-chat-line-round"></i></div>
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="display: flex;
              height: 55px;
              line-height: 55px;
              align-items: center;
              justify-content: center;"
            >
              <span class="img-avatar">
                <el-avatar
                  shape="square"
                  :size="40"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </span>
              <span class="font-mono font-bold [my-custom-style] m-4">
                {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item @click.native="$router.push('/settings')"
                >系统设置</el-dropdown-item
              >

              <el-dropdown-item divided @click.native="logout"
                >退出登陆</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>

          <!-- <span style="margin: 10px">{{ userName }}</span> -->
          <!--
          <el-button @click="logoutitem" type="warning">注销登录</el-button>
          <el-button
            type="info"
            icon="el-icon-setting"
            @click="$router.push('/settings')"
          ></el-button> -->
        </div>
      </el-header>
      <!-- 主体区域右侧内容区域 -->
      <el-main class="home-main">
        <router-view></router-view>
        <el-backtop target=".home-main"></el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getPermission } from '../api/user';

export default {
  name: 'Home',
  data() {
    return {
      /* 左侧导航权限列表 */
      menuList: [],
      show: false,
      infoShow: false,
      /* 导航对应图标 */
      iconObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-key',
        101: 'el-icon-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-data-analysis',
      },
      /* 是否折叠菜单 */
      isCollapse: true,
      /* 当前激活菜单 */
      activeIndex: '',
      userName: '',
    };
  },
  computed: {
    /* 折叠按钮的文本 */
    textCollapse() {
      return this.isCollapse ? '' : '收起';
    },
    /* 右侧菜单的宽度，根据是否折叠控制 */
    asideWidth() {
      return this.isCollapse ? '65px' : '220px';
    },
  },
  created() {
    setTimeout(() => {
      this.show = true;
    }, 300);
    setTimeout(() => {
      this.infoShow = true;
    }, 400);
    /* 请求导航列表信息 */
    this.getMunuList();
    /* 请求激活的导航信息 从sessionStorage */
    this.activeIndex = sessionStorage.getItem('index')
      ? sessionStorage.getItem('index')
      : '';
    /* 获取local中的是否折叠选项，只要不是true都设为false */
    this.isCollapse =
      localStorage.getItem('isCollapse') === 'true' ? true : false;
    this.userName = sessionStorage.getItem('userName');
  },
  methods: {
    toHome() {
      console.log(this.$route.path);
      if (this.$route.path !== '/Welcome') this.$router.push('/Welcome');
    },
    /* 保存导航的激活状态 */
    saveActive(val) {
      this.activeIndex = val;
      sessionStorage.setItem('index', val);
    },
    /* 处理折叠按钮点击事件 */
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
      localStorage.setItem('isCollapse', this.isCollapse);
    },
    /* 获取列表数据 */
    getMunuList() {
      /* 调用封装的api */
      getPermission().then((res) => {
        const data = res.data;
        if (data.meta.status !== 200) {
          return this.$message.error(data.meta.msg);
        }
        this.menuList = data.data;
      });
    },
    /* 处理注销登录按钮点击事件 */
    logout() {
      // eslint-disable-next-line no-debugger
      debugger;
      this.$confirm('将注销此次登录，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          sessionStorage.removeItem('token');
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '成功退出登录!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
        });
    },
    logoutitem() {
      console.log('123');
    },
  },
};
</script>

<style lang="less" scoped>
/* 整个首页样式 */
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
.el-menu {
  border-right: 0px;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #fff;
}
.el-menu-item-group__title {
  padding: 0px;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}

.home-container {
  height: 100%;
}

/* 头部区域样式 */
.el-header {
  // background-image: linear-gradient(#00bcd4, #2196f3);
  background: #f9fbfc;
  color: #000000;
  text-align: center;
  line-height: 8vh;
  height: 8vh !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  .btn-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* logo区域样式 */
  .btn-news {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
    margin-top: -10px;
    box-shadow: 0 13px 15px -8px rgb(221 225 232 / 80%),
      0 16px 10px -5px rgb(221 225 232 / 60%);
    border-radius: 6px;
    cursor: pointer;
  }
  .img-avatar {
    margin-top: 10px;

    /deep/ .el-avatar {
      box-shadow: 0 13px 15px -8px rgb(221 225 232 / 80%),
        0 16px 10px -5px rgb(221 225 232 / 60%);
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .header-logo {
    height: 100%;
    /* logo文本的样式 */
    p {
      margin-top: 5px;
      margin-left: 30px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}

/* 左侧导航区域 */
.el-aside {
  background-color: #fff;
  /* 折叠按钮区域 */
  .squares {
    width: 24px;
    height: 24px;
  }
  .login-boss {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 10px 36px 10px;
    .title {
      color: #53a500;
      margin-left: 15px;
      font-weight: 800;
    }
  }
  .squares {
    .top_r {
      fill: #8dc63f;
    }
    .top_l {
      fill: #f26522;
    }
    .bom_l {
      fill: #00aeef;
    }
    .bom_r {
      fill: #ffc20e;
    }
  }
  .btn-collapse-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    position: fixed;
    bottom: 120px;
    left: 15px;
    font-size: 22px;
    .btn-menu-card {
      position: relative;
      width: 190px;
      height: 250px;
      background: #b1f78b;
      border-radius: 15px;
      text-align: center;
      overflow: hidden;
      .btn-left {
        position: absolute;
        left: -134px;
        top: -115px;

        width: 200px;
        height: 200px;
        border-radius: 100%;
        background: #d4fbbe;
      }
      .btn-right {
        position: absolute;
        right: -100px;
        bottom: -100px;
        z-index: 1;
        width: 200px;
        height: 200px;
        border-radius: 100%;
        background: #d4fbbe;
      }
      .btn-rad-big {
        width: 50px;
        height: 50px;
        background: #fff;
        border-radius: 100%;
        position: absolute;
        left: 70px;
        top: -12px;
        box-shadow: 0 13px 15px -8px rgb(51 51 51 / 40%),
          0 16px 10px -5px rgb(51 51 51 / 10%);
        // box-shadow: 0 14px 26px -12px rgb(51 51 51 / 42%),
        //   0 4px 23px 0px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(51 51 51 / 20%);
        .btn-rad-samll {
          width: 25px;
          height: 25px;
          background: #b1f78b;
          border-radius: 100%;
          position: absolute;
          left: 12px;
          top: 12px;
        }
      }
      .btn-txt {
        position: absolute;

        width: 190px;
        height: 100px;
        line-height: 100px;
        top: 70px;
        h3 {
          font-size: 20px;
          height: 15px;
          line-height: 15px;
        }
        p {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
        }
      }
      .btn-btn {
        position: absolute;
        bottom: 20px;
        padding: 15px;
        width: 160px;
        z-index: 2;
        color: #000000;
      }
    }
    /* 折叠按钮 */
    .btn-collapse {
      width: 100%;
    }
  }
  .btn-menu {
    align-items: center;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    display: flex;
    margin-top: 50px;
  }
}

/* 内容区域 */
.home-main {
  background-color: #f9fbfc;
  color: #333;
  width: 100%;
  height: 92vh;
  overflow-y: auto;
}
</style>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.my-custom-style {
  /* ... */
  text-shadow: 2px 2px 4px #fff;
  cursor: pointer;
}
</style>
