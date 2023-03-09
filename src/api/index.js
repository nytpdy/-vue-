import API from "../utils/request.js"

//获取文件列表接口  yes
function getFileList(username) {
  return API.request({
    url: "/getfiles",
    method: "POST",
    data: {
      'username': username
    }
  })
}

//获取文件图片列表接口  yes
function getpicture(username) {
  return API.request({
    url: "/getpicture",
    method: "POST",
    data: {
      'username': username
    }
  })
}

//获取文件收藏列表接口  yes
function getCollection(username) {
  return API.request({
    url: "/getCollection",
    method: "POST",
    data: {
      'username': username
    }
  })
}

//获取验证码
function getEmail(address) {
  return API.request({
    url: "/api/mail/" + address,
    method: "POST",
  })
}

//上传文件接口
function setData(file, name) {
  return API.request({
    url: "/upload?name=" + name,
    // url : "/upload",
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // data : multipartFile
    data: {
      file
    }
  })
}

//下载接口
function downLoad(fileName) {
  return API.request({
    url: "/download",
    method: "GET",
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: {
      fileName: fileName
    }
  })
}

//获取文件磁盘接口
function getSize() {
  return API.request({
    url: "/getsize",
    method: "GET",
  })
}

//创建文件夹接口
function createFolder(folder = 0, name, userName) {
  return API.request({
    url: "/api/newfolder/" + folder + "/" + name + "/" + userName,
    method: "POST",
  })
}

//文件重命名接口
function fileRename(fileName, newName) {
  return API.request({
    url: "/rename",
    method: "POST",
    data: {
      fileName: fileName,
      newName: newName
    }
  })
}

//批量删除
function fileDelete(filedata, username) {
  return API.request({
    url: "/deletefile",
    method: "POST",
    data: {
      userName: username,
      fileData: filedata
    }
  })
}

//用户重命名
function userRename(userId, newName) {
  return API.request({
    url: "/api/setname/" + userId + "/" + newName,
    method: "POST",
  })
}

//收藏
function Collect(fileName, username) {
  return API.request({
    url: "/setcollect",
    method: "POST",
    data: {
      fileName: fileName,
      username: username
    }
  })
}

//取消收藏
function cancelcollect(fileName, username) {
  return API.request({
    url: "/cancelcollect",
    method: "POST",
    data: {
      fileName: fileName,
      username: username
    }
  })
}

//收藏页
function getcollect(userid) {
  return API.request({
    url: "/api/getcollect",
    method: "GET",
    params: {
      userId: userid
    }
  })
}

// 下载二维码
function getQrcode(fileName) {
  return ({
    url: "/getQrcode",
    method: "get",
    params: {
      fileName: fileName
    }
  })
}

export default {
  getFileList,
  setData,
  downLoad,
  getSize,
  createFolder,
  fileRename,
  fileDelete,
  userRename,
  Collect,
  cancelcollect,
  getcollect,
  getEmail,
  getpicture,
  getCollection
}
