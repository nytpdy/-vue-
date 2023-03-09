<template>
  <div class="index-wrapper">
    <div class="index-top bg-white border-bottom px-3 d-flex flex-column">
      <div class="top-button d-flex align-item-center">

        <Button type="primary" icon="ios-cloud-upload-outline" class="mr-2" @click="uploadModalStatus = true">上传</Button>
        <Button icon="ios-search" class="mr-2" @click="createDir">新建文件夹</Button>
        <Button icon="ios-search" @click="return_folder" v-if="returnFolder != 0" class="mr-2">返回上级</Button>
        <a @click="download(0)"><Button icon="ios-search" v-if="checkedCount" class="mr-2">下载</Button></a>
        <Button icon="ios-search" @click="deleteItem(0)" v-if="checkedCount" class="mr-2">删除</Button>
        <Button icon="ios-search" @click="rename(false)" v-if="checkedCount === 1" class="mr-2">重命名</Button>
        <!-- <Button icon="ios-search" @click="" v-if="checkedCount === 1" class="mr-2">预览</Button> -->
        <Input search enter-button class="index-search ml-auto" @on-search="initData" placeholder="请输入关键词..." />
      </div>

      <div class="top-select bg-white d-flex align-item-center">
        <Checkbox :value="checkAllStatus" size="small" @on-change="checkAllChange"><span class="ml-2">全选</span>
        </Checkbox>
      </div>

    </div>

    <div class="index-list bg-white">
      <media-list @on-event="onEvent" v-for="(item, index) in list" :item="item" :index="index" :key="index">
      </media-list>
    </div>

    <div class="bg-white index-page d-flex align-item-center px-3 border-top">
      <Page @on-change="Page" model-value :total="pagesize" />
    </div>

    <div class="images d-none" v-viewer="{ movable: false }">
      <img v-for="(item, index) in images" :src="item.url" :key="index">
    </div>
    <!-- <Modal v-model="uploadModalStatus" fullscreen footer-hide title="上传文件" @on-cancel="initData"> -->
    <Modal v-model="uploadModalStatus" title="上传文件" @on-cancel="initData">

      <el-upload class="upload-demo" drag action="" multiple :http-request="uploadFile">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传指定格式文件,且不超过20GB</div>
      </el-upload>

      <!-- <a href="javascript:;" class="a-upload"> -->
      <!-- <input type="file" name="">点击这里上传文件 -->
      <!-- </a> -->
      <!-- <div style="margin-top: 30px;">
        <Button type="primary" icon="ios-cloud-upload-outline" class="mr-2" @click="upload">上传</Button>
      </div> -->
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import mediaList from "../components/media-list.vue"
import indexApi from "../api/index.js"
import { getCookie } from '../assest/cookie.js'
import Url from '../utils/request.js'

export default {
  components: {
    mediaList,
  },
  computed: {
    //当前列表里面所有的type类型为image的数据
    images() {
      const urls = [];
      this.list.forEach((item, index) => {
        if (item.fileSuffix == "jpg" && item.fileSuffix == "png" && item.fileSuffix == "JPG" && item.fileSuffix == "PNG") {
          urls.push(item)
        }
      })
      return urls;
    },
    checkList() {
      return this.list.filter(item => item.checked == true)
    },
    checkAllStatus() {
      return this.list.length == this.checkList.length
    },
    checkedCount() {
      return this.checkList.length
    },
    returnFolder() {
      return this.folder_id
    }
  },

  created() {
    var total = sessionStorage.getItem("total")
    this.pagesize = parseInt(total)
    this.initData()
  },

  methods: {

    //文件上传
    async uploadFile(params) {
      let name = getCookie("username")
      let form = new FormData();
      form.append("file", params.file);
      form.append("userName", name);

      const res = await axios.post(Url.flaskUrl + "/upload", form);
      console.log(res);
      this.imageUrl = res.data;
      this.initData()
    },


    //处理请求到的列表数据，转化成我们想要的数据格式
    formatList(a) {
      // console.log(a)
      // console.log(Object.values(a))
      const listData = Object.values(a).map((item, index) => {
        // item.type = item.fileSuffix === "" ? "dir" : item.fileSuffix
        if (item.fileType == "folder")
          item.type = "dir"
        else
          // console.log(item.fileSuffix)
          switch (item.fileSuffix) {
            case "jpg":
            case "JPG":
            case "png":
            case "PNG":
            case "txt":
            case "mp4":
            case "avi":
            case "pdf":
            case "doc":
            case "docx":
            case "xls":
            case "xlsx":
            case "csv":
            case "pptx": item.type = item.fileSuffix; break;
            default: item.type = "elses";
          }
        item.checked = false
        return item
      });
      console.log(listData)
      return listData;
    },
    uploadModal() {
      this.$Router.push({
        name: ''
      })
    },
    //初始化文件列表数据
    initData(data) {
      // let userData = JSON.parse(sessionStorage.getItem("userData"))
      console.log(getCookie("username"))
      let uesr = getCookie("username")
      console.log(uesr)
      if (data == "") {
        indexApi.getFileList(uesr).then(response => {
          // console.log(response.data)
          if (response.status == 200) {
            sessionStorage.setItem('total', response.data.total)
            this.list = this.formatList(response.data)
            // console.log("hello--------------------------------")
            // console.log(this.list)
          }
        })
      } else {
        indexApi.getFileList(uesr).then(response => {
          // console.log(response.data)
          // console.log(response.status)
          if (response.status == 200) {
            sessionStorage.setItem('total', response.data.total)
            this.list = this.formatList(response.data)
            // console.log("hello--------------------------------")
            // console.log(this.list)
          }
        })
      }
    },
    //创建文件夹
    createDir() {
      let name = JSON.parse(sessionStorage.getItem("userData"))
      let value = "";
      this.$Modal.confirm({
        title: "新建文件夹",
        render: (h) => {
          return h('Input', {
            props: {
              value: value,
              autofocus: true,
              placeholder: '请输入文件夹名称......',
            },
            on: {
              input: (val) => {
                value = val;
              }
            }
          })
        },
        onOk: () => {
          indexApi.createFolder(this.folder_id, value, name['userName']).then(response => {
            // console.log(response)
            if (response.data.code == 200)
              this.initData()
          }).catch(error => {
            console.log(err)
          })
        },
      })
    },

    //上传
    // upload() {
    //   // let name = JSON.parse(sessionStorage.getItem("userData"))
    //   let name = getCookie("username")
    //   var fileList = []
    //   var formData = new FormData()
    //   var path = ""
    //   var test = new Array()
    //   var len = document.querySelector("input[type='file']").files.length
    //   for (let x = 0; x < len; x++) {
    //     formData.append(x, document.querySelector("input[type='file']").files[x])
    //     fileList.push(formData.get("multipartFile"))
    //   }
    //   console.log(formData.get(0), name)
    //   indexApi.setData(formData.get(0), name).then(response => {
    //     this.$Message.success("上传成功！")
    //     // let str_obj = JSON.stringify(response.data.userData[0])
    //     // sessionStorage.setItem('userData',str_obj)
    //     this.uploadModalStatus = false
    //     this.initData()
    //     this.reload()
    //   })

    //   this.$axios.post('http://192.168.31.45:5000/upload',formData.get(0)) //请求头要为表单
    //     .then(response=>{
    //       console.log(response.data);
    //       this.$Message.success("上传成功！")
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     })
    // },

    //返回上一级
    return_folder() {
      this.folder_id = this.preList.split('/').pop()
      this.preList = this.preList.substr(0, this.preList.lastIndexOf('/'))
      this.initData()
    },

    //分页
    Page(data) {
      this.nowpage = data - 1
      let json_obj = JSON.parse(sessionStorage.getItem("userData"))
      console.log(json_obj)
      indexApi.getFileList(json_obj['userId'], 0, data - 1).then(response => {
        this.initData()
      })
    },

    onEvent(e) {
      // alert("yes")
      let uname = getCookie("username")
      console.log(e.type)
      console.log("onEvent")
      switch (e.type) {
        case "delete":
          this.deleteItem(e.item)
          break;
        case "checked":
          this.list[e.index].checked = e.value;
          if (e.value) {
            this.downloadList = this.downloadList + e.item.fileId + "_"
          } else {
            var delList = this.downloadList.split('_')
            var newList = ""
            for (let i = 0; i < delList.length - 1; i++)
              if (e.item.fileId != delList[i])
                newList += delList[i] + "_"
            this.downloadList = newList
            console.log(this.downloadList)
          }
          break;
        case "rename":
          console.log(e.index)
          this.rename(e.index)
          break;
        case "folder":
          this.preList = this.preList + '/' + this.folder_id
          this.folder_id = e.folderid
          this.initData()
          break;
        case "download":
          // alert(e.item)
          console.log("yes")
          console.log(e.item)
          this.download(e.fileName);
          break;
        case "collect":
          if (e.fileCollect == 1) {
            indexApi.cancelcollect(e.fileName, uname).then(response => {
              this.$Message.success("取消成功！")
              this.initData()
            }).catch(error => {
              console.log(error)
            })
            break;
          }
          if (e.fileCollect == 0) {
            indexApi.Collect(e.fileName, uname).then(response => {
              this.$Message.success("收藏成功！")
              this.initData()
            }).catch(error => {
              console.log(error)
            })
          }

          break;
        // case "image":
        // const viewer = this.$el.querySelector("images").$viewer;
        // //获取当前点击要预览的图片在images里面对应的下标
        // const index = this.images.findIndex(item => {
        //   return item.url == e.url
        // })
        // //通过传递下标实现对应图片展示
        // viewer.view(index)
        // viewer.show()

        case "preview":

          break;

        default:
          break;
      }
    },

    //全选
    checkAllChange(e) {
      this.list.map(item => item.checked = e)
      if (e) {
        this.downloadList = ""
        for (let j = 0; j < this.list.length; j++)
          this.downloadList += this.list[j].fileId + "_"
      }
      else
        this.downloadList = ""
      console.log(this.downloadList)
    },

    //批量删除方法
    deleteItem(data) {
      let name = getCookie("username")
      let permissions = getCookie("permissions")
      console.log(data)
      console.log(name)
      console.log(this.checkList)
      console.log(this.checkList.length)
      if (this.checkList.length > 0) {
        console.log("进入if")
        this.checkList.map((checkList) => {
          console.log(checkList)
          if (name != checkList.userName && permissions != 1) {

            //  alert("你没有操作"+checkList.fileName+"文件权限")
            setTimeout(() => {
              this.$Modal.confirm({
                title: "用户错误",
                cancelButtonProps: { style: { display: 'none' } },
                content: "你没有操作" + checkList.fileName + "文件权限",
              }
              )
            }, 50)
            return false;
          }
        })
      }
      else {
        console.log("进入else")
        if (name != data.userName && permissions != 1) {
          this.$Modal.confirm({
            title: "用户错误",
            content: "你没有操作" + data.fileName + "文件权限"
          }
          )
          return false;
        }
      }

      data = data == 0 ? this.checkList.map(item => item.fileName).join('+++') : data.fileName
      console.log(data)
      this.$Modal.confirm({
        title: '删除',
        content: '确认删除当前文件？',
        onOk: () => {
          indexApi.fileDelete(data, name).then(response => {
            if (response.data.code == 200) {
              this.$Message.success("删除成功！")
              // let str_obj = JSON.stringify(response.data.userData[0])
              // sessionStorage.setItem('userData',str_obj)
              this.initData()
              this.reload()
            }
          }).catch(error => {
            console.log(error)
          })
        }
      });
    },

    //下载
    download(fileName) {
      indexApi.downLoad(fileName)
      // let name = JSON.parse(sessionStorage.getItem("userData"))
      // this.url = this.url + this.downloadList + "/" + name['userId']
    },

    //重命名
    rename(index = false) {
      console.log("rename ing");
      let item = index === false ? this.checkList[0] : this.list[index];
      console.log(item);
      let value = item.fileName.substr(0, item.fileName.lastIndexOf('.'));
      let suffix = item.fileName.substr(item.fileName.lastIndexOf('.'), item.fileName.length)
      console.log(value)
      console.log(suffix)
      let fileName = item.fileName;
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
          console.log(fileName, value)
          indexApi.fileRename(fileName, value + suffix).then(response => {
            this.initData()
          }).catch(error => {
            console.log(error)
          })
        },
      })
    }

  },
  data() {
    return {
      x: 0,
      folder_Name: "",
      folder_id: 0,
      uploadModalStatus: false,
      nowpage: 0,
      pagesize: 0,
      value: "",
      list: [],
      idList: {},
      idlist: [],
      preList: "",
      downloadList: "",
      url: "http://localhost//api/download/"
    }
  },
  inject: ['reload'],
  name: "CompanyConfigure",
  props: ['searchVal'],
  watch: {
    searchVal: function (val) {
      this.list = []
      sessionStorage.setItem('total', 0)
      // let userData = JSON.parse(sessionStorage.getItem("userData"))
      let na = getCookie("username")
      switch (val) {
        case 0:
          // indexApi.getFileList(userData["userId"],this.folder_id,this.nowpage,"").then(response => {
          //   // console.log(response)
          //   if (response.data.msg == "200") {
          //     sessionStorage.setItem('total',response.data.total)
          //     this.pagesize = parseInt(sessionStorage.getItem('total'))
          //     this.list = this.formatList(response.data.fileData)
          //   }
          // })
          this.initData()
          break;
        case 1:
          // indexApi.getFileList(userData["userId"],this.folder_id,this.nowpage,"*.jpg").then(response => {
          //   // console.log(response)
          //   if (response.data.msg == "查询成功") {
          //     sessionStorage.setItem('total',parseInt(response.data.total) + parseInt(sessionStorage.getItem('total')))
          //     this.list = this.list.concat(this.formatList(response.data.fileData))
          //   }
          // })
          // indexApi.getFileList(userData["userId"],this.folder_id,this.nowpage,"*.png").then(response => {
          //   // console.log(response)
          //   if (response.data.msg == "查询成功") {
          //     sessionStorage.setItem('total',parseInt(response.data.total) + parseInt(sessionStorage.getItem('total')))
          //     this.list = this.list.concat(this.formatList(response.data.fileData))
          //   }
          // })
          // this.pagesize = parseInt(sessionStorage.getItem('total'))
          indexApi.getpicture(na).then(response => {
            console.log(response)
            if (response.status == 200) {
              // this.list = this.list.concat(this.formatList(response.data))
              this.list = this.formatList(response.data)
            }
          })

          break;
        case 2:
          // indexApi.getcollect(userData["userId"]).then(response => {
          //   // console.log(response)
          //   if (response.data.msg == "查询成功") {
          //     sessionStorage.setItem('total',response.data.total)
          //     this.pagesize = parseInt(sessionStorage.getItem('total'))
          //     this.list = this.formatList(response.data.fileData)
          //   }
          // })
          indexApi.getCollection(na).then(response => {
            console.log(response)
            if (response.status == 200) {
              // this.list = this.list.concat(this.formatList(response.data))
              this.list = this.formatList(response.data)
            }
          })
      }
    }
  }
}
</script>
<style scoped="scoped">
.a-upload {
  padding: 4px 10px;
  height: 30px;
  line-height: 20px;
  position: relative;
  cursor: pointer;
  color: #888;
  background: #fafafa;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: inline-block;
  *display: inline;
  *zoom: 1
}

.a-upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  cursor: pointer
}

.a-upload:hover {
  color: #444;
  background: #eee;
  border-color: #ccc;
  text-decoration: none
}

/* 以上为上传按钮 */

.index-top {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
  height: 80px;
}

.top-button {
  margin-bottom: 15px;
}

.index-search {
  width: 200px;
}

.top-select {
  height: 50px;
}

.index-page {
  height: 55px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

.index-list {
  position: absolute;
  overflow-y: auto;
  left: 0;
  top: 95px;
  right: 0;
  bottom: 55px;
}

.icon {
  cursor: pointer;
}
</style>
