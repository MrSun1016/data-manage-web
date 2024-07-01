<template>
  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <div>您还未登录，请登录后重试</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleCancel" size="small">取 消</el-button>
      <el-button type="primary" size="small" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'loginDialog',
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    open() {
      this.dialogVisible = true
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleSubmit() {
      this.dialogVisible = false
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-dialog__header{
    border-bottom: 1px solid #589df8;
}
/deep/.el-dialog__body{
    text-align: center;
}
</style>