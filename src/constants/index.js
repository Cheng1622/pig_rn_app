export const BASEURL = 'https://api.cjic.ga:444/';

export const registerURL = `register`;
export const loginURL = `login`;
export const userURL = `user/`; // 验证用户
export const infoURL = `user/info`; // 修改信息
export const authorURL = `user/`; // 查看作者
export const collectsURL = `collects`;   // 查询收藏
export const newcollectsURL = `collects/new/`;   // 收藏
export const uncollectsURL = `collects/`;   // 取消收藏
export const followURL = `follow`;   // 查询收藏
export const newfollowURL = `follow/new/`;   // 收藏
export const unfollowURL = `follow/`;   // 取消收藏
export const communityURL = `community`;   // 查询分类
export const communityidURL = `community/`;   // 查询分类名

export const postarticleURL = `article/`;  // 发布文章
export const putarticleURL = `article/`;  // 修改文章
export const deletearticleURL = `article/`;  // 删除文章
export const getarticleURL = `article/`;  // 查看文章

export const listarticleURL = `article/postlist`;  // 显示文章列表
export const list1articleURL = `article/postlist2`;  // 显示最热/新
export const videoarticleURL = `article/video/`;  // 视频

export const listURL = `list`;  // 行情
export const listlastURL = `listlast`;  // 行情
export const listidURL = `list/`;  // 行情
export const likeURL = `like/`;  // 点赞


export const httpHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const paypalToken = {
  sandbox: 'sandbox_x6rhtrj9_7vmbxf7bq8rqp8wx',
  product: '',
};

export const REACT_APP_PAYPAL_CLIENT_ID =
  'AT2vGDoMeFvF2icC2IXcftrRwkgBBUmEkjn6Fz0VP4Xm23z-LI8L9NYqvxvRPZyoY6thXXncsDo-Drgf';
export const REACT_APP_PAYPAL_CLIENT_SECRET =
  'EPXZrd8Ruv542qbJ3Gs826u15nG08wfMMWsMa6pYl-Zmq4M2Neomi2bhQ0YjBXlGc0yj7L_po1Gr0Fxo';

// redux
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_SUCCESS_TOKEN = 'LOGIN_SUCCESS_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';
export const CURRENT_USER = 'CURRENT_USER';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';
