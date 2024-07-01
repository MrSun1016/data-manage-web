<template>
  <div class="Messages">
    <div class="titleDiv">
      <i class="el-icon-back" @click="goBack" style="font-size: 24px; margin: 0 24px; cursor: pointer"></i>
      <div style="font-size: 16px; margin: 0 24px 10px 24px;">消息通知</div>
    </div>
    <el-card class="cardwei">
      <div class="header-title">
        <div class="headerDiv">{{ viewMessage.title }}</div>
        <div class="headerDiv">时间：{{ viewMessage.createTime }}</div>
      </div>
      <el-divider></el-divider>
      <div class="body-div">
        <div v-html="viewMessage.content"></div>
        <div v-show="viewMessage.isEdit != 0">
          请点击 <span class="colorspan" @click="toBusinessReview"> 查看详情 </span>跳转工单处理页及时处理。
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { viewSingle } from '@/api/department'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'MessagesAnnouncements',
  data() {
    return {
      // 查看的数据
      viewMessage: {},
      itemList: {},
      departName: ''
    }
  },
  mounted() {},
  methods: {
    getViewSingle(row, pageUser) {
      this.itemList = row
      this.pageUser = pageUser
      console.log(row)
      this.departName = row.departName
      let parame = {
        userMessageId: row.userMessageId,
        executionId: row.executionId
      }
      viewSingle(parame).then(res => {
        if (res.content) {
          this.viewMessage = res
          this.viewMessage.createTime = this.formatTime(this.viewMessage.createTime)
          // this.$set(this.viewMessage, 'executionId', row.executionId)
        } else {
          Message.error(res.message)
        }
      })

      // let obj = {
      //   launchDepartment: row.departName
      // }
      // this.viewMessage.launchDepartment = row.departName
      // console.log(this.viewMessage)
    },
    toBusinessReview() {
      this.$set(this.viewMessage, 'launchDepartment', this.departName)
      let type
      if (this.viewMessage.isEdit == '1') {
        type = '审批'
      } else if (this.viewMessage.isEdit == '2') {
        type = '历史'
      }
      if (this.viewMessage.workStatus == '2') {
        // 数据共享
        this.$router.push({
          // path: '/MessageCenter/WorkOrderProcessing'
          name: 'MessageCenter-WorkOrderProcessing',
          params: {
            viewMessage: this.viewMessage,
            type: type,
            fromItem: '消息',
            itemId: this.itemId,
            formInline: this.pageUser
          }
        })
      } else if (this.viewMessage.workStatus == '1') {
        // 数据编目
        console.log(type)
        this.$router.push({
          path: '/MessageCenter/BusinessReview',
          query: {
            processDefinitionKey: this.viewMessage.processDefinitionKey,
            id: this.viewMessage.catalogId,
            catalogStatus: this.viewMessage.catalogStatus,
            cataStatus: this.viewMessage.cataStatus,
            processCode: this.viewMessage.processCode,
            executionId: this.itemList.executionId,
            type,
            taskNameId: ''
          }
        })
      }
    },
    goBack() {
      this.viewMessage = {}
      this.$emit('update:visible', false)
      this.$emit('reRequest')
      this.$bus.$emit('getAnnouncements')
    }
  }
}
</script>

<style lang="less" scoped>
.Messages {
  width: 100%;
  .titleDiv {
    display: flex;
  }
  /deep/.el-card__body {
    height: calc(100vh - 220px);
    padding: 0;
  }
  .header-title {
    margin: 25px 0 0 30px;
    .headerDiv {
      margin-bottom: 10px;
    }
  }
  .body-div {
    margin: 0 50px 20px 50px;
    div {
      white-space: pre-line;
      margin-bottom: 10px;
    }
    .colorspan {
      color: #1890ff;
      cursor: pointer;
    }
  }
}
</style>
