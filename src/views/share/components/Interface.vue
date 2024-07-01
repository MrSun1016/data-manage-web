<template>
  <div>
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="接口信息" name="joggle">
        <div id="CataloguePort">
          <div class="info-top">
            <div class="port-address">
              <span class="info-top-title">接口地址：</span>
              <span style="color: #777777">{{ shareApiInfo.apiAddress || '-' }}</span>
            </div>
            <div class="port-address">
              <span class="info-top-title">请求数据类型：</span>
              <span class="matter">{{ shareApiInfo.requestType || '-' }}</span>
            </div>
            <div class="port-address">
              <span class="info-top-title">请求方法：</span>
              <span style="color: #777777">{{ shareApiInfo.requestMode || '-' }}</span>
            </div>
          </div>
          <!-- 请求参数 -->
          <div class="require-params">
            <div style="margin: 14px 0; color: #000; fontweight: 600">请求参数</div>
            <el-table
              :data="shareApiInfo.parameterList"
              :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
            >
              <el-table-column prop="parameterName" label="参数名称">
                <template slot-scope="{ row }">
                  {{ row.parameterName || '-' }}
                </template>
              </el-table-column>
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
            <div style="margin: 14px 0; color: #000; fontweight: 600">返回参数</div>
            <el-table
              :data="shareApiInfo.parameteReturnList"
              :header-cell-style="{ background: '#E6F7FF', color: '#333333' }"
            >
              <el-table-column prop="parameterName" label="参数名称">
                <template slot-scope="{ row }">
                  {{ row.parameterName || '-' }}
                </template>
              </el-table-column>
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
            <el-input disabled type="textarea" :rows="3" v-model="shareApiInfo.requestExample"> </el-input>
          </div>
          <div class="return-example" style="padding: 0 32px 32px 32px">
            <p style="margin: 24px 0; color: #000000">返回示例</p>
            <el-input disabled type="textarea" :rows="3" v-model="shareApiInfo.returnExample"> </el-input>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="授权信息" name="grant">
        <div class="content-left leftmargin">
          <div class="left-title" style="color: #333333">
            <p class="items">token信息：</p>
          </div>
          <div class="right-info" style="width: 300px">
            <p class="items-info" v-if="authorizatioInfo.tokenInfo">{{authorizatioInfo.tokenInfo ||'-'}}</p>
            <p v-else>-</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {getAuthorizeInfo} from '@/api/api'
export default {
  name: 'Interface',
  props: ['shareApiInfo'],
  data() {
    return {
      activeName: 'joggle',
      authorizatioInfo:{},
      apiName: '',
      applyId:'',
    }
  },
  methods: {
    handleClick() {},
  },
  mounted(){
     this.applyId = this.$route.query.applyId
  },
  watch: {
    shareApiInfo: {
      handler(newValue) {
        this.apiName = newValue.apiName
        getAuthorizeInfo(this.apiName,this.applyId).then(res=>{
          if(res.success){
            this.authorizatioInfo = res.body[0]
          }
        })
      },
      deep: true,
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.el-tabs__nav-scroll {
  padding: 0 32px;
}
/deep/.el-tabs__nav-wrap::after {
  border-bottom: 1px solid #1890ff;
}
/deep/.el-tabs__item {
  height: 60px;
  font-weight: 600;
}
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
      width: 240px;
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
.content-left {
  display: flex;
  padding: 16px 32px 200px 32px;
  .items {
    width: 180px;
  }
}
</style>
