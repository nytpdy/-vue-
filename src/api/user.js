import API from "../utils/request.js"

//注册接口
export function userRegister(ver, name, password, email) {
  return API.request({
    url: "/confirmCreation",
    method: "post",
    data: {
      'ver': ver,
      'name': name,
      'password': password,
      'email': email
    }
  })
}


//登录接口
export function userLogin(username, password) {
  return API.request({
    url: "/login",
    method: "POST",
    data: {
      'userName': username,
      'passWord': password
    }
  })
}
