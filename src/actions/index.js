import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {
  BASEURL,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD_USER,
  ADD_TO_CART,
  REMOVE_USER_DATA,
  LOGIN_SUCCESS_USER,
  LOGIN_SUCCESS_TOKEN,
} from '../constants';

const header = {
  'Content-Type': 'application/json',
};


const instance = axios.create({
  baseURL: BASEURL,
  timeout: 3000,
});

//请求拦截处理
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log('Request error: ', error);
  return Promise.reject(error);
});

//返回拦截处理
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.log('Request error: ', error);
  return Promise.reject(error);
});

export const httpRequestPost = async (api, params, header) => {
  return new Promise((resolve, reject) => {
    instance.post(api, JSON.stringify(params), {
      headers: header,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        console.log('httpRequestPost error: ', JSON.stringify({ api, params, error }));
        reject(error)
      })
  })
}
export const httpRequestGet = async (api, header) => {
  return new Promise((resolve, reject) => {
    instance.get(api, {
      headers: header,
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        console.log('httpRequestGet error: ', JSON.stringify({ api, error }));
        reject(error)
      })
  })
}

// 身份
export const getUser = payload => ({ type: LOGIN_SUCCESS, payload });

export const loginSuccess = user => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, data: user });
};

export const logoutAction = () => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, data: {} });
};

export const signup = (username, password, email, repassword, callback) =>
  async dispatch => {
    const params = {
      username: username,
      password: password,
      email: email,
      repassword: repassword,
    };
    httpRequestPost('register', params, header)
      .then(res => {
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  };

export const signin = (email, password, callback) =>
  async dispatch => {
    const params = {
      email: email,
      password: password,
    };
    httpRequestPost('login', params, header)
      .then(res => {
        if (res.code == 1000) {
          data = res.data;
          dispatch({ type: LOGIN_SUCCESS_TOKEN, data: { data } });
        } else {
          dispatch({ type: LOGIN_SUCCESS_TOKEN, data: {} });
        }
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  };

export const jwtauth = (token, callback) =>
  async dispatch => {
    const header = {
      'auth-token': token,
    };
    httpRequestGet('profile',  header)
      .then(res => {
        if (res.code == 1000) {
          data = res.data;
          dispatch({ type: LOGIN_SUCCESS, data: { data } });
        } else {
          dispatch({ type: LOGIN_SUCCESS, data: {} });
        }
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  };



// 新闻

export const getcommunity = (callback) =>
  async () => {
    httpRequestGet('community', header)
      .then(res => res.json())
      .then(res => {
        callback(res);
        console.info(res)
      })
      .catch(err => {
        console.log(err);
      })
  };
// export const getnews = (community, pageSize, page,callback) =>
//   async () => {
//     httpRequestGet(`postlistcommunity?community=${community}&pageSize=${pageSize}&pageSize=${page}`, params = null, header)
//       .then(res => res.json())
//       .then(res => {
//         callback(res);
//         console.info(res)
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   };



  export const getnews = (community, pageSize, page, callback) =>
  async () => {
   
    httpRequestGet(`postlistcommunity?community=${community}&pageSize=${pageSize}&pageSize=${page}`, header)
      .then(res => {
        if (res.code == 1000) {
          data = res.data;
          console.info(data)
        } else {
        }
        callback(res);
      })
      .catch(err => {
        console.log(err);
      })
  };

