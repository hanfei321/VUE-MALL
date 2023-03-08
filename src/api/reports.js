import http from '../service/http.js';
export function getAmountList() {
  return http.get(
    'https://mock.presstime.cn/mock/63dc732fcd45a5cd22e2ca4b/cms/goods/amount/list'
  );
}

export function getcategoryGoodsCount() {
  return http.get(
    'https://mock.presstime.cn/mock/63dc732fcd45a5cd22e2ca4b/cms/goods/category/count'
  );
}

export function categoryGoodsSale() {
  return http.get(
    'https://mock.presstime.cn/mock/63dc732fcd45a5cd22e2ca4b/cms/goods/category/sale'
  );
}

export function categoryGoodsFavor() {
  return http.get(
    'https://mock.presstime.cn/mock/63dc732fcd45a5cd22e2ca4b/cms/goods/category/favor'
  );
}

export function addressGoodsSale() {
  return http.get(
    'https://mock.presstime.cn/mock/63dc732fcd45a5cd22e2ca4b/cms/address/sale'
  );
}
