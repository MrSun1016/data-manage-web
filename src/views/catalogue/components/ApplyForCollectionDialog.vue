<template>
  <div id="applyForCollectionDialog">
    <el-dialog
      class="small-mask"
      :z-index="500"
      :visible.sync="collectionDialog"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="title">提示</div>
      <div class="small-mask-info">
        <span style="color: #000000">是否确认申请数据归集?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="collectionDialog = false">取消</el-button>
        <el-button size="mini" @click="onCollection" :loading="loading" type="primary">{{
          loading ? '申请中...' : '确认申请'
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getApplyNotionalPooling } from '@/api/api'
import { Message } from 'element-ui'
export default {
  name: 'applyForCollectionDialog',
  data() {
    return {
      collectionDialog: false,
      loading: false,
      catalogId: '',
      handleCurrentChange: '',
    }
  },
  mounted() {
    this.$bus.$on('handleNodeCode', (handleCurrentChange) => {
      this.handleCurrentChange = handleCurrentChange
    })
  },
  //解绑事件
  beforeDestroy() {
    this.$bus.$off('handleNodeCode')
  },
  methods: {
    //申请归集确认
    onCollection() {
      this.loading = true
      getApplyNotionalPooling(this.catalogId).then((res) => {
        if (res.success) {
          Message.success(res.message)
          this.collectionDialog = false
          this.loading = false
          this.handleCurrentChange()
        } else {
          Message.error(res.message)
          this.collectionDialog = false
          this.loading = false
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#applyForCollectionDialog {
  .title {
    height: 60px;
    color: #1890ff;
    line-height: 60px;
    padding-left: 32px;
    font-weight: 500;
    border-bottom: 1px solid #1890ff;
  }
  .small-mask-info {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-dialog__body {
    padding: 0 0;
  }
  /deep/ .el-dialog__header {
    padding: 0 0;
  }
}
</style>