import request from "../utils/request.js"

//注册接口
export function userRegister(userName,userPassword,userEmail){
  return request({
    url:"/api/reg",
    method:"POST",
    data:{
      userName,
      userPassword,
      userEmail
    }
  })
}


//登录接口
export function userLogin(username,password){
  return request({
    url:"/login",
    method : "POST",
    data:{
      'userName':username,
      'passWord':password
    }
  })
}
