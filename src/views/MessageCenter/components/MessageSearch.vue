<template>
  <div>
    <el-form :inline="true" ref="messageChoice" size="small" :model="messageChoice" class="farderfromflex">
      <div class="divffromflex">
        <el-form-item label="消息标题：" prop="title">
          <el-input v-model="messageChoice.title" placeholder="请输入" size="small"></el-input>
        </el-form-item>
        <el-form-item label="消息类型：" prop="messageType">
          <el-select v-model="messageChoice.messageType" clearable placeholder="请选择" size="small">
            <el-option
              :label="message.text"
              :value="message.text"
              v-for="(message, index) in datefromList.messageType"
              :key="message.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消息接受时间：" prop="dataTime">
          <el-date-picker
            v-model="messageChoice.dataTime"
            :default-time="['00:00:00', '23:59:59']"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="datawei"
          >
          </el-date-picker>
        </el-form-item>
      </div>

      <div class="fromflexrig">
        <el-form-item size="large">
          <el-button type="primary" size="small" class="buthei" @click="onSubmit">查 询</el-button>
          <el-button size="small" class="buthei" @click="resetForm('messageChoice')">重 置</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MessageSearch',
  // props: ['activeName'],
  data() {
    return {
      messageType: 'message_type',

      messageChoice: {
        dataTime: [],
        sarTime: '', //开始时间
        endTime: '', //结束时间
        readtime: '',
        messageType: '',
        title: '',
      },
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      let { messageType } = this
      // 消息类型
      this.$store.dispatch('getMessageType', messageType)
    },
    resetForm(messageChoice) {
      this.$refs[messageChoice].resetFields()
      this.messageChoice = {
        dataTime: [],
        sarTime: '', //开始时间
        endTime: '', //结束时间
        readtime: '',
        messageType: '',
        title: '',
      }
    },
    onSubmit() {
      // console.log(this.dataTime)
      console.log(this.messageChoice.dataTime)
      if (this.messageChoice.dataTime) {
        if (this.messageChoice.dataTime.length != 0) {
          this.messageChoice.sarTime = this.messageChoice.dataTime[0]
          this.messageChoice.endTime = this.messageChoice.dataTime[1]
        }
      } else {
        this.messageChoice.sarTime = ''
        this.messageChoice.endTime = ''
      }
      this.$emit('clickSubmit', this.messageChoice)
    },
  },
  computed: {
    ...mapState({
      datefromList: (state) => state.indatafrom.datefromList,
    }),
  },
}
</script>

<style lang="less" scoped>
/deep/.el-range-separator {
  margin: 0 5px 0 0;
}
.divffromflex {
  display: flex;
  justify-content: space-between;
  .el-form-item {
    /deep/.el-form-item {
      margin-right: 0px;
    }
  }
}
.fromflexrig {
  display: flex;
  justify-content: flex-end;
  /deep/.el-form-item {
    margin-bottom: 0px;
  }
}
.fromitemdata {
  width: 120px;
}
.fromdatatime {
  margin-right: 10px;
}
.buthei {
  height: 32px;
}
.datawei {
  width: 280px;
}
</style>
