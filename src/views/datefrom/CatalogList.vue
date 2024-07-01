<template>
  <div>
    <!-- 数据编目--编目列表 -->
    <!-- 编目列表 -->
    <div v-show="!isshowHaredetails">
      <el-card class="box-card cardping">
        <!-- 头部input框 -->
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          :hide-required-asterisk="true"
          class="demo-form-inline faderfrom"
          size="small"
          @keyup.enter.native="submitForm"
        >
          <div class="divffromflex">
            <el-form-item label="编目名称" prop="catalogName" class="topfromitem">
              <el-input size="small" v-model="formInline.catalogName" placeholder="请输入" class="aitemml"></el-input>
            </el-form-item>

            <el-form-item label="应用系统" class="topfromitem" prop="sourceSystem">
              <el-select filterable
                v-model="formInline.sourceSystem"
                size="small"
                ref="sourceSystem"
                @keydown.enter.native="disableVisible"
                clearable
                placeholder="请选择"
                class="aitemml"
              >
                <el-option
                  :label="source.appName"
                  :value="source.appName"
                  v-for="(source, index) in sourceList"
                  :key="source.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数源单位" prop="sourceUnit">
              <el-select
                ref="sourceUnit"
                @keydown.enter.native="disableVisible"
                v-model="formInline.sourceUnit"
                filterable
                size="small"
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
            <el-form-item label="编目状态" class="topfromitem" prop="status">
              <el-select
                v-model="formInline.status"
                size="small"
                ref="status"
                @keydown.enter.native="disableVisible"
                clearable
                placeholder="请选择"
                class="aitemml"
              >
                <el-option
                  :label="cataloging.text"
                  :value="cataloging.value"
                  v-for="cataloging in datefromList.catalogingStatus"
                  :key="cataloging.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="目录状态" class="topfromitem" prop="cataStatus">
              <el-select
                v-model="formInline.cataStatus"
                ref="cataStatus"
                @keydown.enter.native="disableVisible"
                size="small"
                clearable
                placeholder="请选择"
                class="aitemml"
              >
                <el-option
                  :label="catalogue.text"
                  :value="catalogue.value"
                  v-for="catalogue in datefromList.catalogueList"
                  :key="catalogue.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归集状态" prop="imputationStatus">
              <el-select
                ref="imputationStatus"
                @keydown.enter.native="disableVisible"
                v-model="formInline.imputationStatus"
                size="small"
                clearable
                placeholder="请选择"
                class="aitemml"
              >
                <el-option
                  :label="aggre.text"
                  :value="aggre.value"
                  v-for="aggre in datefromList.aggregate"
                  :key="aggre.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="fromflexrig">
            <el-form-item class="fromweizhi">
              <el-button type="text" size="mini" @click="isSearch = !isSearch"
                >高级搜索<i :class="isSearch ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i
              ></el-button>
              <el-button size="small" type="primary" @click="submitForm()" class="butfromccwei1">查询</el-button>
              <el-button size="small" @click="resetForm('formInline')" class="butfromccwei">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>

      <el-card class="cardmargintop">
        <!-- 新增... -->
        <div class="tjdiv">
          <el-button type="primary" class="addweihei" v-has="'iscatalog:newData'" @click="addshowModify"
            ><i class="el-icon-plus"></i> 新增</el-button
          >
          <el-dropdown trigger="click" class="piliangfz">
            <el-button type="text" class="piliangbut">
              批量操作 <i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="buttblok" @click.native="OffShelfList" v-has="'iscatalog:shelvesInBatches'"
                >下架申请</el-dropdown-item
              >
              <el-dropdown-item class="buttblok" @click.native="isShowBatchShelf" v-has="'iscatalog:batchListing'"
                >上架申请</el-dropdown-item
              >
              <el-dropdown-item class="buttblok" @click.native="isShowExcleLeadingin" v-has="'iscatalog:batchImport'"
                >批量导入</el-dropdown-item
              >
              <el-dropdown-item class="buttblok" @click.native="isShowBatchExport" v-has="'iscatalog:batchExport'"
                >批量导出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-button class="yinyongwei">引 用</el-button> -->
        </div>

        <!-- 多选表格列表 -->
        <el-table
          :header-cell-style="{
            background: '#E6F7FF',
            fontWeight: '600',
            color: '#333333',
            fontSize: '14px',
          }"
          :data="tableData"
          v-loading="tableloading"
          @selection-change="handleSelect"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="selection" align="center" width="50px"> </el-table-column>
          <el-table-column label="编目名称"  width="180px">
            <template slot-scope="{ row }">
             <el-tooltip class="over-item" :content=row.catalogName placement="top">
                <el-button type="text" class="itemSlotheden2" @click="cloneHaredetails(row)">{{ row.catalogName || '-'   }}</el-button>
                <!-- <span style="color:#409EFF;" @click="cloneHaredetails(row)">{{ row.catalogName || '-'   }}</span> -->
              </el-tooltip>
              
            </template>
          </el-table-column>
          <el-table-column prop="sourceSystem" label="应用系统"> </el-table-column>
          <el-table-column prop="sourceUnit" label="数源单位"> </el-table-column>
          <el-table-column label="编目状态">
            <template slot-scope="{ row }">
              <!-- background-color: #ff0800; -->
              <div class="yuancolor1" v-show="row.catalogStatuStr == '已提交待审核'"></div>
              <div class="yuancolor2" v-show="row.catalogStatuStr == '审核不通过'"></div>
              <div class="yuancolor3" v-show="row.catalogStatuStr == '审核通过'"></div>
              <!-- <span>{{ statusbtn(row.catalogStatus) }}</span> -->
              <span>{{ row.catalogStatuStr }}</span>
            </template>
          </el-table-column>
          <el-table-column label="目录状态">
            <template slot-scope="{ row, $index }">
              <div class="yuancolor1" v-show="row.cataStatuStr == '未上架'"></div>
              <div class="yuancolor1" v-show="row.cataStatuStr == '上架中'"></div>
              <div class="yuancolor1" v-show="row.cataStatuStr == '下架中'"></div>
              <div class="yuancolor1" v-show="row.cataStatuStr == '下架共享待关闭'"></div>
              <div class="yuancolor1" v-show="row.cataStatuStr == '下架失败'"></div>
              <div class="yuancolor1" v-show="row.cataStatuStr == '删除共享待关闭'"></div>
              <div class="yuancolor2" v-show="row.cataStatuStr == '已下架'"></div>
              <div class="yuancolor2" v-show="row.cataStatuStr == '上架失败'"></div>
              <div class="yuancolor3" v-show="row.cataStatuStr == '已上架'"></div>
              <div class="yuancolor4" v-show="row.cataStatuStr == '已删除'"></div>
              <!-- <span>{{ catastatusbtn(row.cataStatus) }}</span> -->
              <span>{{ row.cataStatuStr }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="imputationStatuStr" label="归集状态">
            <template slot-scope="{ row, $index }">
              <div class="yuancolor2" v-show="row.imputationStatuStr == '未归集'"></div>
              <div class="yuancolor3" v-show="row.imputationStatuStr == '已归集'"></div>
              <span>{{ row.imputationStatuStr }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="delFlag  " label="状态">
            <template slot-scope="{ row, $index }">
              <div class="yuancolor2" v-show="row.delFlag == '1'"></div>
              <div class="yuancolor3" v-show="row.delFlag == '0'"></div>
              <span v-show="row.delFlag == '1'">已删除</span>
              <span v-show="row.delFlag == '0'">未删除</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="230px">
            <template slot-scope="{ row, $index }">
              <div>
                <el-button
                  class="tabbutsize"
                  type="text"
                  :disabled="
                    row.cataStatuStr == '上架中' ||
                    row.cataStatuStr == '下架失败' ||
                    row.cataStatuStr == '下架中' ||
                    row.catalogStatuStr == '已提交待审核'
                  "
                  v-has="'iscatalog:Update'"
                  @click="showUpdateAdd(row)"
                  >编辑</el-button
                >
                <!-- row.cataStatuStr == '上架失败' || -->
                <!-- row.catalogStatuStr == '审核不通过' -->
                <el-button
                  type="text"
                  class="wbutcol tabbutsize"
                  :disabled="
                    !(
                      (row.catalogStatuStr == '审核通过' && row.cataStatuStr == '未上架') ||
                      (row.catalogStatuStr == '审核通过' && row.cataStatuStr == '上架失败')
                    )
                  "
                  v-has="'iscatalog:listingApplication'"
                  @click="submitApplication(row)"
                  >上架申请</el-button
                >
                <el-button
                  type="text"
                  class="wbutcol tabbutsize"
                  :disabled="
                    !(
                      (row.catalogStatuStr == '审核通过' && row.cataStatuStr == '已上架') ||
                      (row.catalogStatuStr == '审核通过' && row.cataStatuStr == '下架失败')
                    )
                  "
                  v-has="'iscatalog:lowerShelf'"
                  @click="OffShelf(row)"
                  >下架申请</el-button
                >
                <!-- <el-button type="text" class="wbutcol tabbutsize" :disabled="row.cataStatuStr != '已上架'" @click="OffShelf(row)">下架申请</el-button> -->
                <el-dropdown trigger="click" class="piliangfzwei">
                  <el-button type="text"> 更多 <i class="el-icon-arrow-down"></i> </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      class="buttblok"
                      v-has="'iscatalog:directoryLog'"
                      @click.native="isShowCatalogingLog(row)"
                      >目录日志</el-dropdown-item
                    >
                    <el-dropdown-item
                      class="buttblok"
                      v-has="'iscatalog:delete'"
                      @click.native="deleteItemId(row)"
                      :disabled="row.cataStatuStr == '删除共享待关闭' || row.cataStatuStr == '已删除'"
                      v-if="newDepa.orgCode==='A000A056'"
                      >删除</el-dropdown-item
                    >

                    <el-dropdown-item
                      class="buttblok"
                      v-has="'iscatalog:recovery'"
                      @click.native="processitem(row)"
                      :disabled="!(row.cataStatuStr == '删除共享待关闭' || row.cataStatuStr == '已删除')"
                      v-if="newDepa.orgCode==='A000A056'"
                      >恢复</el-dropdown-item
                    >
                    <el-dropdown-item class="buttblok" v-has="'iscatalog:copy'" @click.native="copydatafromitem(row)"
                      >复制</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <!-- 
        size-change: pageSize(每页条数)改变时会触发
        current-change:currentPage(当前页)改变时会触发
       -->
        <el-pagination
          class="pagination"
          background
          :current-page="formInline.pageNum"
          :page-size="formInline.pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          :pager-count="5"
          layout="->,total, prev, pager, next, sizes, jumper"
          @size-change="handleSizeChange"
          @current-change="getRoles"
        >
        </el-pagination>
        <!-- 点击出现弹窗 -->
        <!-- 批量操作----批量导出 -->
        <el-dialog title="批量导出" :visible.sync="isBatchExport" width="60%">
          <el-divider></el-divider>
          <div class="dialogmarg">
            <span class="checkboxsize">信息资源字段</span>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="indexhandleCheckAllChange"
              >全选</el-checkbox
            >
            <el-form :inline="true" label-width="25px" class="fromcheckboxmarg">
              <el-form-item label="">
                <el-checkbox-group v-model="indexcheckedCities" @change="indexhandleCheckedChange">
                  <el-checkbox
                    v-for="city in indexcities"
                    :label="city.columnName"
                    :key="city.columnComment"
                    class="checkboxwei"
                    >{{ city.columnComment }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <span class="checkboxsize">信息项字段</span>
            <el-checkbox :indeterminate="DataisIndeterminate" v-model="DatacheckAll" @change="datahandleCheckAllChange"
              >全选</el-checkbox
            >
            <el-form :inline="true" label-width="25px" class="fromcheckboxmarg">
              <el-form-item label="" class="fromcheckboxitem">
                <el-checkbox-group v-model="datacheckedCities" @change="datahandleCheckedChange">
                  <el-checkbox
                    v-for="city2 in datacities"
                    :label="city2.columnName"
                    :key="city2.columnComment"
                    class="checkboxwei"
                    >{{ city2.columnComment }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeExport" class="quxioamarg">取 消</el-button>
            <el-button size="small" type="primary" @click="postBatchExport">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 下架申请的弹窗 -->
        <el-drawer
          title="申请下架"
          :visible.sync="dialog"
          direction="rtl"
          custom-class="demo-drawer"
          :before-close="handleClose"
          ref="drawer"
          size="37%"
          v-if="dialog"
        >
          <div class="drawerdivposi">
            <el-divider></el-divider>

            <el-form :model="shelfForm" ref="shelfForm" :rules="ShelfRules">
              <el-table :data="shelfForm.ofTheShelf" style="width: 100%" :show-header="false">
                <el-table-column prop="selectName" width="220">
                  <template slot-scope="{ row, $index }">
                    <el-form-item>
                      <el-tooltip :disabled="showTooltip" :content="`${row.selectName}下架申请：`" placement="top">
                        <p ref="tooltipBox" class="tem-title item-info conceal1">
                          <span class="selectList">{{ row.selectName }}下架申请：</span>
                        </p>
                      </el-tooltip>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="offShelfMessage" width="250">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'ofTheShelf.' + $index + '.offShelfMessage'"
                      :rules="ShelfRules.offShelfMessage"
                    >
                      <el-select v-model="row.offShelfMessage" size="small" placeholder="请选择">
                        <el-option
                          :label="early.text"
                          :value="early.text"
                          v-for="early in datefromList.earlywarning"
                          :key="early.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <el-upload
              class="upload-demo"
              action="/dtwave-om/api/file/upload"
              :data="fileName1"
              :limit="1"
              :headers="headerObj"
              :on-error="xiaHandleExceed"
              :on-success="fileSuccess"
              :on-change="handleChange"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div class="uploaddivsize">
              点击
              <span class="uploadspancolor" style="cursor: pointer; color: #589df8" @click="onDownload">模版 </span
              >下载数据目录下架单模版，申请单审批盖章后上传
            </div>
          </div>
          <div class="demo-drawer__footer drawerfooter">
            <el-button
              type="primary"
              size="small"
              class="drawerfooterbut"
              :disabled="loadDrawer"
              :loading="loadDrawer"
              @click="closeDrawer"
              >{{ loadDrawer ? '提交中...' : '确 认' }}</el-button
            >
            <el-button size="small" @click="cancelForm">取 消</el-button>
          </div>
        </el-drawer>
        <!-- 单个下架申请的弹窗 -->
        <el-drawer
          title="申请下架"
          :visible.sync="dialogItem"
          direction="rtl"
          custom-class="demo-drawer"
          :before-close="handleClose"
          ref="drawer"
          size="40%"
          v-if="dialogItem"
        >
          <div class="drawerdivposi">
            <el-divider></el-divider>

            <el-form :model="shelfItemForm" ref="shelfItemForm" :rules="ShelfItemRules">
              <el-table :data="shelfItemForm.ofTheShelfItem" style="width: 100%" :show-header="false">
                <el-table-column prop="selectName" width="240">
                  <template slot-scope="{ row, $index }">
                    <el-form-item>
                      <el-tooltip :disabled="showTooltip" :content="`${row.selectName}下架申请：`" placement="top">
                        <p ref="tooltipBox" class="tem-title item-info conceal1">
                          <span class="selectList">{{ row.selectName }}下架申请：</span>
                        </p>
                      </el-tooltip>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column prop="offShelfMessage" label="" width="250">
                  <template slot-scope="{ row, $index }">
                    <el-form-item
                      :prop="'ofTheShelfItem.' + $index + '.offShelfMessage'"
                      :rules="ShelfItemRules.offShelfMessage"
                    >
                      <el-select v-model="row.offShelfMessage" size="small" placeholder="请选择">
                        <el-option
                          :label="early.text"
                          :value="early.text"
                          v-for="early in datefromList.earlywarning"
                          :key="early.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
              </el-table>
            </el-form>

            <el-upload
              class="upload-demo"
              action="/dtwave-om/api/file/upload"
              :data="fileName1"
              :limit="1"
              :headers="headerObj"
              :on-error="xiaHandleExceed"
              :on-success="fileSuccess"
              :on-change="handleChange"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <div class="uploaddivsize">
              点击
              <span class="uploadspancolor" style="cursor: pointer; color: #589df8" @click="onDownload">模版 </span
              >下载数据目录下架单模版，申请单审批盖章后上传
            </div>
          </div>
          <div class="demo-drawer__footer drawerfooter">
            <el-button
              type="primary"
              size="small"
              class="drawerfooterbut"
              :disabled="loadDrawer"
              :loading="loadDrawer"
              @click="closeDrawer"
              >{{ loadDrawer1 ? '提交中...' : '确 认' }}</el-button
            >
            <el-button size="small" @click="cancelFormItem">取 消</el-button>
          </div>
        </el-drawer>

        <!-- 点击删除 -->
        <el-dialog title="提示" :visible.sync="deleteVisible" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认删除该目录？</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false" class="deletmarg">取 消</el-button>
            <el-button type="primary" @click="deleteBatch">删 除</el-button>
          </span>
        </el-dialog>
        <!-- 点击恢复 -->
        <el-dialog title="提示" :visible.sync="processVisible" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认恢复该目录？</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="processVisible = false" class="deletmarg">取 消</el-button>
            <el-button type="primary" @click="processHuiFu">恢 复</el-button>
          </span>
        </el-dialog>

        <!-- 批量上架 -->
        <el-dialog title="提示" :visible.sync="isBatchShelf" width="30%">
          <el-divider class="dividerhrcol"></el-divider>
          <p class="dialogcenter"><i class="el-icon-info iconcolor"></i> 是否确认批量上架</p>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="isBatchShelf = false" class="deletmarg">取 消</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="ReleaseList"
              :loading="ReleaseList"
              @click="submitReleaseList"
              >{{ ReleaseList ? '提交中...' : '确认' }}</el-button
            >
          </span>
        </el-dialog>

        <!-- 上架申请 -->
        <el-dialog title="上架申请" :visible.sync="releaseApplication" width="30%">
          <el-divider></el-divider>
          <p class="dialogcenter">是否确认上架?</p>
          <span slot="footer" class="dialog-footer">
            <el-button @click="releaseApplication = false" size="small" class="deletmarg">取 消</el-button>
            <el-button
              type="primary"
              size="small"
              :disabled="loadRelease"
              :loading="loadRelease"
              @click="submitRelease"
              >{{ loadRelease ? '提交中...' : '确认' }}</el-button
            >
          </span>
        </el-dialog>

        <!-- excle导入 -->
        <el-dialog title="Excel导入" :visible.sync="isExcleLeadingin" width="30%">
          <el-divider></el-divider>
          <div class="dialogmarg centerupload">
            <el-upload
              drag
              ref="excleUpload"
              name="file"
              action="/dtwave-om/api/cataLog/importTest"
              accept=".xls,.xlsx"
              :headers="headerObj"
              :on-success="uploadSuccess"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">点击图标选择Excel文件上传</div>
              <div class="el-upload__tip exceluploaddiv" slot="tip">
                点击 <span class="mbcolor" @click="downloadmu" style="cursor: pointer"> 模版 </span> 下载数据目录模版
              </div>
            </el-upload>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeUpdate" class="butonqumarg">取 消</el-button>
            <el-button type="primary" size="small" :disabled="disable" @click="importExcel">{{
              uploading ? '解析中...' : '提交解析'
            }}</el-button>
          </span>
        </el-dialog>
      </el-card>
    </div>
    <!-- 添加或者修改的组件 -->
    <!-- <AddOrModify
      ref="add"
      v-show="isshowModify"
      :sourceList="sourceList"
      @closeModify="closeModify"
      @backSuccess="backSuccess"
    ></AddOrModify> -->
    <!-- @cancelSuccess="cancelSuccess" -->

    <!-- x分享详情x -->
    <!-- 编目详情 -->
    <Sharedetails
      ref="sharedetails"
      v-show="isshowHaredetails"
      @goBack="goBack"
      :visible.sync="isshowHaredetails"
    ></Sharedetails>
    <CatalogingLog ref="catalog" @closeCataloging="closeCataloging"></CatalogingLog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// import CatalogingDetails from '@/views/datefrom/components/CatalogingDetails'
// import ExcelLeadingin from '@/views/datefrom/components/ExcelLeadingin'
import CatalogingLog from '@/views/datefrom/components/CatalogingLog'
import Sharedetails from '@/views/datefrom/components/Sharedetails'
import { Message, MessageBox } from 'element-ui'
import { download } from '@/api/manage'
import { queryUserMassge } from '@/api/api'
import {
  postDataFromList,
  postDataFromPage,
  postdeleteBatch,
  getCataLogDataItem,
  getCataLogIndexItem,
  copyCatalog,
  submitCatalogOffShelf,
  submitCatalogUpShelf,
  processRecovery,
  mechanismTree,
  getDictItems,
  queryAppName,
  queryAllAppName,
} from '@/api/api'

import { getExportXls } from '@/api/department'
export default {
  name: 'Datefrom',
  components: {
    // ExcelLeadingin,
    Sharedetails,
    CatalogingLog,
  },
  data() {
    return {
      // 导入模板
      impTemplate: 'import_template_file_name',
      downloadName: '目录下架申请模板',
      downFileName: '编目导入模板.xlsx',
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value,
      },
      fileName: {
        fileName: '',
      },
      fileName1: {
        fileName: '',
      },
      // 最上面选择框
      // 请求回来的数据存储
      dictionary: {
        // 数源应用系统
        system: 'source_system',
        // 数源单位
        // source: 'source_unit',
        // 编目状态
        status: 'catalog_status',
        // 目录状态
        cata: 'cata_status',
        // 归集状态
        imputation: 'imputation_status',
        // 预警信息下架理由
        earlywarning: 'early_warning_information',
        // 健康码信息下架理由
        health: 'health_code_information',
      },
      // 选中数据的id收集
      formInline: {
        catalogName: '',
        sourceSystem: '',
        sourceUnit: '',
        status: '',
        cataStatus: '',
        imputationStatus: '',
        pageNum: 1,
        pageSize: 10,
        rowStart: 0,
      },
      // 分页器
      // page: 1, // 当前页码
      // limit: 10, // 每页记录数
      total: 0, //总共数据条数

      // 下面的表格list
      dateFromList: [],

      // 增加修改组件
      // isshowModify: false,
      // 点击编辑保存当前的id
      flag: '',

      // 编目详情
      // isshowCataloging: false,

      // 详情
      isshowHaredetails: false, /////

      // 批量操作----批量导出
      isBatchExport: false,
      // 批量上架
      isBatchShelf: false,
      // 批量下架
      isBatchOffShelf: false,

      // 发布申请
      releaseApplication: false,
      loadRelease: false,
      loadDrawer: false,
      loadDrawer1: false,
      ReleaseList: false,
      releaseId: '',

      // 点击删除
      deleteVisible: false,
      // 点击恢复
      processVisible: false,
      processId: '',

      // 下架申请
      table: false,
      dialog: false,
      dialogItem: false,
      // 下架
      shelfForm: {
        ofTheShelf: [
          // {
          //   id: '',
          //   selectName: '', //到对应id的名字
          //   applyFlieName: '', // 文件上传
          //   offShelfMessage: '' // 下架理由
          // }
        ],
      },
      // 单个下架
      shelfItemForm: {
        ofTheShelfItem: [],
      },
      // 数源单位
      citys: [],
      // 上架
      shelf: [],
      // 批量上架
      shelfList: [],
      examine: false,
      // 表格的数据
      tableData: [],
      tableloading: true,

      // 最上面选择框表单验证

      // 表单目录
      selectID: [],
      // 单个删除
      isSelectID: [],

      // 点击批量导出的数据
      indexcities: [],
      indexcheckedCities: [],
      checkAll: false, // 是否全选
      isIndeterminate: false, // 是否是不确定的

      datacities: [],
      datacheckedCities: [],
      DatacheckAll: false, // 是否全选
      DataisIndeterminate: false, // 是否是不确定的
      // 数源应用系统
      sourceList: [],
      // 批量导入
      // excle导入
      isExcleLeadingin: false,
      //文件  上传
      file: '',
      filename: '',
      errmesg: [],
      result: '',
      fileName: '',
      uploading: false,
      disable: true,
      ShelfRules: {
        offShelfMessage: [{ required: true, message: '请选择下架理由', trigger: 'change' }],
      },
      ShelfItemRules: {
        offShelfMessage: [{ required: true, message: '请选择下架理由', trigger: 'change' }],
      },
      // 提示文字
      showTooltip: false,
      // 数据上报
      pagequery: {},
      newDepa: {
        orgCode: '',
      },
      // 高级搜索
      isSearch: false,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.toName == '共享') {
          this.formInline = this.$route.params.formInline
          // console.log(this.$route.params.formInline)
          // console.log(this.formInline)
          let row = this.$route.params.itemId
          // console.log(row)
          this.$nextTick(() => {
            this.getRoles(this.formInline.pageNum)
            this.isshowHaredetails = true
            this.$refs.sharedetails.loading = true
            this.$refs.sharedetails.loading1 = true
            this.$refs.sharedetails.activeName = 'second'
            // this.$refs.sharedetails.activeName = 'first'
            this.$refs.sharedetails.inquireData.catalogId = row
            this.$refs.sharedetails.fetchShareDataPage()
            this.$refs.sharedetails.dateFrom()
            this.$refs.sharedetails.getDetailsLsit(row, this.formInline)
          })
          this.$route.params.toName = ''
          this.$route.params.itemId = ''
          this.$route.params.formInline = ''
        }
        if (
          this.$route.params.toName == '数据上报' ||
          this.$route.params.toName == '接口发布' ||
          this.$route.params.toName == '库表更新' ||
          this.$route.params.toName == '库表更新管理' ||
          this.$route.params.toName == '我的数据'
        ) {
          this.pagequery = this.$route.params.pagequery
          console.log(1, this.pagequery)
          let row = this.$route.params.itemId
          this.$nextTick(() => {
            this.isshowHaredetails = true
            this.$refs.sharedetails.loading = true
            this.$refs.sharedetails.loading1 = true
            this.$refs.sharedetails.activeName = 'first'
            this.$refs.sharedetails.inquireData.catalogId = row
            this.$refs.sharedetails.fetchShareDataPage()
            this.$refs.sharedetails.dateFrom()
            this.$refs.sharedetails.getDetailsLsit(row, this.formInline, this.pagequery)
          })
          // this.$route.params.toName = ''
          this.$route.params.itemId = ''
          this.$route.params.pagequery = ''
        }
      },
    },
  },
  created() {
    this.dictionaryList()
    this.dictionaryItem()
    // this.postaddaDateFromList()
    this.DateFrom()
    this.getRoles()
    this.postCataLogDataItem()
    this.bodyTree()
    this.sourceSystemList()
    this.fetchUserMassge()
    // this.$nextTick(() => this.checkWidth())
  },
  methods: {
    fetchUserMassge() {
      queryUserMassge().then((res) => {
        if (res.success) {
          if (res.body === null) {
            this.newDepa.orgCode = ''
          } else {
            this.newDepa = res.body
          }
          // this.orgCode1 = res.body.orgCode
          // this.departName = res.body.departName
        }
      })
    },
    handleChange(file, fileList) {
      let resFileName = file.name.split('.')
      this.fileName1.fileName = resFileName[0]
    },
    // checkWidth() {
    //   const boxWidth = this.$refs['tooltipBox'].offsetWidth
    //   const itemWidth = this.$refs['tooltipItem'].offsetWidth
    //   this.showTooltip = boxWidth > itemWidth
    // },
    disableVisible() {
      this.$refs.sourceSystem.visible = false
      this.$refs.sourceUnit.visible = false
      this.$refs.status.visible = false
      this.$refs.cataStatus.visible = false
      this.$refs.sourceUnit.visible = false
      this.$refs.imputationStatus.visible = false
    },
    // 数源应用系统
    sourceSystemList() {
      queryAllAppName().then((res) => {
        this.sourceList = res.body
      })
    },
    // 下架模板下载
    dictionaryItem() {
      getDictItems(this.impTemplate).then((res) => {
        // console.log(this.fileName.fileName)
        // 目录下架申请模板
        let downloadName = res.result.find((fileName) => {
          return fileName.text == '目录下架申请模板'
        })
        this.downloadName = `${downloadName.text}.docx`
      })
    },
    onDownload() {
      download({ fileName: this.downloadName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = this.downloadName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.warning('模板导出失败')
        })
    },

    // 目录日志
    isShowCatalogingLog(row) {
      this.$refs.catalog.catalogingItem = true
      this.$refs.catalog.getLogList(row)
    },
    closeCataloging(val) {
      // this.catalogingItem = val
      console.log(val)
    },
    // 数源单位
    bodyTree() {
      mechanismTree().then((res) => {
        if (res.success) {
          // this.citys = res.body.children
          function treeToArr(data, res = []) {
            data.forEach((item) => {
              res.push({
                // pid: pid,
                id: item.id,
                nodeCode: item.nodeCode,
                nodeName: item.nodeName,
                parentId: item.parentId,
              })
              if (item.children && item.children.length !== 0) {
                treeToArr(item.children, res)
              }
            })
            return res
          }
          this.citys = treeToArr(res.body.children)
        }
      })
    },
    uploadSuccess(res, file, fileList) {
      this.fileName = file.name
      if (res.success) {
        this.result = res.success
        this.disable = false
      } else {
        this.isExcleLeadingin = false
        this.$refs.excleUpload.clearFiles()
        this.$message.error(res.message)
      }
    },

    importExcel() {
      this.uploading = true
      if (this.result) {
        this.uploading = false
        this.$message.success(`${this.fileName}上传成功`)
        this.isExcleLeadingin = false
        this.$refs.excleUpload.clearFiles()
        this.disable = true
      } else {
        this.$refs.excleUpload.clearFiles()
        this.isExcleLeadingin = false
        this.uploading = false
        this.$message.error(`${this.fileName}上传失败`)
        this.disable = true
      }
    },
    closeUpdate() {
      this.$refs.excleUpload.clearFiles()
      this.isExcleLeadingin = false
      this.uploading = false
    },
    handleExcelError(res, file, fileList) {
      this.fileName = file.name
      if (res.success) {
        this.disable = false
        this.result = res.success
      }
    },
    handleChansge() {},
    // 导入exel请求
    postfile() {},
    DateFrom() {
      let { system, status, cata, imputation, earlywarning, health } = this.dictionary
      // 数源应用系统
      this.$store.dispatch('getApplicationList', system)

      // 数源单位
      // this.$store.dispatch('getShuyuanSourceList', source)

      // 编目状态
      this.$store.dispatch('getCatalogingList', status)

      // 目录状态
      this.$store.dispatch('getCatalogueListList', cata)

      // 归集状态
      this.$store.dispatch('getAggregateList', imputation)
      // 预警信息下架理由
      // earlywarning: 'early_warning_information',
      this.$store.dispatch('getEarlywarning', earlywarning)
      // 健康码信息下架理由
      // health: 'health_code_information'
      this.$store.dispatch('getHealth', health)
    },

    // 新增
    addshowModify() {
      // this.isshowModify = true
      // /datefrom/AddOrModify
      // this.$bus.$emit('addData', 'add')
      this.$router.push({
        path: '/datefrom/AddOrModify',
        query: {
          comeFrom: '1',
        },
      })
      // this.$refs.add.getAddData(false)
    },
    // 点击编辑
    showUpdateAdd(row) {
      // this.isshowModify = true
      // console.log('236', this.examine)
      // this.$refs.add.getUpdateAddData(row.id)
      console.log('369')
      console.log(row.id)
      // this.$bus.$emit('updateAddData', row.id)
      this.$router.push({
        path: '/datefrom/AddOrModify',
        query: {
          id: row.id,
          comeFrom: '2',
        },
      })
      // console.log(row.id);
    },
    // 点击复制
    copydatafromitem(row) {
      // let copyId = [row.id]
      // this.isshowModify = true
      // this.$refs.add.getCopyData(row.id)
      // this.$bus.$emit('copyData', row.id)
      this.$router.push({
        path: '/datefrom/AddOrModify',
        query: {
          id: row.id,
          comeFrom: '3',
        },
      })
    },
    // 点击数据目录名称-进入详情
    cloneHaredetails(row) {
      this.isshowHaredetails = true
      this.$refs.sharedetails.loading = true
      this.$refs.sharedetails.loading1 = true
      this.$refs.sharedetails.activeName = 'first'
      this.$refs.sharedetails.inquireData.catalogId = row.id
      this.$refs.sharedetails.fetchShareDataPage()
      this.$refs.sharedetails.dateFrom()
      this.$refs.sharedetails.getDetailsLsit(row.id, this.formInline)
    },

    // 表格点击全选
    // 选中当前行的数据
    handleSelect(row) {
      // console.log(row)
      this.selectID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.selectID.push(value.id)
        })
      }
      this.shelfForm.ofTheShelf = []
      if (row.length > 0) {
        row.forEach((item, index) => {
          if (
            (item.catalogStatuStr == '审核通过' && item.cataStatuStr == '已上架') ||
            (item.catalogStatuStr == '审核通过' && item.cataStatuStr == '下架失败')
          ) {
            this.shelfForm.ofTheShelf.push({
              id: item.id,
              selectName: item.catalogName,
              offShelfMessage: '', // 下架理由
              applyFlieName: '', // 文件上传
            })
          }
        })
      }
      this.shelfList = []
      if (row.length > 0) {
        row.forEach((item, index) => {
          if (
            (item.catalogStatuStr == '审核通过' && item.cataStatuStr == '未上架') ||
            (item.catalogStatuStr == '审核通过' && item.cataStatuStr == '上架失败')
          ) {
            this.shelfList.push({
              id: item.id,
              offShelfMessage: '', // 上架理由
            })
          }
        })
      }
      // console.log(1, this.selectID)
      // console.log(2, this.shelfForm.ofTheShelf)
    },
    // 全选
    // 选中背景色
    tableRowClassName({ row, rowIndex }) {
      let color = ''
      for (let item of this.selectID.values()) {
        if (item === row.id) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },
    /*
    每页数量发生改变的监听
    */
    handleSizeChange(pageSize) {
      this.formInline.pageSize = pageSize
      this.getRoles()
    },
    // 根据选择加当前页发请求
    getRoles(page = 1) {
      this.tableloading = true
      this.formInline.pageNum = page
      postDataFromPage(this.formInline).then((res) => {
        if (res.success) {
          this.tableData = res.body.content
          this.total = res.body.total
          this.tableloading = false
        }
      })
    },
    // 提交按钮触发
    submitForm() {
      this.formInline.pageNum = 1
      this.tableloading = true
      postDataFromPage(this.formInline).then((res) => {
        if (res.success) {
          this.tableData = res.body.content
          this.total = res.body.total
          this.tableloading = false
        }
      })
    },
    // 点击重置按钮触发
    resetForm(formInline) {
      this.$refs[formInline].resetFields()
    },
    // 批量导出的数据
    postCataLogDataItem() {
      getCataLogIndexItem().then((res) => {
        if (res.success) {
          this.indexcities = res.body
        }
      })
      getCataLogDataItem().then((res) => {
        if (res.success) {
          this.datacities = res.body
        }
      })
    },
    // 点击批量操作的弹窗里的点击选项
    // 点击全选
    // 信息资源字段
    indexhandleCheckAllChange(value) {
      // value 当前勾选状态true/false
      this.indexcheckedCities = value ? this.indexcities.map((item) => item.columnName) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.isIndeterminate = false
    },
    /*
    选项发生改变的监听
    */
    indexhandleCheckedChange(value) {
      const { indexcheckedCities, indexcities } = this
      this.checkAll = indexcheckedCities.length === indexcities.length && indexcities.length > 0
      this.isIndeterminate = indexcheckedCities.length > 0 && indexcheckedCities.length < indexcities.length
    },
    datahandleCheckAllChange(value) {
      // value 当前勾选状态true/false
      this.datacheckedCities = value ? this.datacities.map((item) => item.columnName) : []
      // 如果当前不是全选也不全不选时, 指定为false
      this.DataisIndeterminate = false
    },
    /*
    选项发生改变的监听
    */
    datahandleCheckedChange(value) {
      const { datacheckedCities, datacities } = this
      this.DatacheckAll = datacheckedCities.length === datacities.length && datacities.length > 0
      this.DataisIndeterminate = datacheckedCities.length > 0 && datacheckedCities.length < datacities.length
    },
    // 获取当前时间
    getCurrentTime() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
      let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let minutes = new Date().getMinutes() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      return year + '-' + month + '-' + day + ' ' + hours + '-' + minutes
    },
    // 导出确认
    postBatchExport() {
      let param = {
        cataLogItems: this.indexcheckedCities,
        dataItems: this.datacheckedCities,
        selectID: this.selectID,
      }
      console.log(param)
      this.isBatchExport = false
      getExportXls(param)
        .then((res) => {
          const link = document.createElement('a') // 创建a标签
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const objectUrl = URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = '批量导出' + ' ' + this.getCurrentTime() + '.xlsx'
          link.click()
          URL.revokeObjectURL(objectUrl) // 释放内存
          Message({
            message: '导出成功！',
            type: 'success',
          })
        })
        .catch((error) => {
          Message.error('模板导出失败')
        })
      this.datacheckedCities = []
      this.indexcheckedCities = []
    },
    // 取消导出
    closeExport() {
      this.isBatchExport = false
      this.datacheckedCities = []
      this.indexcheckedCities = []
    },

    // 表格状态
    // statusbtn(val) {
    //   for (const key in this.datefromList.catalogingStatus) {
    //     if (this.datefromList.catalogingStatus[key].value == val) {
    //       return this.datefromList.catalogingStatus[key].text
    //     }
    //   }
    // },
    // catastatusbtn(val) {
    //   for (const key in this.datefromList.catalogueList) {
    //     if (this.datefromList.catalogueList[key].value == val) {
    //       // console.log(this.datefromList.catalogueList[key].value,val);
    //       // console.log(val);
    //       return this.datefromList.catalogueList[key].text
    //     }
    //   }
    // },

    // 上架申请
    submitApplication(row) {
      this.releaseApplication = true
      this.releaseId = row.id
    },
    // 确认上架
    submitRelease() {
      this.loadRelease = true
      this.shelf.push({
        offShelfMessage: '',
        id: this.releaseId,
      })
      submitCatalogUpShelf(this.shelf)
        .then((res) => {
          if (res.success) {
            Message({
              message: '上架申请成功！',
              type: 'success',
            })
          } else {
            Message.error(res.header.message)
          }
          this.shelf = []
          this.releaseApplication = false
          this.loadRelease = false
          this.getRoles(this.formInline.pageNum)
        })
        .catch(() => {
          this.releaseApplication = false
          this.loadRelease = false
          Message.error('请求上架申请失败')
        })
    },
    // 确认批量上架
    submitReleaseList() {
      this.ReleaseList = true
      submitCatalogUpShelf(this.shelfList)
        .then((res) => {
          if (res.success) {
            Message({
              message: '批量上架申请成功！',
              type: 'success',
            })
          } else {
            Message.error(res.header.message)
          }
          this.shelfList = []

          this.isBatchShelf = false
          this.ReleaseList = false
          this.getRoles(this.formInline.pageNum)
        })
        .catch(() => {
          this.isBatchShelf = false
          this.ReleaseList = false
          Message.error('请求批量上架申请失败')
        })
    },

    // 点击删除
    deleteItemId(row) {
      this.deleteVisible = true
      this.isSelectID = []
      this.isSelectID.push(row.id)
    },

    // 确认删除
    deleteBatch() {
      postdeleteBatch(this.isSelectID).then((res) => {
        if (res.success) {
          Message({
            message: '删除成功！',
            type: 'success',
          })
          this.deleteVisible = false
          this.getRoles(this.formInline.pageNum)
        }
      })
    },
    // 下架审批
    // 点击
    OffShelf(row) {
      this.shelfForm.ofTheShelf = []
      this.shelfItemForm.ofTheShelfItem = []
      this.dialogItem = true
      this.shelfItemForm.ofTheShelfItem.push({
        id: row.id,
        selectName: row.catalogName,
        offShelfMessage: '', // 下架理由
        applyFlieName: '', // 文件上传
      })
    },
    // 点击批量操作
    // isSelectIdItem() {
    //   if (this.selectID.length == 0) {
    //     Message.error('请至少勾选一个选项')
    //   }
    // },

    isShowBatchShelf() {
      if (this.shelfList.length == 0) {
        Message.error('请至少勾选一个可上架选项')
      } else {
        this.isBatchShelf = true
      }
    },
    isShowExcleLeadingin() {
      // if (this.selectID.length == 0) {
      //   Message.error('请至少勾选一个选项')
      // } else {
      this.isExcleLeadingin = true
      // }
    },
    isShowBatchExport() {
      if (this.selectID.length == 0) {
        Message.error('请至少勾选一个选项')
      } else {
        this.isBatchExport = true
      }
    },

    // 申请下架
    // 点击批量下架
    OffShelfList() {
      if (this.shelfForm.ofTheShelf.length == 0) {
        Message.error('请至少勾选一个可下架选项')
      } else {
        this.dialog = true
      }
    },
    // 文件上传失败
    xiaHandleExceed(err, file, fileList) {
      Message.error(err)
    },
    // 文件上传成功
    fileSuccess(res, file, fileList) {
      this.fileName = file.response.body
      // console.log(24, this.shelfItemForm.ofTheShelfItem.length)
      if (this.shelfItemForm.ofTheShelfItem.length != 0) {
        this.shelfItemForm.ofTheShelfItem[0].applyFlieName = file.response.body
      } else {
        this.shelfForm.ofTheShelf = this.shelfForm.ofTheShelf.map((item) => {
          item.applyFlieName = file.response.body
          return item
        })
      }
    },
    // 下架点击确定
    closeDrawer() {
      this.loadDrawer1 = true
      let submititem
      if (this.shelfItemForm.ofTheShelfItem.length != 0) {
        submititem = this.shelfItemForm.ofTheShelfItem
        this.$refs['shelfItemForm'].validate((valid) => {
          if (valid) {
            if (this.shelfItemForm.ofTheShelfItem[0].applyFlieName != '') {
              submitCatalogOffShelf(submititem)
                .then((res) => {
                  if (res.success) {
                    Message({
                      message: '申请已发送',
                      type: 'success',
                    })
                    this.shelfItemForm.ofTheShelfItem = []
                    this.dialogItem = false
                    this.loadDrawer1 = false
                    this.submitForm()
                  } else {
                    this.dialogItem = false
                    this.loadDrawer1 = false
                    Message.error(res.header.message)
                  }
                })
                .catch((_) => {
                  this.loadDrawer1 = false
                })
            } else {
              Message.error('上传文件为空，请上传正确文件')
            }
          }
        })
      } else {
        submititem = this.shelfForm.ofTheShelf
        this.$refs['shelfForm'].validate((valid) => {
          if (valid) {
            let isTure = this.shelfForm.ofTheShelf.every((item) => {
              return item.applyFlieName != ''
            })
            if (isTure) {
              submitCatalogOffShelf(submititem).then((res) => {
                if (res.success) {
                  Message({
                    message: '申请已发送',
                    type: 'success',
                  })
                  this.shelfForm.ofTheShelf = []
                  this.dialog = false
                  this.submitForm()
                } else {
                  this.dialog = false
                  Message.error(res.header.message)
                }
              })
            } else {
              Message.error('上传文件为空，请上传正确文件')
            }
          }
        })
      }

      // console.log(submititem)
      this.loadDrawer = false
    },
    handleClose(done) {
      MessageBox.confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    // 申请加加抽屉取消按钮
    cancelForm() {
      this.dialog = false
    },
    cancelFormItem() {
      this.dialogItem = false
    },
    // 导入模板下载
    downloadmu() {
      download({ fileName: this.downFileName })
        .then((res) => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8',
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = this.downFileName
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch((error) => {
          this.$message.error('模板导出失败')
        })
    },
    dictionaryList() {
      getDictItems(this.impTemplate).then((res) => {
        // 编目导入模板
        let downloadName = res.result.find((fileName) => {
          return fileName.text == '编目导入模板'
        })
        this.downFileName = `${downloadName.text}.xlsx`
      })
    },
    // 恢复
    processitem(row) {
      this.processId = row.id
      this.processVisible = true
    },
    processHuiFu() {
      let codeId = [this.processId]
      processRecovery(codeId).then((res) => {
        if (res.success) {
          Message({
            message: '恢复成功！',
            type: 'success',
          })
          this.getRoles(this.formInline.pageNum)
        } else {
          this.$message.error('恢复失败')
        }
        this.processVisible = false
      })
    },

    // 新增关闭
    // closeModify(val) {
    //   this.isshowModify = val
    //   // this.getRoles()
    // },
    goBack(val) {
      this.isshowHaredetails = val
    },
    // 保存成功  并重新发请求
    backSuccess() {
      this.getRoles()
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
.el-message-box__message p {
  text-align: center;
}
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

.el-button + .el-button,
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-left: 0;
}
.divffromflex {
  display: flex;
  justify-content: space-between;
}
.fromflexrig {
  display: flex;
  justify-content: flex-end;
}
.cardping {
  padding: 0 20px;
}
.pbianmu {
  font-size: 20px;
  font-weight: 500;
  color: #333333;
}
.butfromccwei1 {
  // width: 55px;
  // height: 32px;
  margin-right: 10px;
  // font-size: 12px;
  // line-height: 32px;
  // padding: 0;
}
// .butfromccwei {
//   width: 55px;
//   height: 32px;
//   font-size: 12px;
//   line-height: 32px;
//   padding: 0;
// }
// .faderfrom {
//   position: relative;
//   margin-bottom: 70px;
// }
// .fromweizhi {
//   position: absolute;
//   right: 60px;
//   top: 130px;
// }
::v-deep .el-popper {
  min-width: 100;
}
.popoverwei {
  width: 100px;
}
.chaxunbut {
  width: 87px;
  height: 43px;
}
.cardmargintop {
  margin-top: 24px;
  // padding: 0 20px 0 20px;
}
::v-deep .el-form-item__label {
  font-size: 14px;
  margin: 0;
}
::v-deep .el-table__cell {
  font-size: 14px;
  /deep/.el-table .tr-red {
    color: red !important;
  }
}
// ::v-deep .el-table__cell:active {
//   background-color: rgb(255, 244, 232);
// }
/deep/.table-SelectedRow-bgcolor {
  td {
    background: rgba(24, 144, 255, 0.12) !important;
  }
}
::v-deep .el-dialog__body {
  margin: 0 0 20px 0;
  padding: 0;
  // height: 450px;
}
.el-divider--horizontal {
  margin: 0 0 5px 0;
}

.fromcheckboxmarg {
  margin-top: 20px;
}
.fromcheckboxitem {
  margin: 12px 0;
}
.quxioamarg {
  margin-right: 10px;
}
.dialogspansize {
  font-size: 21px;
  font-weight: 500;
  color: #333333;
}
.checkboxsize {
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin-right: 10px;
}
::v-deep .el-checkbox__label {
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
::v-deep .el-checkbox__input {
  width: 21px;
  height: 21px;
}

.table-SelectedRow-bgcolor {
  td {
    background-color: #fa645f !important;
  }
}
.tabbutsize {
  // width: 100px;
  font-size: 14px;
  margin-right: 20px;
  // color: #409eff;
}
.aitemml {
  width: 200px;
  height: 32px;
}
// .topfromitem {
//   margin-right: 180px;
// }
.topfashitem {
  margin-right: 50px;
}
.xiancolor {
  border: 1px solid rgb(136, 136, 136);
}
.cztable {
  border-right: 1px solid rgb(136, 136, 136);
}
.cztbcolor {
  color: dodgerblue;
}
.tjdiv {
  margin: 5px 0 24px 0;
}
.fgdivider {
  margin: 0;
}
// .wbutcol {
//   color: #656565;
// }
.addweihei {
  width: 80px;
  height: 32px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 32px;
  padding: 0;
}
.yinyongwei {
  width: 87px;
  height: 32px;
  margin-right: 10px;
  font-size: 14px;
  line-height: 32px;
  padding: 0;
}

// .piliangfzwei {
//   // position: relative;
//   width: 110px;
//   margin-right: 20px;
//   .el-dropdown-menu {
//     width: 100px;
//   }
// }
.piliangfz {
  position: relative;
  width: 120px;
  // margin-right: 20px;
}
.piliangbut {
  position: relative;
  width: 120px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #1890ff;
  color: #1890ff;
  // margin-right: 20px;
  line-height: 32px;
  font-size: 14px;
  padding: 0 17px;
  i {
    margin-left: 15px;
    color: #1890ff;
  }
}
.buttblok {
  width: 120px;
  display: block;
}
/deep/.el-dropdown-menu__item {
  color: #1890ff;
}
/deep/.el-dropdown-menu__item.is-disabled {
  color: #bbb;
}

.butpilfont {
  font-size: 14px;
  // text-align: center;
}

// 申请下架
.drawerdivmag {
  margin: 0;
}
.dividerinpttext {
  width: 250px;
}
.uploaddivsize {
  font-size: 12px;
  margin: 7px 0 0 280px;
}
.uploadspancolor {
  color: #409eff;
}
.drawerdivposi {
  position: relative;
  /deep/.el-table .el-table__cell {
    padding: 0;
  }
  /deep/.el-table {
    color: #333;
  }
  /deep/.el-table__body {
    margin: 17px 0 0 20px;
  }
  /deep/.el-table__row > td {
    border: none;
  }
  /deep/.el-table::before {
    height: 0px;
  }
  /deep/ .el-table tbody tr:hover > td {
    background: rgb(255, 255, 255) !important;
  }
  .upload-demo {
    margin: 15px 0 0 270px;
  }
  .upload-demo:before {
    content: '*';
    color: #f56c6c;
    margin-right: 5px;
    font-weight: bold;
  }
}
.selectList {
  width: 210px;
}
.selectList:before {
  content: '*';
  color: #f56c6c;
  margin-right: 5px;
  font-weight: bold;
}
.drawerfooter {
  position: absolute;
  right: 40px;
  bottom: 10px;
}
.drawerfooterbut {
  margin-right: 10px;
}
.popoverwei {
  width: 120px;
}
::v-deep .el-drawer__header {
  margin-bottom: 0px;
  padding: 20px 20px 20px 20px;
}
::v-deep .el-drawer__header > span {
  font-size: 16px;
  color: #1890ff;
}

// 更多--删除
.popoverwei {
  width: 80px;
}
.deletmarg {
  margin-right: 20px;
}

.dialogcenter {
  margin: 100px 0;
  text-align: center;
  font-size: 16px;
  color: #000000;
}
// 批量导入

/deep/ .el-dialog__title {
  font-size: 16px;
  color: #1890ff;
}
::v-deep .el-divider {
  background-color: #1890ff;
}
.dialogmarg {
  margin: 32px 40px 0 40px;
} ////
.centerupload {
  text-align: center;
} ////
.exceluploaddiv {
  margin-bottom: 10px;
}
.butonqumarg {
  margin-right: 20px;
}
.mbcolor {
  color: #1890ff;
}
.checkboxwei {
  width: 20%;
}
.yuancolor1 {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff7d00;
  margin-right: 5px;
}
.yuancolor2 {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f53f3f;
  margin-right: 5px;
}
.yuancolor3 {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #00b42a;
  margin-right: 5px;
}
.yuancolor4 {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #777777;
  margin-right: 5px;
}
.pagination {
  padding: 24px;
}
.header-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.conceal1 {
  width: 210px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.over-item {
  cursor: pointer;
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}
.itemSlotheden2 {
  width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align:left;
  user-select: unset;//设置允许复制el-button的内容
}
</style>
