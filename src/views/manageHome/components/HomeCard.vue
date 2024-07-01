<template>
  <div id="homecard">
    <!-- 待处理工单--已处理工单 -->
    <div class="workorder">
      <div class="work-content" @click="handleAwaitWork('待处理','')">
        <div class="left-info">
          <div class="pending">待处理</div>
          <div class="mind-info">
            <div style="margin-bottom: 12px">
              <div>待处理工单</div>
              <!-- <div class="time">2022-11-29</div> -->
            </div>
            <div>
              <div style="font-size: 12px; color: #bfbfbf; cursor: pointer" @click="handleAwaitWork('待处理','')">
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div class="count">{{ workOrderData.workTotal || '0' }}</div>
      </div>
      <div class="work-content" @click="handleAwaitWork('已处理','')">
        <div class="left-info">
          <div class="pending" style="background: #8cca68">已处理</div>
          <div class="mind-info">
            <div style="margin-bottom: 12px">
              <div>已处理工单</div>
              <!-- <div class="time">2022-11-29</div> -->
            </div>
            <div>
              <div style="font-size: 12px; color: #bfbfbf; cursor: pointer" @click="handleAwaitWork('已处理','')">
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div style="color: #8cca68" class="count">{{ workTodoData.handleTotal || '0' }}</div>
      </div>
    </div>

    <!-- 已发起工单 -->
    <div class="workorder">
      <div class="work-content" @click="handleAwaitWork('已处理','Activity_0y1jpsr')">
        <div class="left-info">
          <div class="pending" style="background: #f7c757">已发起</div>
          <div class="mind-info">
            <div style="margin-bottom: 12px">
              <div>已发起工单</div>
              <!-- <div class="time">2022-11-29</div> -->
            </div>
            <div>
              <div style="font-size: 12px; color: #bfbfbf; cursor: pointer" @click="handleAwaitWork('已处理','Activity_0y1jpsr')">
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div class="count" style="color: #f7c757">{{ workTodoData.allWorkTotal || '0' }}</div>
      </div>
      <div class="work-content">
        <div class="left-info">
          <div class="pending" style="background: #f6c9c8">通知</div>
          <div class="mind-info" @click="handleMessage('未读')">
            <div style="margin-bottom: 12px">
              <div>
                <span>未读</span
                ><span style="color: #f6c9c8; margin-left: 8px">{{ workOrderData.totalMessages || '0' }}</span>
              </div>
              <!-- <div class="time">2022-11-29</div> -->
            </div>
            <div>
              <div style="font-size: 12px; color: #bfbfbf; cursor: pointer" @click="handleMessage('未读')">
                查看详情
              </div>
            </div>
          </div>
        </div>
        <div class="mind-info" @click="handleMessage('已读')">
          <div style="margin-bottom: 12px;margin-top: 10px;">
            <div>
              <span>已读</span><span style="color: #f6c9c8; margin-left: 8px">{{ workTodoData.readTotal || '0' }}</span>
            </div>
            <!-- <div class="time">2022-11-29</div> -->
          </div>
          <div>
            <div style="font-size: 12px; color: #bfbfbf; cursor: pointer" @click="handleMessage('已读')">查看详情</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务 -->
    <div class="serve-content">
      <div class="serve-details">
        <div class="offer-serve">我提供的服务</div>
        <div class="serve-info" style="border-right: 2px solid #d8d8d8">
          <div class="item-df" @click="releaseing('1')">
            <span class="item-wid"
              ><span class="circle" style="background: #97e0fc"></span><span class="title">共享申请中</span></span
            ><span class="number">{{ myProvideServiceData.sharingApproval || '0' }}个</span>
          </div>
          <div class="item-df" style="margin: 24px 0" @click="releaseing('2')">
            <span class="item-wid"
              ><span class="circle" style="background: #4db0f8"></span><span class="title">正在使用中</span></span
            ><span class="number">{{ myProvideServiceData.using || '0' }}个</span>
          </div>
          <div class="item-df" @click="releaseing('3')">
            <span class="item-wid"
              ><span class="circle" style="background: #376ff6"></span><span class="title">已停止的服务</span></span
            ><span class="number">{{ myProvideServiceData.historySharing || '0' }}个</span>
          </div>
        </div>
      </div>
      <div class="serve-details">
        <div class="offer-serve">我使用的服务</div>
        <div class="serve-info">
          <div class="item-df" @click="examine('2')">
            <span class="item-wid"
              ><span class="circle" style="background: #97e0fc"></span><span class="title">共享申请中</span></span
            ><span class="number">{{ myUseServiceData.sharingApproval || '0' }}个</span>
          </div>
          <div class="item-df" style="margin: 24px 0" @click="useing('2')">
            <span class="item-wid"
              ><span class="circle" style="background: #4db0f8"></span><span class="title">正在使用中</span></span
            ><span class="number">{{ myUseServiceData.using || '0' }}个</span>
          </div>
          <div class="item-df" @click="released('2')">
            <span class="item-wid"
              ><span class="circle" style="background: #376ff6"></span><span class="title">已停止的服务</span></span
            ><span class="number">{{ myUseServiceData.historySharing || '0' }}个</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWorkOrder, getToDo, getMyProvideService, getMyUseService } from '@/api/api'
import { mapGetters } from 'vuex'
export default {
  name: 'homecard',
  data() {
    return {
      // 代办事项请求参数
      workOrderCountBo: {
        queryContent: 1,
      },
      // 已办事项请求参数
      workOrderTodo: {
        queryContent: 2,
      },
      workOrderData: {},
      workTodoData: {},
      myProvideServiceData: {},
      myUseServiceData: {},
    }
  },
  created() {
    this.fetchMyProvideService()
    this.fetchMyUseService()
    this.fetchWorkOrder()
    this.fetchTodo()
  },
  methods: {
    fetchMyUseService() {
      getMyUseService().then((res) => {
        if (res.success) {
          this.myUseServiceData = res.body
          this.myUseServiceData.historySharing = this.formatNumber(this.myUseServiceData.historySharing)
          this.myUseServiceData.sharingApproval = this.formatNumber(this.myUseServiceData.sharingApproval)
          this.myUseServiceData.using = this.formatNumber(this.myUseServiceData.using)
        }
      })
    },
    fetchMyProvideService() {
      getMyProvideService().then((res) => {
        if (res.success) {
          this.myProvideServiceData = res.body
          this.myProvideServiceData.historySharing = this.formatNumber(this.myProvideServiceData.historySharing)
          this.myProvideServiceData.sharingApproval = this.formatNumber(this.myProvideServiceData.sharingApproval)
          this.myProvideServiceData.using = this.formatNumber(this.myProvideServiceData.using)
        }
      })
    },
    handleMessage(mesageType) {
      this.$router.push({
        path: '/MessageCenter/MessageNotification',
        query: {
          mesageType,
        },
      })
      // this.$bus.$emit('handleMessType',mesageType)
    },
    handleAwaitWork(workType,workType2) {
      this.$router.push({
        path: '/MessageCenter/WorkOrderProcessing',
        query: {
          workType,
          workType2,
        },
      })
    },
    ...mapGetters(['userInfo']),
    examine(state) {
      let applyDept;
      if(state === '1'){
        applyDept = this.userInfo().orgCode;
      }
      this.$router.push({
        path: '/datasharing/examine',
        query: {
          applyDept,
        },
      })
    },
    useing(state) {
      let applyDept;
      if(state === '1'){
        applyDept = this.userInfo().orgCode;
      }
      this.$router.push({
        path: '/datasharing/useing',
        query: {
          applyDept,
        },
      })
    },
    released(state) {
      let applyDept;
      if(state === '1'){
        applyDept = this.userInfo().orgCode;
      }
      this.$router.push({
        path: '/datasharing/releasedlist',
        query: {
          applyDept,
        },
      })
    },
    releaseing(myDataStatus) {
      let applyDept = this.userInfo().orgCode;
      this.$router.push({
        path: '/datasharing/releaseing',
        query: {
          applyDept,
          myDataStatus,
        },
      })
    },
    fetchTodo() {
      getToDo(this.workOrderTodo).then((res) => {
        if (res.success) {
          this.workTodoData = res.body
          this.workTodoData.allWorkTotal = this.formatNumber(this.workTodoData.allWorkTotal)
          this.workTodoData.handleTotal = this.formatNumber(this.workTodoData.handleTotal)
          this.workTodoData.readTotal = this.formatNumber(this.workTodoData.readTotal)
        }
      })
    },
    fetchWorkOrder() {
      getWorkOrder(this.workOrderCountBo).then((res) => {
        if (res.success) {
          this.workOrderData = res.body
          this.workOrderData.workTotal = this.formatNumber(this.workOrderData.workTotal)
          this.workOrderData.totalMessages = this.formatNumber(this.workOrderData.totalMessages)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
#homecard {
  // background: #fff;
  display: flex;
  justify-content: space-between;
  .workorder {
    width: 30%;
    .work-content {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      background: #fff;
      padding: 12px 24px;
      margin: 12px 0 0 0;
      .left-info {
        display: flex;
        align-items: center;
        .pending {
          width: 70px;
          height: 70px;
          background: #56baed;
          border-radius: 50%;
          line-height: 70px;
          color: #fff;
          text-align: center;
          margin-right: 24px;
        }
        .mind-info {
          display: flex;
          flex-direction: column;
        }
      }
      .count {
        color: #56baed;
        margin-top: 10px;
      }
    }
  }
  .serve-content {
    display: flex;
    justify-content: space-between;
    width: 38%;
    margin-top: 12px;
    background: #fff;
    .serve-details {
      width: 50%;
    }
    .offer-serve {
      padding-top: 12px;
      text-align: center;
    }
    .serve-info {
      padding: 0 12px;
      margin: 24px 0;
      .item-df {
        display: flex;
        justify-content: space-between;
        // margin-top: 24px;
      }
      .item-wid {
        display: inline-block;
      }
      .title {
        color: #505968;
        font-size: 12px;
      }
      .number {
        color: #484a50;
      }
    }
  }
  .time {
    font-size: 12px;
    color: #dcdcdc;
  }
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    // background: #cccc;
    margin-right: 8px;
  }
}
</style>