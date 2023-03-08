<template>
  <Layout class="layout-wrapper">
    <Header class="bg-white">
      <img style="width: 50px; height: 50px;" src="../../img/云舟log.png"/>
      <h1 style="position: absolute; top: 20px;left: 100px;">云舟</h1>
      <Dropdown style="position: absolute; top: 5px;right: 30px;">
              <a href="javascript:void(0)">
                  {{username}},欢迎！
                  <Icon type="ios-arrow-down"></Icon>
              </a>
              <template #list>
                  <DropdownMenu>
                      <DropdownItem><a @click="userrename">修改名称</a></DropdownItem>
                      <DropdownItem><a @click="exit">退出登录</a></DropdownItem>
                  </DropdownMenu>
              </template>
          </Dropdown>
    </Header>
    <Layout class="bg-white border-top">
      <Sider hide-trigger class="bg-white">
        <Menu @on-select="selected" width="200px" theme="light" active-name="1">
            <MenuItem name="1">
              <Icon type="md-document" />我的文件</MenuItem>
            <MenuItem name="2">
              <Icon type="md-chatbubbles" />我的图片</MenuItem>
            <MenuItem name="3">
              <Icon type="md-heart" />我的收藏</MenuItem>
        </Menu>
        <div class="footer-left">
          <span class="small">总共：{{this.max}}GB </span><br />
          <span class="small text-warning">  已用：{{this.memory}}M</span>
        </div>
      </Sider>
      <Content class="index-content">
        <div class="content-box">
          <router-view :searchVal="searchVal"/>
        </div>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import {userLogin} from "../api/user.js"
import indexApi from "../api/index.js"
import { getCookie } from '../assest/cookie.js'
export default {
  data () {
    return {
      searchVal:0,
      userid:0,
      username:"",
      max:1024,
      memory:0,
      name:0
    }
  },
  props:{
    item : Object,
    index : [Number,String]
  },
  methods:{
    formatList(list) {
      const listData = list.map((item, index) => {
        item.type = item.fileSuffix === "" ? "dir" : item.fileSuffix,
          item.checked = false
        return item
      });
      return listData;
    },
    exit(){
      this.$Message.success("已成功退出")
      this.$router.push("/")
    },
    selected(name){
      switch(name){
        case '1':
          this.searchVal = 0;
          break;
        case '2':
          this.searchVal = 1;
          break;
        case '3':
          this.searchVal = 2;
          break;
      }
    },
    userrename(){
      let value = this.username;
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: value,
              autofocus: true,
              placeholder: 'Please enter your name...',
            },
            on: {
              input: (val) => {
                value = val;
              },
            }
          })
        },
        onOk: () => {
          this.username = value;
          indexApi.userRename(this.userid,value).then(response=>{
            this.initData()
          }).catch(error=>{
            console.log(error)
          })
        },
      })
    }
  },
  created() {
    // let fileData = JSON.parse(sessionStorage.getItem("userData"))
    console.log(getCookie("username"))
    this.username = getCookie("username")
    this.memory = getCookie("memory")
    this.max = getCookie("max")
    // this.username = fileData['userName'],
    // this.userid = fileData['userId'],
    // this.memory = fileData['userPassword']
  },
}
</script>
<style scoped="scoped">
  .layout-wrapper{
    height: 760px;
  }
  .footer-left{
    position: absolute;
    left: 15%;
    bottom: 60px;
    width: 200px;
  }
  .index-content{
    height: 100%;
    position: relative;
  }
  .content-box{
    position: absolute;
    overflow-y: auto;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
</style>
