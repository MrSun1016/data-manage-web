<template>
  <div>
    <div v-if="dataList.apiList != null" id="CataloguePort">
      <div class="info-top">
        <span class="info-top-title">信息资源代码：</span><span class="matter">{{ catalogDataDetails.catalogCode || '-' }}</span
        ><span class="info-top-title">数源应用系统：</span
        ><span style="color: #777777">{{ dataList.sourceSystem || '-' }}</span>
        <div class="port-address">
          <span class="info-top-title">接口地址：</span>
          <span style="color: #777777">{{ shareApiInfo.apiAddress || '-' }}</span>
        </div>
        <span class="info-top-title">请求方法：</span>
        <span class="matter">{{ shareApiInfo.requestMode || '-' }}</span>
        <span class="info-top-title">请求数据类型：</span>
        <span style="color: #777777">{{ shareApiInfo.requestType || '-' }}</span>
      </div>
      <!-- 请求参数 -->
      <div class="require-params">
        <div style="margin: 14px 0; color: #000">请求参数</div>
        <el-table :data="shareApiInfo.parameterList" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }">
          <el-table-column prop="parameterName" label="参数名称">
                <template slot-scope="{ row }">
                  {{ row.parameterName || '-' }}
                </template>
              </el-table-column>
          <!-- <el-table-column prop="required" label="是否必填">
            <template slot-scope="{ row }">
              {{ row.required == '1' ? '否' : '是' || '-' }}
            </template>
          </el-table-column> -->
          <el-table-column prop="required" label="是否必填">
                <template slot-scope="{ row }">
                  {{ row.required || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="parameterType" label="类型">
                <template slot-scope="{ row }">
                  {{ row.parameterType || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值">
                <template slot-scope="{ row }">
                  {{ row.defaultValue || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="describetion" label="描述">
                <template slot-scope="{ row }">
                  {{ row.describetion || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="parameterLocation" label="参数位置">
                <template slot-scope="{ row }">
                  {{ row.parameterLocation || '-' }}
                </template>
              </el-table-column>
        </el-table>
      </div>
      <!-- 返回参数 -->
      <div class="return-params">
        <div style="margin: 14px 0; color: #000">返回参数</div>
        <el-table :data="shareApiInfo.parameteReturnList" :header-cell-style="{ background: '#E6F7FF', color: '#333333' }">
          <el-table-column prop="parameterName" label="参数名称">
                <template slot-scope="{ row }">
                  {{ row.parameterName || '-' }}
                </template>
              </el-table-column>
          <!-- <el-table-column prop="required" label="是否必填">
            <template slot-scope="{ row }">
              {{ row.required == '1' ? '否' : '是' || '-' }}
            </template>
          </el-table-column> -->
          <el-table-column prop="required" label="是否必填">
                <template slot-scope="{ row }">
                  {{ row.required || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="parameterType" label="类型">
                <template slot-scope="{ row }">
                  {{ row.parameterType || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值">
                <template slot-scope="{ row }">
                  {{ row.defaultValue || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="describetion" label="描述">
                <template slot-scope="{ row }">
                  {{ row.describetion || '-' }}
                </template>
              </el-table-column>
              <el-table-column prop="parameterLocation" label="参数位置">
                <template slot-scope="{ row }">
                  {{ row.parameterLocation || '-' }}
                </template>
              </el-table-column>
        </el-table>
      </div>
      <!-- 请求示例 -->
      <div class="require-example" style="padding: 0 32px">
        <p style="margin: 24px 0; color: #000000">请求示例</p>
        <el-input type="textarea" :rows="3" v-model="shareApiInfo.requestExample" :disabled="true"> </el-input>
      </div>
      <div class="return-example" style="padding: 0 32px 32px 32px">
        <p style="margin: 24px 0; color: #000000">返回示例</p>
        <el-input type="textarea" :rows="3" v-model="shareApiInfo.returnExample" :disabled="true"> </el-input>
      </div>
    </div>
    <div v-else style="text-align: center; padding: 12px 0 24px 0">暂无数据</div>
  </div>
</template>

<script>
export default {
  props: ['catalogDataDetails','shareApiInfo'],
  name: 'CataloguePort',
  data() {
    return {
      textarea: '',
      dataList: [],
      parameterList: [],
      parameteReturnList: [],
      requestExample: '',
      returnExample: '',
    }
  },
  watch: {
    catalogDataDetails(newVal) {
      this.dataList = newVal
      if (newVal.apiList != null) {
        this.parameterList = newVal.apiList[0].parameterList
        this.parameteReturnList = newVal.apiList[0].parameteReturnList
        this.requestExample = newVal.apiList[0].requestExample
        this.returnExample = newVal.apiList[0].returnExample
      }
    },
  },
}
</script>

<style lang="less" scoped>
#CataloguePort {
  .info-top {
    padding: 0 32px;
    .port-address {
      margin: 18px 0;
    }
    .info-top-title {
      display: inline-block;
      width: 150px;
      color: #333333;
    }
    .matter {
      display: inline-block;
      width: 350px;
      color: #777777;
    }
  }
  .require-params {
    padding: 0 32px;
  }
  .return-params {
    padding: 0 32px;
  }
}
</style>