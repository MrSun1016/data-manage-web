<template>
  <div id="slideshow">
    <h1 class="title">首页轮播图管理</h1>
    <el-upload
      class="upload"
      action="/dtwave-om/sys/common/picture/upload"
      list-type="picture-card"
      :limit="4"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-upload="handleUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :file-list="slideshowList"
      accept=".jpg, .jpeg, .png"
    >
      <!-- :data="fileName" -->
      <!-- :on-progress="handleProgress" -->
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getPictures, getPictureDel } from '@/api/api'
export default {
  name: 'slideshow',
  data() {
    return {
      serverAddres: 'http://59.208.164.242:60033/dtwave-om',
      // fileName: {
      //   fileName: '',
      // },
      dialogImageUrl: '',
      dialogVisible: false,
      slideshowList: [],
    }
  },
  created() {
    this.fetchPictures()
  },
  methods: {
    fetchPictures() {
      getPictures().then((res) => {
        if (res.success) {
          res.result.forEach((v) => {
            this.slideshowList.push({
              name: v.fileName,
              url: this.serverAddres + v.url,
              id: v.id,
            })
          })
        }
      })
    },
    handleUpload(file) {
      //进行图片类型和大小的限制
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        Message({
          message: '上传图片大小不能超过2MB!',
          type: 'warning',
        })
        return false //必须加上return false; 才能阻止
      }
      const isSize = new Promise(function (resolve, reject) {
        let width = 1440
        // let height = 500;
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width == width && img.height == 458
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          Message({
            message: '轮播图尺寸为1440 x 458! 请重新选择!',
            type: 'warning',
          })
          return Promise.reject()
          return false //必须加上return false; 才能阻止
        }
      )
      return isLt2M && isSize
    },
    fetchPictureDel(id) {
      getPictureDel(id).then((res) => {
        if (res.success) {
          Message({
            message: '图片删除成功',
            type: 'success',
          })
        } else {
          Message({
            message: '图片删除失败',
            type: 'error',
          })
        }
      })
    },
    handleSuccess() {
      Message({
        message: '图片上传成功',
        type: 'success',
      })
    },
    handleError() {
      Message({
        message: '图片上传失败',
        type: 'error',
      })
    },
    handleExceed() {
      Message({
        message: '最多只能上传3张图片!',
        type: 'warning',
      })
    },
    handleRemove(file, fileList) {
      this.fetchPictureDel(file.id)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
#slideshow {
  background: #fff;
  padding: 24px;
  .title {
    padding: 0 0 12px 0;
    font-weight: bold;
  }
}
</style>