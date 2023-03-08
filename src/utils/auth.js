const USER_TOKEN = "token";
const USER_INFO = "user"

//获取用户信息
export function getUserInfo(){
  return localStorage.getItem(USER_INFO)
}
//删除用户信息
export function removeUserInfo(){
  localStorage.removeItem(USER_INFO)
}
//设置用户信息
export function setUserInfo(user){
  localStorage.setItem(USER_INFO,JSON.stringify(user))
}
//获取Token
export function getToken(){
  return localStorage.getItem(USER_TOKEN)
}
//设置token
export function setToken(data){
  localStorage.setItem(USER_TOKEN,data)
}
//删除token
export function removeToken(){
  localStorage.removeItem(USER_TOKEN)
}
