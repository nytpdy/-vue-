<template>
  <div class="border-bottom px-3 py-2 file-list">
    <Row>
      <Col span="12" class="d-flex align-item-center">
      <Checkbox @on-change="onChange" v-model="item.checked" class="mb-0 nr-3"></Checkbox>
      <i class="iconfont mr-3" :class="icons" style="font-size: 15px;"></i>
      <span @click="clickEvent" class="small">{{ item.fileName }}</span>

      <div class="ml-auto text-primary hide">
        <Tooltip content="收藏" placement="bottom">
          <Icon @click="collect" type="md-heart" :color="this.item.fileCollect == 1 ? '#ff2b47' : ''" size="18"
            class="mx-2 icon" />
        </Tooltip>
        <Tooltip content="重命名" placement="bottom">
          <Icon @click.native="rename" type="ios-paper" size="18" class="mx-2 icon" />
        </Tooltip>
        <Tooltip v-if="item.fileType == 'file'" content="下载" placement="bottom">
          <a @click="download" :href="url">
            <Icon type="ios-cloud-download" size="18" class="mx-2 icon" />
          </a>
        </Tooltip>
        <Tooltip content="删除" placement="bottom">
          <Icon @click.native="deleteItem" type="md-trash" size="18" class="mx-2 icon" />
        </Tooltip>
        <Tooltip content="预览" placement="bottom">

          <!-- <Icon @click="dialogVisible = true" type="md-expand" size="18" class="mx-2 icon"> -->
          <Icon @click="preview(item.fileName)" type="md-expand" size="18" class="mx-2 icon">

          </Icon>
        </Tooltip>
      </div>

      <!-- <el-dialog :visible.sync="dialogVisible"> -->
      <!-- <el-image style="width: 200px; height: 200px" :src="imgUrl" :preview-src-list="srcList"></el-image> -->
      <!-- <img :src="'http://192.168.100.78:8000/' + item.fileName" style="margin:0 auto; width: 100%;" /> -->
      <!-- <el-image src="https://books-1314534238.cos.ap-chengdu.myqcloud.com/static/logo.png"></el-image> -->
      <!-- </el-dialog> -->

      </Col>
      <Col span="6" class="d-flex align-item-center">
      </Col>
      <Col span="6" class="d-flex align-item-center">{{ item.fileTime }}</Col>
    </Row>



  </div>
</template>

<script>
let icons = {

  dir: {
    icon: "icon-wenjianjia",
    color: "text-warning"
  },
  jpg: {
    icon: "icon-tupianwenjian",
    color: "text-success"
  },
  JPG: {
    icon: "icon-tupianwenjian",
    color: "text-success"
  },
  png: {
    icon: "icon-tupianwenjian",
    color: "text-success"
  },
  PNG: {
    icon: "icon-tupianwenjian",
    color: "text-success"
  },
  mp4: {
    icon: "icon-a-shipinduanshipinmeiti",
    color: "text-primary"
  },
  avi: {
    icon: "icon-a-shipinduanshipinmeiti",
    color: "text-primary"
  },
  pdf: {
    icon: "icon-pdf",
    color: "text-info"
  },
  doc: {
    icon: "icon-Wordbeifen",
    color: "text-warning"
  },
  docx: {
    icon: "icon-Wordbeifen",
    color: "text-warning"
  },
  xlsx: {
    icon: "icon-excelbeifen",
    color: "text-warning"
  },
  xls: {
    icon: "icon-excelbeifen",
    color: "text-warning"
  },
  csv: {
    icon: "icon-excelbeifen",
    color: "text-warning"
  },
  pptx: {
    icon: "icon-pptbeifen",
    color: "text-warning"
  },
  txt: {
    icon: "icon-txt",
  },
  elses: {
    icon: "icon-wenjianleixing-biaozhuntu-weizhiwenjian",
    color: "text-info"
  }
}
import indexApi from "../api/index.js"
import Url from "../utils/request.js"
export default {
  data() {
    return {
      url: Url.flaskUrl + "/download?fileName=",
      value: "",
      imgUrl: "",
      srcList: [],
      dialogVisible: false,
    }
  },
  props: {
    item: Object,
    index: [Number, String]
  },
  computed: {
    icons() {
      let o = icons[this.item.type];
      return `${o.icon} ${o.color}`
    }
  },
  methods: {
    deleteItem(e) {
      this.$emit("on-event", {
        type: "delete",
        item: this.item,
        index: this.index
      })
    },
    onChange(e) {
      this.$emit("on-event", {
        type: "checked",
        index: this.index,
        item: this.item,
        value: e
      })
    },
    rename() {
      this.$emit("on-event", {
        type: "rename",
        index: this.index,
        fileName: this.item.fileName,
        item: this.item
      })
    },
    clickEvent() {
      if (this.item.fileSuffix == "jpg" && this.item.fileSuffix == "JPG" && this.item.fileSuffix == "png" && this.item.fileSuffix == "PNG") {
        this.$emit("on-event", {
          type: "image",
          url: this.item.filePath
        })
      } else if (this.item.fileSuffix == "") {
        this.$emit("on-event", {
          type: "folder",
          folderid: this.item.fileId,
          foldername: this.item.fileName
        })
      }
    },
    download() {
      console.log(this.item.fileName)
      this.url = this.url + this.item.fileName,
        console.log(this.url)
      // indexApi.downLoad(this.item.fileName)

    },

    collect() {
      this.$emit("on-event", {
        type: "collect",
        // fileid : this.item.fileId,
        fileName: this.item.fileName,
        fileCollect: this.item.fileCollect
        // uesrname:this.item.uesrname
      })
    },

    preview(url) {
      // this.$emit("on-event", {
      //   type: "preview",
      //   fileType: this.item.fileType,
      //   fileName: this.item.fileName
      // })
      window.open(Url.nodeServelUrl + url)
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
.file-list:hover {
  background-color: rgba(45, 140, 240, 0.1) !important;
}

.file-list .hide {
  display: none;
}

.file-list:hover .hide {
  display: flex;
}
</style>
