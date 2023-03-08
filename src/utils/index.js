import Vue from "vue"
import Vuex from "vuex"
import { userLogin } from "../api/user.js"
Vue.use(Vuex);

import {setToken,setUserInfo,getToken,getUserInfo} from "./auth.js"

export default new Vuex.Store({
  state:{
    user:getUserInfo() ? getUserInfo() : null,
    token:getToken() ? getToken() : null
  },
  mutations :{
    changeUser(state,payload){
      state.user = payload
      setUserInfo(payload)
    },
    changeToken(state,token){
      state.token = token
      setToken(token)
    }
  },
  actions :{
    login({commit},data){
      return new Promise((resolve,reject)=>{
        userLogin(data.username,data.password).then(response=>{
          resolve(response)
          commit("changeUser",response.data.data)
          commit("changeToken",response.data.data.token)
        }).catch(error=>{
          reject(error)
        })
      })
    }
  },
  modules:{}
})
