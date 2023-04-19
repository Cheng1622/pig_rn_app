import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {
  BASEURL,
} from '../constants';

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

export const httpRequestPost = async (api, params, httpHeaders) => {
  return new Promise((resolve, reject) => {
    instance.post(api, JSON.stringify(params), {
      headers: httpHeaders,
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
export const httpRequestGet = async (api, httpHeaders) => {
  return new Promise((resolve, reject) => {
    instance.get(api, {
      headers: httpHeaders,
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
export const httpRequestPut = async (api, params, httpHeaders) => {
  return new Promise((resolve, reject) => {
    instance.put(api, JSON.stringify(params), {
      headers: httpHeaders,
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

export const httpRequestDelete = async (api, httpHeaders) => {
  return new Promise((resolve, reject) => {
    instance.delete(api, {
      headers: httpHeaders,
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



// // 身份
// export const signup = (username, password, email, repassword, callback) =>
//   async dispatch => {
//     const params = {
//       username: username,
//       password: password,
//       email: email,
//       repassword: repassword,
//     };
//     httpRequestPost(registerURL, params, httpHeaders)
//       .then(res => {
//         callback(res);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   };

// export const signin = (email, password, callback) =>
//   async dispatch => {
//     const params = {
//       email: email,
//       password: password,
//     };
//     httpRequestPost(loginURL, params, httpHeaders)
//       .then(res => {
//         if (res.code == 1000) {
//           data = res.data;
//           dispatch({ type: LOGIN_SUCCESS_TOKEN, data: { data } });
//         } else {
//           dispatch({ type: LOGIN_SUCCESS_TOKEN, data: {} });
//         }
//         callback(res);
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   };

// // export const jwtauth = (token, callback) =>
// //   async dispatch => {
// //     const httpHeaders = {
// //       'auth-token': token,
// //     };
// //     httpRequestGet(userURL,  httpHeaders)
// //       .then(res => {
// //         if (res.code == 1000) {
// //           data = res.data;
// //           dispatch({ type: LOGIN_SUCCESS, data: { data } });
// //         } else {
// //           dispatch({ type: LOGIN_SUCCESS, data: {} });
// //         }
// //         callback(res);
// //       })
// //       .catch(err => {
// //         console.log(err);
// //       })
// //   };

//   const jwtauth = async dispatch => {
//     try {
//       const httpHeaders = {
//         'auth-token': token.data,
//       };
//       const res = await httpRequestGet(userURL, httpHeaders)
//       if (res.code != 1000) {
//         const userdata = res.data;
//         dispatch({ type: LOGIN_SUCCESS, data: { userdata } });
//         navigation.replace('MainApp');
//       } else {
//         dispatch({ type: LOGIN_SUCCESS, data: {} });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


// // 新闻

// export const getcommunity = (callback) =>
//   async () => {
//     httpRequestGet('community', httpHeaders)
//       .then(res => res.json())
//       .then(res => {
//         callback(res);
//         console.info(res)
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   };
// // export const getnews = (community, pageSize, page,callback) =>
// //   async () => {
// //     httpRequestGet(`postlistcommunity?community=${community}&pageSize=${pageSize}&pageSize=${page}`, params = null, header)
// //       .then(res => res.json())
// //       .then(res => {
// //         callback(res);
// //         console.info(res)
// //       })
// //       .catch(err => {
// //         console.log(err);
// //       })
// //   };



//   // export const getnews = (community, pageSize, page, callback) =>
//   // async () => {
   
//   //   httpRequestGet(`postlistcommunity?community=${community}&pageSize=${pageSize}&pageSize=${page}`, header)
//   //     .then(res => {
//   //       if (res.code == 1000) {
//   //         data = res.data;
//   //         console.info(data)
//   //       } else {
//   //       }
//   //       callback(res);
//   //     })
//   //     .catch(err => {
//   //       console.log(err);
//   //     })
//   // };

