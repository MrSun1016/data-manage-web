<template>
  <div class="uploadWrapper">
    <vuedraggable
      class="vue-draggable"
      :class="{ single: isSingle, maxHidden: isMaxHidden }"
      v-model="imgList"
      tag="ul"
      draggable=".draggable-item"
      @start="onDragStart"
      @end="onDragEnd"
    >
      <!-- 拖拽元素 -->
      <li
        v-for="(item, index) in imgList"
        :key="item.id"
        class="draggable-item"
        :style="{ width: width + 'px', height: height + 'px' }"
      >
        <el-image :src="item.url" :preview-src-list="[item.url]"></el-image>
        <div class="shadow" @click="onRemoveHandler(index, item)">
          <i class="el-icon-delete"></i>
        </div>
      </li>
      <!-- 上传按钮 -->
      <el-upload
        slot="footer"
        ref="uploadRef"
        class="uploadBox"
        :style="{ width: width + 'px', height: height + 'px' }"
        action="/dtwave-om/sys/common/picture/upload"
        accept=".jpg, .jpeg, .png"
        list-type="picture-card"
        :multiple="!isSingle"
        :limit="limit"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="onSuccessUpload"
        :on-exceed="onExceed"
      >
        <i class="el-icon-plus uploadIcon">
          <span class="uploading" v-show="isUploading">正在上传...</span>
          <span v-if="!isUploading && limit && limit !== 4 && !isSingle" class="limitTxt">最多{{ limit }}张</span>
        </i>
      </el-upload>
    </vuedraggable>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import vuedraggable from 'vuedraggable' // 一款vue拖拽插件
import utils from '../../utils/SildeUitls'
import { getPictures, getPictureDel, getSequence } from '@/api/api'
// import utils from './utils'

export default {
  name: 'ImgUpload',

  props: {
    // 图片数据(图片url组成的数组) 通过v-model传递
    // value: {
    //   type: Array,
    //   default() {
    //     return []
    //   },
    // },
    // 限制上传的图片数量
    limit: {
      type: Number,
      default: 4,
    },
    // 限制上传图片的文件大小(kb)
    // size: {
    //   type: Number,
    //   default: 500,
    // },
    // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
    isSingle: {
      type: Boolean,
      default: false,
    },
    // 是否使用图片压缩
    useCompress: {
      type: Boolean,
      default: false,
    },
    // 图片显示的宽度(px)
    width: {
      type: Number,
      default: 200,
    },
    // 图片显示的高度(px)
    height: {
      type: Number,
      default: 100,
    },
  },

  data() {
    return {
      value: [],
      homePageList: {},
      serverAddres: 'http://59.208.164.242:60033/dtwave-om',
      isUploading: false, // 正在上传状态
      isFirstMount: true, // 控制防止重复回显
    }
  },

  computed: {
    // 图片数组数据
    imgList: {
      get() {
        return this.value
      },
      set(val) {
        if (val.length < this.imgList.length) {
          // 判断是删除图片时同步el-upload数据
          this.syncElUpload(val)
        }
        // 同步v-model
        this.$emit('input', val)
      },
    },
    // 控制达到最大限制时隐藏上传按钮
    isMaxHidden() {
      return this.imgList.length >= this.limit
    },
  },

  watch: {
    value: {
      handler(val) {
        if (this.isFirstMount && this.value.length > 0) {
          this.syncElUpload()
        }
      },
      deep: true,
    },
  },
  created() {
    this.fetchPictures()
  },
  mounted() {
    if (this.value.length > 0) {
      this.syncElUpload()
    }
  },

  methods: {
    fetchPictures() {
      getPictures().then(async(res) => {
        if (res.success) {
          res.result.forEach((v) => {
            v.url = this.serverAddres + v.url
          })
          this.value = await res.result
        }
      })
    },
    // 同步el-upload数据
    syncElUpload(val) {
      const imgList = val || this.imgList
      this.$refs.uploadRef.uploadFiles = imgList.map((v, i) => {
        return {
          Name: 'pic' + i,
          url: v,
          status: 'success',
          uid: utils.createUniqueString(),
        }
      })
      this.isFirstMount = false
    },
    // 上传图片之前
    beforeUpload(file) {
      this.isFirstMount = false
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
          this.isUploading = true
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
    // 上传完单张图片
    onSuccessUpload(res, file, fileList) {
      if (res.code === 200) {
        this.fetchPictures()
        Message({
          message: '图片上传成功',
          type: 'success',
        })
      } else {
        this.syncElUpload()
      }
      this.isUploading = false
    },
    // 移除单张图片
    onRemoveHandler(index, item) {
      MessageBox.confirm('确定删除该图片?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.fetchPictureDel(item.id)
          this.imgList.splice(index, 1)
        })
        .catch(() => {})
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
    // 超限
    onExceed() {
      this.$refs.uploadRef.abort() // 取消剩余接口请求
      this.syncElUpload()
      Message({
        type: 'warning',
        message: `图片超限，最多可上传${this.limit}张图片`,
      })
    },
    onDragStart(e) {},
    onDragEnd({ oldIndex, newIndex }) {
      const item = this.imgList[oldIndex]
      this.imgList.splice(oldIndex, 1, this.imgList[newIndex])
      this.imgList.splice(newIndex, 1, item)
      this.list = this.imgList
      this.imgList = this.list.slice(0)
      this.imgList[newIndex].serialNo = newIndex
      this.imgList[oldIndex].serialNo = oldIndex
      this.homePageList = JSON.parse(JSON.stringify(this.imgList))
      this.homePageList.forEach((v) => {
        v.url = v.url.split('dtwave-om')[1]
      })
      this.fetchSequence()
    },
    fetchSequence() {
      getSequence(this.homePageList).then((res) => {
        if (res.success) {
          Message({
            type: 'success',
            message: res.message,
          })
        } else {
          Message({
            type: 'error',
            message: res.message,
          })
        }
      })
    },
  },

  components: { vuedraggable },
}
</script>

<style lang="less" scoped>
.uploadWrapper {
  background: #fff;
  padding: 24px 0 12px 0;
}
/deep/ .el-upload {
  width: 100%;
  height: 100%;
}

// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}

// 拖拽
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }
    .shadow {
      position: absolute;
      top: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
    }
    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }
  &.hideShadow {
    .shadow {
      display: none;
    }
  }
  &.single {
    overflow: hidden;
    position: relative;

    .draggable-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }
  &.maxHidden {
    .uploadBox {
      display: none;
    }
  }
}
</style>
