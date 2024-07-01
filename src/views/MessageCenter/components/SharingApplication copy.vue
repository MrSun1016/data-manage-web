<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16">
        <div id="SharingApplication">
          <!-- 头部标题 -->
          <div class="title-header">
            <i class="el-icon-back" @click="goBack"></i>
            <span v-if="applyTitle" class="title">{{ applyTitle }}</span>
            <span v-else class="title">{{ launchDepartment }}申请{{ catalogName }}</span>
          </div>
          <!-- 头部标题End -->
          <!-- 步骤条 -->
          <div class="steptContent" style="height: 100%">
            <!-- <el-steps direction="vertical" :active="1"> -->
            <el-steps direction="vertical" :active="gxCategoryApplyBo.flowList.length <= 2? 2: active">
              <!-- 节点一 -->
              <el-step icon="el-icon-circle-check" class="first-step">
                <template slot="description">
                  <!-- 内容标题 -->
                  <div style="color: #333">
                    <p style="margin-bottom: 0px !important; font-size: 16px">
                      共享申请
                      <span>
                        <span class="item-info" style="margin-left: 24px"
                          >申请部门：{{ gxCategoryApplyBo.flowList[0].deptName || '-' }}</span
                        ><span class="item-info" style="margin: 0 24px"
                          >申请人：{{ gxCategoryApplyBo.flowList[0].assigneeName || '-' }}</span
                        ><span class="item-info">联系电话：{{ gxCategoryApplyBo.flowList[0].phone || '-' }}</span>
                      </span>
                    </p>
                    <p></p>
                  </div>
                  <!-- 内容盒子 -->
                  <div class="info-box df-box">
                    <div class="left-box">
                      <p>
                        <span class="item-title item-title1">信息资源名称：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].resourcesName || '-' }}</span>
                      </p>
                      <p>
                        <span class="item-title item-title1">数源单位：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].applyDept || '-' }}</span>
                      </p>
                      <p v-show="!gxCategoryApplyBo.flowList[0].endTime && !gxCategoryApplyBo.flowList[0].startTime">
                        <span class="item-title" style="width: 130px">申请时间段：</span
                        ><span class="item-info">永久申请</span>
                      </p>
                      <p v-show="gxCategoryApplyBo.flowList[0].startTime">
                        <span class="item-title item-title1">申请开始时间段：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].startTime || '-' }}</span>
                      </p>
                      <!-- <p>
                        <span class="item-title">自动创建交换任务：</span
                        ><span class="item-info">{{ flowList[0].autoCreateTask || '-' }}</span>
                      </p> -->
                      <p>
                        <span class="item-title item-title1">申请部门：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].deptName || '-' }}</span>
                      </p>

                      <p>
                        <el-tooltip
                          :disabled="showTooltip"
                          :content="gxCategoryApplyBo.flowList[0].applyRemark"
                          placement="top"
                        >
                          <p ref="tooltipBox" class="tem-title item-info conceal1">
                            <span class="item-title item-title1" style="font-size: 14px; width: 125px">申请说明：</span>
                            <span ref="tooltipItem" class="item-info">
                              {{ gxCategoryApplyBo.flowList[0].applyRemark || '-' }}</span
                            >
                          </p>
                        </el-tooltip>
                      </p>
                    </div>
                    <div class="right-box">
                      <p>
                        <span class="item-title">主题分类：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].keyAreasType || '-' }}</span>
                      </p>
                      <p>
                        <span class="item-title">数源应用系统：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].appSystem || '-' }}</span>
                      </p>
                      <p v-show="gxCategoryApplyBo.flowList[0].endTime">
                        <span class="item-title">申请结束时间段：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].endTime || '-' }}</span>
                      </p>
                      <p>
                        <el-tooltip
                          :disabled="showTooltip"
                          :content="gxCategoryApplyBo.flowList[0].applyFileName"
                          placement="top"
                        >
                          <p ref="tooltipBox" class="tem-title conceal1">
                            <span class="item-title" style="font-size: 14px">资源服务申请表：</span>
                            <span ref="tooltipItem" @click="downLoad" style="font-size: 12px; cursor: pointer">
                              {{ gxCategoryApplyBo.flowList[0].applyFileName || '-' }}</span
                            >
                          </p>
                        </el-tooltip>
                      </p>
                      <p>
                        <span class="item-title item-title1">申请人信息：</span>
                        <span class="item-info">{{ gxCategoryApplyBo.flowList[0].applicantInfo || '-' }}</span>
                      </p>
                      <!-- <p>
                        <span class="item-title">是否自动创建交换任务：</span
                        ><span class="item-info">{{ gxCategoryApplyBo.flowList[0].autoCreateTask || '-' }}</span>
                      </p> -->
                    </div>
                  </div>
                  <div v-if="shareType != '接口'">
                    <div
                      style="
                        color: #333;
                        background: #f8fafb;
                        padding-left: 24px;
                        padding-bottom: 24px;
                        font-size: 14px;
                      "
                    >
                      申请数据项：（提示：<span style="color: red">红色文字</span>为不予共享；<span
                        style="color: #1890ff"
                        >蓝色文字</span
                      >为有条件共享；黑色文字为无条件共享）
                    </div>
                    <!-- 复选框 -->
                    <div class="checked-box" v-if="gxCategoryApplyBo.dataItemAllList.length > 0">
                      <div class="checked">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox
                            class="checked-item"
                            v-for="item in gxCategoryApplyBo.dataItemAllList"
                            :key="item.id"
                            :label="item.name"
                            disabled
                          >
                            <span
                              :style="
                                item.shareProperty == 2
                                  ? 'color:red'
                                  : item.shareProperty == 1
                                  ? 'color:#1890FF'
                                  : 'color:black;'
                              "
                              >{{ item.name }}</span
                            >
                          </el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                    <div v-else style="background: #f8fafb; color: #333; text-align: center; padding: 0 0 12px 0">
                      暂无数据
                    </div>
                  </div>
                </template>
              </el-step>
              <!-- 节点二 -->
              <el-step>
                <template slot="description">
                  <div class="examine-box" style="min-height: 100px">
                    <!-- 节点二内容标题 -->
                    <div style="color: #333">
                      <p style="margin-bottom: 0px !important; font-size: 16px; padding: 12px 0">
                        数据共享数源部门审批
                        <span v-if="gxCategoryApplyBo.flowList[1].deptName != null">
                          <span class="item-info" style="margin-left: 24px"
                            >审批部门：{{ gxCategoryApplyBo.flowList[1].deptName || '-' }}</span
                          ><span class="item-info" style="margin: 0 24px"
                            >审批人：{{ gxCategoryApplyBo.flowList[1].assigneeName || '-' }}</span
                          ><span class="item-info">联系电话：{{ gxCategoryApplyBo.flowList[1].phone || '-' }}</span>
                        </span>
                      </p>
                    </div>
                    <div v-if="gxCategoryApplyBo.flowList[1].approvalResult == null && type == '审批'">
                      <div class="examine-two">
                        <div v-if="shareType != '接口'">
                          <span style="margin: 10px 100px 10px 24px; color: #333; display: inline-block"
                            >是否修改数据项：</span
                          >
                          <el-radio-group
                            v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                            v-model="gxCategoryApplyBo.flowList[0].isDataColumn"
                          >
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                          </el-radio-group>
                          <el-radio-group v-else v-model="gxCategoryApplyBo.flowList[0].isDataColumn">
                            <el-radio :label="1" v-if="gxCategoryApplyBo.flowList[0].isDataColumn == 1">是</el-radio>
                            <el-radio :label="0" v-else>否</el-radio>
                          </el-radio-group>
                        </div>
                        <!-- 复选框 -->
                        <div v-if="shareType != '接口'" v-show="gxCategoryApplyBo.flowList[0].isDataColumn == 1">
                          <div style="color: #333; background: #f8fafb; padding-left: 24px">
                            申请数据项：（提示：<span style="color: red">红色文字</span>为不予共享；<span
                              style="color: #1890ff"
                              >蓝色文字</span
                            >为有为有条件共享；黑色文字为无条件共享）
                          </div>
                          <!-- 复选框 -->
                          <div v-if="gxCategoryApplyBo.dataItemAllList.length > 0">
                            <div class="checked-box">
                              <div class="checked">
                                <el-checkbox-group v-model="checkList2">
                                  <el-checkbox
                                    class="checked-item"
                                    v-for="item in gxCategoryApplyBo.dataItemAllList"
                                    :key="item.id"
                                    :label="item.name"
                                    :disabled="gxCategoryApplyBo.flowList.length >= 2 && type == '历史'"
                                  >
                                    <span
                                      :style="
                                        item.shareProperty == 2
                                          ? 'color:red'
                                          : item.shareProperty == 1
                                          ? 'color:#1890FF'
                                          : 'color:black;'
                                      "
                                      >{{ item.name }}</span
                                    >
                                  </el-checkbox>
                                </el-checkbox-group>
                              </div>
                            </div>
                          </div>
                          <div
                            v-else
                            style="
                              background: #f8fafb;
                              color: #333;
                              text-align: center;
                              padding: 12px 0 12px 0;
                              font-size: 12px;
                            "
                          >
                            暂无数据
                          </div>
                        </div>
                        <div>
                          <!-- 预览SQL -->
                          <div v-if="shareType != '接口'" class="preview-box">
                            <div class="preview-left">
                              <div>where条件</div>
                              <el-button
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="primary"
                                size="mini"
                                @click="onPreviewSQL"
                                >预览SQL</el-button
                              >
                            </div>
                            <div class="preview-right">
                              <el-input
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="reqGxCategoryApplyBo.variableArea"
                              >
                              </el-input>
                              <p v-else>
                                {{ gxCategoryApplyBo.flowList[0].variableArea || '-' }}
                              </p>
                            </div>
                          </div>
                          <!-- 审批意见 -->
                          <div class="approval-opinion">
                            <div class="opinion-left">审批意见</div>
                            <div class="opinion-right">
                              <el-input
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="completeByDateId.comment"
                              >
                              </el-input>
                              <p v-else>{{ gxCategoryApplyBo.flowList[1].approvalRemark || '-' }}</p>
                            </div>
                          </div>
                          <div style="color: #333; padding: 0 0 12px 24px" v-if="gxCategoryApplyBo.flowList.length > 2">
                            <span>审核结果</span>
                            <span style="margin-left: 45px">{{
                              gxCategoryApplyBo.flowList[1].approvalResult || '-'
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="gxCategoryApplyBo.flowList[1].approvalResult != null">
                      <div class="examine-two">
                        <div v-if="shareType != '接口'">
                          <span style="margin: 10px 100px 10px 24px; color: #333; display: inline-block"
                            >是否修改数据项：</span
                          >
                          <el-radio-group
                            v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                            v-model="gxCategoryApplyBo.flowList[0].isDataColumn"
                          >
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                          </el-radio-group>
                          <el-radio-group v-else v-model="gxCategoryApplyBo.flowList[0].isDataColumn">
                            <el-radio :label="1" v-if="gxCategoryApplyBo.flowList[0].isDataColumn == 1">是</el-radio>
                            <el-radio :label="0" v-else>否</el-radio>
                          </el-radio-group>
                        </div>
                        <!-- 复选框 -->
                        <div v-if="shareType != '接口'" v-show="gxCategoryApplyBo.flowList[0].isDataColumn == 1">
                          <div style="color: #333; background: #f8fafb; padding-left: 24px">
                            申请数据项：（提示：<span style="color: red">红色文字</span>为不予共享；<span
                              style="color: #1890ff"
                              >蓝色文字</span
                            >为有为有条件共享；黑色文字为无条件共享）
                          </div>
                          <!-- 复选框 -->
                          <div v-if="gxCategoryApplyBo.dataItemAllList.length > 0">
                            <div class="checked-box">
                              <div class="checked">
                                <el-checkbox-group v-model="checkList2">
                                  <el-checkbox
                                    class="checked-item"
                                    v-for="item in gxCategoryApplyBo.dataItemAllList"
                                    :key="item.id"
                                    :label="item.name"
                                    :disabled="gxCategoryApplyBo.flowList.length >= 2"
                                  >
                                    <span
                                      :style="
                                        item.shareProperty == 2
                                          ? 'color:red'
                                          : item.shareProperty == 1
                                          ? 'color:#1890FF'
                                          : 'color:black;'
                                      "
                                      >{{ item.name }}</span
                                    >
                                  </el-checkbox>
                                </el-checkbox-group>
                              </div>
                            </div>
                          </div>
                          <div
                            v-else
                            style="
                              background: #f8fafb;
                              color: #333;
                              text-align: center;
                              padding: 12px 0 12px 0;
                              font-size: 12px;
                            "
                          >
                            暂无数据
                          </div>
                        </div>
                        <div>
                          <!-- 预览SQL -->
                          <div v-if="shareType != '接口'" class="preview-box">
                            <div class="preview-left">
                              <div>where条件</div>
                              <el-button
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="primary"
                                size="mini"
                                @click="onPreviewSQL"
                                >预览SQL</el-button
                              >
                            </div>
                            <div class="preview-right">
                              <el-input
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="reqGxCategoryApplyBo.variableArea"
                              >
                              </el-input>
                              <p v-else>
                                {{ gxCategoryApplyBo.flowList[0].variableArea || '-' }}
                              </p>
                            </div>
                          </div>
                          <!-- 审批意见 -->
                          <div class="approval-opinion">
                            <div class="opinion-left">审批意见</div>
                            <div class="opinion-right">
                              <el-input
                                v-if="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'"
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="completeByDateId.comment"
                              >
                              </el-input>
                              <p v-else>{{ gxCategoryApplyBo.flowList[1].approvalRemark || '-' }}</p>
                            </div>
                          </div>
                          <div
                            style="color: #333; padding: 0 0 12px 24px"
                            v-if="gxCategoryApplyBo.flowList.length >= 2"
                          >
                            <span>审核结果</span
                            ><span style="margin-left: 45px">{{
                              gxCategoryApplyBo.flowList[1].approvalResult || '-'
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="btns" v-show="gxCategoryApplyBo.flowList.length <= 2 && type == '审批'">
                      <el-button type="primary" size="small" @click="handleSumbPass('1')">审批通过</el-button>
                      <el-button size="small" @click="onReject">驳回</el-button>
                      <el-button size="small" @click="handleGoBack">取消</el-button>
                    </div>
                  </div>
                </template>
              </el-step>
              <!-- 节点三 -->
              <el-step>
                <!-- 数据共享数据中心审批 -->
                <template slot="description">
                  <p style="font-size: 16px; margin: 12px 0; color: #333">
                    {{ nextNodeName }}
                    <span
                      v-if="gxCategoryApplyBo.flowList.length > 2 && gxCategoryApplyBo.flowList[2].deptName != null"
                    >
                      <span class="item-info" style="margin-left: 24px"
                        >审批部门：{{ gxCategoryApplyBo.flowList[2].deptName || '-' }}</span
                      ><span class="item-info" style="margin: 0 24px"
                        >审批人：{{ gxCategoryApplyBo.flowList[2].assigneeName || '-' }}</span
                      ><span class="item-info">联系电话：{{ gxCategoryApplyBo.flowList[2].phone || '-' }}</span>
                    </span>
                  </p>
                  <!-- 说明 -->
                  <div v-if="gxCategoryApplyBo.flowList.length - 1 == 2" style="padding-right: 10%">
                    <div class="explain-box" v-if="gxCategoryApplyBo.flowList.length - 1 == 2 && type == '审批'">
                      <div class="explain-left">说明：</div>
                      <div class="explain-right">
                        <el-input
                          type="textarea"
                          :rows="2"
                          placeholder="请输入内容"
                          v-model="completeByDateId.comment"
                        ></el-input>
                      </div>
                    </div>
                    <div style="background: #f8fafb" v-if="gxCategoryApplyBo.flowList.length > 2 && type == '历史'">
                      <div
                        class="explain-box"
                        v-if="
                          gxCategoryApplyBo.flowList.length - 1 == 2 &&
                          gxCategoryApplyBo.flowList[2].approvalResult != null &&
                          type == '历史'
                        "
                      >
                        <div class="explain-left">说明：</div>
                        <div class="explain-right">
                          <p style="color: #333">
                            {{ gxCategoryApplyBo.flowList[2].approvalRemark || '-' }}
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="
                          gxCategoryApplyBo.flowList.length - 1 == 2 &&
                          gxCategoryApplyBo.flowList[2].approvalResult != null &&
                          type == '历史'
                        "
                        style="color: #333; padding: 0 0 12px 24px"
                      >
                        <span style="font-size: 14px">审核结果：</span
                        ><span style="margin-left: 45px; font-size: 14px">{{
                          gxCategoryApplyBo.flowList[2].approvalResult || '-'
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="btns" v-if="gxCategoryApplyBo.flowList.length - 1 == 2 && type != '历史'">
                    <el-button type="primary" size="small" @click="handleSumbPass('2')">审批通过</el-button>
                    <el-button size="small" @click="onReject">驳回</el-button>
                    <el-button size="small" @click="handleGoBack">取消</el-button>
                  </div>
                </template>
              </el-step>
            </el-steps>
          </div>
          <!-- 步骤条End -->
        </div>
      </el-col>
      <el-col :span="8">
        <!-- 工单操作日志 -->
        <operationLog ref="operationLog" />
      </el-col>
    </el-row>
    <!-- 确认弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :before-close="handleClose" :z-index="100" width="30%">
      <p class="dialogcenter">
        <i
          class="el-icon-warning"
          style="color: #1890ff; font-size: 20px; vertical-align: middle; margin-right: 5px"
        ></i>
        是否确认提交该目录审核
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleSumbitCancel">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="onApproved">{{
          loading ? '提交中...' : '确认'
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 驳回弹窗 -->
    <el-dialog title="提示" :visible.sync="dialogReject" :before-close="handleClose" :z-index="100" width="30%">
      <p class="dialogcenter">
        <i
          class="el-icon-warning"
          style="color: #1890ff; font-size: 20px; vertical-align: middle; margin-right: 5px"
        ></i>
        是否确认驳回该目录审核
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading1" @click="handleReject">{{
          loading1 ? '驳回中...' : '确认'
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSourceDepartmentApproval,
  getUpdateShareNodeData,
  getCompleteByDateId,
  getAddTableConfig,
  getTaskRejectByDataId,
} from '@/api/api'
import operationLog from '@views/MessageCenter/components/OperationLog'
import { Message, MessageBox } from 'element-ui'
import { download } from '@/api/manage'
import { getAddTable } from '@/api/api'
export default {
  name: 'SharingApplication',
  components: {
    operationLog,
  },
  data() {
    return {
      applyTitle: '',
      shareType: '',
      sqlResult: true,
      type: '',
      loading1: false,
      dialogReject: false,
      loading: false,
      dialogVisible: false,
      // 预览SQL参数
      resourceData: {
        catalogId: '',
        applyId: '',
        whereSql: '',
        // 目的库
        autoCreateDbFlag: '',
        // 目的表
        autoCreateTableFlag: '',
        // 选择的目的库
        targetDb: '',
        // 选择的目的表
        targetTable: '',
        // 传输模式
        conveyType: '',
        // 重复性输入框
        updateFrequency: '',
        // 导入规则
        importRuleType: '',
      },
      // 审批通过-驳回参数
      completeByDateId: {
        assignee: '',
        candidateGroups: [],
        candidateUsers: [],
        comment: '',
        dataId: '',
        instanceId: '',
        processCode: '',
        targetKey: '',
        taskId: '',
        userId: '',
        values: {},
      },
      reqGxCategoryApplyBo: {
        applyId: '',
        variableArea: '',
        gxApplyFiledItemBoList: [],
      },
      gxCategoryApplyBo: {
        dataItemAllList: [],
        flowList: [
          {
            resourcesName: '',
            applyDept: '',
            startTime: '',
            autoCreateTask: '',
            deptName: '',
            applyRemark: '',
            endTime: '',
            applyFileName: '',
            applicantInfo: '',
            isDataColumn: 1,
            gxApplyFiledItemBoList: [
              {
                applyId: '',
                catalogId: '',
                enName: '',
                itemId: '',
                name: '',
                taskNameId: '',
              },
            ],
          },
          {
            resourcesName: '',
            applyDept: '',
            startTime: '',
            autoCreateTask: '',
            deptName: '',
            applyRemark: '',
            endTime: '',
            applyFileName: '',
            applicantInfo: '',
            gxApplyFiledItemBoList: [
              {
                applyId: '',
                catalogId: '',
                enName: '',
                itemId: '',
                name: '',
                taskNameId: '',
              },
            ],
          },
        ],
      },
      active: 3,
      launchDepartment: '',
      catalogName: '',
      gxApplyFiledItemBoList: [],
      textarea: '',
      radio: 1,
      checkList: [],
      checkList2: [],
      nextNodeName: '',
      fromItem: '',
      itemId: '',
      formInline: '',
      showTooltip: false,
    }
  },
  activated() {
    // this.$refs.operationLog.fetchFlowRecord()
  },
  watch: {
    'datas.businessAeview.informationSummary': {
      handler() {
        this.$nextTick(() => this.checkWidth())
      },
      immediate: true,
    },
  },
  methods: {
    // handleActive(){
    //   if(this.gxCategoryApplyBo.flowList[0].approvalResult!=null){
    //     this.active =  2
    //   }else if(this.gxCategoryApplyBo.flowList[1].approvalResult!=null){
    //     this.active =  2
    //   }else if(this.gxCategoryApplyBo.flowList.length>2 && this.type == '历史'){
    //     this.active =  3
    //   }
    // },
    checkWidth() {
      const boxWidth = this.$refs['tooltipBox'].offsetWidth
      const itemWidth = this.$refs['tooltipItem'].offsetWidth
      this.showTooltip = boxWidth > itemWidth
    },
    downLoad() {
      let fileName = this.gxCategoryApplyBo.flowList[0].applyFileName
      download({ fileName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },
    // 返回上一级
    handleGoBack() {
      this.handleEmpty(), this.goBack()
    },
    // 清空
    handleEmpty() {
      ;(this.completeByDateId.comment = ''), (this.reqGxCategoryApplyBo.variableArea = '')
      this.checkList2 = []
      this.fromItem = ''
      this.itemId = ''
      this.formInline = ''
    },
    // 审批通过取消
    handleSumbitCancel() {
      this.dialogVisible = false
      this.loading = false
    },
    // 驳回取消
    handleCancel() {
      this.dialogReject = false
      this.loading1 = false
    },
    onReject() {
      this.dialogReject = true
    },
    // 确认驳回
    handleReject() {
      this.loading1 = true
      this.fetchTaskRejectByDataId()
    },
    // 驳回接口
    fetchTaskRejectByDataId() {
      getTaskRejectByDataId(this.completeByDateId)
        .then((res) => {
          if (res.code == 200) {
            this.loading1 = false
            this.dialogReject = false
            this.$bus.$emit('onQuerstWork')
            // this.$refs.operationLog.fetchFlowRecord()
            Message({
              showClose: true,
              message: `驳回${res.message}`,
              type: 'success',
            })
            this.goBack()
          } else if (!res.success) {
            Message.error(res.header.message)
            this.loading1 = false
            this.dialogReject = false
          } else {
            Message.error(res.header.message)
            this.loading1 = false
            this.dialogReject = false
          }
        })
        .catch((_) => {
          this.loading1 = false
          this.dialogReject = false
          Message.error('网络异常，请稍后重试')
        })
    },
    // 审批弹窗确认按钮
    onApproved() {
      this.handleGxApplyFiledItemBoList()
      this.gxCategoryApplyBo.flowList.forEach((v) => {
        this.reqGxCategoryApplyBo.gxApplyFiledItemBoList.forEach((r) => {
          r.taskNameId = v.taskDefKey
        })
      })
      this.reqGxCategoryApplyBo.applyId = this.gxCategoryApplyBo.flowList[0].applyId
      this.fetchUpdateShareNodeData()
      this.fetchAddTable()
    },
    // 预览SQL
    onPreviewSQL() {
      this.resourceData.applyId = this.gxCategoryApplyBo.flowList[0].applyId
      this.resourceData.whereSql = this.reqGxCategoryApplyBo.variableArea
      getAddTableConfig(this.resourceData).then((res) => {
        if (res.success) {
          this.sqlResult = false
          Message({
            showClose: true,
            message: res.header.message,
            type: 'success',
          })
        } else {
          Message({
            showClose: true,
            message: res.header.message,
            type: 'error',
          })
        }
      })
    },
    fetchUpdateShareNodeData() {
      getUpdateShareNodeData(this.reqGxCategoryApplyBo).then((res) => {
        if (res.success) {
          this.fetchCompleteByDateId()
        }
      })
    },
    fetchAddTable() {
      getAddTable(this.resourceData).then()
    },
    // 审批
    fetchCompleteByDateId() {
      this.loading = true
      getCompleteByDateId(this.completeByDateId).then((res) => {
        if (res.code == 200) {
          this.$bus.$emit('onQuerstWork')
          // this.$refs.operationLog.fetchFlowRecord()
          Message({
            message: `操作${res.message}`,
            type: 'success',
          })
          this.loading = false
          this.dialogVisible = false
          this.goBack()
        } else {
          Message.error(res.message)
          this.loading = false
          this.dialogVisible = false
        }
      })
    },
    // 审批通过
    // handleSumbPass(type) {
    //   if (type == '1') {
    //     if (this.shareType == '库表') {
    //       if (this.sqlResult) {
    //         Message.error('请成功输入SQL语句')
    //       } else {
    //         this.dialogVisible = true
    //       }
    //     } else {
    //       this.dialogVisible = true
    //     }
    //   } else {
    //     this.dialogVisible = true
    //   }
    // },
    handleSumbPass() {
      this.dialogVisible = true
    },
    handleGxApplyFiledItemBoList() {
      this.reqGxCategoryApplyBo.gxApplyFiledItemBoList = []
      this.gxCategoryApplyBo.dataItemAllList.forEach((v) => {
        if (this.checkList2.indexOf(v.name) != -1) {
          this.reqGxCategoryApplyBo.gxApplyFiledItemBoList.push(v)
        }
      })
    },
    timeCycle(da) {
      if (da != null) {
        var date = new Date(da)
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        return Y + M + D
      }
    },
    fetchSourceDepartmentApproval(fromItem, itemId, formInline) {
      if (fromItem != '') {
        this.fromItem = fromItem
        this.itemId = itemId
        this.formInline = formInline
      }
      getSourceDepartmentApproval(this.completeByDateId.processCode).then((res) => {
        if (res.success) {
          this.shareType = res.body.shareType
          this.resourceData.catalogId = res.body.catalogId
          this.nextNodeName = res.body.nextNodeName
          this.gxCategoryApplyBo.flowList = res.body.flowList
          if (this.gxCategoryApplyBo.flowList[0].autoCreateTask == '1') {
            this.gxCategoryApplyBo.flowList[0].autoCreateTask = '是'
          } else if (this.gxCategoryApplyBo.flowList[0].autoCreateTask == '0') {
            this.gxCategoryApplyBo.flowList[0].autoCreateTask = '否'
          } else {
            this.gxCategoryApplyBo.flowList[0].autoCreateTask
          }
          this.gxCategoryApplyBo.flowList[0].endTime = this.timeCycle(this.gxCategoryApplyBo.flowList[0].endTime)
          this.gxCategoryApplyBo.flowList[0].startTime = this.timeCycle(this.gxCategoryApplyBo.flowList[0].startTime)
          this.gxCategoryApplyBo.dataItemAllList = res.body.dataItemAllList
          for (let listItem of this.gxCategoryApplyBo.dataItemAllList) {
            const itemJson = this.gxCategoryApplyBo.flowList[0].gxApplyFiledItemBoList.find(
              (item) => item.name === listItem.name
            )
            if (itemJson != undefined) this.checkList.push(itemJson.name)
          }
          for (let listItem of this.gxCategoryApplyBo.dataItemAllList) {
            const itemJson = this.gxCategoryApplyBo.flowList[1].gxApplyFiledItemBoList.find(
              (item) => item.name === listItem.name
            )
            if (itemJson != undefined) this.checkList2.push(itemJson.name)
          }
        }
      })
    },
    goBack() {
      this.$emit('sonGoBack', false)
      if (this.fromItem == '编目') {
        console.log(this.itemId)
        console.log(this.formInline)
        this.$router.push({
          // path: '/datefrom/cataloglist'
          name: 'datefrom-cataloglist',
          params: {
            itemId: this.itemId,
            formInline: this.formInline,
            toName: '共享',
          },
        })
      }
      if (this.fromItem == '消息') {
        console.log(this.itemId)
        console.log(this.formInline)
        this.$router.push({
          // path: '/MessageCenter/MessageNotification'
          name: 'MessageCenter-MessageNotification',
          params: {
            itemId: this.itemId,
            formInline: this.formInline,
            toName: '共享',
          },
        })
      }
      this.handleEmpty()
    },
    handleClose(done) {
      MessageBox.confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
  },
}
</script>

<style lang="less" scoped>
@theme-color: #1890ff;
#SharingApplication {
  background: #fff;
  .title-header {
    display: flex;
    align-items: center;
    height: 61px;
    padding: 24px;
    border-bottom: 1px solid @theme-color;
    .title {
      color: @theme-color;
    }
    .el-icon-back {
      font-size: 24px;
      cursor: pointer;
      margin-right: 34px;
    }
  }
  .steptContent {
    .df-box {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  .steptContent {
    padding: 24px;
    .info-box {
      background: #f8fafb;
      padding: 24px 24px 0 24px;
      font-size: 14px;
      .item-title {
        display: inline-block;
        width: 160px;
        color: #333333;
      }
      .item-title1 {
        display: inline-block;
        width: 130px;
        color: #333333;
      }
      .item-info {
        color: #777777;
      }
    }
    .checked-box {
      padding: 0 24px;
      background: #f4f5f6;
      /deep/.el-checkbox {
        // margin: 12px 0;
        margin: 16px;
        // width: 120px !important;
      }
    }
    .preview-box {
      display: flex;
      padding: 0 24px;
      color: #333;
      .preview-left {
        // margin-right: 24px;
        width: 120px;
      }
      .preview-right {
        width: 100%;
      }
    }
    .approval-opinion {
      display: flex;
      // padding: 24px;
      padding: 12px 24px;
      color: #333;
      .opinion-left {
        width: 120px;
      }
      .opinion-right {
        width: 100%;
      }
    }
    .explain-box {
      display: flex;
      padding: 24px 24px;
      background: #f8fafb;
      font-size: 14px;
      .explain-left {
        width: 120px;
        color: #333;
      }
      .explain-right {
        width: 100%;
      }
    }
    .btns {
      padding: 24px 0;
    }
    /deep/.el-step__main {
      padding-left: 24px !important;
    }
  }
  .examine-two {
    font-size: 14px;
    background: #f7f7f7;
  }
  /deep/.el-step__head {
    margin-top: 12px;
  }
}
// 弹窗
.dialogcenter {
  margin: 50px 0;
  text-align: center;
}
/deep/.el-dialog__header {
  border-bottom: 1px solid #1890ff !important;
}
/deep/ .el-dialog__body {
  padding: 0 0 !important;
}
.item-info {
  color: #333;
  font-size: 12px;
}
.conceal1 {
  width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
  border-color: #fff;
}
/deep/.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: rgba(24, 144, 255, 0.5) !important;
}
</style>
