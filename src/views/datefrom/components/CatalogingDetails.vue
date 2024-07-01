<template>
  <!-- 数据编目--编目列表-编目详情 -->
  <div>
    <el-page-header @back="goBack" content="消防车辆信息"> </el-page-header>
    <el-card class="cardping">
      <!-- <div class="toptitlflex">
        <p class="ptoptitle">消防车辆信息信息</p>
        <el-tag size="mini" effect="plain" class="tagmarg">市级</el-tag>
        <el-tag size="mini" effect="plain" class="tagmarg">已归集</el-tag>
      </div>
      <div class="divfadflex">
        <div class="divtitlflex">
          <div class="divtilemarg">
            <p class="pshuywei phnk">数源单位：</p>
            <p class="phnk">孝感市人社局</p>
          </div>
          <div class="divtilemarg divfadmarg">
            <p class="pshuywei phnk">领域分类：</p>
            <p class="phnk">公共安全</p>
          </div>
        </div>
        <div class="divtitlflex">
          <div>
            <p class="pshuywei phnk">数源单位：</p>
            <p class="phnk">孝感市人社局</p>
          </div>
          <div class="divfadmarg">
            <p class="pshuywei phnk">归集总量：</p>
            <p class="phnk">3,271,547</p>
          </div>
        </div>
      </div>
      <div class="divbluemarg">
        <span class="spanbluemarg">受限共享</span>
        <span class="spanbluemarg">禁止开放</span>
        <span class="spanbluemarg">浏览量16783</span>
        <span class="spanbluemarg">申请量27918</span>
      </div> -->

      <p class="jibentop">基本信息</p>
      <el-divider class="pdivider"></el-divider>
      <el-form :inline="true" ref="form" label-width="190px" label-position="left" class="elfromweit">
        <el-form-item class="fromfont" label="领域分类：">
          <p class="frompfont">公共安全</p>
        </el-form-item>
        <el-form-item class="fromfont" label="信息资源代码：">
          <p class="frompfont">17987618313</p>
        </el-form-item>
        <el-form-item class="fromfont" label="数源单位：">
          <p class="frompfont">孝感市人社局局</p>
        </el-form-item>
        <el-form-item class="fromfont" label="应用系统：">
          <p class="frompfont">无 无关联系统</p>
        </el-form-item>
        <el-form-item class="fromfont" label="共享类型：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
        <el-form-item class="fromfont" label="共享条件：">
          <p class="frompfont">按需申请</p>
        </el-form-item>
        <el-form-item class="fromfont" label="开放类型：">
          <p class="frompfont">不允许开放</p>
        </el-form-item>
        <el-form-item class="fromfont" label="是否对社会开放">
          <p class="frompfont">不对社会开放</p>
        </el-form-item>
        <el-form-item class="fromfont" label="数据范围：">
          <p class="frompfont">孝昌县</p>
        </el-form-item>
        <el-form-item class="fromfont" label="更新频率：">
          <p class="frompfont">每周 周三 周五</p>
        </el-form-item>
        <el-form-item class="fromfont" label="关联类目：">
          <p class="frompfont">主题库 人口基础资源信息</p>
        </el-form-item>
        <el-form-item class="fromfont" label="业务责任科室：">
          <p class="frompfont">孝感市人社局局</p>
        </el-form-item>
        <el-form-item class="fromfont" label="业务责任人：">
          <p class="frompfont">张三</p>
        </el-form-item>
        <el-form-item class="fromfont" label="联系方式：">
          <p class="frompfont">16347333282</p>
        </el-form-item>
        <el-form-item class="fromfont" label="信息资源摘要：">
          <p class="frompfont">暂无</p>
        </el-form-item>
      </el-form>

      <p class="jibenxinxi">服务事项</p>
      <el-divider class="pdivider"></el-divider>
      <el-form :inline="true" ref="form" label-width="190px" label-position="left" class="elfromweit">
        <el-form-item class="fromfont" label="服务事项名称：">
          <p class="frompfont">公共安全</p>
        </el-form-item>
        <el-form-item class="fromfont" label="是否电子证照：">
          <p class="frompfont">是</p>
        </el-form-item>
        <el-form-item class="fromfont" label="应用场景：">
          <p class="frompfont">孝感市人社局局</p>
        </el-form-item>
        <el-form-item class="fromfont" label="提供渠道：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
        <el-form-item class="fromfont" label="实施清单编码：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
        <el-form-item class="fromfont" label="实施清单名称：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
        <el-form-item class="fromfont" label="业务办理项编码：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
        <el-form-item class="fromfont" label="业务办理项名称：">
          <p class="frompfont">共享受限</p>
        </el-form-item>
      </el-form>

      <p class="jibenxinxi">数据项</p>
      <el-divider class="pdivider"></el-divider>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#ECF1FF', color: '#333333' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="name" label="中文名称" width="170"> </el-table-column>
        <el-table-column prop="name" label="英文名称" width="170"> </el-table-column>
        <el-table-column prop="address" label="数据类型" width="120"> </el-table-column>
        <el-table-column prop="address" label="数据长度" width="120"> </el-table-column>
        <el-table-column prop="address" label="数据字典项" width="140"> </el-table-column>
        <el-table-column prop="address" label="默认值" width="120"> </el-table-column>
        <el-table-column prop="address" label="共享属性" width="130"> </el-table-column>
        <el-table-column prop="address" label="共享条件" width="130"> </el-table-column>
        <el-table-column prop="address" label="开放属性" width="130"> </el-table-column>
        <el-table-column prop="address" label="是否主键" width="120"> </el-table-column>
        <el-table-column prop="address" label="是否可为空" width="120"> </el-table-column>
        <el-table-column prop="address" label="数据对象" width="120"> </el-table-column>
        <el-table-column prop="address" label="数据级别" width="120"> </el-table-column>
        <el-table-column prop="address" label="字段描述"> </el-table-column>
      </el-table>

      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsmarg">
        <el-tab-pane label="库表" name="first">
          <el-form :inline="true" ref="form" label-width="190px" label-position="left" class="elfromweit">
            <el-form-item class="fromfont" label="数据格式：">
              <p class="frompfont">数据库/mysql</p>
            </el-form-item>
            <el-form-item class="fromfont" label="信息资源代码：">
              <p class="frompfont">17987618313</p>
            </el-form-item>
            <el-form-item class="fromfont" label="是否引用上级：">
              <p class="frompfont">否</p>
            </el-form-item>
            <el-form-item class="fromfont" label="引用信息资源编码：">
              <p class="frompfont">暂无</p>
            </el-form-item>
          </el-form>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{ background: '#ECF1FF', color: '#333333' }"
            @selection-change="handleSelectionChange"
            class="tablemargin"
          >
            <el-table-column type="index" label="序号" width="50"> </el-table-column>
            <el-table-column prop="name" label="信息项名称" width="200"> </el-table-column>
            <el-table-column prop="name" label="字段名称" width="220"> </el-table-column>
            <el-table-column prop="address" label="数据类型" width="180"> </el-table-column>
            <el-table-column prop="address" label="数据长度" width="180"> </el-table-column>
            <el-table-column prop="address" label="共享类型" width="180"> </el-table-column>
            <el-table-column prop="address" label="是否主键" width="180"> </el-table-column>
            <el-table-column prop="address" label="数据项对比"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="接口" name="second">
          <el-form :inline="true" ref="form" label-width="190px" label-position="left" class="elfromweit">
            <el-form-item class="fromfont" label="信息资源代码：">
              <p class="frompfont">17987618313</p>
            </el-form-item>
            <el-form-item class="fromfont" label="数源应用系统：">
              <p class="frompfont">暂无</p>
            </el-form-item>
            <el-form-item class="fromfont" label="请求方法：">
              <p class="frompfont">POST</p>
            </el-form-item>
            <el-form-item class="fromfont" label="请求数据类型：">
              <p class="frompfont">JSON</p>
            </el-form-item>
            <el-form-item class="fromfont" label="接口地址：">
              <p class="frompfont">https//interface.yuh</p>
            </el-form-item>
          </el-form>
          <p class="jibenxinxi">请求参数</p>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{ background: '#ECF1FF', color: '#333333' }"
            @selection-change="handleSelectionChange"
            class="tablemargin"
          >
            <el-table-column prop="name" label="参数名称" width="200"> </el-table-column>
            <el-table-column prop="name" label="是否必填" width="200"> </el-table-column>
            <el-table-column prop="address" label="类型" width="200"> </el-table-column>
            <el-table-column prop="address" label="默认值" width="180"></el-table-column>
            <el-table-column prop="address" label="描述" width="200"></el-table-column>
            <el-table-column prop="address" label="参数位置"> </el-table-column>
          </el-table>
          <p class="jibenxinxi">参数</p>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{ background: '#ECF1FF', color: '#333333' }"
            @selection-change="handleSelectionChange"
            class="tablemargin"
          >
            <el-table-column prop="name" label="参数名称" min-width="12%"> </el-table-column>
            <el-table-column prop="name" label="是否必填" min-width="12%"> </el-table-column>
            <el-table-column prop="address" label="类型" min-width="12%"> </el-table-column>
            <el-table-column prop="address" label="默认值" min-width="8%"></el-table-column>
            <el-table-column prop="address" label="描述" min-width="56%"></el-table-column>
          </el-table>
          <p class="jibenxinxi">请求示例</p>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"> </el-input>
          <p class="jibenxinxi">返回示例</p>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"> </el-input>
        </el-tab-pane>

        <el-tab-pane label="数据详情" name="third">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="{ background: '#ECF1FF', color: '#333333' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="name" label="车辆牌照" width="190"> </el-table-column>
            <el-table-column prop="name" label="车辆编码" width="190"> </el-table-column>
            <el-table-column prop="address" label="车辆型号" width="190"> </el-table-column>
            <el-table-column prop="address" label="车辆长度" width="190"> </el-table-column>
            <el-table-column prop="address" label="使用人" width="200"> </el-table-column>
            <el-table-column prop="address" label="价格" width="150"> </el-table-column>
            <el-table-column prop="address" label="购买年限" width="150"> </el-table-column>
            <el-table-column prop="address" label="状态" width="140"> </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CatalogingDetails',
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      activeName: 'first'
    }
  }
}
</script>

<style lang="less" scoped>
.el-select {
  /deep/.el-input {
    display: flex;
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
.jibentop {
  font-size: 14px;
  margin: 0 0 5px 0;
  font-weight: 700;
}
[data-v-1bb83b75] .el-divider {
  margin: 0 0 10px 0;
}
.cardping {
  padding: 10px 20px;
}
.toptitlflex {
  display: flex;
}
.ptoptitle {
  font-size: 14px;
  margin-right: 40px;
  font-weight: 700;
}
.tagmarg {
  margin-right: 16px;
  font-size: 12px;
}
.pshuywei {
  //   width: 150px;
  margin-right: 60px;
}
.phnk {
  display: inline;
  height: 29px;
  font-size: 14px;
  line-height: 29px;
}
.divfadflex {
  display: flex;
}
.divtitlflex {
  display: flex;
  flex-direction: column;
}
.divtilemarg {
  margin-right: 123px;
}
.divfadmarg {
  margin-top: 20px;
}
.divbluemarg {
  margin-top: 20px;
}
.spanbluemarg {
  font-size: 14px;
  margin-right: 20px;
  color: royalblue;
}

.jibenxinxi {
  font-size: 14px;
  font-weight: 700;
  margin: 30px 0 5px 0;
}
::v-deep .el-form-item__label {
  font-size: 14px;
}
::v-deep .el-tabs__item {
  font-size: 14px;
  color: #333333;
}
.frompfont {
  font-size: 14px;
  color: #777777;
}
.fromfont {
  margin: 0;
  width: 400px;
  height: 40px;
}
.elfromweit {
  width: 800px;
  // margin-top: 10px;
}
.tabsmarg {
  margin-top: 40px;
}
.tablemargin {
  margin-top: 20px;
}
</style>
