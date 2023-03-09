import axios from "axios"//引入axios


//创建axios实例
let flaskUrl = "http://192.168.100.78:5000"
let nodeServelUrl = "http://192.168.100.78:8000/"

const request = axios.create({
  //请求的公共接口地址
  baseURL: flaskUrl,
  //请求的超时时间
  timeout: 5000,
})

//配置请求拦截和响应拦截
//添加请求拦截器
// request.interceptors.request.use(function (config) {
//   loading.close();
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     loading.close();
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// // 添加响应拦截器
// request.interceptors.response.use(function (response) {
//   loading.close();
//     // 对响应数据做点什么
//     return response;
//   }, function (error) {
//     console.log(error.response)
//     // if(error.response.status == 200){
//     //   Message.error("登录超时");
//     //   router.push("/login");
//     //   removeToken();
//     //   removeUserInfo();
//     // }
//     loading.close();
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   });


//导出axios实例
export default {
  request,
  flaskUrl,
  nodeServelUrl
}
