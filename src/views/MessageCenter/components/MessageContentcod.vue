<template>
  <div>
    <el-card>
      <div class="closeicon">
        <i class="el-icon-close icon-font" @click="closeMessage"></i>
      </div>
      <div class="body-div">
        <h2 class="title-h2">{{ contenItem.title }}</h2>
        <div class="Information-bar">
          <div class="information">发布时间：{{ contenItem.createTime }}</div>
          <div class="information">信息来源：{{ departName }}</div>
          <div class="information">访问量：{{ contenItem.viewNum }}</div>
        </div>
        <div class="content-div">
          <!-- <div class="content-p">摘要：{{ contenItem.msgAbstract }}</div> -->
          <div class="content-p2" v-html="contenItem.content">
          </div>
            <!-- {{ contenItem.msgContent }} -->
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
// import { queryById } from '@/api/api'
import { viewSingle } from '@/api/department'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'MessageContentcod',
  data() {
    return {
      contenItem: {},
      valName: '',
      departName: ''
    }
  },
  mounted() {},
  methods: {
    getContent(row) {
      console.log(row)
      this.departName = row.departName
      let parame = {
        userMessageId: row.userMessageId,
        executionId: row.executionId
      }
      viewSingle(parame).then(res => {
        this.contenItem = res
        this.contenItem.createTime = this.formatTime(this.contenItem.createTime)

        //  else {
        //   Message.error(res.message)
        // }
      })
    },
    announcementpreview(form, val) {
      console.log(form)
      this.contenItem = form
      // this.contenItem.titile = form.titile
      // this.contenItem.msgAbstract = form.msgAbstract
      this.valName = val
    },
    closeMessage() {
      console.log(111111)
      this.contenItem = {}
      this.$emit('update:visible', false)
      this.$emit('reRequest', 1)
      this.$bus.$emit('getMessageContentcod')
    }
  }
}
</script>

<style lang="less" scoped>
.closeicon {
  display: flex;
  flex-direction: row-reverse;
  color: rgb(112, 112, 112);
  .icon-font {
    font-size: 25px;
    cursor: pointer;
  }
}
.body-div {
  .title-h2 {
    text-align: center;
  }
  .Information-bar {
    padding: 10px 0;
    margin: 10px 0 20px 0;
    background-color: #f2f2f2;
    display: flex;
    justify-content: space-evenly;
  }
}
.content-div {
  .content-p {
    white-space: pre-line;
  }
  .content-p2 {
    white-space: pre-line;
    margin-top: 10px;
  }
}
</style>
