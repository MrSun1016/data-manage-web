<template>
  <div>
    <div id="dataCatalogue">
      <div class="dataCatalogue-box">
        <el-form :model="datas" ref="dataCatalogue" class="demo-ruleForm">
          <p class="title2">基本信息</p>
          <div class="formItem">
            <el-col :span="12">
              <el-form-item class="data-items" label="信息资源名称：">
                <p class="items">{{ datas.catalogName || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="信息资源英文名称：">
                <p class="items">{{ datas.catalogEn || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="数源单位：">
                <p class="items">{{ datas.sourceUnit || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="数源应用系统：">
                <p class="items">{{ datas.sourceSystem || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="更新频率：">
                <p class="items">{{ datas.updateFrequency || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="数据格式：">
                <p class="items">{{ datas.dataFormat || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="共享类型：">
                <p class="items">{{ datas.shareType || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="共享条件：">
                <p class="items">{{ datas.shareCondition || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="开放类型：">
                <p class="items">{{ datas.openType || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="是否对社会开放：">
                <p class="items">{{ datas.openSociety || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="重点领域分类：">
                <p class="items">{{ datas.keyAreasType || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="data-items" label="重点领域分类备注：">
                <p class="items">{{ datas.keyAreasRemark || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="data-items" label="信息资源摘要：">
                <p class="items">{{ datas.informationSummary || '' }}</p>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item class="data-items" label="业务责任科室：">
                <p class="items">{{ datas.businessDepartment || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="data-items" label="业务责任人：">
                <p class="items pItemwei">{{ datas.businessPerson || '-' }}</p>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="data-items" label="联系方式：">
                <p class="items">{{ datas.contactInformation || '-' }}</p>
              </el-form-item>
            </el-col>
          </div>
          <p class="title2">服务事项</p>
          <div class="formItem">
            <el-col :span="24" style="padding-left: 0 !important">
              <el-form-item class="data-items" label="是否关联政务服务事项：">
                <p class="items">{{ datas.relatedGovernment || '-' }}</p>
              </el-form-item>
            </el-col>
          </div>
          <p class="title2">基础库/专题库</p>
          <div class="formItem">
            <el-form-item style="margin-left: 8px" class="data-items" label="是否关联基础库/专题库：">
              <p class="items">{{ datas.baseLibrary || '-' }}</p>
            </el-form-item>
          </div>
          <p class="title2">数据项信息</p>
          <el-form-item>
            <!-- 数据项表格 -->
            <el-col id="dataItemInfo" empty-text style="padding-left: 0 !important; padding-right: 0 !important">
              <el-table :data="datas.dataList" :header-cell-style="{ background: '#ebeef0' }">
                <el-table-column prop="name" label="中文名称">
                  <template slot-scope="{ row }">
                    {{ row.name || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="enName" label="英文名称">
                  <template slot-scope="{ row }">
                    {{ row.enName || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="dataLength" label="数据长度">
                  <template slot-scope="{ row }">
                    {{ row.dataLength }}
                  </template>
                </el-table-column>
                <el-table-column prop="shareProperty" label="共享属性">
                  <template slot-scope="{ row }">
                    {{ row.shareProperty || '-' }}
                  </template>
                </el-table-column>

                <el-table-column prop="openAttribute" label="开放属性">
                  <template slot-scope="{ row }">
                    {{ row.openAttribute || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="primaryKey" label="是否主键">
                  <template slot-scope="{ row }">
                    {{ row.primaryKey || '-' }}
                  </template>
                </el-table-column>
                <el-table-column prop="nullValue" label="是否可为空" width="120px">
                  <template slot-scope="{ row }">
                    {{ row.nullValue || '-' }}
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewDirectory',
  props: {
    datas: {
      type: Object
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.dataCatalogue-box {
  width: 100%;
  background: #f8fafb;
  // .demo-ruleForm {
  //   padding: 24px;
  // }
  .form-item {
    padding: 0 24px !important;
  }
  .title {
    color: #333333;
    font-size: 14px;
    font-weight: 500;
    padding: 14px;
    // padding: 20px 0 0 40px;
  }
  .title1 {
    margin-left: 10px;
  }
  // .data-items {
  //   width: ;
  //   // display: flex;
  // }
  .items {
    color: #777777;
  }
  .conceal {
    width: 456px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.conceal1 {
  width: 140px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/deep/.el-col {
  padding: 0 12px !important;
  // padding-left: 10px !important;
}
/deep/.el-form-item {
  margin-bottom: 0px !important;
}
.pItemwei {
  // display: flex;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
