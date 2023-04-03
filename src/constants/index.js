export const BASEURL = 'http://192.168.2.5:19787/api/v1/';

export const communityURL = `${BASEURL}community`;//首页板块
export const postlistcommunityURL = `${BASEURL}postlistcommunity`;//首页新闻

// export default{
// 	BASEURL:BASEURL,
// detailUrl:`${BASEURL}/news_info/national?content_id=`, //国内新闻详情
// foreignUrl:`${BASEURL}/news/foreign?tag=`, // 国际新闻列表
// foreignDetailUrl:`${BASEURL}/news_info/foreign?url=`, // 国际新闻详情
// editFavoriteApi:`${BASEURL}/news_info/editFavorite`,	//添加取消收藏
// loadFavoriteDataUrl:`${BASEURL}/news_info/collection?flag=`,	//获取收藏文章列表
// loginUrl:`${BASEURL}/users/login`,//登录
// registerUrl:`${BASEURL}/users/register`,//注册
// searchUrl:`${BASEURL}/news_info/search?q=`,//搜索
// subscribeUrl:`${BASEURL}/users/getSubscribe?user_id=`,//获取订阅信息
// editSubscribeUrl:`${BASEURL}/users/editSubscribe`,		//订阅和取消订阅

// }

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
