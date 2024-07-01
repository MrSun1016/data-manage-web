<template>
  <div>
    <!-- 共享申请 -->
    <SharingApplication v-show="applicationShow" ref="applicationShowRef" @sonGoBack="sonGoBack" />
    <div v-show="!applicationShow">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="待处理工单" name="first">
            <el-form
              :inline="true"
              ref="queryWorkOrder"
              size="mini"
              label-width="100px"
              label-position="left"
              :model="queryWorkOrder"
              class="farderfromflex"
            >
              <div class="divffromflex">
                <el-form-item label="工单类型" prop="region">
                  <el-select
                    v-model="queryWorkOrder.workType"
                    placeholder="请选择"
                    size="mini"
                    clearable
                    class="aitemml"
                  >
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="数据目录" prop="delivery">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.catalogName"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item>
                <el-form-item label="数源部门" prop="sourceUnit">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.sourceUnit"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflex" v-show="isSearch">
                <el-form-item label="提交日期">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>

                <!-- <el-form-item label="流程编码" prop="processCode">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.processCode"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item> -->
                <el-form-item label="发起部门" prop="desc">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.launchDepartment"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="申请/资源类型" prop="resourceType">
                  <el-select
                    ref="resourceType"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.resourceType"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in resourcesList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflexend">
                <el-form-item class="fromweizhi">
                  <el-button type="text" size="mini" @click="isSearch = !isSearch"
                    >高级搜索<i :class="isSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
                  ></el-button>
                  <el-button type="primary" size="mini" @click="onWorwOrderQuer">查询</el-button>
                  <el-button size="mini" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>
                <div v-show="isSearch">
                  <el-form-item label="流程编码" prop="processCode">
                    <el-input
                      size="mini"
                      v-model="queryWorkOrder.processCode"
                      clearable
                      placeholder="请输入"
                      class="aitemml"
                    ></el-input>
                  </el-form-item>
                </div>
                <!-- <div v-show="isSearch">
                  <el-form-item label="审批结果" prop="approvalResult">
                    <el-select
                      ref="approvalResult"
                      @keydown.enter.native="disableVisible"
                      v-model="queryWorkOrder.approvalResult"
                      filterable
                      size="mini"
                      clearable
                      placeholder="请选择"
                      class="aitemml"
                    >
                      <el-option
                        :label="source.text"
                        :value="source.text"
                        v-for="source in approvalList"
                        :key="source.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div> -->
              </div>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="已处理工单" name="second">
            <el-form
              :inline="true"
              label-position="left"
              ref="queryWorkOrder"
              size="mini"
              :model="queryWorkOrder"
              class="farderfromflex"
            >
              <div class="divffromflex">
                <el-form-item label="工单类型" prop="region">
                  <el-select
                    v-model="queryWorkOrder.workType"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                    size="mini"
                  >
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据目录" prop="desc">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.catalogName"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item>
                <el-form-item label="数源部门" prop="sourceUnit">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.sourceUnit"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflex" v-show="isProcessed">
                <el-form-item label="申请部门" prop="resource">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.launchDepartment"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="提交时间">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="审批时间">
                  <el-date-picker
                    v-model="sumbTime"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="divffromflexend">
                <!-- <el-form-item size="large" class="fromweizhi">
                  <el-button type="text" size="mini" @click="isProcessed = !isProcessed"
                    >高级搜索<i :class="isProcessed ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
                  ></el-button>
                  <el-button type="primary" size="mini" @click="onWorwOrderQuer">查询</el-button>
                  <el-button size="mini" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item> -->
                <!-- <div v-show="isProcessed"> -->

                <el-form-item label="流程编码" prop="processCode" v-show="isProcessed">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.processCode"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item>

                <el-form-item label="申请/资源类型" prop="resourceType" v-show="isProcessed">
                  <el-select
                    ref="resourceType"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.resourceType"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in resourcesList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="审批结果" prop="approvalResult" v-show="isProcessed">
                  <el-select
                    ref="approvalResult"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.approvalResult"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in approvalList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                
                <!-- </div> -->
              </div>

              <div class="divffromflexend">
                <el-form-item size="large" class="fromweizhi">
                  <el-button type="text" size="mini" @click="isProcessed = !isProcessed"
                    >高级搜索<i :class="isProcessed ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
                  ></el-button>
                  <el-button type="primary" size="mini" @click="onWorwOrderQuer">查询</el-button>
                  <el-button size="mini" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>
              </div>

            </el-form>
          </el-tab-pane>

          <!-- <el-tab-pane label="全部待处理工单" name="three" v-if="checkRole(['admin'])"> -->
          <el-tab-pane label="全部待处理工单" name="three" v-if="allPending">
            <el-form
              :inline="true"
              ref="queryWorkOrder"
              size="mini"
              label-width="100px"
              label-position="left"
              :model="queryWorkOrder"
              class="farderfromflex"
            >
              <div class="divffromflex">
                <el-form-item label="工单类型" prop="region">
                  <el-select
                    v-model="queryWorkOrder.workType"
                    placeholder="请选择"
                    size="mini"
                    clearable
                    class="aitemml"
                  >
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="数据目录" prop="delivery">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.catalogName"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item>
                <el-form-item label="数源部门" prop="sourceUnit">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.sourceUnit"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflex" v-show="isWholeSearch">
                <el-form-item label="提交日期">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="发起部门" prop="desc">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.launchDepartment"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="申请/资源类型" prop="resourceType">
                  <el-select
                    ref="resourceType"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.resourceType"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in resourcesList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflexend">
                <el-form-item class="fromweizhi">
                  <el-button type="text" size="mini" @click="isWholeSearch = !isWholeSearch"
                    >高级搜索<i :class="isWholeSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
                  ></el-button>
                  <el-button type="primary" size="mini" @click="onWorwOrderQuer">查询</el-button>
                  <el-button size="mini" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>
                <!-- <el-form-item label="审批结果" prop="approvalResult" v-show="isWholeSearch">
                  <el-select
                    ref="approvalResult"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.approvalResult"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in approvalList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item> -->
              </div>
            </el-form>
          </el-tab-pane>

          <!-- <el-tab-pane label="全部已处理工单" name="four" v-if="checkRole(['admin'])"> -->
          <el-tab-pane label="全部已处理工单" name="four" v-if="allProcessed">
            <el-form
              :inline="true"
              label-position="left"
              ref="queryWorkOrder"
              size="mini"
              :model="queryWorkOrder"
              class="farderfromflex"
            >
              <div class="divffromflex">
                <el-form-item label="工单类型" prop="region">
                  <el-select
                    v-model="queryWorkOrder.workType"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                    size="mini"
                  >
                    <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="数据目录" prop="desc">
                  <el-input
                    size="mini"
                    v-model="queryWorkOrder.catalogName"
                    clearable
                    placeholder="请输入"
                    class="aitemml"
                  ></el-input>
                </el-form-item>

                <el-form-item label="数源部门" prop="sourceUnit">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.sourceUnit"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="divffromflex" v-show="isWholeProcessed">
                <el-form-item label="申请部门" prop="resource">
                  <el-select
                    ref="sourceUnit"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.launchDepartment"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.nodeName"
                      :value="source.nodeName"
                      v-for="source in citys"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="提交时间">
                  <el-date-picker
                    v-model="times"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>

                <el-form-item label="审批时间">
                  <el-date-picker
                    v-model="sumbTime"
                    type="daterange"
                    :default-time="['00:00:00', '23:59:59']"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="pickerwei"
                  ></el-date-picker>
                </el-form-item>
              </div>
              <div class="divffromflexend">
                <el-form-item size="large" class="fromweizhi">
                  <el-button type="text" size="mini" @click="isWholeProcessed = !isWholeProcessed"
                    >高级搜索<i :class="isWholeProcessed ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
                  ></el-button>
                  <el-button type="primary" size="mini" @click="onWorwOrderQuer">查询</el-button>
                  <el-button size="mini" @click="resetQueryWorkOrder">重置</el-button>
                </el-form-item>

                <el-form-item label="申请/资源类型" prop="resourceType" v-show="isWholeProcessed">
                  <el-select
                    ref="resourceType"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.resourceType"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in resourcesList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="审批结果" prop="approvalResult" v-show="isWholeProcessed">
                  <el-select
                    ref="approvalResult"
                    @keydown.enter.native="disableVisible"
                    v-model="queryWorkOrder.approvalResult"
                    filterable
                    size="mini"
                    clearable
                    placeholder="请选择"
                    class="aitemml"
                  >
                    <el-option
                      :label="source.text"
                      :value="source.text"
                      v-for="source in approvalList"
                      :key="source.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-card class="cardmargtop" v-show="activeName == 'first'">
        <el-button type="text" class="piliangbut" @click="batchApproval">批量审批</el-button>
        <el-button type="text" class="piliangbut" @click="batchReject">批量驳回</el-button>
        <el-table
          :header-cell-style="{
            background: '#EAF1FE',
            fontWeight: '500',
            color: '#656565',
            fontSize: '14px'
          }"
          v-loading="loading"
          ref="table"
          :data="workdata"
          @select="selectOne"
          @select-all="selectAll"
        >
          <el-table-column type="selection" align="center" min-width="8%"> </el-table-column>
          <el-table-column prop="workType" label="工单类型">
            <template slot-scope="{ row }">
              {{ row.workType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="catalogName" label="数据目录" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              <span>{{ row.catalogName || '-' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="resourceType" label="申请/资源类型">
            <template slot-scope="{ row }">
              {{ row.resourceType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.sourceUnit || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="launchDepartment" label="发起部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.launchDepartment || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="starTime" label="提交时间">
            <template slot-scope="{ row }">
              {{ row.starTime || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="approvalResult" label="流程编码" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.processCode || '-' }}
            </template>
          </el-table-column>

          <!-- <el-table-column prop="approvalResult" label="审批结果">
            <template slot-scope="{ row }">
              {{ row.approvalResult || '-' }}
            </template>
          </el-table-column> -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="onApproval(scope.row, '审批')" v-has="'workOrder:approval'"
                >审批</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="papgin">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryWorkOrder.pageNum"
            :page-sizes="pageSizes"
            :page-size="100"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </el-card>
      <el-card class="cardmargtop" v-show="activeName == 'second'">
        <!-- 表格 -->
        <el-table
          :header-cell-style="{
            background: '#EAF1FE',
            fontWeight: '500',
            color: '#656565',
            fontSize: '14px'
          }"
          v-loading="loading1"
          :data="completedWorkOrder"
        >
          <el-table-column prop="workType" label="工单类型">
            <template slot-scope="{ row }">
              {{ row.workType || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="catalogName" label="数据目录" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.catalogName || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="resourceType" label="申请/资源类型" width="110px">
            <template slot-scope="{ row }">
              {{ row.resourceType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.sourceUnit || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="launchDepartment" label="申请部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.launchDepartment || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="starTime" label="提交时间">
            <template slot-scope="{ row }">
              {{ row.starTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="approvalEndTime" label="审批时间">
            <template slot-scope="{ row }">
              {{ row.approvalEndTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="approvalResult" label="流程编码" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.processCode || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="approvalResult" label="审批结果" width="85px">
            <template slot-scope="{ row }">
              {{ row.approvalResult || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text" @click="onApproval(scope.row, '历史')" v-has="'workOrder:approvalHistory'"
                >审批历史</el-button
              >
              <span slot="action">
                <!-- <act-historic-detail-btn :data-id="scope.row.processCode"></act-historic-detail-btn> -->
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="papgin">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryWorkOrder.pageNum"
            :page-sizes="pageSizes"
            :page-size="100"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </el-card>
      <el-card class="cardmargtop" v-show="activeName == 'three'" v-has="'workOrder:allToDo'">
        <el-table
          :header-cell-style="{
            background: '#EAF1FE',
            fontWeight: '500',
            color: '#656565',
            fontSize: '14px'
          }"
          v-loading="loading"
          ref="table"
          :data="workdata"
          @select="selectOne"
          @select-all="selectAll"
        >
          <el-table-column type="selection" align="center" min-width="8%"> </el-table-column>
          <el-table-column prop="workType" label="工单类型">
            <template slot-scope="{ row }">
              {{ row.workType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="catalogName" label="数据目录" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              <span>{{ row.catalogName || '-' }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="resourceType" label="申请/资源类型">
            <template slot-scope="{ row }">
              {{ row.resourceType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.sourceUnit || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="launchDepartment" label="发起部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.launchDepartment || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="starTime" label="提交时间">
            <template slot-scope="{ row }">
              {{ row.starTime || '-' }}
            </template>
          </el-table-column>

          <!-- <el-table-column prop="approvalResult" label="审批结果">
            <template slot-scope="{ row }">
              {{ row.approvalResult || '-' }}
            </template>
          </el-table-column> -->
          <!--<el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="onApproval(scope.row, '审批')" v-has="'workOrder:approval'"
                >审批</el-button
              >
            </template>
          </el-table-column>-->
        </el-table>
        <div class="papgin">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryWorkOrder.pageNum"
            :page-sizes="pageSizes"
            :page-size="100"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </el-card>
      <el-card class="cardmargtop" v-show="activeName == 'four'" v-has="'workOrder:allProcessed'">
        <!-- 表格 -->
        <el-table
          :header-cell-style="{
            background: '#EAF1FE',
            fontWeight: '500',
            color: '#656565',
            fontSize: '14px'
          }"
          v-loading="loading1"
          :data="completedWorkOrder"
        >
          <el-table-column prop="workType" label="工单类型">
            <template slot-scope="{ row }">
              {{ row.workType || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="catalogName" label="数据目录" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.catalogName || '-' }}
            </template>
          </el-table-column>

          <el-table-column prop="resourceType" label="申请/资源类型" width="110px">
            <template slot-scope="{ row }">
              {{ row.resourceType || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="sourceUnit" label="数源部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.sourceUnit || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="launchDepartment" label="申请部门" :show-overflow-tooltip="true">
            <template slot-scope="{ row }">
              {{ row.launchDepartment || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="starTime" label="提交时间">
            <template slot-scope="{ row }">
              {{ row.starTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="approvalEndTime" label="审批时间">
            <template slot-scope="{ row }">
              {{ row.approvalEndTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column prop="approvalResult" label="审批结果" width="85px">
            <template slot-scope="{ row }">
              {{ row.approvalResult || '-' }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text" @click="onApproval(scope.row, '历史')" v-has="'workOrder:approvalHistory'"
                >审批历史</el-button
              >
              <span slot="action">
                <!-- <act-historic-detail-btn :data-id="scope.row.processCode"></act-historic-detail-btn> -->
              </span>
            </template>
          </el-table-column>
        </el-table>
        <div class="papgin">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryWorkOrder.pageNum"
            :page-sizes="pageSizes"
            :page-size="100"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </div>
      </el-card>
      <!-- 批量驳回 -->
      <el-dialog title="提示" :visible.sync="batchR" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">
          <i class="el-icon-info iconcolor"></i> 当前已勾选{{ checkedList.length }}条工单，是否确认批量驳回？
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="batchR = false" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="mini" :loading="loadread" :disabled="loadread" @click="batchTaskReject">{{
            loadread ? '驳回中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>
      <!-- 批量审批 -->
      <el-dialog title="提示" :visible.sync="batchC" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">
          <i class="el-icon-info iconcolor"></i> 当前已勾选{{ checkedList.length }}条工单，是否确认批量审批？
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" @click="batchC = false" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="mini" :loading="loadread" :disabled="loadread" @click="batchComplete">{{
            loadread ? '审批中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import SharingApplication from '@views/MessageCenter/components/SharingApplication'
import operationLog from '@views/MessageCenter/components/OperationLog'
import ActHistoricDetailBtn from '@views/flowable/components/ActHistoricDetailBtn'
import {
  getWorkcaTalog,
  getWorkTypeList,
  batchCompleteByDateId,
  batchTaskRejectByDataId,
  mechanismTree,
  getDictItems
} from '@/api/api'
import { Message } from 'element-ui'
import SideMenu from '@/utils/SideMenu.js'
// import { checkRole } from '@/utils/permission' // 权限判断函数
import { USER_AUTH } from '@/store/mutation-types'
export default {
  name: 'WorkOrderProcessing',
  components: {
    ActHistoricDetailBtn,
    operationLog,
    SharingApplication
  },
  data() {
    return {
      // 工单列表下拉
      type: '1', //待处理
      applicationShow: false,
      loading: false,
      loading1: false,
      // value: '',
      url: {
        list: '/api/flowcatalog/list',
        // list: "/test_demo/testDemo/list",
        delete: '/test_demo/testDemo/delete',
        deleteBatch: '/test_demo/testDemo/deleteBatch',
        exportXlsUrl: '/test_demo/testDemo/exportXls',
        importExcelUrl: 'test_demo/testDemo/importExcel'
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
        values: {}
      },
      activeName: 'first',
      totalCount: 0,
      pageSizes: [10, 20, 50],
      times: [], //审批处理时间
      sumbTime: [], //提交时间
      typeList: [], //工单列表
      queryWorkOrder: {
        orderByField: '',
        queryContent: 1, //查询内容 1为待处理工单 2已处理工单
        rowStart: '',
        workType: '', //工单类型
        starTime: '', //提交时间开始
        endTime: '', //提交结束时间
        processCode: '', //流程编码
        sourceUnit: '', //数源部门
        resourceType: '', //申请/资源类型
        approvalResult: '', //审批结果
        launchDepartment: '', //发起/申请部门
        id: 0,
        catalogName: '', //数据目录名称
        pageNum: 1,
        pageSize: 10,
        approvalStarTime: '', //审批开始时间
        approvalEndTime: '', //审批结束时间
        all: ''
      },
      //已处理工单数据
      completedWorkOrder: [],
      sizeForm: {
        region: '',
        delivery: '',
        resource: '',
        desc: '',
        date1: '',
        date2: '',
        value1: '',
        value2: '',
        name: ''
      },
      workdata: [], //表格数据
      checkedList: [], //已选中数据
      formLabelAlign: {
        resource: ''
      },
      workType: '',
      // 批量审批
      batchC: false,
      // 批量驳回
      batchR: false,
      loadread: false,
      // 全部待处理
      allPending: false,
      // 全部已处理
      allProcessed: false,
      // 待处理工单-高级搜索
      isSearch: false,
      // 已处理工单-高级搜索
      isProcessed: false,
      // 全部待处理工单-高级搜索
      isWholeSearch: false,
      // 全部已处理工单-高级搜索
      isWholeProcessed: false,
      // 申请/资源类型
      resources: 'resource_type',
      // 审批结果
      approval: 'approval_result',
      citys: [],
      approvalList: [],
      resourcesList: []
    }
  },
  // activated() {},
  created() {},
  activated() {
    this.isAuthData()
    this.bodyTree()
    this.applicationShow = false
    this.workType = this.$route.query.workType
    this.queryWorkOrder.workType = this.$route.query.workType2
    if (this.workType == '待处理') this.activeName = 'first'
    else if (this.workType == '已处理') this.activeName = 'second'
    //  获取工单列表
    this.fetchWorkTypeList()
    this.handeleQuerstWork()
    this.$bus.$on('onQuerstWork', _ => {
      this.handeleQuerstWork()
    })
    this.$bus.$on('handleOnApproved', _ => {
      this.handeleQuerstWork()
    })
    this.$bus.$on('onWorwOrderQuer', _ => {
      this.onWorwOrderQuer()
    })
    this.$bus.$on('onWorwOrderQuerAll', _ => {
      this.onWorwOrderQuerAll()
    })
  },
  deactivated() {},
  beforeDestroy() {
    this.$bus.$off('onQuerstWork')
    this.$bus.$off('handleOnApproved')
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.fromItem == '消息') {
          let { viewMessage, type, fromItem, itemId, formInline } = this.$route.params
          this.$nextTick(() => {
            this.applicationShow = true
            this.$refs.applicationShowRef.sqlResult = true
            this.$refs.applicationShowRef.type = type
            this.$refs.applicationShowRef.launchDepartment = viewMessage.launchDepartment
            this.$refs.applicationShowRef.catalogName = viewMessage.catalogName
            this.$refs.applicationShowRef.completeByDateId.processCode = viewMessage.processCode
            this.$refs.applicationShowRef.fetchSourceDepartmentApproval(fromItem, itemId, formInline)
            this.$bus.$emit('onViewMessage', viewMessage.processCode)
          })
          this.$route.params.fromItem = ''
          this.$route.params.viewMessage = {}
          this.$route.params.type = ''
          this.$route.params.itemId = ''
          this.$route.params.formInline = {}
        }
        // if (this.$route.params.fromItem == '编目') {
        //   let { viewMessage, type, fromItem, itemId, formInline } = this.$route.params
        //   console.log('viewMessage', viewMessage)
        //   this.$nextTick(() => {
        //     this.applicationShow = true
        //     this.$bus.$emit('onflowRecord', viewMessage.processCode)
        //     this.$refs.applicationShowRef.sqlResult = true
        //     this.$refs.applicationShowRef.type = type
        //     this.$refs.applicationShowRef.applyTitle = viewMessage.applyTitle
        //     // // this.$refs.applicationShowRef.catalogName = rowData.catalogName
        //     this.$refs.applicationShowRef.completeByDateId.processCode = viewMessage.processCode
        //     this.$refs.applicationShowRef.fetchSourceDepartmentApproval(fromItem, itemId, formInline )
        //   })
        //   this.$route.params.fromItem = ''
        //   this.$route.params.viewMessage = {}
        //   this.$route.params.type = ''
        //   this.$route.params.itemId = ''
        //   this.$route.params.formInline = {}
        // }
        this.$nextTick(_ => {
          this.handleSharingApplication()
        })
      }
    },
    // 切换分页时，将已存在的数据勾选
    workdata(newVal) {
      if (!newVal || !newVal.length) return
      const checkedId = []
      this.checkedList.forEach(item => {
        checkedId.push(item.id)
      })
      setTimeout(() => {
        this.workdata.forEach(item => {
          if (checkedId.includes(item.id)) {
            this.$refs.table.toggleRowSelection(item)
          }
        })
      })
    }
  },
  methods: {
    // 数源部门
    bodyTree() {
      mechanismTree().then(res => {
        if (res.success) {
          // this.citys = res.body.children
          function treeToArr(data, res = []) {
            data.forEach(item => {
              res.push({
                // pid: pid,
                id: item.id,
                nodeCode: item.nodeCode,
                nodeName: item.nodeName,
                parentId: item.parentId
              })
              if (item.children && item.children.length !== 0) {
                treeToArr(item.children, res)
              }
            })
            return res
          }
          this.citys = treeToArr(res.body.children)
        }
      }),
        getDictItems(this.approval).then(res => {
          if (res.success) {
            this.approvalList = res.result
          }
        })
      getDictItems(this.resources).then(res => {
        if (res.success) {
          this.resourcesList = res.result.slice(0, 2)
        }
      })
    },

    // 按钮权限
    isAuthData() {
      var auth = JSON.parse(sessionStorage.getItem(USER_AUTH))
      // 全部待处理
      this.allPending = auth.some(item => {
        return item.action == 'workOrder:allToDo'
      })
      // 全部已处理
      this.allProcessed = auth.some(item => {
        return item.action == 'workOrder:allProcessed'
      })

      console.log('auth', auth)
    },
    sonGoBack(val) {
      this.applicationShow = val
    },
    fetchWorkTypeList() {
      let type
      if (this.activeName == 'first') {
        type = 1
      } else {
        type = 2
      }
      getWorkTypeList(type).then(res => {
        this.typeList = res.body
      })
    },
    // 数据共享跳转
    handleSharingApplication() {
      let { fromItem, itemId, formInline } = this.$route.query
      let sign = this.$route.query.sign
      if (sign) {
        this.applicationShow = true
        this.$bus.$emit('onflowRecord', this.$route.query.processCode)
        this.$refs.applicationShowRef.sqlResult = true
        this.$refs.applicationShowRef.type = this.$route.query.type
        this.$refs.applicationShowRef.applyTitle = this.$route.query.applyTitle
        // // this.$refs.applicationShowRef.catalogName = rowData.catalogName
        this.$refs.applicationShowRef.completeByDateId.processCode = this.$route.query.processCode
        this.$refs.applicationShowRef.fetchSourceDepartmentApproval(fromItem, itemId, formInline)
      } else {
        this.applicationShow = false
      }
    },
    //审批按钮
    onApproval(rowData, type) {
      if (rowData.workStatus == 2) {
        this.$bus.$emit('onflowRecord', rowData.processCode)
        this.$refs.applicationShowRef.sqlResult = true
        this.$refs.applicationShowRef.type = type
        this.$refs.applicationShowRef.launchDepartment = rowData.launchDepartment
        this.$refs.applicationShowRef.catalogName = rowData.catalogName
        this.$refs.applicationShowRef.completeByDateId.processCode = rowData.processCode
        this.$refs.applicationShowRef.fetchSourceDepartmentApproval()
        this.applicationShow = true
      } else {
        this.$router.push({
          path: '/MessageCenter/BusinessReview',
          query: {
            processDefinitionKey: rowData.processDefinitionKey,
            id: rowData.id,
            catalogStatus: rowData.catalogStatus,
            cataStatus: rowData.cataStatus,
            processCode: rowData.processCode,
            executionId: rowData.executionId,
            type,
            taskNameId: rowData.taskNameId,
            endTime: rowData.approvalEndTime,
            startTime: rowData.starTime
          }
        })
        // localStorage.setItem('PROCESS_CODE', rowData.processCode)
      }
    },
    handleClick() {
      if (this.activeName == 'first') {
        this.type = '1'
        // this.fetchWorkTypeList()
      } else {
        this.type = '2'
        // this.fetchWorkTypeList()
      }

      this.clearformdata()
      this.handeleQuerstWork()
      this.fetchWorkTypeList()
    },
    //每页显示几条
    handleSizeChange(pageSizes) {
      this.queryWorkOrder.pageSize = pageSizes
      this.handeleQuerstWork()
    },
    //分页查询
    handleCurrentChange(page) {
      this.queryWorkOrder.pageNum = page
      this.handeleQuerstWork()
    },
    //判断请求
    handeleQuerstWork() {
      SideMenu.$emit('reload', 'msg') //刷新左侧菜单栏
      if (this.activeName == 'first' || this.activeName == 'three') {
        this.loading = true
        this.loading1 = true
        this.queryWorkOrder.type = 1
        this.queryWorkOrder.queryContent = 1
        if (this.times) {
          if (this.times.length != 0) {
            this.queryWorkOrder.starTime = this.times[0]
            this.queryWorkOrder.endTime = this.times[1]
          }
        } else {
          this.queryWorkOrder.starTime = ''
          this.queryWorkOrder.endTime = ''
        }
        if (this.activeName == 'three') {
          this.queryWorkOrder.all = 'all'
        }
        getWorkcaTalog(this.queryWorkOrder).then(res => {
          if (res.success) {
            this.loading = false
            this.loading1 = false
            this.totalCount = res.body.total
            this.workdata = res.body.content
            //时间格式处理
            this.workdata.map((item, index) => {
              // item.starTime = this.timeCycle(item.starTime)
              item.starTime = this.formatTime(item.starTime)
            })
          } else {
            this.$message.error('查询失败')
          }
        })
      } else if (this.activeName == 'second' || this.activeName == 'four') {
        this.queryWorkOrder.type = 2
        this.queryWorkOrder.queryContent = 2
        this.loading = true
        this.loading1 = true
        if (this.times) {
          if (this.times.length != 0) {
            this.queryWorkOrder.starTime = this.times[0]
            this.queryWorkOrder.endTime = this.times[1]
          }
        } else {
          this.queryWorkOrder.starTime = ''
          this.queryWorkOrder.endTime = ''
        }
        if (this.sumbTime) {
          if (this.sumbTime.length != 0) {
            this.queryWorkOrder.approvalStarTime = this.sumbTime[0]
            this.queryWorkOrder.approvalEndTime = this.sumbTime[1]
          }
        } else {
          this.queryWorkOrder.approvalStarTime = ''
          this.queryWorkOrder.approvalEndTime = ''
        }
        if (this.activeName == 'four') {
          this.queryWorkOrder.all = 'all'
        }
        getWorkcaTalog(this.queryWorkOrder).then(res => {
          if (res.success) {
            this.loading = false
            this.loading1 = false
            this.totalCount = res.body.total
            this.completedWorkOrder = res.body.content
            // 时间格式处理
            this.completedWorkOrder.forEach((item, i) => {
              // item.approvalEndTime = this.timeCycle(item.approvalEndTime)
              // item.starTime = this.timeCycle(item.starTime)
              item.approvalEndTime = this.formatTime(item.approvalEndTime)
              item.starTime = this.formatTime(item.starTime)
            })
          } else {
            this.$message.error('查询失败')
          }
        })
      }
    },
    //清空查询表单
    clearformdata() {
      this.queryWorkOrder = {
        orderByField: '',
        processCode: '',
        queryContent: 1, //查询内容 1为待处理工单 2已处理工单
        rowStart: '',
        workType: '', //工单类型
        starTime: '', //提交时间开始
        endTime: '', //提交结束时间
        processCode: '', //流程编码
        launchDepartment: '', //发起/申请部门
        id: 0,
        catalogName: '', //数据目录名称
        pageNum: 1,
        pageSize: 10,
        approvalStarTime: '', //审批开始时间
        approvalEndTime: '' //审批结束时间
      }
      this.times = []
      this.sumbTime = []
    },
    //查询工单列表
    onWorwOrderQuer() {
      this.queryWorkOrder.pageNum = 1
      this.handeleQuerstWork()
    },
    onWorwOrderQuerAll() {
      this.queryWorkOrder.pageNum = 1
      this.handeleQuerstWorkAll()
    },
    resetQueryWorkOrder() {
      this.clearformdata()
    },
    selectOne(value, row) {
      // 判定当前点击的行是选中还是取消
      if (value.length) {
        // value存在时，当前行是否在value中，不存在result为undefind
        const result = value.find(v => v.id === row.id)
        if (result) {
          // 选中当前行，将当前行push到checkedList中
          this.checkedList.push(result)
        } else {
          // 取消当前行，将当前行从checkedList中删除
          this.checkedList = this.checkedList.filter(v => v.id === row.id)
        }
      } else {
        // value不存在时将当前行从选中列表中删除
        this.checkedList = this.checkedList.filter(v => v.id === row.id)
      }
    },
    selectAll(value) {
      if (value.length === this.workdata.length) {
        // 选中全选
        if (this.checkedList.length) {
          // 已有选中数据，将checkedList中已存在的选项过滤掉，将不存在的选项合并到checkedList
          // 从checkedList 获取已选中的数据的id
          const checkedId = []
          this.checkedList.forEach(item => {
            checkedId.push(item.id)
          })
          // 过滤掉全选的数据中在checkedList中已存在的数据
          const newChecked = value.filter(i => !checkedId.includes(i.id))
          // 将新选中的数据合并到checkedList
          this.checkedList = [...this.checkedList, ...newChecked]
        } else {
          // checkedList为空，将当前页的数据直接赋值给checkedList
          this.checkedList = this.workdata
        }
      } else {
        // 取消全选,将当前页数据从checkedList过滤掉
        const checkedId = []
        this.checkedList.forEach(item => {
          checkedId.push(item.id)
        })
        this.checkedList = this.checkedList.filter(i => !checkedId.includes(i.id))
      }
    },
    // 批量审批
    batchApproval() {
      if (this.checkedList.length == 0) {
        Message({
          showClose: true,
          message: '请至少勾选一条工单',
          type: 'warning'
        })
      } else {
        this.batchC = true
      }
    },
    // 批量审批
    batchComplete() {
      this.loadread = true
      batchCompleteByDateId(this.checkedList).then(res => {
        if (res.success) {
          setTimeout(() => {
            Message({
              message: '批量审批成功！',
              type: 'success'
            })
            this.batchC = false
            this.checkedList = []
            this.handeleQuerstWork()
            this.loadread = false
          }, 1000)
        } else {
          this.batchC = false
          Message.error(res.message)
          this.loadread = false
        }
      })
    },
    // 批量驳回
    batchReject() {
      if (this.checkedList.length == 0) {
        Message({
          showClose: true,
          message: '请至少勾选一条工单',
          type: 'warning'
        })
      } else {
        this.batchR = true
      }
    },
    // 批量驳回
    batchTaskReject() {
      this.loadread = true
      batchTaskRejectByDataId(this.checkedList).then(res => {
        if (res.success) {
          setTimeout(() => {
            Message({
              message: '批量驳回成功！',
              type: 'success'
            })
            this.batchR = false
            this.checkedList = []
            this.handeleQuerstWork()
            this.loadread = false
          }, 1000)
        } else {
          this.batchR = false
          Message.error(res.message)
          this.loadread = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@color: #1890ff;
/deep/.el-range-separator {
  margin: 0 15px 0 0;
}
/deep/.el-input--mini .el-input__icon {
  line-height: 32px;
  height: 32px;
}
.el-select {
  /deep/.el-input {
    display: flex !important;
    align-items: center !important;
  }
}
/deep/.el-icon-arrow-up:before {
  content: '\e78f';
  color: #666666;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.aitemml {
  width: 250px;
  height: 32px;
  /deep/.el-input__inner {
    height: 32px;
  }
}
.aitemmlitem {
  width: 250px;
  height: 32px;
  display: flex;
}
.fromweizhi {
  width: 315px;
  display: flex;
  justify-content: flex-end;
}
.divffromflex {
  display: flex;
  // flex: 1;
  justify-content: space-between;
}
.divffromflexend {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
.cardmargtop {
  margin-top: 15px;
}
.fromflexrig {
  display: flex;
  justify-content: flex-end;
  .el-form-item {
    margin-bottom: 5px;
  }
}
.fromitemdata {
  width: 120px;
  height: 32px;
}
.times {
  color: #333333;
  margin: 10px 0;
}
/deep/ .el-step__title.is-finish {
  color: #333333 !important;
}
// .operation-log {
//   width: 500px;
//   height: 100vh;
//   margin: 0 20px;
//   background-color: #fff !important;
// }
.handleBtn {
  background: #fff;
  padding: 20px 55px;
}
.el-tabs__header {
  margin: 0;
}
.pickerwei {
  width: 250px;
}
::v-deep .el-drawer__header {
  margin: 0;
}

.purple {
  width: 100%;
  height: 100%;
  // background: #fff;
  color: rgb(46, 46, 46);
  // padding-left: 20px;
}
.description-info {
  background: #f8fafb;
}
.jibentop {
  margin: 10px 0 0 0;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 0;
}
.order-log {
  border-bottom: 1px solid #1890ff;
  color: @color;
  padding-left: 20px;
}
::v-deep .el-form-item__label {
  font-size: 13px;
}
.elfromweit {
  margin-left: 20px;
}
::v-deep .el-form-item {
  margin-bottom: 15px;
}
.fromfont {
  margin-top: 0;
  width: 310px;
  height: 40px;
}
.fromfontmarg {
  margin-right: 50px;
}
.frompfont {
  font-size: 13px;
  color: #313131;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.frombigweiht {
  width: 100%-20px;
}
.papgin {
  text-align: right;
  margin-top: 25px;
  background: #fff;
}
/deep/ .el-step__description {
  padding-right: 0 !important;
}
.piliangbut {
  width: 88px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #1890ff;
  color: #1890ff;
  margin-bottom: 20px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 17px;
}
.dialogcenter {
  height: 0px;
  margin: 60px 0;
  text-align: center;
  font-size: 16px;
  color: #000000;
}
/* el-divider 修改高度&虚线效果 */
.el-divider--horizontal {
  margin: -10px 0;
}

// /deep/ .timeHistory {
//   padding: 10px 0 0 0 !important;
//   padding: 20px !important;
// }
</style>
