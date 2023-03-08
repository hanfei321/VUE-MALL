import {
  addressGoodsSale,
  categoryGoodsFavor,
  categoryGoodsSale,
  getcategoryGoodsCount,
  getAmountList,
} from '../api/reports';

const Dashboard = {
  namespaced: true,
  state() {
    return {
      topPanelDatas: [],
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: [],
    };
  },
  getters: {},
  mutations: {
    changeTopPanelDatas(state, list) {
      state.topPanelDatas = list;
    },
    changeCategoryCount(state, list) {
      state.categoryGoodsCount = list;
    },

    changeCategoryFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeCategorySale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeAddressSale(state, list) {
      state.addressGoodsSale = list;
    },
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const resultTopPanelDatas = await getAmountList();
      commit('changeTopPanelDatas', resultTopPanelDatas.data);

      const categoryCountResult = await getcategoryGoodsCount();
      commit('changeCategoryCount', categoryCountResult.data);

      const categoryFavorResult = await categoryGoodsFavor();
      commit('changeCategoryFavor', categoryFavorResult.data);

      const categorySaleResult = await categoryGoodsSale();
      commit('changeCategorySale', categorySaleResult.data);

      const addressSaleResult = await addressGoodsSale();
      commit('changeAddressSale', addressSaleResult.data);
    },
  },
};
export default Dashboard;
