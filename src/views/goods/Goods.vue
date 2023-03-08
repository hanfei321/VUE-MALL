<template>
  <div class="goods">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div slot="header" class="clearfix">
        <el-row>
          <el-col :span="20">
            <transition enter-active-class="animated bounceInRight">
              <p
                v-if="titleShow"
                class="text-2xl leading-0 font-black text-regal-greed"
              >
                商品列表
              </p>
            </transition>
          </el-col>
          <el-col :span="4">
            <el-button
              style="float: right; margin-right: 10px;"
              type="primary"
              @click="goAddPage"
              round
              >添加商品</el-button
            >
          </el-col>
        </el-row>
      </div>
      <el-input
        v-model="queryInfo.query"
        @clear="resetTable"
        clearable
        placeholder="请输入商品名称"
        style="width: 300px;"
      >
      </el-input>

      <!-- 搜索按钮 -->
      <el-button
        type="primary"
        style="margin-left: 15px;"
        icon="el-icon-search"
        @click="queryGood"
      >
      </el-button>

      <!-- 数据表格 -->
      <el-table
        stripe
        border
        :data="goodsList"
        style="width: 100%; margin: 20px 0;"
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <!-- <el-table-column prop="goods_id" label="商品图片" width="120px">
          <template v-slot="scope">
            {{ goodsInfo(scope.row.goods_id) }}
            <el-image
              style="width: 100px; height: 100px"
              :src="goodsInfo(scope.row.goods_id)"
              :preview-src-list="goodsInfo(scope.row.goods_id)"
            >
            </el-image>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="goods_price"
          label="商品价格"
          width="90px"
        ></el-table-column>
        <el-table-column
          prop="goods_number"
          label="商品数量"
          width="90px"
        ></el-table-column>
        <el-table-column
          prop="goods_weight"
          label="商品重量"
          width="90px"
        ></el-table-column>
        <el-table-column prop="add_time" label="创建时间" width="160px">
          <template v-slot="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :disabled="$store.state.tooltipOpen"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                style="color: #4caf50;"
                @click="openEditView(scope.row.goods_id)"
                >编辑</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="查看商品"
              placement="bottom"
              :disabled="$store.state.tooltipOpen"
            >
              <el-button
                type="text"
                style="color: #00bcd4;"
                @click="lookGood(scope.row.goods_id)"
                >查看</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除商品"
              placement="bottom"
              :disabled="$store.state.tooltipOpen"
            >
              <el-button
                type="text"
                style="color: #f44336;"
                @click="delGood(scope.row.goods_id)"
                >删除</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 10, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      title="查看详情"
      :visible.sync="centerDialogVisible"
      width="40%"
      center
    >
      <el-row>
        <el-col :span="24" class="goodsInfoRow"
          ><div class="grid-content bg-purple-dark">
            {{ goodsInfo.goods_name }}
          </div></el-col
        >
      </el-row>

      <el-row>
        <el-col :span="24" v-if="skeloading">
          <el-skeleton-item
            variant="image"
            style="width: 240px; height: 240px;"
          />
        </el-col>
        <el-col :span="24" v-else
          ><div
            class="grid-content bg-purple-dark"
            v-html="goodsInfo.goods_introduce"
          ></div
        ></el-col>
      </el-row>
      <template v-for="item in goodsInfo.pics">
        <el-row>
          <el-col :span="24"
            ><div
              style="  display: flex ;
  justify-content: center;
  align-items: center;
  margin-top: 20px;"
            >
              <el-image
                lazy
                :src="item.pics_mid_url"
                :previewSrcList="[item.pics_mid_url]"
              >
              </el-image></div
          ></el-col>
        </el-row>
      </template>

      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >确 定</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsList, deleteGood, getGoodsInfo } from '../../api/goods';
export default {
  name: 'Goods',
  data() {
    return {
      centerDialogVisible: false,
      titleShow: false,
      /* 分页信息 */
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      /* 商品数据 */
      goodsList: [],
      goodsInfo: [],
      picsImage: '',
      skeloading: true,

      /* 添加相关数据和状态 */
    };
  },
  created() {
    setTimeout(() => {
      this.titleShow = true;
    }, 10);
    this.getGoods();
  },
  methods: {
    /* 获取商品列表数据 */
    async getGoods() {
      const { data: res } = await getGoodsList(this.queryInfo);
      if (res.meta.status !== 200)
        return this.$message.error('获取商品数据失败');
      this.goodsList = res.data.goods;
      this.total = res.data.total;
      console.log(res.data);
    },
    // async goodsInfo(goodsId) {
    //   const { data: infoRes } = await getGoodsInfo(goodsId);
    //   this.goodsInfo = infoRes.data.data;
    // },
    /* 分页大小变化的回调 */
    handleSizeChange(newVal) {
      this.queryInfo.pagesize = newVal;
      this.getGoods();
    },
    /* 当前页变化的回调 */
    handleCurrentChange(newVal) {
      this.queryInfo.pagenum = newVal;
      this.getGoods();
    },
    /* 搜索商品 */
    queryGood() {
      this.getGoods();
    },
    /* 清除搜索 */
    resetTable() {
      this.getGoods();
    },
    async delGood(id) {
      const result = await this.$confirm(
        '此操作将删除该商品, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err);

      if (result !== 'confirm') return this.$message.info('取消删除');
      const { data: res } = await deleteGood(id);
      if (res.meta.status !== 200) return this.$message.error('删除失败');
      this.getGoods();
    },
    openEditView(id) {
      console.log(id);
    },
    async lookGood(goodsId) {
      const { data: infoRes } = await getGoodsInfo(goodsId);
      debugger;
      this.goodsInfo = infoRes.data;
      this.centerDialogVisible = true;
      setTimeout(() => {
        this.skeloading = false;
      }, 1000);
    },
    goAddPage() {
      this.$router.push('/addgood');
    },
  },
  computed: {
    // titleCont(){
    //   return this.$store.state.tooltipOpen ? false : '123123'
    // }
  },
};
</script>

<style lang="less" scoped>
.goodsInfoRow {
  font-size: 22px;
  font-weight: 800;
  display: flex;
  justify-content: center;
}
.goodspics {
  display: flex !important;
  justify-content: center !important;
  align-items: center;
  margin-top: 20px;
}
</style>
