<template>
  <!-- 数据编目--编目列表-新增/编辑 -->
  <div>
    <el-card class="cardpad" v-loading="loading">
      <p class="jibentop">基本信息</p>
      <el-divider class="pdivider"></el-divider>
      <el-form
        :inline="true"
        label-width="140px"
        size="small"
        :label-position="labelPosition"
        :model="formLabelAlign"
        :rules="formLabelAlignRules"
        ref="formLabelAlign"
        class="frommaglef"
      >
        <div class="formdivflex">
          <el-form-item label="信息资源名称" key="1" class="fromtopmag" prop="catalogName">
            <!-- <div slot="label" style="margin-left:10px;">信息资源名称</div> -->
            <el-input v-model.trim="formLabelAlign.catalogName" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="信息资源英文名称" key="2" class="fromtopmag" prop="catalogEn">
            <el-input
              v-model.trim="formLabelAlign.catalogEn"
              @change="changeEnglish"
              placeholder="请输入"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item key="13" label="是否对社会开放" class="fromtopmag" prop="openSociety">
            <el-select v-model="formLabelAlign.openSociety" placeholder="请选择" class="fromweiht">
              <el-option
                :label="society.text"
                :value="society.value"
                v-for="(society, index) in datefromList.opensociety"
                :key="society.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="数源应用系统" key="4" class="fromtopmag" prop="sourceSystem">
            <el-select v-model="formLabelAlign.sourceSystem" placeholder="请选择" class="fromweiht">
              <el-option
                :label="source.appName"
                :value="source.appName"
                v-for="(source, index) in sourceList"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="width:30px"></div>
        </div>
        <el-form-item
          v-if="formLabelAlign.sourceSystem === '5'"
          label="未关联系统理由"
          key="5"
          class="fromtopmag"
          prop="notAssociatedReason"
        >
          <el-input v-model="formLabelAlign.notAssociatedReason" placeholder="请输入" class="frombigweiht"></el-input>
        </el-form-item>
        <div class="formdivflex">
          <el-form-item label="开放类型" key="3" class="fromtopmag" prop="openType">
            <el-select v-model="formLabelAlign.openType" @change="changeAlign" placeholder="请选择" class="fromweiht">
              <el-option
                :label="openitem.text"
                :value="openitem.value"
                v-for="(openitem, index) in datefromList.opentype"
                :key="openitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据范围" key="10" class="fromtopmag" prop="dataRange">
            <el-cascader
              :options="options"
              v-model="formLabelAlign.dataRange"
              :props="props"
              collapse-tags
              clearable
              :show-all-levels="false"
              @change="changeOption"
              class="fromweiht"
            ></el-cascader>
          </el-form-item>

          <div style="width:30px"></div>
        </div>
        <div class="formdivflex">
          <el-form-item label="共享类型" key="6" class="fromtopmag" prop="shareType">
            <el-select v-model="formLabelAlign.shareType" @change="changeShere" placeholder="请选择" class="fromweiht">
              <el-option
                :label="share.text"
                :value="share.value"
                v-for="(share, index) in datefromList.shareType"
                :key="share.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="共享条件"
            class="fromtopmag"
            prop="shareCondition"
            key="7"
            :rules="formLabelAlign.shareType === '20' ? formLabelAlignRules.shareCondition : [{ required: false }]"
            v-if="formLabelAlign.shareType !== '30'"
          >
            <el-input
              v-model.trim="formLabelAlign.shareCondition"
              :disabled="formLabelAlign.shareType !== '20'"
              placeholder="请输入"
              key="8"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="不予共享条件"
            class="fromtopmag"
            prop="dontShareCondition"
            key="7"
            :rules="formLabelAlign.shareType === '30' ? formLabelAlignRules.dontShareCondition : [{ required: false }]"
            v-if="formLabelAlign.shareType === '30'"
          >
            <el-input
              v-model.trim="formLabelAlign.dontShareCondition"
              :disabled="formLabelAlign.shareType !== '30'"
              placeholder="请输入"
              key="8"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>
        <div class="formdivflex">
          <el-form-item label="重点领域分类" key="11" class="fromtopmag" prop="keyAreasType">
            <el-select v-model="formLabelAlign.keyAreasType" filterable placeholder="请选择" class="fromweiht">
              <el-option
                :label="areas.text"
                :value="areas.value"
                v-for="(areas, index) in datefromList.keyareastype"
                :key="areas.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="重点领域分类备注"
            class="fromtopmag"
            prop="keyAreasRemark"
            key="12"
            :rules="formLabelAlign.keyAreasType === '21' ? formLabelAlignRules.keyAreasRemark : [{ required: false }]"
          >
            <el-input
              v-model.trim="formLabelAlign.keyAreasRemark"
              :disabled="formLabelAlign.keyAreasType !== '21'"
              placeholder="请输入"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
        <el-form-item label="更新频率" key="9" class="fromtopmag" prop="updateFrequency">
          <div class="fromweiht">
            <el-select
              v-model="formLabelAlign.updateFrequency"
              @change="changeFrequency"
              placeholder="请选择"
              class="updatewei"
            >
              <el-option
                :label="frequencyitem.text"
                :value="frequencyitem.value"
                v-for="(frequencyitem, index) in datefromList.frequency"
                :key="frequencyitem.value"
              ></el-option>
            </el-select>
            <!-- 每日 -->
            <el-time-picker
              v-model="formLabelAlign.inputFrequency"
              v-if="formLabelAlign.updateFrequency == '1'"
              value-format="HH:mm:ss"
              placeholder="请选择"
              class="timewei"
            >
            </el-time-picker>
            <!-- 每周 -->
            <el-select
              v-model="formLabelAlign.inputFrequency"
              placeholder="请选择"
              v-else-if="formLabelAlign.updateFrequency == '2'"
              class="timewei"
            >
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="(item, index) in aWeek"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- 每月 -->
            <el-select
              v-model="formLabelAlign.inputFrequency"
              placeholder="请选择"
              v-else-if="formLabelAlign.updateFrequency == '3'"
              class="timewei"
            >
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="(item, index) in january"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- 每季度 -->
            <el-cascader
              v-model="formLabelAlign.inputFrequency"
              :options="quarter"
              clearable
              v-else-if="formLabelAlign.updateFrequency == '4'"
              class="timewei"
            ></el-cascader>
            <!-- 每半年 -->
            <el-cascader
              v-model="formLabelAlign.inputFrequency"
              :options="halfaYear"
              clearable
              v-else-if="formLabelAlign.updateFrequency == '5'"
              class="timewei"
            ></el-cascader>
            <!-- 每年 -->
            <el-cascader
              v-model="formLabelAlign.inputFrequency"
              :options="wenyear"
              clearable
              v-else-if="formLabelAlign.updateFrequency == '6'"
              class="timewei"
            ></el-cascader>
            <!-- 分钟级 -->
            <el-select
              v-model="formLabelAlign.inputFrequency"
              placeholder="请选择"
              v-else-if="formLabelAlign.updateFrequency == '8'"
              class="timewei"
            >
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="(item, index) in minute"
                :key="item.value"
              ></el-option>
            </el-select>
            <!-- 小时级 -->
            <el-select
              v-model="formLabelAlign.inputFrequency"
              placeholder="请选择"
              v-else-if="formLabelAlign.updateFrequency == '9'"
              class="timewei"
            >
              <el-option
                :label="item.text"
                :value="item.value"
                v-for="(item, index) in ahour"
                :key="item.value"
              ></el-option>
            </el-select>
            <!--  -->
            <el-input
              v-else
              v-model.trim="formLabelAlign.inputFrequency"
              placeholder="请输入"
              class="timewei"
            ></el-input>
          </div>
        </el-form-item>

         <el-form-item key="13" label="是否生成数据集" class="fromtopmag" prop="generateDataset">
            <el-select v-model="formLabelAlign.generateDataset" placeholder="请选择" class="fromweiht">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>

          <div style="width:30px"></div>
        </div>

        <el-form-item label="信息资源摘要" key="14" class="fromtopmag" prop="informationSummary">
          <el-input
            type="textarea"
            :rows="3"
            maxlength="300"
            v-model="formLabelAlign.informationSummary"
            placeholder="请输入（20字以上）"
            class="frombigweiht"
          ></el-input>
        </el-form-item>

        <!-- <div class="formdivflex">
          <el-form-item label="数源单位" key="15" class="fromtopmag" prop="sourceUnit">
            <el-select v-model="formLabelAlign.sourceUnit" filterable placeholder="请选择" class="fromweiht">
              <el-option
                :label="source.nodeName"
                :value="source.nodeName"
                v-for="source in citys"
                :key="source.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务责任人" key="16" class="fromtopmag" prop="businessPerson">
            <el-input v-model.trim="formLabelAlign.businessPerson" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" key="17" class="fromtopmag" prop="contactInformation">
            <el-input
              v-model.trim="formLabelAlign.contactInformation"
              placeholder="请输入"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div> -->
      </el-form>
    </el-card>

    <el-card class="cardpadmargtop" v-loading="loading">
      <p class="jibentopsize">服务事项</p>
      <el-divider class="pdivider"></el-divider>
      <el-form ref="related" :rules="relatedrules" :model="related" size="small" label-width="180px">
        <el-form-item label="是否关联政务服务事项：" key="18" prop="relatedGovernment">
          <el-radio-group v-model="related.relatedGovernment">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-form
        :inline="true"
        :rules="alignItemrules"
        label-width="140px"
        size="small"
        :label-position="labelPosition"
        ref="alignItem"
        :model="alignItem"
        class="frommaglef"
        v-if="related.relatedGovernment === '是'"
      >
        <div class="formdivflex">
          <el-form-item label="业务办理项编码" key="19" class="fromtopmag" prop="businessCode">
            <el-input v-model.trim="alignItem.businessCode" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="业务办理事项名称" key="20" class="fromtopmag" prop="businessName">
            <el-input v-model.trim="alignItem.businessName" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="事项类型" key="21" class="fromtopmag" prop="eventType">
            <el-select v-model="alignItem.eventType" placeholder="请选择" class="fromweiht">
              <el-option
                :label="eventitem.text"
                :value="eventitem.value"
                v-for="(eventitem, index) in datefromList.eventType"
                :key="eventitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="事项层级" key="22" class="fromtopmag" prop="eventLevel">
            <el-select v-model="alignItem.eventLevel" placeholder="请选择" class="fromweiht">
              <el-option
                :label="exerciseitem.text"
                :value="exerciseitem.value"
                v-for="(exerciseitem, index) in datefromList.exercise"
                :key="exerciseitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="事项基本目录编码" key="23" class="fromtopmag" prop="directoryCode">
            <el-input v-model.trim="alignItem.directoryCode" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="数据所属事项名称" key="24" class="fromtopmag" prop="itemData">
            <el-input v-model.trim="alignItem.itemData" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="实施清单编码" key="25" class="fromtopmag" prop="implementationCode">
            <el-input v-model.trim="alignItem.implementationCode" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="实施清单名称" key="27" class="fromtopmag" prop="implementationName">
            <el-input v-model.trim="alignItem.implementationName" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="行驶层级" key="28" class="fromtopmag" prop="drivingLevel">
            <el-select v-model.trim="alignItem.drivingLevel" placeholder="请选择" class="fromweiht">
              <el-option
                :label="exerciseitem.text"
                :value="exerciseitem.value"
                v-for="(exerciseitem, index) in datefromList.exercise"
                :key="exerciseitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结果类型" key="29" class="fromtopmag" prop="resultType">
            <el-select v-model="alignItem.resultType" placeholder="请选择" class="fromweiht">
              <el-option
                :label="resulitem.text"
                :value="resulitem.value"
                v-for="(resulitem, index) in datefromList.resultType"
                :key="resulitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="应用场景" key="30" class="fromtopmag" prop="applicationScenario">
            <el-select v-model="alignItem.applicationScenario" placeholder="请选择" class="fromweiht">
              <el-option
                :label="scenarioitem.text"
                :value="scenarioitem.value"
                v-for="(scenarioitem, index) in datefromList.scenario"
                :key="scenarioitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="应用场景描述" key="31" class="fromtopmag" prop="applicationScenarioDescribe">
            <el-input
              v-model.trim="alignItem.applicationScenarioDescribe"
              placeholder="请输入"
              class="fromweiht"
            ></el-input>
            <!-- <el-select v-model="alignItem.applicationScenarioDescribe" placeholder="请选择" class="fromweiht">
              <el-option
                :label="descrip.text"
                :value="descrip.value"
                v-for="(descrip, index) in datefromList.description"
                :key="descrip.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="提供渠道" key="32" class="fromtopmag" prop="provideChannels">
            <el-select v-model="alignItem.provideChannels" placeholder="请选择" class="fromweiht">
              <el-option
                :label="channelsitem.text"
                :value="channelsitem.value"
                v-for="(channelsitem, index) in datefromList.channels"
                :key="channelsitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否电子证照：" key="33">
            <el-radio-group v-model="alignItem.electronicLicense" class="fromweiht">
              <el-radio label="1">是</el-radio>
              <el-radio label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="width:30px"></div>
        </div>
      </el-form>
    </el-card>

    <!--  -->
    <el-card class="cardpadmargtop" v-loading="loading">
      <p class="jibentopsize">目录分类</p>
      <el-divider class="pdivider"></el-divider>
      <div class="twofromflex">
        <el-form ref="Library" :inline="true" size="small" :rules="libraryRules" :model="Library" label-width="185px">
          <div class="formdivflex">
            <el-form-item label="是否关联基础库/专题库：" key="34" prop="baseLibrary">
              <el-radio-group v-model="Library.baseLibrary" @change="changeRadio">
                <el-radio label="基础库">基础库</el-radio>
                <el-radio label="专题库">专题库</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item
              label="基础库分类"
              class="fromtopmag"
              prop="categoryClassification"
              key="35"
              v-if="Library.baseLibrary === '基础库'"
            >
              <el-select v-model="Library.categoryClassification" key="36" placeholder="请选择" class="fromweiht">
                <el-option
                  :label="baseitem.categoryName"
                  :value="baseitem.categoryName"
                  v-for="(baseitem, index) in baseLibraryList"
                  :key="baseitem.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="专题库分类"
              class="fromtopmag"
              prop="categoryClassification"
              key="37"
              v-if="Library.baseLibrary === '专题库'"
            >
              <el-select v-model="Library.categoryClassification" placeholder="请选择" class="fromweiht">
                <el-option
                  :label="category.categoryName"
                  :value="category.categoryName"
                  v-for="(category, index) in categoryList"
                  :key="category.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <div style="width:200px"></div>
          </div>
        </el-form>
      </div>
    </el-card>

    <!-- 数据格式 -->
    <el-card class="cardpadmargtop" v-loading="loading">
      <p class="jibentopsize">汇聚方式</p>
      <el-divider class="pdivider"></el-divider>
      <div v-show="isShowDisabled">
        <p
          style="textAlign: center;
          height: 27px;
          fontSize: 17px;
          color: #666;
          marginTop:10px
          line-height: 27px;"
        >
          禁止编辑
        </p>
      </div>
      <!-- :rules="labelPositionRules" -->
      <div v-show="!isShowDisabled">
        <el-form
          :inline="true"
          ref="labeldataForm"
          size="small"
          :label-position="labelPosition"
          :model="labeldataForm"
          label-width="120px"
          class="fromgeshimag"
        >
          <el-form-item label="汇聚方式" key="38" class="fromtopmag" prop="dataFormat">
            <el-select
              v-model="labeldataForm.dataFormat"
              @change="changedataFormat"
              @clear="clearselect"
              placeholder="请选择"
              clearable
              class="fromsmowit frommaginmini"
            >
              <el-option
                :label="formatitem.text"
                :value="formatitem.text"
                v-for="(formatitem, index) in datefromList.dataFormat"
                :key="formatitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 数据项 -->
        <div>
          <el-form
            :inline="true"
            label-width="120px"
            size="small"
            :rules="bmCatalogDataSourceRules"
            :label-position="labelPosition"
            :model="bmCatalogDataSource"
            ref="bmCatalogDataSource"
            class="frommaglef"
            v-if="labeldataForm.dataFormat === 'excel' || labeldataForm.dataFormat === '数据库'"
          >
            <el-form-item
              label="数据库名"
              key="39"
              class="fromtopmag"
              prop="databaseName"
              v-if="labeldataForm.dataFormat === 'excel'"
            >
              <el-select
                v-model="bmCatalogDataSource.databaseName"
                filterable
                placeholder="请选择"
                class="fromsmowit frommaginmini"
              >
                <el-option
                  @click.native="handlerId(database)"
                  :label="database.isMerge"
                  :value="database.name"
                  v-for="(database, index) in databaseNameList"
                  :key="database.storageId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="表名"
              key="57"
              class="fromtopmag"
              prop="tableName"
              v-if="labeldataForm.dataFormat === 'excel'"
            >
              <!-- @change="testTable" -->
              <el-input v-model.trim="bmCatalogDataSource.tableName" placeholder="请输入" class="fromweiht"></el-input>
            </el-form-item>

            <el-form-item
              label="数据库名"
              key="39"
              class="fromtopmag"
              prop="databaseName"
              v-if="labeldataForm.dataFormat === '数据库'"
            >
              <el-select
                v-model="bmCatalogDataSource.databaseName"
                filterable
                placeholder="请选择"
                class="fromsmowit frommaginmini"
              >
                <el-option
                  @click.native="handlerdatabase(database)"
                  :label="database.isMerge"
                  :value="database.name"
                  v-for="database in databaseNameList"
                  :key="database.storageId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="表名"
              key="40"
              class="fromtopmag"
              prop="tableName"
              v-if="labeldataForm.dataFormat === '数据库'"
            >
              <el-select v-model="bmCatalogDataSource.tableName" filterable placeholder="请选择" class="fromsmowit">
                <el-option
                  @click.native="handtableTypeList(tableTypeItem)"
                  :label="tableTypeItem.tableName"
                  :value="tableTypeItem.tableName"
                  v-for="(tableTypeItem, index) in tableType"
                  :key="tableTypeItem.tableName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- Excel内容 -->
          <div class="pilangflexnew" v-if="labeldataForm.dataFormat === 'excel'">
            <div>
              <span class="spanfont">数据项</span>
              <span class="pcolorred">新增库表默认增加data_up_status、data_up_time、data_up_uuid、sm_gxsj四个字段</span>
            </div>
            <div class="butflexcz">
              <el-button class="butczwh" type="primary" @click="addparameter">新增参数</el-button>
              <el-dropdown trigger="click" class="piliangfz">
                <el-button type="text" class="piliangbut">
                  批量操作<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="buttblok" @click.native="onImportDataExcel">Excel导入</el-dropdown-item>
                  <el-dropdown-item class="buttblok" @click.native="handleDeleteAllDetails">批量删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="pilangflexnew" v-if="labeldataForm.dataFormat === '数据库'">
            <div>
              <span class="spanfont">数据项</span>
              <span class="pcolorred">库表中data_up_status、data_up_time、data_up_uuid、sm_gxsj四个字段不展示</span>
            </div>
            <!-- <div class="butflexcz">
            <el-button class="butczwh" type="primary" @click.native="handleDeleteAllDetails">批量删除</el-button>
          </div> -->
          </div>
          <!-- 数据项表格 -->
          <el-form :model="tableForm" ref="tableForm" :rules="dataListRules">
            <el-table
              :data="tableForm.dataList"
              tooltip-effect="dark"
              style="width: 100%"
              :header-cell-style="{ background: '#E6F7FF', color: '#606266' }"
              @selection-change="handleSelect"
              :row-class-name="tableRowClassName"
              v-if="labeldataForm.dataFormat === 'excel' || labeldataForm.dataFormat === '数据库'"
            >
              <el-table-column type="selection" align="center" width="55">
                <template slot="header" slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-checkbox-group v-model="checkList1">
                      <el-checkbox>
                        <br />
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column label="序号" min-width="60">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <span>{{ $index + 1 }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="中文名称" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item :prop="'dataList.' + $index + '.name'" :rules="dataListRules.name" class="dataLis-demo">
                    <div class="demo"></div>
                    <el-input v-model="row.name" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="enName" label="英文名称" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.enName'"
                    :rules="labeldataForm.dataFormat != '数据库' ? dataListRules.enName : [{ required: false }]"
                    class="dataLis-demo"
                  >
                    <div class="demo" v-if="labeldataForm.dataFormat != '数据库'"></div>
                    <el-input
                      v-model="row.enName"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataType" label="数据类型" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.dataType'"
                    :rules="labeldataForm.dataFormat != '数据库' ? dataListRules.dataType : [{ required: false }]"
                    class="dataLis-demo"
                  >
                    <div class="demo" v-if="labeldataForm.dataFormat != '数据库'"></div>
                    <el-select
                      v-model="row.dataType"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        :label="field.text"
                        :value="field.text"
                        v-for="(field, index) in datefromList.fieldDataType"
                        :key="index"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataLength" label="数据长度" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.dataLength'"
                    :rules="labeldataForm.dataFormat != '数据库' ? dataListRules.dataLength : [{ required: false }]"
                    class="dataLis-demo"
                  >
                    <div class="demo" v-if="labeldataForm.dataFormat != '数据库'"></div>
                    <el-input
                      v-model="row.dataLength"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      type="number"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataDictionary" label="数据字典项" width="180">
                <template slot-scope="{ row }">
                  <el-form-item>
                    <el-input v-model="row.dataDictionary" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="defaultValue" label="默认值" width="180">
                <template slot-scope="{ row }">
                  <el-form-item>
                    <el-input
                      v-model="row.defaultValue"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="shareProperty" label="共享属性" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.shareProperty'"
                    :rules="dataListRules.shareProperty"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.shareProperty" size="small" placeholder="请选择">
                      <el-option
                        :label="share.text"
                        :value="share.value"
                        v-for="(share, index) in datefromList.shareType"
                        :key="share.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="sharingCondition" label="共享条件" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.sharingCondition'"
                    :rules="row.shareProperty === '20' ? dataListRules.sharingCondition : [{ required: false }]"
                    class="dataLis-demo"
                  >
                    <div v-if="row.shareProperty === '20'" class="demo"></div>
                    <el-input
                      v-model="row.sharingCondition"
                      :disabled="row.shareProperty !== '20'"
                      size="small"
                      placeholder="XXX"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="openAttribute" label="开放属性" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.openAttribute'"
                    :rules="dataListRules.openAttribute"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.openAttribute" size="small" placeholder="请选择">
                      <el-option
                        :label="openitem.text"
                        :value="openitem.value"
                        v-for="(openitem, index) in datefromList.opentype"
                        :key="openitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>

              <!-- <el-table-column prop="primaryKey" label="是否主键" width="140" class="columuItem">
              <template slot-scope="{ row, $index }">
                <el-form-item :prop="'dataList.' + $index + '.primaryKey'" :rules="dataListRules.primaryKey">
                  <el-select v-model="row.primaryKey" size="small" placeholder="请选择">
                    <el-option
                      :label="primary.text"
                      :value="primary.value"
                      v-for="(primary, index) in datefromList.primaryKey"
                      :key="primary.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column> -->
              <el-table-column prop="nullValue" label="是否可为空" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.nullValue'"
                    :rules="labeldataForm.dataFormat != '数据库' ? dataListRules.nullValue : [{ required: false }]"
                    class="dataLis-demo"
                  >
                    <div class="demo" v-show="labeldataForm.dataFormat != '数据库'"></div>
                    <el-select
                      v-model="row.nullValue"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      size="small"
                      placeholder="请选择"
                    >
                      <el-option
                        :label="emptyitem.text"
                        :value="emptyitem.value"
                        v-for="(emptyitem, index) in datefromList.empty"
                        :key="emptyitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataObject" label="数据对象" width="180" v-if="false">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.dataObject'"
                    :rules="dataListRules.dataObject"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.dataObject" size="small" placeholder="请选择">
                      <el-option
                        :label="dataObjitem.text"
                        :value="dataObjitem.value"
                        v-for="(dataObjitem, index) in datefromList.dataObject"
                        :key="dataObjitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="dataLevel" label="数据级别" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'dataList.' + $index + '.dataLevel'"
                    :rules="dataListRules.dataLevel"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.dataLevel" size="small" placeholder="请选择">
                      <el-option
                        :label="dataObjitem.text"
                        :value="dataObjitem.value"
                        v-for="(dataObjitem, index) in datefromList.dataLevel"
                        :key="dataObjitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="fieldDescription" label="字段描述" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-input
                      v-model="row.fieldDescription"
                      :disabled="labeldataForm.dataFormat === '数据库'"
                      size="small"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140" >
                <template slot-scope="scoped">
                  <el-form-item>
                    <el-button type="text" @click="handleDeleteRow(scoped.$index, tableForm.dataList)">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
        </div>

        <div v-if="labeldataForm.dataFormat === '接口'">
          <!-- :rules="rules" -->
          <el-form
            :inline="true"
            label-width="120px"
            size="small"
            :rules="apiListRules"
            ref="apiListItem"
            :label-position="labelPosition"
            :model="apiListItem"
            class="frommaglef"
          >
            <el-form-item label="接口名称" key="41" prop="apiName" :rules="apiListRules.apiName" class="fromtopmag">
              <el-input
                v-model="apiListItem.apiName"
                placeholder="请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位"
                class="fromweiht frommagin"
              ></el-input>
            </el-form-item>
            <el-form-item label="响应类型" key="42" class="fromtopmag" prop="responseType">
              <el-select v-model="apiListItem.responseType" placeholder="请选择" class="fromweiht">
                <el-option
                  :label="scenarioitem.text"
                  :value="scenarioitem.text"
                  v-for="(scenarioitem, index) in datefromList.responseType"
                  :key="scenarioitem.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请求方式" key="43" class="fromtopmag" prop="requestMode">
              <el-select v-model="apiListItem.requestMode" placeholder="请选择" class="fromweiht frommagin">
                <el-option
                  :label="scenarioitem.text"
                  :value="scenarioitem.text"
                  v-for="(scenarioitem, index) in datefromList.requestMode"
                  :key="scenarioitem.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="请求数据类型" key="44" class="fromtopmag" prop="requestType">
              <el-select v-model="apiListItem.requestType" placeholder="请选择" class="fromweiht">
                <el-option
                  :label="scenarioitem.text"
                  :value="scenarioitem.text"
                  v-for="(scenarioitem, index) in datefromList.requestDataType"
                  :key="scenarioitem.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="API路径" key="45" class="fromtopmag" prop="apiRoute">
              <el-input
                type="input"
                v-model="apiListItem.apiRoute"
                placeholder="以/开头，支持英文、数字、下划线、连字符(-)，不超过200个字符，例如：/a1/b2"
                class="frombigweiht"
              ></el-input>
            </el-form-item>
            <el-form-item label="后端服务请求" class="fromtopmag" prop="serviceType" :rules="apiListRules.serviceType">
              <el-select v-model="apiListItem.serviceType" placeholder="请选择" class="frombigweiht">
                <el-option
                  :label="service.text"
                  :value="service.text"
                  v-for="(service, index) in datefromList.serviceRequest"
                  :key="service.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <div v-if="apiListItem.serviceType == 'WebService'">
              <el-form-item
                label="调用地址"
                class="fromtopmag"
                prop="host"
                :rules="apiListItem.serviceType == 'WebService' ? apiListRules.host : [{ required: false }]"
              >
                <el-input
                  type="input"
                  placeholder="请输入URL"
                  v-model="apiListItem.host"
                  class="frombigweiht"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="空间命名"
                class="fromtopmag"
                prop="namespace"
                :rules="apiListItem.serviceType == 'WebService' ? apiListRules.namespace : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.namespace" class="frombigweiht"></el-input>
              </el-form-item>
              <el-form-item
                label="调用方法名称"
                class="fromtopmag"
                prop="method"
                :rules="apiListItem.serviceType == 'WebService' ? apiListRules.method : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.method" class="frombigweiht"></el-input>
              </el-form-item>
              <el-form-item
                label="接口描述"
                class="fromtopmag"
                prop="apiDescribe"
                :rules="apiListItem.serviceType == 'WebService' ? apiListRules.apiDescribe : [{ required: false }]"
              >
                <el-input
                  type="textarea"
                  :rows="3"
                  maxlength="300"
                  v-model="apiListItem.apiDescribe"
                  placeholder="请输入（20字以上）"
                  class="frombigweiht"
                ></el-input>
              </el-form-item>
            </div>

            <div v-if="apiListItem.serviceType === 'http'">
              <div class="httpweihei"><i class="el-icon-info"></i><span>以http://开头，且不包含Path</span></div>
              <el-form-item
                label="后端服务host"
                class="fromtopmag"
                prop="host"
                :rules="apiListItem.serviceType == 'http' ? apiListRules.host : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.host" class="frombigweiht"></el-input>
              </el-form-item>
              <div class="httpweihei">
                <i class="el-icon-info"></i
                ><span
                  >以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter
                  Path，放在${}中，如/user/${userid}</span
                >
              </div>
              <el-form-item
                label="后端服务Path"
                class="fromtopmag"
                prop="path"
                :rules="apiListItem.serviceType == 'http' ? apiListRules.path : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.path" class="frombigweiht"></el-input>
              </el-form-item>
            </div>

            <div v-if="apiListItem.serviceType === 'https'">
              <div class="httpweihei"><i class="el-icon-info"></i><span>以https://开头，且不包含Path</span></div>
              <el-form-item
                label="后端服务host"
                class="fromtopmag"
                prop="host"
                :rules="apiListItem.serviceType == 'https' ? apiListRules.host : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.host" class="frombigweiht"></el-input>
              </el-form-item>

              <div class="httpweihei">
                <i class="el-icon-info"></i
                ><span
                  >以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter
                  Path，放在${}中，如/user/${userid}</span
                >
              </div>
              <el-form-item
                label="后端服务Path"
                class="fromtopmag"
                prop="path"
                :rules="apiListItem.serviceType == 'https' ? apiListRules.path : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.path" class="frombigweiht"></el-input>
              </el-form-item>
            </div>

            <!-- <div v-if="apiListItem.serviceType === 'dubbo'">
            <el-form-item label="数据源" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="服务" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="应用" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="组" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="版本" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="方法" class="fromtopmag" prop="apiAddress">
              <el-input type="input" v-model="apiList.apiAddress" class="frombigweiht"></el-input>
            </el-form-item>
          </div> -->

            <div v-if="apiListItem.serviceType === 'TCP'">
              <div class="httpweihei">
                <i class="el-icon-info"></i
                ><span>直接输入{地址:端口号}，地址可以输入IP地址或者域名地址，地址和端口号都必填</span>
              </div>
              <el-form-item
                label="后端服务地址"
                class="fromtopmag"
                prop="host"
                :rules="apiListItem.serviceType == 'TCP' ? apiListRules.host : [{ required: false }]"
              >
                <el-input type="input" v-model="apiListItem.host" class="frombigweiht"></el-input>
              </el-form-item>
            </div>
          </el-form>

          <div class="pilangflex">
            <h3>请求参数</h3>
            <div class="butflexcz">
              <el-button class="butczwh" type="primary" @click="addtableitem()">新增参数</el-button>
              <el-dropdown trigger="click" class="piliangfz">
                <el-button type="text" class="piliangbut">
                  批量操作<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="buttblok" @click.native="parameterExcel(1)">Excel导入</el-dropdown-item>
                  <el-dropdown-item class="buttblok" @click.native="deleteParameterlist">批量删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <el-form :model="requestForm" ref="requestForm" :rules="requestRules">
            <el-table
              :data="requestForm.parameterList"
              style="width: 100%"
              :header-cell-style="{
                background: '#E6F7FF',
                fontWeight: '600',
                color: '#333333',
                fontSize: '14px'
              }"
              @selection-change="handleSelectAsk"
              :row-class-name="tableRowClassNameAsk"
            >
              <el-table-column type="selection" align="center" width="55"> </el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <span>{{ $index + 1 }}</span>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="parameterName" label="参数名称" width="230">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameterList.' + $index + '.parameterName'"
                    :rules="requestRules.parameterName"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-input v-model="row.parameterName" size="small" placeholder="xxx"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column prop="required" label="是否必填" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameterList.' + $index + '.required'"
                    :rules="requestRules.required"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.required" size="small" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameterList.' + $index + '.type'"
                    :rules="requestRules.type"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.type" size="small" placeholder="请选择">
                      <el-option
                        :label="paraitem.text"
                        :value="paraitem.text"
                        v-for="(paraitem, index) in datefromList.fieldDataType"
                        :key="paraitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameterList.' + $index + '.defaultValue'"
                    :rules="requestRules.defaultValue"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-input v-model="row.defaultValue" size="small" placeholder="XXX"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="describetion" label="描述" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-input v-model="row.describetion" size="small" placeholder="XXX"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="parameterLocation" label="参数位置" width="180" class="dataLis-demo">
                <div class="demo"></div>
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameterList.' + $index + '.parameterLocation'"
                    :rules="requestRules.parameterLocation"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.parameterLocation" size="small" placeholder="请选择">
                      <el-option
                        :label="parameter.text"
                        :value="parameter.text"
                        v-for="(parameter, index) in datefromList.parameterLocation"
                        :key="parameter.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-button type="text" @click="DeleteRowApk($index, requestForm.parameterList)">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <div class="pilangflex">
            <h3>返回参数</h3>
            <div class="butflexcz">
              <el-button class="butczwh" type="primary" @click="addtableBackItem()">新增参数</el-button>
              <el-dropdown trigger="click" class="piliangfz dropdownwei">
                <el-button type="text" class="piliangbut">
                  批量操作<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="buttblok" @click.native="parameterExcel(2)">Excel导入</el-dropdown-item>
                  <el-dropdown-item class="buttblok" @click.native="deleteBackList">批量删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>

          <el-form :model="returnForm" ref="returnForm" :rules="returnFormRules">
            <el-table
              :data="returnForm.parameteReturnList"
              style="width: 100%"
              :header-cell-style="{
                background: '#E6F7FF',
                fontWeight: '600',
                color: '#333333',
                fontSize: '14px'
              }"
              @selection-change="handleSelectBack"
              :row-class-name="tableRowClassNameBack"
            >
              <el-table-column type="selection" align="center" width="55"> </el-table-column>
              <el-table-column label="序号" width="60">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <span>{{ $index + 1 }}</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="parameterName" label="参数名称" width="230">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameteReturnList.' + $index + '.parameterName'"
                    :rules="returnFormRules.parameterName"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-input v-model="row.parameterName" size="small" placeholder="xxx"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="required" label="是否必填" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameteReturnList.' + $index + '.required'"
                    :rules="returnFormRules.required"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.required" size="small" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="类型" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameteReturnList.' + $index + '.type'"
                    :rules="returnFormRules.type"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.type" size="small" placeholder="请选择">
                      <el-option
                        :label="paraitem.text"
                        :value="paraitem.text"
                        v-for="(paraitem, index) in datefromList.fieldDataType"
                        :key="paraitem.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="defaultValue" label="默认值" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameteReturnList.' + $index + '.defaultValue'"
                    :rules="returnFormRules.defaultValue"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-input v-model="row.defaultValue" size="small" placeholder="XXX"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="describetion" label="描述" width="180">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-input v-model="row.describetion" size="small" placeholder="XXX"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="parameterLocation" label="参数位置" width="180" class="columuItem">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'parameteReturnList.' + $index + '.parameterLocation'"
                    :rules="returnFormRules.parameterLocation"
                    class="dataLis-demo"
                  >
                    <div class="demo"></div>
                    <el-select v-model="row.parameterLocation" size="small" placeholder="请选择">
                      <el-option
                        :label="parameter.text"
                        :value="parameter.text"
                        v-for="(parameter, index) in datefromList.parameterLocation"
                        :key="parameter.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="{ row, $index }">
                  <el-form-item>
                    <el-button type="text" @click="DeleteRowApk($index, returnForm.parameteReturnList)">删除</el-button>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-form
            size="small"
            ref="example"
            :rules="exampleRules"
            :label-position="labelPosition"
            :model="example"
            class="frommaglef"
          >
            <h3 class="footmag">请求示例</h3>
            <el-form-item prop="requestExample">
              <!-- :rules="example.requestExample != '' ? exampleRules.requestExample : [{ required: false }]" -->
              <el-input
                type="textarea"
                :rows="3"
                maxlength="300"
                v-model="example.requestExample"
                placeholder="请输入（20字以上）"
                class="footweiht"
              ></el-input>
            </el-form-item>
            <h3 class="footmag">返回示例</h3>
            <el-form-item prop="returnExample">
              <!-- :rules="example.returnExample != '' ? exampleRules.returnExample : [{ required: false }]" -->
              <el-input
                type="textarea"
                :rows="3"
                maxlength="300"
                v-model="example.returnExample"
                placeholder="请输入（20字以上）"
                class="footweiht"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>

    <el-card class="cardpadmargtop">
      <el-row>
        <el-col :span="6" :offset="20">
          <div class="flootdivmag">
            <el-button size="small" type="primary" :disabled="isShowDisabled" @click="isShowSave = true"
              >保存</el-button
            >
            <el-button size="small" @click="toShenhe">提交审核</el-button>
            <el-button size="small" @click="cancelAddServ = true">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 提交审核的弹框 -->
      <el-dialog title="提示" :visible.sync="isExamineDialogVisible" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确定提交该编目审核?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddSubmit" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" :disabled="loadSubmit" :loading="loadSubmit" @click="addSubmit">{{
            loadSubmit ? '提交中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>

      <!-- 数据结构导入弹框 -->
      <el-dialog title="数据结构导入数据项" :visible.sync="isDataStructure" width="45%">
        <el-divider></el-divider>
        <div class="dialogmarg">
          <el-form label-width="80">
            <el-form-item label="数据结构：">
              <el-input type="textarea" :rows="12" class="fromiteminptwh" v-model="form.desc"></el-input>
              <p>提示：单次仅支持解析单张数据表结构，多张表请分多次上传！</p>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isDataStructure = false">取 消</el-button>
          <el-button type="primary" @click="isDataStructure = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 数据库导入 -->
      <el-dialog title="数据库导入数据项" :visible.sync="isDatabaseImport">
        <el-divider></el-divider>
        <div class="dialogmargdaoru">
          <el-form :model="form" label-width="120px" label-position="left">
            <el-form-item label="数据源：">
              <el-select v-model="form.region" placeholder="请选择数据源" class="fromweihtbig">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据库中文名：">
              <el-select v-model="form.region" placeholder="请选择数据表" class="fromweihtbig">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="数据表：">
              <el-input v-model="form.name" placeholder="自动填充" class="fromweihtbig"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isDatabaseImport = false">取 消</el-button>
          <el-button type="primary" @click="isDatabaseImport = false">确 定</el-button>
        </div>
      </el-dialog>

      <!-- excle导入 -->
      <ExcelLeadingin
        ref="excelLeadingin"
        v-if="isExcleLeadingin"
        :isExcleLeadingin="isExcleLeadingin"
        @changeExcleLeadingin="changeExcleLeadingin"
        @importExcelList="importExcelList"
      ></ExcelLeadingin>

      <!-- 接口-请求参数-导入 -->
      <el-dialog title="Excel导入" class="dialoghei" :visible.sync="isAskExport" width="30%">
        <el-divider></el-divider>
        <div class="dialogmarg centerupload">
          <el-upload
            drag
            class="upload-demo"
            ref="upload"
            name="file"
            :limit="1"
            action="/dtwave-om/api/cataLog/importParameterExcel"
            accept=".xls,.xlsx"
            :headers="headerObj"
            :on-success="uploadSuccessExcel"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击图标选择Excel文件上传</div>
            <div class="el-upload__tip exceluploaddiv" slot="tip">
              点击 <span class="mbcolor" @click="downloadmu" style="cursor: pointer"> 模版 </span> 下载数据目录模版
            </div>
          </el-upload>
        </div>
        <div class="buttonflex">
          <el-button size="small" class="buttonmargin" @click="cleanAskExport">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            class="buttonrigth"
            :disabled="isdisabled"
            @click="importParameterExcel"
            >{{ uploading ? '解析中...' : '提交解析' }}</el-button
          >
        </div>
      </el-dialog>

      <!-- 保存 -->
      <el-dialog title="保存提示" :visible.sync="isShowSave" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确认保存?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSave" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" :loading="loadSave" @click="save()">{{
            loadSave ? '提交中...' : '确认'
          }}</el-button>
        </span>
      </el-dialog>
      <!-- 取消 -->
      <el-dialog title="提示" :visible.sync="cancelAddServ" width="30%">
        <el-divider></el-divider>
        <p class="dialogcenter">是否确认取消编辑?</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddServ = false" size="small" class="deletmarg">取 消</el-button>
          <el-button type="primary" size="small" @click="cancelAdd">确 认</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ExcelLeadingin from '@/views/datefrom/components/ExcelLeadingin'
import {
  getDictItems,
  postlistDatabase,
  getTargetcopy,
  postRelationType,
  postAddSave,
  getaddNewget,
  postsubmitCatalog,
  postUpdate,
  deleteParameter,
  queryUserUnit,
  queryUserMassge,
  mechanismTree,
  queryAppName,
  postRelationTypeCopy,
  syncApi
} from '@/api/api'
import { download } from '@/api/manage'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'AddOrModify',
  components: {
    ExcelLeadingin
  },
  data() {
    let blurEn = (rule, value, callback) => {
      let engl = /[\u4E00-\u9FA5]/g
      if (!engl.test(value)) {
        callback()
      } else {
        callback(new Error('格式错误，仅支持输入字母、数字、空格'))
      }
    }
    let checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(value)) {
        callback(new Error('格式错误，请输入正确的11位手机号'))
      } else {
        callback()
      }
    }
    let checkApiName = (rule, value, callback) => {
      let apiItem = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
      if (!apiItem.test(value)) {
        callback(new Error('请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位'))
      } else {
        callback()
      }
    }
    let isShowNumber = (rule, value, callback) => {
      // console.log(this.tableForm.dataList.dataType);
      // console.log(this.tableForm.dataList.dataLength);
      // if (this.tableForm.dataList.dataType == '小数') {
      //   console.log('小数');
      //   if (value > 65) {
      //     callback(new Error('数据类型为‘小数’，数据长度最大为65'))
      //   } else if (value < 0) {
      //     callback(new Error('大小要在0到65'))
      //   } else {
      //     callback()
      //   }
      // } else {
      //   console.log('!小数');
        if (value > 10000) {
          callback(new Error('大小要在0到10000'))
        } else if (value < 0) {
          callback(new Error('大小要在0到10000'))
        } else {
          callback()
        }
      // }
    }
    let changeApiRoute = (rule, value, callback) => {
      let Route = /^[/][A-Za-z0-9_-_/]*$/g
      if (!Route.test(value)) {
        callback(new Error('以/开头，支持英文、数字、下划线、连字符(-)，不超过200个字符，例如：/a1'))
      } else {
        callback()
      }
    }
    let isShowHost = (rule, value, callback) => {
      if (this.apiListItem.serviceType == 'WebService') {
        let Route = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
        if (!Route.test(value)) {
          callback(new Error('请输入正确的调用地址'))
        } else {
          callback()
        }
      } else if (this.apiListItem.serviceType === 'http') {
        let routeHttp = /^http:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
        if (!routeHttp.test(value)) {
          callback(new Error('以http://开头，且不包含Path'))
        } else {
          callback()
        }
      } else if (this.apiListItem.serviceType === 'https') {
        let routeHttps = /^https:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i
        if (!routeHttps.test(value)) {
          callback(new Error('以https://开头，且不包含Path'))
        } else {
          callback()
        }
      } else if (this.apiListItem.serviceType === 'TCP') {
        let routeTCP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
        if (!routeTCP.test(value)) {
          callback(new Error('请输入后端服务地址，格式为：地址:端口号'))
        } else {
          callback()
        }
      }
    }
    let isShowPath = (rule, value, callback) => {
      let routePath = /^[/]/g
      if (!routePath.test(value)) {
        callback(
          new Error(
            '以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter Path，放在${}中，如/user/${userid}'
          )
        )
      } else {
        // callback()
        let pathChina = /[\u4E00-\u9FA5]/g
        if (!pathChina.test(value)) {
          callback()
        } else {
          callback(
            new Error(
              '以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter Path，放在${}中，如/user/${userid}'
            )
          )
        }
      }
    }

    return {
      // 导入模板
      impTemplate: 'import_template_file_name',
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value
      },
      citys: [],
      loading: false,
      loadSave: false,
      loadSubmit: false,
      isShowDisabled: false,

      cancelAddServ: false,
      tableData: [],
      obj: {},
      input: '',
      labelPosition: 'left',
      // 保存
      isShowSave: false,
      // 数据字典
      dataDictionary: {
        // 数源应用系统
        system: 'source_system',
        // 数源单位
        source: 'source_unit',
        // 共享类型
        sharetype: 'share_type',
        // 开放类型
        opentype: 'open_type',
        // 是否对社会开放
        opensociety: 'open_society',
        // 重点领域分类
        keyareastype: 'key_areas_type',
        // 业务责任科室
        department: 'business_department',
        // 更新频率
        frequency: 'update_frequency',
        //是否生成数据集
        dataset: 'generate_dataset',
        // 事项类型
        eventType: 'event_type',
        // 事项层级
        classification: 'event_classification',
        // 行使层级
        exercise: 'driving_level',
        // 结果类型
        resultType: 'result_type',
        // 应用场景
        scenario: 'application_scenario',
        // 应用场景描述
        description: 'scenario_description',
        // 提供渠道
        channels: 'provide_channels',
        // 数据格式
        dataFormat: 'data_format',
        // 共享属性
        property: 'share_property',
        // 开放属性
        openproperties: 'open_properties',
        // 是否主键
        // primaryKey: 'primary_key',
        // 是否可为空
        empty: 'can_it_be_empty',
        // 数据对象
        dataObject: 'data_object',
        // 请求方式
        requestMode: 'request_mode',
        // 响应类型
        responseType: 'response_type',
        // 请求数据类型
        requestDataType: 'request_data_type',
        // 	后端服务请求
        serviceRequest: 'service_request',
        // 参数类型
        paraType: 'para_type',
        // 	参数位置
        parameterLocation: 'parameter_location',
        // 	数据级别
        dataLevel: 'data_level',
        // 	数据类型
        fieldDataType: 'field_data_type'
      },
      // 导入
      isExportId: '',
      isAskExport: false,
      resbodyList: {},
      file: '',
      errmesg: [],
      result: '',
      fileName: '',
      filename: '',
      uploading: false,
      isdisabled: true,
      downloadName: '编目导入模板.xlsx',
      // 请求参数删除
      deleteDraft: false,
      deleteBack: false,

      form: { desc: '' },
      fromdat: '',
      // form: { resource: '' }
      multipleSelection: [],

      // 提交审核的弹框
      isExamineDialogVisible: false,
      // 数据结构导入弹框
      isDataStructure: false,
      // 数据库导入
      isDatabaseImport: false,
      // excle导入
      isExcleLeadingin: false,
      // 更新频率
      aWeek: [
        {
          value: '周一',
          label: '周一'
        },
        {
          value: '周二',
          label: '周二'
        },
        {
          value: '周三',
          label: '周三'
        },
        {
          value: '周四',
          label: '周四'
        },
        {
          value: '周五',
          label: '周五'
        },
        {
          value: '周六',
          label: '周六'
        },
        {
          value: '周日',
          label: '周日'
        }
      ],
      january: [
        {
          value: '1号',
          label: '1号'
        },
        {
          value: '2号',
          label: '2号'
        },
        {
          value: '3号',
          label: '3号'
        },
        {
          value: '4号',
          label: '4号'
        },
        {
          value: '5号',
          label: '5号'
        },
        {
          value: '6号',
          label: '6号'
        },
        {
          value: '7号',
          label: '7号'
        },
        {
          value: '8号',
          label: '8号'
        },
        {
          value: '9号',
          label: '9号'
        },
        {
          value: '10号',
          label: '10号'
        },
        {
          value: '11号',
          label: '11号'
        },
        {
          value: '12号',
          label: '12号'
        },
        {
          value: '13号',
          label: '13号'
        },
        {
          value: '14号',
          label: '14号'
        },
        {
          value: '15号',
          label: '15号'
        },
        {
          value: '16号',
          label: '16号'
        },
        {
          value: '17号',
          label: '17号'
        },
        {
          value: '18号',
          label: '18号'
        },
        {
          value: '19号',
          label: '19号'
        },
        {
          value: '20号',
          label: '20号'
        },
        {
          value: '21号',
          label: '21号'
        },
        {
          value: '22号',
          label: '22号'
        },
        {
          value: '23号',
          label: '23号'
        },
        {
          value: '24号',
          label: '24号'
        },
        {
          value: '25号',
          label: '25号'
        },
        {
          value: '26号',
          label: '26号'
        },
        {
          value: '27号',
          label: '27号'
        },
        {
          value: '28号',
          label: '28号'
        },
        {
          value: '29号',
          label: '29号'
        },
        {
          value: '30号',
          label: '30号'
        },
        {
          value: '31号',
          label: '31号'
        }
      ],
      quarter: [
        {
          value: '第一个月',
          label: '第一个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第二个月',
          label: '第二个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第三个月',
          label: '第三个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        }
      ],
      halfaYear: [
        {
          value: '第一个月',
          label: '第一个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第二个月',
          label: '第二个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第三个月',
          label: '第三个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第四个月',
          label: '第四个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第五个月',
          label: '第五个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第六个月',
          label: '第六个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        }
      ],
      wenyear: [
        {
          value: '第一个月',
          label: '第一个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            }
          ]
        },
        {
          value: '第二个月',
          label: '第二个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            }
          ]
        },
        {
          value: '第三个月',
          label: '第三个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第四个月',
          label: '第四个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            }
          ]
        },
        {
          value: '第五个月',
          label: '第五个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第六个月',
          label: '第六个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            }
          ]
        },
        {
          value: '第七个月',
          label: '第七个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第八个月',
          label: '第八个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第九个月',
          label: '第九个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            }
          ]
        },
        {
          value: '第十个月',
          label: '第十个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        },
        {
          value: '第十一个月',
          label: '第十一个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            }
          ]
        },
        {
          value: '第十二个月',
          label: '第十二个月',
          children: [
            {
              value: '1号',
              label: '1号'
            },
            {
              value: '2号',
              label: '2号'
            },
            {
              value: '3号',
              label: '3号'
            },
            {
              value: '4号',
              label: '4号'
            },
            {
              value: '5号',
              label: '5号'
            },
            {
              value: '6号',
              label: '6号'
            },
            {
              value: '7号',
              label: '7号'
            },
            {
              value: '8号',
              label: '8号'
            },
            {
              value: '9号',
              label: '9号'
            },
            {
              value: '10号',
              label: '10号'
            },
            {
              value: '11号',
              label: '11号'
            },
            {
              value: '12号',
              label: '12号'
            },
            {
              value: '13号',
              label: '13号'
            },
            {
              value: '14号',
              label: '14号'
            },
            {
              value: '15号',
              label: '15号'
            },
            {
              value: '16号',
              label: '16号'
            },
            {
              value: '17号',
              label: '17号'
            },
            {
              value: '18号',
              label: '18号'
            },
            {
              value: '19号',
              label: '19号'
            },
            {
              value: '20号',
              label: '20号'
            },
            {
              value: '21号',
              label: '21号'
            },
            {
              value: '22号',
              label: '22号'
            },
            {
              value: '23号',
              label: '23号'
            },
            {
              value: '24号',
              label: '24号'
            },
            {
              value: '25号',
              label: '25号'
            },
            {
              value: '26号',
              label: '26号'
            },
            {
              value: '27号',
              label: '27号'
            },
            {
              value: '28号',
              label: '28号'
            },
            {
              value: '29号',
              label: '29号'
            },
            {
              value: '30号',
              label: '30号'
            },
            {
              value: '31号',
              label: '31号'
            }
          ]
        }
      ],
      minute: [
        { value: '1分钟', label: '1分钟' },
        { value: '2分钟', label: '2分钟' },
        { value: '3分钟', label: '3分钟' },
        { value: '4分钟', label: '4分钟' },
        { value: '5分钟', label: '5分钟' },
        { value: '6分钟', label: '6分钟' },
        { value: '7分钟', label: '7分钟' },
        { value: '8分钟', label: '8分钟' },
        { value: '9分钟', label: '9分钟' },
        { value: '10分钟', label: '10分钟' },
        { value: '11分钟', label: '11分钟' },
        { value: '12分钟', label: '12分钟' },
        { value: '13分钟', label: '13分钟' },
        { value: '14分钟', label: '14分钟' },
        { value: '15分钟', label: '15分钟' },
        { value: '16分钟', label: '16分钟' },
        { value: '17分钟', label: '17分钟' },
        { value: '18分钟', label: '18分钟' },
        { value: '19分钟', label: '19分钟' },
        { value: '20分钟', label: '20分钟' },
        { value: '21分钟', label: '21分钟' },
        { value: '22分钟', label: '22分钟' },
        { value: '23分钟', label: '23分钟' },
        { value: '24分钟', label: '24分钟' },
        { value: '25分钟', label: '25分钟' },
        { value: '26分钟', label: '26分钟' },
        { value: '27分钟', label: '27分钟' },
        { value: '28分钟', label: '28分钟' },
        { value: '29分钟', label: '29分钟' },
        { value: '30分钟', label: '30分钟' },
        { value: '31分钟', label: '31分钟' },
        { value: '32分钟', label: '32分钟' },
        { value: '33分钟', label: '33分钟' },
        { value: '34分钟', label: '34分钟' },
        { value: '35分钟', label: '35分钟' },
        { value: '36分钟', label: '36分钟' },
        { value: '37分钟', label: '37分钟' },
        { value: '38分钟', label: '38分钟' },
        { value: '39分钟', label: '39分钟' },
        { value: '40分钟', label: '40分钟' },
        { value: '41分钟', label: '41分钟' },
        { value: '42分钟', label: '42分钟' },
        { value: '43分钟', label: '43分钟' },
        { value: '44分钟', label: '44分钟' },
        { value: '45分钟', label: '45分钟' },
        { value: '46分钟', label: '46分钟' },
        { value: '47分钟', label: '47分钟' },
        { value: '48分钟', label: '48分钟' },
        { value: '49分钟', label: '49分钟' },
        { value: '50分钟', label: '50分钟' },
        { value: '51分钟', label: '51分钟' },
        { value: '52分钟', label: '52分钟' },
        { value: '53分钟', label: '53分钟' },
        { value: '54分钟', label: '54分钟' },
        { value: '55分钟', label: '55分钟' },
        { value: '56分钟', label: '56分钟' },
        { value: '57分钟', label: '57分钟' },
        { value: '58分钟', label: '58分钟' },
        { value: '59分钟', label: '59分钟' }
      ],
      ahour: [
        {
          value: '一小时',
          label: '一小时'
        },
        {
          value: '两小时',
          label: '两小时'
        },
        {
          value: '三小时',
          label: '三小时'
        },
        {
          value: '四小时',
          label: '四小时'
        },
        {
          value: '五小时',
          label: '五小时'
        },
        {
          value: '六小时',
          label: '六小时'
        },
        {
          value: '七小时',
          label: '七小时'
        },
        {
          value: '八小时',
          label: '八小时'
        },
        {
          value: '九小时',
          label: '九小时'
        },
        {
          value: '十小时',
          label: '十小时'
        },
        {
          value: '十一小时',
          label: '十一小时'
        },
        {
          value: '十二小时',
          label: '十二小时'
        }
      ],
      props: { multiple: true, checkStrictly: true },
      options: [
        {
          value: '全国',
          label: '全国'
        },
        {
          value: '全省',
          label: '全省'
        },
        {
          value: '全市',
          label: '全市',
          children: [
            { value: '市级', label: '市级' },
            { value: '孝南区', label: '孝南区' },
            { value: '孝昌县', label: '孝昌县' },
            { value: '大悟县', label: '大悟县' },
            { value: '云梦县', label: '云梦县' },
            { value: '应城市', label: '应城市' },
            { value: '安陆市', label: '安陆市' },
            { value: '汉川市', label: '汉川市' }
          ]
        }
      ],
      formLabelAlign: {
        // isCopy: '',
        // allowNull: '', //保存
        catalogName: '', //信息资源名称
        catalogEn: '', //信息资源英文名称
        sourceUnit: '', //数源单位
        sourceSystem: '', //数源应用系统
        notAssociatedReason: '', //未关联系统理由
        shareType: '', //共享类型
        shareCondition: '', //共享条件
        dontShareCondition: '', //不予共享条件
        openType: '', //开放类型
        openSociety: '2', //是否对社会开放
        keyAreasType: '', //重点领域分类
        keyAreasRemark: '', //重点领域分类备注
        updateFrequency: '', //更新频率
        inputFrequency: '',
        generateDataset: '2',//是否生成数据集
        dataRange: [], //数据范围
        informationSummary: '', //信息资源摘要
        businessDepartment: '1', //业务责任科室
        businessPerson: '', //业务责任人
        contactInformation: '', //联系方式
        relatedGovernment: '', //是否关联政务服务事项
        businessCode: '', //业务办理事项编码
        businessName: '', //业务办理事项名称
        eventType: '', //事项类型
        eventLevel: '', //事项层级
        directoryCode: '', //事项基本目录编码
        itemData: '', //数据所属事项名称
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        drivingLevel: '', //行驶层级
        resultType: '', //结果类型
        applicationScenario: '', //应用场景
        applicationScenarioDescribe: '', //应用场景描述
        provideChannels: '', //提供渠道
        electronicLicense: '', //是否电子证照
        baseLibrary: '', //是否关联基础/专题库
        relatedCategories: '1', //是否关联类目
        categoryClassification: '', //类目分类
        dataFormat: '', //数据格式

        apiList: [
          //数据格式-接口
          // {
          //   apiName: '', //接口名称
          //   responseType: '', //响应类型
          //   requestMode: '', //请求方式
          //   requestType: '', //请求数据类型
          //   apiRoute: '', //API路径
          //   apiDescribe: '', //接口描述
          //   requestExample: '', //请求示例
          //   returnExample: '', //返回示例
          //   catalogId: '',
          //   id: '',
          //   serviceType: '', //后端服务请求
          //   host: '', //调用地址      //后端服务host
          //   method: '', //调用方法名称
          //   namespace: '', //命名空间
          //   path: '', //后端服务Path
          //   parameterList: [
          //     //数据格式-接口-表格-请求参数
          //     {
          //       catalogApiId: '', //编目接口表id
          //       parameterName: '', //参数名称
          //       required: '', //是否必填
          //       type: '', //类型
          //       defaultValue: '', //默认值
          //       describetion: '', //描述
          //       parameterLocation: '', //参数位置
          //       // parameterType: '', //请求返回类别
          //       id: ''
          //     }
          //   ],
          //   parameteReturnList: [
          //     //数据格式-接口-表格-返回参数
          //     {
          //       catalogApiId: '', //编目接口表id
          //       parameterName: '', //参数名称
          //       required: '', //是否必填
          //       type: '', //类型
          //       defaultValue: '', //默认值
          //       describetion: '', //描述
          //       parameterLocation: '', //参数位置
          //       // parameterType: '', //请求返回类别
          //       id: ''
          //     }
          //   ]
          // }
        ],

        bmCatalogDataSource: {
          catalogId: '',
          databaseName: '', //数据源名称//库名
          sqDataSourceId: '', //数栖id
          tableName: '' //表名
        },
        cataStatus: 0,
        createdBy: '',
        createdTime: '',
        dataList: [
          //数据项
          // {
          //   name: '', //中文名称
          //   enName: '', //英文名称
          //   dataType: '', //数据类型
          //   dataLength: '', //数据长度
          //   dataDictionary: '', //数据字典项
          //   defaultValue: '', //默认值
          //   shareProperty: '', //共享属性
          //   sharingCondition: '', //共享条件
          //   openAttribute: '', //开放属性
          //   nullValue: '', //是否可为空
          //   dataObject: '', //数据对象
          //   dataLevel: '', //数据级别
          //   fieldDescription: '', //字段描述
          //   id: ''
          // }
        ],
        id: '',
        imputationStatus: 0,
        releaseBy: '',
        releaseTime: '',
        status: 0, //编目状态(10新增;20编辑，90删除)
        updateBy: '',
        updateTime: ''
      },
      related: {
        relatedGovernment: ''
      },
      // 是否关联政务服务事项
      alignItem: {
        businessCode: '', //业务办理事项编码
        businessName: '', //业务办理事项名称
        eventType: '', //事项类型
        eventLevel: '', //事项层级
        directoryCode: '', //事项基本目录编码
        itemData: '', //数据所属事项名称
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        drivingLevel: '', //行驶层级
        resultType: '', //结果类型
        applicationScenario: '', //应用场景
        applicationScenarioDescribe: '', //应用场景描述
        provideChannels: '', //提供渠道
        electronicLicense: '' //是否电子证照
      },
      //是否关联基础/专题库
      Library: {
        baseLibrary: '', //是否关联基础库/专题库
        categoryClassification: '' //类目分类
      },
      // 数据格式
      labeldataForm: { dataFormat: '' },
      bmCatalogDataSource: {
        catalogId: '',
        databaseName: '', //数据源名称//库名
        sqDataSourceId: '', //数栖id
        tableName: '' //表名
      },
      // 数据项
      tableForm: {
        dataList: [
          //数据项
          {
            name: '', //中文名称
            enName: '', //英文名称
            dataType: '', //数据类型
            dataLength: '', //数据长度
            dataDictionary: '', //数据字典项
            defaultValue: '', //默认值
            shareProperty: '', //共享属性
            sharingCondition: '', //共享条件
            openAttribute: '', //开放属性
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      },
      // 数据格式-接口
      apiList: [
        //数据格式-接口
      ],
      apiListItem: {
        apiName: '', //接口名称
        responseType: '', //响应类型
        requestMode: '', //请求方式
        requestType: '', //请求数据类型
        apiRoute: '', //API路径
        apiDescribe: '', //接口描述
        requestExample: '', //请求示例
        returnExample: '', //返回示例
        catalogId: '',
        id: '',

        serviceType: '', //后端服务请求
        host: '', //调用地址      //后端服务host
        method: '', //调用方法名称
        namespace: '', //命名空间
        path: '', //后端服务Path
        parameterList: [],
        parameteReturnList: []
      },
      requestForm: {
        parameterList: [
          //数据格式-接口-表格-请求参数
          {
            catalogApiId: '', //编目接口表id
            parameterName: '', //参数名称
            required: '', //是否必填
            type: '', //类型
            defaultValue: '', //默认值
            describetion: '', //描述
            parameterLocation: '', //参数位置
            // parameterType: '', //请求返回类别
            id: ''
          }
        ]
      },
      returnForm: {
        parameteReturnList: [
          //数据格式-接口-表格-返回参数
          {
            catalogApiId: '', //编目接口表id
            parameterName: '', //参数名称
            required: '', //是否必填
            type: '', //类型
            defaultValue: '', //默认值
            describetion: '', //描述
            parameterLocation: '', //参数位置
            // parameterType: '', //请求返回类别
            id: ''
          }
        ]
      },
      example: {
        requestExample: '',
        returnExample: ''
      },
      // 数源单位
      sourceUnitItem: [],
      sourceList: [],

      addId: '',
      // 基础库
      baseLibraryList: [],
      // 专题库
      categoryList: [],
      // 数据库名
      databaseNameList: [],
      tableType: [],
      // 对应库表格
      tableList: [],
      // 表单目录
      selectID: [],
      // 请求表格选中
      isAskID: [],
      // 返回表格选中
      isBackID: [],
      // 选中的数据
      checkedDetail: [],
      checkedDetailAsk: [],
      checkedDetailBack: [],
      // 新增
      loadId: '',
      // 编辑
      modifyId: '',
      // 复制
      newgetid: '',
      toExamine: false,
      // 草稿箱编辑
      modifyIdDraft: '',
      // 表单校验
      formLabelAlignRules: {
        catalogName: [{ required: true, message: '请输入信息资源名称', trigger: 'blur' }],
        catalogEn: [{ required: true, validator: blurEn, message: '请输入信息资源英文名称', trigger: 'blur' }],
        // catalogEn: [{ required: true, message: '请输入信息资源英文名称', trigger: 'blur' }],
        // sourceUnit: [{ required: true, message: '请选择数源单位', trigger: 'change' }],
        sourceSystem: [{ required: true, message: '请选择数源应用系统', trigger: 'change' }], //调试注释
        shareType: [{ required: true, message: '请选择共享类型', trigger: 'change' }],
        shareCondition: [{ required: true, message: '请输入共享条件', trigger: 'change' }],
        dontShareCondition: [{ required: true, message: '请输入不予共享条件', trigger: 'change' }],
        openType: [{ required: true, message: '请选择开放类型', trigger: 'change' }],
        // openSociety: [{ required: true, message: '请选择是否对社会开放', trigger: 'change' }],
        keyAreasType: [{ required: true, message: '请选择重点领域分类', trigger: 'change' }],
        keyAreasRemark: [{ required: true, message: '请输入重点领域分类备注', trigger: 'blur' }],
        updateFrequency: [{ required: true, message: '请选择更新频率', trigger: 'change' }],
        dataRange: [{ required: true, message: '请选择数据范围', trigger: 'change' }],
        informationSummary: [
          { required: true, message: '请输入信息资源摘要', trigger: 'blur' },
          {
            min: 5,
            message: '请输入5字以上',
            trigger: 'blur'
          }
        ]
        // businessDepartment: [{ required: true, message: '请选择业务责任科室', trigger: 'change' }],
        // businessPerson: [{ required: true, message: '请输入业务责任人', trigger: 'blur' }],
        // contactInformation: [{ required: true, validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' }]
        //
      },
      relatedrules: {
        relatedGovernment: [{ required: true, message: '请选择是否关联政务服务事项', trigger: 'change' }]
      },

      alignItemrules: {
        businessCode: [{ required: true, message: '请输入业务办理项编码', trigger: 'blur' }],
        businessName: [{ required: true, message: '请输入业务办理事项名称', trigger: 'blur' }],
        directoryCode: [{ required: true, message: '请输入事项基本目录编码', trigger: 'blur' }],
        itemData: [{ required: true, message: '请输入数据所属事项名称', trigger: 'blur' }],
        implementationCode: [{ required: true, message: '请输入实施清单编码', trigger: 'blur' }],
        implementationName: [{ required: true, message: '请输入实施清单名称', trigger: 'blur' }],
        resultType: [{ required: true, message: '请选择结果类型', trigger: 'change' }],
        applicationScenario: [{ required: true, message: '请选择应用场景', trigger: 'change' }],
        applicationScenarioDescribe: [{ required: true, message: '请输入应用场景描述', trigger: 'blur' }],
        provideChannels: [{ required: true, message: '请选择提供渠道', trigger: 'change' }]
      },
      libraryRules: {
        baseLibrary: [{ required: true, message: '请选择是否关联基础库/专题库', trigger: 'change' }],
        categoryClassification: [{ required: true, message: '请选择分类', trigger: 'change' }]
      },
      // labelPositionRules: {
      // dataFormat: [{ required: true, message: '请选择', trigger: 'change' }]
      // },
      bmCatalogDataSourceRules: {
        databaseName: [{ required: true, message: '请选择数据库名', trigger: 'change' }], //调试注释
        tableName: [{ required: true, message: '请选择表名', trigger: ['blur', 'change'] }]
      },
      dataListRules: {
        name: [{ required: true, message: '请输入中文名称', trigger: 'blur' }],
        enName: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
        dataType: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        dataLength: [
          { required: true, message: '请输入数据长度', trigger: 'blur' },
          { validator: isShowNumber, trigger: 'blur' }
        ],
        shareProperty: [{ required: true, message: '请选择共享属性', trigger: 'change' }],
        sharingCondition: [{ required: true, message: '请选择共享条件', trigger: 'change' }],
        openAttribute: [{ required: true, message: '请选择开放属性', trigger: 'change' }],
        // primaryKey: [{ required: true, message: '请选择是否主键选项', trigger: 'change' }],
        nullValue: [{ required: true, message: '请选择是否可为空', trigger: 'change' }],
        // dataObject: [{ required: true, message: '请选择数据对象', trigger: 'change' }],
        // dataLevel: [{ required: true, message: '请选择数据级别', trigger: 'change' }]
      },
      apiListRules: {
        apiName: [
          {
            required: true,
            validator: checkApiName,
            trigger: 'blur'
          },
          // { required: true, message: '请输入信息资源摘要', trigger: 'blur' }
          {
            min: 3,
            max: 128,
            message: '请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位',
            trigger: 'blur'
          }
        ],
        responseType: [{ required: true, message: '请选择响应类型', trigger: 'change' }],
        requestMode: [{ required: true, message: '请选择请求方式', trigger: 'change' }],
        requestType: [{ required: true, message: '请选择请求数据类型', trigger: 'change' }],
        apiRoute: [
          {
            validator: changeApiRoute,
            trigger: 'blur'
          },
          {
            min: 3,
            max: 200,
            message: '以/开头，支持英文、数字、下划线、连字符(-)，不超过200个字符，例如：/a1/b2',
            trigger: 'blur'
          }
        ],
        serviceType: [{ required: true, message: '请选择后端服务请求', trigger: 'change' }],
        host: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          { validator: isShowHost, trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入后端服务Path', trigger: 'blur' },
          { validator: isShowPath, trigger: 'blur' }
        ],
        namespace: [{ required: true, message: '请输入空间命名', trigger: 'blur' }],
        method: [{ required: true, message: '请输入调用方法名称', trigger: 'blur' }],
        apiDescribe: [{ required: true, message: '请输入接口描述', trigger: 'blur' }]
      },
      // 请求参数
      requestRules: {
        parameterName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
        required: [{ required: true, message: '请选择是否必填', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        defaultValue: [{ required: true, message: '请输入默认值', trigger: 'blur' }],
        parameterLocation: [{ required: true, message: '请选择参数位置选项', trigger: 'change' }]
      },
      // 返回参数
      returnFormRules: {
        parameterName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
        required: [{ required: true, message: '请选择是否必填', trigger: 'change' }],
        type: [{ required: true, message: '请选择类型', trigger: 'change' }],
        defaultValue: [{ required: true, message: '请输入默认值', trigger: 'blur' }],
        parameterLocation: [{ required: true, message: '请选择参数位置选项', trigger: 'change' }]
      },

      exampleRules: {
        requestExample: [
          {
            min: 20,
            message: '请输入20字以上',
            trigger: 'blur'
          }
        ],
        returnExample: [
          {
            min: 20,
            message: '请输入20字以上',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  // activated() {
  //   // 新增
  //   this.$bus.$on('addData', val => {
  //     console.log('12')
  //     this.loadId = val
  //     console.log('val', this.loadId)

  //   })
  //   // 编辑
  //   this.$bus.$on('updateAddData', row => {
  //     console.log('12')
  //     this.modifyId = row
  //     console.log('update', this.modifyId)
  //   })
  //   // 复制
  //   this.$bus.$on('copyData', row => {
  //     console.log('12')
  //     this.newgetid = row
  //     console.log('copy', this.newgetid)
  //   })
  //   // 草稿箱
  //   this.$bus.$on('draftbox', row => {
  //     console.log('12')
  //     this.modifyIdDraft = row
  //   })
  // },
  mounted() {
    // 新增页面选择框的数据-请求数据字典得到
    this.dictionaryList()
    // 新增页面-数据格式-数据库的选择框数据请求
    this.listDatabaseList()
    // 新增页面-类目关联-基础库/专题库数据
    this.getTargetcopyinptList()
    this.changeOption(this.formLabelAlign.dataRange)
    // this.getquery()
    this.chanismTree()
    this.sourceSystemList()
    this.getAddData()
  },
  beforeDestroy() {
    this.$bus.$off('addData', 'updateAddData', 'copyData', 'draftbox')
  },
  methods: {
    // 应用系统
    sourceSystemList() {
      queryAppName().then(res => {
        this.sourceList = res.body
      })
    },
    dictionaryList() {
      getDictItems(this.impTemplate).then(res => {
        // 编目导入模板
        let downloadName = res.result.find(fileName => {
          return fileName.text == '编目导入模板'
        })
        this.downloadName = `${downloadName.text}.xlsx`
      })
    },
    // 数源单位
    getquery() {
      queryUserUnit().then(res => {
        if (res.success) {
          if (res.body.length >= 1) {
            this.formLabelAlign.sourceUnit = res.body[0]
            // console.log(this.formLabelAlign.sourceUnit)
          }
        }
      })
    },
    // 业务责任人
    getqueryMassge() {
      queryUserMassge().then(res => {
        if (res.success) {
          this.formLabelAlign.businessPerson = res.body.updateBy
          this.formLabelAlign.contactInformation = res.body.phone
          // console.log(this.formLabelAlign.sourceUnit)
        }
      })
    },

    chanismTree() {
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
      })
    },
    // 英文名shuruhou
    changeEnglish(val) {
      if (this.labeldataForm.dataFormat === 'excel') {
        this.bmCatalogDataSource.tableName = val
        console.log(this.bmCatalogDataSource.tableName)
      }
    },
    // 开放类型
    changeAlign(val) {
      if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
        this.tableForm.dataList.map(item => {
          if (item.openAttribute == '') {
            item.openAttribute = val
          }
        })
      }
      console.log(this.tableForm.dataList)
    },
    // 共享类型
    changeShere(val) {
      console.log('shareProperty', val)
      if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
        this.tableForm.dataList.map(item => {
          if (item.shareProperty == '') {
            item.shareProperty = val
          }
        })
      }
      this.formLabelAlign.shareCondition = ''
      this.formLabelAlign.dontShareCondition = ''
    },
    // 表名加测试
    // testTable(val) {
    //   console.log("336622");
    //   this.bmCatalogDataSource.tableName = 'ceshi' + ' ' + val
    //   console.log(this.bmCatalogDataSource.tableName)
    // },

    // 数据范围
    changeOption(val) {
      let that = this
      if (val == '全国') {
        that.options.forEach((item, index, arr) => {
          if (item.value != val) {
            this.$set(item, 'disabled', true)
            if (item.children) {
              item.children.forEach((item2, index, arr) => {
                this.$set(item2, 'disabled', true)
              })
            }
          }
        })
      } else if (val.length == 0) {
        that.options.forEach((item, index, arr) => {
          this.$set(item, 'disabled', false)
          if (item.children) {
            item.children.forEach((item2, index, arr) => {
              this.$set(item2, 'disabled', false)
            })
          }
        })
      } else if (val == '全省') {
        that.options.forEach((item, index, arr) => {
          if (item.value != val) {
            this.$set(item, 'disabled', true)
            if (item.children) {
              item.children.forEach((item2, index, arr) => {
                this.$set(item2, 'disabled', true)
              })
            }
          }
        })
      } else if (val == '全市') {
        that.options.forEach((item, index, arr) => {
          if (item.value != val) {
            this.$set(item, 'disabled', true)
          }
          if (item.children) {
            item.children.forEach((item2, index, arr) => {
              this.$set(item2, 'disabled', true)
            })
          }
        })
      } else if (val !== '全市' && '全省' && '全国') {
        that.options.forEach((item, index, arr) => {
          if (item.value == '全市' || '全省' || '全国') {
            this.$set(item, 'disabled', true)
          }
        })
        // console.log(val);
        // this.formLabelAlign.dataRange = [[val[0][1]]]
      }
      // console.log(this.formLabelAlign.dataRange);
    },

    changeExcleLeadingin(value) {
      this.isExcleLeadingin = value
    },
    //单个删除数据项
    handleDeleteRow(index, rows) {
      MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          Message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //导入
    onImportDataExcel() {
      this.isExcleLeadingin = true
    },
    // 批量删除选中的数据
    handleDeleteAllDetails() {
      if (typeof this.checkedDetail == 'undefined' || this.checkedDetail.length === 0) {
        MessageBox.confirm('请选择要删除的数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
        MessageBox.confirm('此操作将永久删除该数据,将会删除' + this.checkedDetail.length + '条数据 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const arr1 = []
            for (let i = 0; i < this.checkedDetail.length; i++) {
              arr1.push(this.checkedDetail[i].index)
            }
            arr1.sort(function(a, b) {
              return a - b
            })
            //逐个根据下标删除
            for (let j = 0; j < arr1.length; j++) {
              this.tableForm.dataList.splice(arr1[j] - j - 1, 1)
            }
            Message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 新增参数
    addparameter() {
      if (this.tableForm.dataList == undefined) {
        this.tableForm.dataList = new Array()
      }
      // shareProperty: this.formLabelAlign.shareType, //共享属性

      let newObj = {}
      newObj.dataDictionary = ''
      newObj.dataLength = ''
      newObj.dataLevel = ''
      newObj.dataObject = ''
      newObj.dataType = ''
      newObj.defaultValue = ''
      newObj.enName = ''
      newObj.fieldDescription = ''
      newObj.id = ''
      newObj.name = ''
      newObj.nullValue = ''
      newObj.openAttribute = this.formLabelAlign.openType
      newObj.shareProperty = this.formLabelAlign.shareType
      newObj.sharingCondition = this.formLabelAlign.shareCondition

      this.tableForm.dataList.push(newObj)
    },
    // 新增页面选择框的数据-请求数据字典得到
    dictionaryList() {
      let {
        system,
        source,
        sharetype,
        opentype,
        opensociety,
        keyareastype,
        department,
        frequency,
        eventType,
        classification,
        exercise,
        resultType,
        scenario,
        description,
        channels,
        dataFormat,
        property,
        openproperties,
        empty,
        dataObject,
        requestMode,
        responseType,
        requestDataType,
        serviceRequest,
        paraType,
        parameterLocation,
        dataLevel,
        fieldDataType
      } = this.dataDictionary
      // 数源应用系统
      this.$store.dispatch('getApplicationList', system)
      // 数源单位
      this.$store.dispatch('getShuyuanSourceList', source)
      // 共享类型
      this.$store.dispatch('getSharetypeList', sharetype)
      // 开放类型
      this.$store.dispatch('getOpentypeList', opentype)
      // 是否对社会开放
      this.$store.dispatch('getOpensocietyList', opensociety)
      // 重点领域分类
      this.$store.dispatch('getKeyareastypeList', keyareastype)
      // 业务责任科室
      this.$store.dispatch('getDepartmentList', department)
      // 更新频率
      this.$store.dispatch('getFrequencyList', frequency)
      // 事项类型
      this.$store.dispatch('getEventTypeList', eventType)
      // 事项层级
      this.$store.dispatch('getClassification', classification)
      //   // 行使层级
      this.$store.dispatch('getExercise', exercise)
      //   // 结果类型
      this.$store.dispatch('getResultType', resultType)
      //   // 应用场景
      this.$store.dispatch('getScenario', scenario)
      //   // 应用场景描述
      this.$store.dispatch('getDescription', description)
      //   // 提供渠道
      this.$store.dispatch('getChannels', channels)
      //   // 数据格式
      this.$store.dispatch('getDataFormat', dataFormat)
      //   // 共享属性
      this.$store.dispatch('getProperty', property)
      //   // 开放属性
      this.$store.dispatch('getOpenproperties', openproperties)
      //   // 是否主键
      // this.$store.dispatch('getPrimaryKey', primaryKey)
      //   // 是否可为空
      this.$store.dispatch('getEmptyList', empty)
      //   // 数据对象
      this.$store.dispatch('getDataObject', dataObject)
      // 请求方式
      // requestMode,
      this.$store.dispatch('getRequestMode', requestMode)
      // 响应类型
      // responseType
      this.$store.dispatch('getResponseType', responseType)
      // 请求数据类型
      // requestDataType
      this.$store.dispatch('getRequestDataType', requestDataType)
      // 	后端服务请求
      this.$store.dispatch('getServiceRequest', serviceRequest)
      // 参数类型
      this.$store.dispatch('getParaType', paraType)
      // 	参数位置
      this.$store.dispatch('getParameterLocation', parameterLocation)
      // 	数据级别
      this.$store.dispatch('getDataLevel', dataLevel)
      // 	数据类型
      this.$store.dispatch('getFieldDataType', fieldDataType)
    },
    // 点击数据格式
    changedataFormat(val) {
      if (val == 'excel') {
        this.listDatabaseList()
        this.apiList = []
        this.apiListItem = {
          apiName: '', //接口名称
          responseType: '', //响应类型
          requestMode: '', //请求方式
          requestType: '', //请求数据类型
          apiRoute: '', //API路径
          apiDescribe: '', //接口描述
          requestExample: '', //请求示例
          returnExample: '', //返回示例
          catalogId: '',
          id: '',

          serviceType: '', //后端服务请求
          host: '', //调用地址      //后端服务host
          method: '', //调用方法名称
          namespace: '', //命名空间
          path: '', //后端服务Path
          parameterList: [],
          parameteReturnList: []
        }
        this.bmCatalogDataSource = {
          catalogId: '',
          databaseName: '', //数据源名称//库名
          sqDataSourceId: '', //数栖id
          tableName: this.formLabelAlign.catalogEn //表名
        }
        this.tableForm.dataList = [
          //数据项
          {
            name: '', //中文名称
            enName: '', //英文名称
            dataType: '', //数据类型
            dataLength: '', //数据长度
            dataDictionary: '', //数据字典项
            defaultValue: '', //默认值
            shareProperty: this.formLabelAlign.shareType, //共享属性
            sharingCondition: this.formLabelAlign.shareCondition, //共享条件
            openAttribute: this.formLabelAlign.openType, //开放属性
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      }
      if (val == '数据库') {
        this.listDatabaseList()
        this.apiList = []
        this.apiListItem = {
          apiName: '', //接口名称
          responseType: '', //响应类型
          requestMode: '', //请求方式
          requestType: '', //请求数据类型
          apiRoute: '', //API路径
          apiDescribe: '', //接口描述
          requestExample: '', //请求示例
          returnExample: '', //返回示例
          catalogId: '',
          id: '',

          serviceType: '', //后端服务请求
          host: '', //调用地址      //后端服务host
          method: '', //调用方法名称
          namespace: '', //命名空间
          path: '', //后端服务Path
          parameterList: [],
          parameteReturnList: []
        }
        this.bmCatalogDataSource = {
          catalogId: '',
          databaseName: '', //数据源名称//库名
          sqDataSourceId: '', //数栖id
          tableName: '' //表名
        }
        this.tableForm.dataList = [
          //数据项
          {
            name: '', //中文名称
            enName: '', //英文名称
            dataType: '', //数据类型
            dataLength: '', //数据长度
            dataDictionary: '', //数据字典项
            defaultValue: '', //默认值
            shareProperty: this.formLabelAlign.shareType, //共享属性
            sharingCondition: this.formLabelAlign.shareCondition, //共享条件
            openAttribute: this.formLabelAlign.openType, //开放属性
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      }
      if (val == '接口') {
        this.apiList = [
          //数据格式-接口
        ]
        this.apiListItem = {
          apiName: '', //接口名称
          responseType: '', //响应类型
          requestMode: '', //请求方式
          requestType: '', //请求数据类型
          apiRoute: '', //API路径
          apiDescribe: '', //接口描述
          requestExample: '', //请求示例
          returnExample: '', //返回示例
          catalogId: '',
          id: '',

          serviceType: '', //后端服务请求
          host: '', //调用地址      //后端服务host
          method: '', //调用方法名称
          namespace: '', //命名空间
          path: '', //后端服务Path
          parameterList: [],
          parameteReturnList: []
        }
        this.requestForm.parameterList = [
          //数据格式-接口-表格-请求参数
          {
            catalogApiId: '', //编目接口表id
            parameterName: '', //参数名称
            required: '', //是否必填
            type: '', //类型
            defaultValue: '', //默认值
            describetion: '', //描述
            parameterLocation: '', //参数位置
            // parameterType: '', //请求返回类别
            id: ''
          }
        ]
        this.returnForm.parameteReturnList = [
          //数据格式-接口-表格-返回参数
          {
            catalogApiId: '', //编目接口表id
            parameterName: '', //参数名称
            required: '', //是否必填
            type: '', //类型
            defaultValue: '', //默认值
            describetion: '', //描述
            parameterLocation: '', //参数位置
            // parameterType: '', //请求返回类别
            id: ''
          }
        ]
        this.bmCatalogDataSource.databaseName = ''
        this.bmCatalogDataSource.sqDataSourceId = ''
        this.bmCatalogDataSource.tableName = ''
        this.tableForm.dataList = [
          //数据项
          {
            name: '', //中文名称
            enName: '', //英文名称
            dataType: '', //数据类型
            dataLength: '', //数据长度
            dataDictionary: '', //数据字典项
            defaultValue: '', //默认值
            shareProperty: '', //共享属性
            sharingCondition: '', //共享条件
            openAttribute: '', //开放属性
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      }
    },
    // 数据格式清除
    clearselect() {
      // console.log("336699");
      this.apiList = []
      this.apiListItem = {}
      this.requestForm.parameterList = []
      this.returnForm.parameteReturnList = []
      this.bmCatalogDataSource = []
      this.tableForm.dataList = []
    },
    changeFrequency() {
      this.formLabelAlign.inputFrequency = ''
    },
    // 新增页面-数据格式-数据库的选择框数据请求
    listDatabaseList() {
      let a = {}
      postlistDatabase(a).then(res => {
        if (res.success) {
          this.databaseNameList = res.body
          this.databaseNameList.forEach((item, index, arr) => {
            this.$set(item, 'isMerge', item.code + '(' + item.planName + ')')
          })
        }
      })
    },
    // 点击数据库名-请求表名数据
    handlerdatabase(database) {
      this.bmCatalogDataSource.sqDataSourceId = database.storageId
      console.log(database)
      this.obj = {
        storageId: database.storageId,
        tableName: database.name,
        toClassId: 46
      }
      // postRelationTypeCopy
      postRelationType(this.obj).then(res => {
        if (res.success) {
          this.tableType = res.body
        }
      })
    },
    handlerId(database) {
      this.bmCatalogDataSource.sqDataSourceId = database.storageId
    },
    // 点击表名-请求对应表格数据
    handtableTypeList(tableTypeItem) {
      let tableitem
      this.databaseNameList.filter((value, index) => {
        if (value.name == this.bmCatalogDataSource.databaseName) {
          tableitem = value.storageId
        }
      })
      this.obj = {
        storageId: tableitem,
        tableName: tableTypeItem.tableName,
        toClassId: 47
      }
      this.requestType()
    },
    requestType() {
      console.log(this.obj)
      postRelationType(this.obj).then(res => {
        if (res.success) {
          this.tableForm.dataList = res.body
          this.tableForm.dataList.map(item => {
            if (item.openAttribute == '' || item.openAttribute == null) {
              item.openAttribute = this.formLabelAlign.openType
            }
            if (item.shareProperty == '' || item.shareProperty == null) {
              item.shareProperty = this.formLabelAlign.shareType
            }
            if (item.sharingCondition == '' || item.sharingCondition == null) {
              item.sharingCondition = this.formLabelAlign.shareCondition
            }
          })
        }
      })
    },

    // // 新增页面-类目关联-基础库/专题库数据
    getTargetcopyinptList() {
      let ctoryId1 = '11'
      getTargetcopy(ctoryId1).then(res => {
        if (res.success) {
          this.baseLibraryList = res.body.children
        }
      })
      let ctoryId2 = '12'
      getTargetcopy(ctoryId2).then(res => {
        if (res.success) {
          this.categoryList = res.body.children
        }
      })
    },
    changeRadio() {
      this.Library.categoryClassification = ''
      // console.log(1,this.Library.categoryClassification)
    },
    getAddData() {
      this.isShowDisabled = false
      let itemId = this.$route.query.id
      let fromId = this.$route.query.comeFrom
      // console.log(itemId)
      // console.log(fromId)
      if (fromId == '1') {
        this.loading = false
        this.modifyId = ''
        this.modifyIdDraft = ''
        this.newgetid = ''
        this.getquery()
        this.getqueryMassge()
      } else {
        if (fromId == '2') {
          // 编辑
          this.modifyId = itemId
          this.isShowDisabled = true
        } else if (fromId == '4') {
          // 草稿箱编辑
          this.modifyIdDraft = itemId
        } else if (fromId == '3') {
        }
        this.loading = true
        getaddNewget(itemId).then(res => {
          if (res.success) {
            this.formLabelAlign = res.body

            // 拆分表格
            // 是否关联政务服务事项
            this.related.relatedGovernment = res.body.relatedGovernment
            this.alignItem.businessCode = res.body.businessCode
            this.alignItem.businessName = res.body.businessName
            this.alignItem.eventType = res.body.eventType
            this.alignItem.eventLevel = res.body.eventLevel
            this.alignItem.directoryCode = res.body.directoryCode
            this.alignItem.itemData = res.body.itemData
            this.alignItem.implementationCode = res.body.implementationCode
            this.alignItem.implementationName = res.body.implementationName
            this.alignItem.drivingLevel = res.body.drivingLevel
            this.alignItem.resultType = res.body.resultType
            this.alignItem.applicationScenario = res.body.applicationScenario
            this.alignItem.applicationScenarioDescribe = res.body.applicationScenarioDescribe
            this.alignItem.provideChannels = res.body.provideChannels
            this.alignItem.electronicLicense = res.body.electronicLicense

            // 数据范围
            let dataRange
            let reg = /\[|\]|【|】/g
            // let reg = /^"[\u4e00-\u9fa5]*"$/g
            if (reg.test(res.body.dataRange)) {
              dataRange = res.body.dataRange
              this.formLabelAlign.dataRange = []
              dataRange = JSON.parse(dataRange)
              dataRange = dataRange.flat(Infinity)
              dataRange = Array.from(new Set(dataRange))
              if (dataRange != '全国' && dataRange != '全省' && dataRange != '全市') {
                dataRange = dataRange.map(item => {
                  return (item = [item])
                })
                dataRange.map((item, index) => {
                  return item.unshift('全市')
                })
              }
            } else {
              dataRange = [[res.body.dataRange]]
              this.formLabelAlign.dataRange = []
              if (dataRange != '全市' && dataRange != '全省' && dataRange != '全国') {
                dataRange.map(item => {
                  return item.unshift('全市')
                })
              }
            }

            this.formLabelAlign.dataRange = dataRange
            // console.log('5', this.formLabelAlign.dataRange)

            // 数源单位
            this.formLabelAlign.sourceUnit = res.body.sourceUnit

            //是否关联基础/专题库
            this.Library.baseLibrary = res.body.baseLibrary
            this.Library.categoryClassification = res.body.categoryClassification
            // 数据格式
            this.labeldataForm.dataFormat = res.body.dataFormat
            if(!res.body.bmCatalogDataSource) this.bmCatalogDataSource.databaseName = ''
            else  this.bmCatalogDataSource = res.body.bmCatalogDataSource
            this.tableForm.dataList = res.body.dataList
            // 接口
            this.apiList = res.body.apiList
            // console.log('258', res.body.apiList)
            if (res.body.apiList != null) {
              // console.log('258963', res.body.apiList)
              this.apiListItem = res.body.apiList[0]
              //数据格式-接口-表格-请求参数
              this.requestForm.parameterList = res.body.apiList[0].parameterList
              //数据格式-接口-表格-返回参数
              this.returnForm.parameteReturnList = res.body.apiList[0].parameteReturnList

              this.example.requestExample = res.body.apiList[0].requestExample
              this.example.returnExample = res.body.apiList[0].returnExample
            }
            this.loading = false

            // this.$refs['formLabelAlign'].clearValidate()
            // this.$refs['related'].clearValidate()
            // if (this.related.relatedGovernment === '是') {
            //   this.$refs['alignItem'].clearValidate()
            // }
            // this.$refs['Library'].clearValidate()
            this.addId = res.body.id
            this.changeOption(this.formLabelAlign.dataRange)
            // console.log(this.addId)

            // console.log(this.loading)
            // console.log('回显完成')
          } else {
            Message.error(res.header.message)
            this.loading = false
          }
        }).catch(_=>{
          this.loading = false
        })
        // this.loading = false
      }
    },
    // getAddData(val) {
    //   this.loading = val
    //   this.modifyId = ''
    //   this.modifyIdDraft = ''
    //   this.getquery()
    //   // this.$refs['bmCatalogDataSource'].clearValidate()
    // },
    // // 复制
    // getCopyData(row) {
    //   this.loading = true
    //   // this.formLabelAlign.isCopy = '1' //复制设置为1，其他的新增为''

    //   // xinzeng
    //   this.newgetid = row
    //   getaddNewget(newgetid).then(res => {
    //     if (res.success) {
    //       this.formLabelAlign = res.body
    //       this.formLabelAlign.dataRange = JSON.parse(res.body.dataRange)
    //       // 拆分表格
    //       // 是否关联政务服务事项
    //       this.related.relatedGovernment = res.body.relatedGovernment
    //       this.alignItem.businessCode = res.body.businessCode
    //       this.alignItem.businessName = res.body.businessName
    //       this.alignItem.eventType = res.body.eventType
    //       this.alignItem.eventLevel = res.body.eventLevel
    //       this.alignItem.directoryCode = res.body.directoryCode
    //       this.alignItem.itemData = res.body.itemData
    //       this.alignItem.implementationCode = res.body.implementationCode
    //       this.alignItem.implementationName = res.body.implementationName
    //       this.alignItem.drivingLevel = res.body.drivingLevel
    //       this.alignItem.resultType = res.body.resultType
    //       this.alignItem.applicationScenario = res.body.applicationScenario
    //       this.alignItem.applicationScenarioDescribe = res.body.applicationScenarioDescribe
    //       this.alignItem.provideChannels = res.body.provideChannels
    //       this.alignItem.electronicLicense = res.body.electronicLicense
    //       // 数据范围
    //       let dataRange = res.body.dataRange
    //       this.formLabelAlign.dataRange = []
    //       if (dataRange != '全市' && dataRange != '全省' && dataRange != '全国') {
    //         dataRange.map(item => {
    //           return item.unshift('全市')
    //           // console.log(4, item)
    //         })
    //       }
    //       this.formLabelAlign.dataRange = dataRange
    //       console.log(this.formLabelAlign.dataRange)
    //       // 数源单位
    //       this.formLabelAlign.sourceUnit = res.body.sourceUnit

    //       //是否关联基础/专题库
    //       this.Library.baseLibrary = res.body.baseLibrary
    //       this.Library.categoryClassification = res.body.categoryClassification
    //       // 数据格式
    //       this.labeldataForm.dataFormat = res.body.dataFormat
    //       this.bmCatalogDataSource = res.body.bmCatalogDataSource
    //       this.tableForm.dataList = res.body.dataList
    //       // console.log(this.tableForm.dataList)
    //       // 接口
    //       // this.apiList = res.body.apiList
    //       if (res.body.apiList != null) {
    //         this.apiListItem = res.body.apiList[0]
    //         //数据格式-接口-表格-请求参数
    //         this.requestForm.parameterList = res.body.apiList[0].parameterList
    //         //数据格式-接口-表格-返回参数
    //         this.returnForm.parameteReturnList = res.body.apiList[0].parameteReturnList

    //         this.example.requestExample = res.body.apiList[0].requestExample
    //         this.example.returnExample = res.body.apiList[0].returnExample
    //       }
    //       this.$set(this.formLabelAlign, 'isCopy', '1')
    //       this.formLabelAlign.id = ''
    //       this.$refs['formLabelAlign'].clearValidate()
    //       this.$refs['related'].clearValidate()
    //       if (this.related.relatedGovernment === '是') {
    //         this.$refs['alignItem'].clearValidate()
    //       }
    //       this.$refs['Library'].clearValidate()

    //       this.loading = false
    //     } else {
    //       Message.error(res.header.message)
    //     }
    //   })
    // },

    // // 请求获取编辑的初始化数据
    // getUpdateAddData(row) {
    //   console.log('updateAddData')
    //   this.loading = true
    //   this.modifyId = ''
    //   this.modifyId = row
    //   let arrayid = row
    //   console.log('arrayid', arrayid)
    //   getaddNewget(arrayid).then(res => {
    //     if (res.success) {
    //       this.formLabelAlign = res.body
    //       // this.$set(this, 'formLabelAlign', res.body)
    //       console.log('body', res.body)
    //       console.log('formLabelAlign', this.formLabelAlign)

    //       this.formLabelAlign.dataRange = JSON.parse(res.body.dataRange)
    //       // 拆分表格
    //       // 是否关联政务服务事项
    //       this.related.relatedGovernment = res.body.relatedGovernment
    //       this.alignItem.businessCode = res.body.businessCode
    //       this.alignItem.businessName = res.body.businessName
    //       this.alignItem.eventType = res.body.eventType
    //       this.alignItem.eventLevel = res.body.eventLevel
    //       this.alignItem.directoryCode = res.body.directoryCode
    //       this.alignItem.itemData = res.body.itemData
    //       this.alignItem.implementationCode = res.body.implementationCode
    //       this.alignItem.implementationName = res.body.implementationName
    //       this.alignItem.drivingLevel = res.body.drivingLevel
    //       this.alignItem.resultType = res.body.resultType
    //       this.alignItem.applicationScenario = res.body.applicationScenario
    //       this.alignItem.applicationScenarioDescribe = res.body.applicationScenarioDescribe
    //       this.alignItem.provideChannels = res.body.provideChannels
    //       this.alignItem.electronicLicense = res.body.electronicLicense
    //       // 数据范围
    //       let dataRange = res.body.dataRange
    //       this.formLabelAlign.dataRange = []
    //       if (dataRange != '全市' && dataRange != '全省' && dataRange != '全国') {
    //         dataRange.map(item => {
    //           return item.unshift('全市')
    //           // console.log(4, item)
    //         })
    //       }
    //       this.formLabelAlign.dataRange = dataRange
    //       console.log(this.formLabelAlign.dataRange)
    //       // 数源单位
    //       this.formLabelAlign.sourceUnit = res.body.sourceUnit

    //       //是否关联基础/专题库
    //       this.Library.baseLibrary = res.body.baseLibrary
    //       this.Library.categoryClassification = res.body.categoryClassification
    //       // 数据格式
    //       this.labeldataForm.dataFormat = res.body.dataFormat
    //       this.bmCatalogDataSource = res.body.bmCatalogDataSource
    //       this.tableForm.dataList = res.body.dataList
    //       // console.log(this.tableForm.dataList)
    //       // 接口
    //       this.apiList = res.body.apiList
    //       if (res.body.apiList != null) {
    //         this.apiListItem = res.body.apiList[0]
    //         //数据格式-接口-表格-请求参数
    //         this.requestForm.parameterList = res.body.apiList[0].parameterList
    //         //数据格式-接口-表格-返回参数
    //         this.returnForm.parameteReturnList = res.body.apiList[0].parameteReturnList

    //         this.example.requestExample = res.body.apiList[0].requestExample
    //         this.example.returnExample = res.body.apiList[0].returnExample
    //       }
    //       // this.$set(this.formLabelAlign, 'submitState', '4')

    //       // this.$refs['formLabelAlign'].clearValidate()
    //       // this.$refs['related'].clearValidate()
    //       // if (this.related.relatedGovernment === '是') {
    //       //   this.$refs['alignItem'].clearValidate()
    //       // }
    //       // this.$refs['Library'].clearValidate()
    //       console.log('form', this.formLabelAlign)
    //       this.addId = res.body.id
    //       this.loading = false
    //       console.log(this.addId)
    //       console.log('编目编辑回显完成')
    //     } else {
    //       Message.error(res.header.message)
    //     }
    //   })
    // },
    // // 草稿箱页面编辑
    // getDraftboxAddData(row) {
    //   this.loading = true
    //   this.modifyIdDraft = ''
    //   this.modifyIdDraft = row
    //   let arrayid = row
    //   getaddNewget(arrayid).then(res => {
    //     if (res.success) {
    //       this.formLabelAlign = res.body
    //       this.formLabelAlign.dataRange = JSON.parse(res.body.dataRange)
    //       // 拆分表格
    //       // 是否关联政务服务事项
    //       this.related.relatedGovernment = res.body.relatedGovernment
    //       this.alignItem.businessCode = res.body.businessCode
    //       this.alignItem.businessName = res.body.businessName
    //       this.alignItem.eventType = res.body.eventType
    //       this.alignItem.eventLevel = res.body.eventLevel
    //       this.alignItem.directoryCode = res.body.directoryCode
    //       this.alignItem.itemData = res.body.itemData
    //       this.alignItem.implementationCode = res.body.implementationCode
    //       this.alignItem.implementationName = res.body.implementationName
    //       this.alignItem.drivingLevel = res.body.drivingLevel
    //       this.alignItem.resultType = res.body.resultType
    //       this.alignItem.applicationScenario = res.body.applicationScenario
    //       this.alignItem.applicationScenarioDescribe = res.body.applicationScenarioDescribe
    //       this.alignItem.provideChannels = res.body.provideChannels
    //       this.alignItem.electronicLicense = res.body.electronicLicense
    //       // 数据范围
    //       let dataRange = res.body.dataRange
    //       this.formLabelAlign.dataRange = []
    //       if (dataRange != '全市' && dataRange != '全省' && dataRange != '全国') {
    //         dataRange.map(item => {
    //           return item.unshift('全市')
    //           // console.log(4, item)
    //         })
    //       }
    //       this.formLabelAlign.dataRange = dataRange
    //       console.log(this.formLabelAlign.dataRange)

    //       // 数源单位
    //       this.formLabelAlign.sourceUnit = res.body.sourceUnit

    //       //是否关联基础/专题库
    //       this.Library.baseLibrary = res.body.baseLibrary
    //       this.Library.categoryClassification = res.body.categoryClassification
    //       // 数据格式
    //       this.labeldataForm.dataFormat = res.body.dataFormat
    //       this.bmCatalogDataSource = res.body.bmCatalogDataSource
    //       this.tableForm.dataList = res.body.dataList
    //       // 接口
    //       this.apiList = res.body.apiList
    //       // console.log('258', res.body.apiList)
    //       if (res.body.apiList != null) {
    //         // console.log('258963', res.body.apiList)
    //         this.apiListItem = res.body.apiList[0]
    //         //数据格式-接口-表格-请求参数
    //         this.requestForm.parameterList = res.body.apiList[0].parameterList
    //         //数据格式-接口-表格-返回参数
    //         this.returnForm.parameteReturnList = res.body.apiList[0].parameteReturnList

    //         this.example.requestExample = res.body.apiList[0].requestExample
    //         this.example.returnExample = res.body.apiList[0].returnExample
    //       }

    //       // this.$set(this.formLabelAlign, 'submitState', '3')

    //       this.$refs['formLabelAlign'].clearValidate()
    //       this.$refs['related'].clearValidate()
    //       if (this.related.relatedGovernment === '是') {
    //         this.$refs['alignItem'].clearValidate()
    //       }
    //       this.$refs['Library'].clearValidate()
    //       this.addId = res.body.id
    //       // console.log(this.addId)

    //       this.loading = false
    //       // console.log(this.loading)
    //       // console.log('回显完成')
    //     } else {
    //       Message.error(res.header.message)
    //     }
    //   })
    // },

    // 选中当前行的数据
    handleSelect(row) {
      this.checkedDetail = row
      this.selectID = []
      if (row.length > 0) {
        row.forEach((value, index) => {

          this.selectID.push(value.index)
        })
      }
    },
    // 选中背景色
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.selectID.values()) {
        if (item === row.index) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },
    handleSelectAsk(row) {
      this.checkedDetailAsk = row
      this.isAskID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.isAskID.push(value.index)
        })
      }
    },
    // 选中背景色
    tableRowClassNameAsk({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.isAskID.values()) {
        if (item === row.index) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },
    handleSelectBack(row) {
      this.checkedDetailBack = row
      this.isBackID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.isBackID.push(value.index)
        })
      }
    },
    // 选中背景色
    tableRowClassNameBack({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.isBackID.values()) {
        if (item === row.index) {
          color = 'table-SelectedRow-bgcolor'
        }
      }
      return color
    },

    // 接口请求参数批量删除 isAskID
    deleteParameterlist() {
      if (typeof this.checkedDetailAsk == 'undefined' || this.checkedDetailAsk.length === 0) {
        MessageBox.confirm('请选择要删除的数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
        MessageBox.confirm(
          '此操作将永久删除该数据,将会删除' + this.checkedDetailAsk.length + '条数据 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            const arr1 = []
            for (let i = 0; i < this.checkedDetailAsk.length; i++) {
              arr1.push(this.checkedDetailAsk[i].index)
            }
            arr1.sort(function(a, b) {
              return a - b
            })
            //逐个根据下标删除
            for (let j = 0; j < arr1.length; j++) {
              this.requestForm.parameterList.splice(arr1[j] - j - 1, 1)
            }
            Message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 接口返回参数批量删除 isAskID
    deleteBackList() {
      if (typeof this.checkedDetailBack == 'undefined' || this.checkedDetailBack.length === 0) {
        MessageBox.confirm('请选择要删除的数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
      } else {
        MessageBox.confirm(
          '此操作将永久删除该数据,将会删除' + this.checkedDetailBack.length + '条数据 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            const arr1 = []
            for (let i = 0; i < this.checkedDetailBack.length; i++) {
              arr1.push(this.checkedDetailBack[i].index)
            }
            arr1.sort(function(a, b) {
              return a - b
            })
            //逐个根据下标删除
            for (let j = 0; j < arr1.length; j++) {
              this.returnForm.parameteReturnList.splice(arr1[j] - j - 1, 1)
            }
            Message({
              type: 'success',
              message: '删除成功!'
            })
          })
          .catch(() => {
            Message({
              type: 'info',
              message: '已取消删除'
            })
          })
      }
    },
    // 取消保存
    cancelSave() {
      this.isShowSave = false
      this.loadSave = false
    },
    // 点击保存发送请求
    save() {
      this.loadSave = true
      if (this.labeldataForm.dataFormat != '接口') {
        this.apiList = []
      }
      this.formLabelAlign.allowNull = ''
      this.formLabelAlign.relatedGovernment = this.related.relatedGovernment
      this.formLabelAlign.businessCode = this.alignItem.businessCode
      this.formLabelAlign.businessName = this.alignItem.businessName
      this.formLabelAlign.eventType = this.alignItem.eventType
      this.formLabelAlign.eventLevel = this.alignItem.eventLevel
      this.formLabelAlign.directoryCode = this.alignItem.directoryCode
      this.formLabelAlign.itemData = this.alignItem.itemData
      this.formLabelAlign.implementationCode = this.alignItem.implementationCode
      this.formLabelAlign.implementationName = this.alignItem.implementationName
      this.formLabelAlign.drivingLevel = this.alignItem.drivingLevel
      this.formLabelAlign.resultType = this.alignItem.resultType
      this.formLabelAlign.applicationScenario = this.alignItem.applicationScenario
      this.formLabelAlign.applicationScenarioDescribe = this.alignItem.applicationScenarioDescribe
      this.formLabelAlign.provideChannels = this.alignItem.provideChannels
      this.formLabelAlign.electronicLicense = this.alignItem.electronicLicense
      this.formLabelAlign.baseLibrary = this.Library.baseLibrary
      this.formLabelAlign.categoryClassification = this.Library.categoryClassification
      this.formLabelAlign.dataFormat = this.labeldataForm.dataFormat
      this.formLabelAlign.bmCatalogDataSource = this.bmCatalogDataSource
      // this.tableForm.dataList.map(item => {
      //       let flag= this.selectID.findIndex(ite => ite=== item.index)
      //       if (flag == -1) {
      //         item.isShow = 'N'
      //       }
      // })
      if (this.labeldataForm.dataFormat === '数据库' || this.labeldataForm.dataFormat === 'excel') {
        this.formLabelAlign.dataList = this.tableForm.dataList
        this.formLabelAlign.apiList = this.apiList
      } else if (this.labeldataForm.dataFormat === '接口') {
        this.apiList = []
        this.apiList.push(this.apiListItem)
        this.apiList[0].parameterList = []
        this.apiList[0].parameteReturnList = []
        this.apiList[0].parameterList = this.requestForm.parameterList
        this.apiList[0].parameteReturnList = this.returnForm.parameteReturnList
        this.apiList[0].requestExample = this.example.requestExample
        this.apiList[0].returnExample = this.example.returnExample
        this.formLabelAlign.apiList = this.apiList
      } else {
        this.formLabelAlign.dataList = this.tableForm.dataList
        this.formLabelAlign.apiList = this.apiList
      }
      // console.log(this.formLabelAlign)
      let formLabel = this.formLabelAlign
      // console.log(
      //   '223600',
      //   formLabel.dataRange != '全市' && formLabel.dataRange != '全省' && formLabel.dataRange != '全国'
      // )
      if (formLabel.dataRange != '全市' && formLabel.dataRange != '全省' && formLabel.dataRange != '全国') {
        formLabel.dataRange = formLabel.dataRange.map((item, index) => {
          return item.splice(1, 1)
        })
      }
      // console.log(formLabel.dataRange)
      // console.log(formLabel)
      // console.log(this.modifyId != '' || this.modifyIdDraft != '')
      this.$set(formLabel, 'submitState', '1')

      if (this.modifyId != '' || this.modifyIdDraft != '') {
        // this.$set(formLabel, 'submitState', '1')
        postUpdate(formLabel).then(res => {
          if (res.success) {
            Message({
              message: '保存成功',
              type: 'success'
            })
            this.isShowSave = false
            this.loadSave = false
            this.resetData()
            this.modifyId = ''
            this.modifyIdDraft = ''
            this.addId = ''
            this.loadId = ''
            this.newgetid = ''
            this.$router.push({
              path: '/datefrom/draftbox'
            })
          } else {
            // Message.error(res.message)
            Message.error(res.message || res.header.message)
            // Message.error(res.message)
            this.isShowSave = false
            this.loadSave = false
          }
        })
      } else {
        postAddSave(formLabel).then(res => {
          if (res.success) {
            Message({
              message: '保存成功',
              type: 'success'
            })

            this.isShowSave = false
            this.loadSave = false
            this.resetData()
            this.$router.push({
              path: '/datefrom/draftbox'
            })
            // this.$bus.$emit('draftSuccess',true)
          } else {
            this.isShowSave = false
            this.loadSave = false
            Message.error(res.message || res.header.message)
            // Message.error(res.header.message)
          }
        })
      }
    },

    // 点击提交审核
    toShenhe() {
      this.isExamineDialogVisible = true
    },
    cancelAddSubmit() {
      this.isExamineDialogVisible = false
      this.loadSubmit = false
    },
    addSubmit() {
      // primaryKey
      // let primary = this.tableForm.dataList.some(item => {
      //   return item.primaryKey == '1'
      // })
      // console.log(primary)
      this.loadSubmit = true
      const p1 = new Promise((resolve, reject) => {
        this.$refs['formLabelAlign'].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })

      const p2 = new Promise((resolve, reject) => {
        this.$refs['related'].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })

      const p3 = new Promise((resolve, reject) => {
        this.$refs['Library'].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
          }
        })
      })
      const p4 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
          this.$refs['tableForm'].validate(valid => {
            if (valid) {
              return resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      const p5 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
          this.$refs['bmCatalogDataSource'].validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      const p6 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          this.$refs['apiListItem'].validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      const p9 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          this.$refs['requestForm'].validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      const p10 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          this.$refs['returnForm'].validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      const p8 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          if (this.example.returnExample != '' || this.example.requestExample != '') {
            this.$refs['example'].validate(valid => {
              if (valid) {
                resolve()
              } else {
                reject()
              }
            })
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
      const p7 = new Promise((resolve, reject) => {
        if (this.related.relatedGovernment === '是') {
          this.$refs['alignItem'].validate(valid => {
            if (valid) {
              resolve()
            } else {
              reject()
            }
          })
        } else {
          resolve()
        }
      })
      console.log(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10)
      Promise.all([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10])
        .then(() => {
          if (this.labeldataForm.dataFormat != '接口') {
            this.apiList = []
          }
          this.formLabelAlign.relatedGovernment = this.related.relatedGovernment
          this.formLabelAlign.businessCode = this.alignItem.businessCode
          this.formLabelAlign.businessName = this.alignItem.businessName
          this.formLabelAlign.eventType = this.alignItem.eventType
          this.formLabelAlign.eventLevel = this.alignItem.eventLevel
          this.formLabelAlign.directoryCode = this.alignItem.directoryCode
          this.formLabelAlign.itemData = this.alignItem.itemData
          this.formLabelAlign.implementationCode = this.alignItem.implementationCode
          this.formLabelAlign.implementationName = this.alignItem.implementationName
          this.formLabelAlign.drivingLevel = this.alignItem.drivingLevel
          this.formLabelAlign.resultType = this.alignItem.resultType
          this.formLabelAlign.applicationScenario = this.alignItem.applicationScenario
          this.formLabelAlign.applicationScenarioDescribe = this.alignItem.applicationScenarioDescribe
          this.formLabelAlign.provideChannels = this.alignItem.provideChannels
          this.formLabelAlign.electronicLicense = this.alignItem.electronicLicense
          this.formLabelAlign.baseLibrary = this.Library.baseLibrary
          this.formLabelAlign.categoryClassification = this.Library.categoryClassification
          this.formLabelAlign.dataFormat = this.labeldataForm.dataFormat
          this.formLabelAlign.bmCatalogDataSource = this.bmCatalogDataSource
          // this.tableForm.dataList.map(item => {
          //   let flag= this.selectID.findIndex(ite => ite=== item.index)
          //   if (flag == -1) {
          //     item.isShow = 'N'
          //   }
          // })
          if (this.labeldataForm.dataFormat === '数据库' || this.labeldataForm.dataFormat === 'excel') {
            this.formLabelAlign.dataList = this.tableForm.dataList
            this.formLabelAlign.apiList = this.apiList
          } else if (this.labeldataForm.dataFormat === '接口') {
            this.apiList = []
            this.apiList.push(this.apiListItem)
            this.apiList[0].parameterList = []
            this.apiList[0].parameteReturnList = []
            this.apiList[0].parameterList = this.requestForm.parameterList
            this.apiList[0].parameteReturnList = this.returnForm.parameteReturnList
            this.apiList[0].requestExample = this.example.requestExample
            this.apiList[0].returnExample = this.example.returnExample
          } else {
            this.formLabelAlign.dataList = this.tableForm.dataList
            this.formLabelAlign.apiList = this.apiList
          }
          this.formLabelAlign.apiList = this.apiList

          this.formLabelAlign.allowNull = '1' // 审核需要校验，写1，不校验为空
          // this.$set(this.formLabelAlign, 'allowNull', '1')
          console.log('allowNull', this.formLabelAlign)
          let dataformLabel = this.formLabelAlign
          if (
            dataformLabel.dataRange != '全市' &&
            dataformLabel.dataRange != '全省' &&
            dataformLabel.dataRange != '全国'
          ) {
            dataformLabel.dataRange = dataformLabel.dataRange.map((item, index) => {
              return item.splice(1, 1)
            })
          }

          if (this.modifyId != '' || this.modifyIdDraft != '') {
            if (this.modifyIdDraft != '') {
              this.$set(dataformLabel, 'submitState', '3')
            } else if (this.modifyId != '') {
              this.$set(dataformLabel, 'submitState', '4')
            }
            let catalogid = { id: this.addId }
            postUpdate(dataformLabel)
              .then(res => {
                if (res.success) {
                  // postsubmitCatalog(catalogid).then(res => {
                  //   if (res.success) {
                  Message({
                    message: '提交审核成功!',
                    type: 'success'
                  })
                  // if (dataformLabel.dataFormat === '接口') {
                  //   syncApi()
                  // }

                  this.isExamineDialogVisible = false
                  this.loadSubmit = false
                  this.resetData()
                  this.$router.push({
                    path: '/datefrom/cataloglist'
                  })
                } else {
                  this.isExamineDialogVisible = false
                  this.loadSubmit = false
                  // Message.error(res.message)
                  Message.error(res.message || res.header.message)
                }
              })
              .catch(err => {
                this.isExamineDialogVisible = false
                this.loadSubmit = false
                Message.error('请求超时')
              })
          } else {
            this.$set(dataformLabel, 'submitState', '2')
            postAddSave(dataformLabel)
              .then(res => {
                if (res.success) {
                  // let lableId = res.result.dataId
                  // let catalog = { id: lableId }
                  // postsubmitCatalog(catalog).then(res => {
                  // if (res.success) {
                  Message({
                    message: '提交审核成功!',
                    type: 'success'
                  })
                  // console.log("jieko",dataformLabel.dataFormat === '接口');
                  // if (dataformLabel.dataFormat === '接口') {
                  //   syncApi()
                  // }
                  this.isExamineDialogVisible = false
                  this.loadSubmit = false
                  this.resetData()
                  this.modifyId = ''
                  this.modifyIdDraft = ''
                  this.addId = ''
                  this.loadId = ''
                  this.newgetid = ''

                  this.$router.push({
                    path: '/datefrom/cataloglist'
                  })
                  //   } else {
                  //     this.isExamineDialogVisible = false
                  //     this.loadSubmit = false
                  //     Message.error(res.header.message)
                  //   }
                  // })
                } else {
                  this.isExamineDialogVisible = false
                  this.loadSubmit = false
                  Message.error(res.header.message || res.message)
                }
              })

              // else {
              //   this.isExamineDialogVisible = false
              //   this.loadSubmit = false
              //   console.log(1, res)
              //   console.log(res.message)
              // Message.error('提交失败，请审查后再提交')
              // }

              .catch(err => {
                this.isExamineDialogVisible = false
                this.loadSubmit = false
                // console.log(1,err)
                // console.log(err.response.data)
                // Message.error('提交失败，请审查后再提交')
                // Message.error(message)
              })
          }
          // this.formLabelAlign.allowNull = ''
        })
        .catch(() => {
          this.isExamineDialogVisible = false
          this.loadSubmit = false
          Message.error('请填写必填项')
        })
    },
    parameterExcel(val) {
      this.isExportId = val
      this.isAskExport = true
    },

    // 导入成功
    uploadSuccessExcel(res, file, fileList) {
      this.isdisabled = true
      this.fileName = file.name
      if (res.result.success) {
        if (res.result.result == null) {
          this.isAskExport = false
          Message.error('模板为空，请选择正确模板')
          this.$refs.upload.clearFiles()
        } else {
          this.result = res.result.success
          this.resbodyList = res.result.result
          this.isdisabled = false
        }
      } else {
        this.isAskExport = false
        this.$refs.upload.clearFiles()
        Message.error(res.result.message)
      }
    },
    // 导入
    importParameterExcel() {
      this.uploading = true
      let { resbodyList } = this
      if (this.result) {
        this.uploading = false
        this.disable = false
        this.$message.success(`${this.fileName}上传成功`)
        if (this.isExportId == 1) {
          if (
            '' == this.requestForm.parameterList[0].catalogApiId &&
            this.requestForm.parameterList[0].parameterName == '' &&
            this.requestForm.parameterList[0].required == '' &&
            this.requestForm.parameterList[0].type == '' &&
            this.requestForm.parameterList[0].defaultValue == '' &&
            this.requestForm.parameterList[0].describetion == '' &&
            this.requestForm.parameterList[0].parameterLocation == ''
          ) {
            this.requestForm.parameterList = []
          }
          this.requestForm.parameterList = this.requestForm.parameterList.concat(resbodyList)
        } else {
          if ( this.returnForm.parameteReturnList == null ||
            '' == this.returnForm.parameteReturnList[0].catalogApiId &&
            this.returnForm.parameteReturnList[0].parameterName == '' &&
            this.returnForm.parameteReturnList[0].required == '' &&
            this.returnForm.parameteReturnList[0].type == '' &&
            this.returnForm.parameteReturnList[0].defaultValue == '' &&
            this.returnForm.parameteReturnList[0].describetion == '' &&
            this.returnForm.parameteReturnList[0].parameterLocation == ''
          ) {
            this.returnForm.parameteReturnList = []
          }
          this.returnForm.parameteReturnList = this.returnForm.parameteReturnList.concat(resbodyList)
          this.isdisabled = true
        }
      } else {
        this.uploading = false
        this.$message.warning(`${this.fileName}上传失败`)
        this.isdisabled = true
      }
      this.$refs.upload.clearFiles()
      this.isAskExport = false
      this.isdisabled = true
    },
    cleanAskExport() {
      this.$refs.upload.clearFiles()
      this.isAskExport = false
    },
    getCurrentTime() {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1
      let day = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
      let hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      let minutes = new Date().getMinutes() < 10 ? '0' + new Date().getHours() : new Date().getHours()
      return year + '-' + month + '-' + day + ' ' + hours + '-' + minutes
    },
    // 模板下载
    downloadmu() {
      download({ fileName: '导入模板.xlsx' })
        .then(res => {
          const blob = new Blob([res], {
            type: 'application/json;charset=UTF-8'
          }) // res就是接口返回的文件流
          const link = document.createElement('a') // 创建a标签
          const objectUrl = window.URL.createObjectURL(blob)
          link.href = objectUrl
          link.download = '导入模板' + this.getCurrentTime() + '.xlsx'
          link.click()
          window.URL.revokeObjectURL(objectUrl) // 释放内存
        })
        .catch(error => {
          this.$message.warning('模板导出失败')
        })
    },

    // 接口新增返回请求表格行
    addtableitem() {
      if (this.requestForm.parameterList == undefined) {
        this.requestForm.parameterList = new Array()
      }
      let apinewObj = {
        catalogApiId: '', //编目接口表id
        parameterName: '', //参数名称
        required: '', //是否必填
        type: '', //类型
        defaultValue: '', //默认值
        describetion: '', //描述
        parameterLocation: '', //参数位置
        id: 0
      }
      this.requestForm.parameterList.push(apinewObj)
      // this.$set(this.requestForm.parameterList,'apinewObj')
    },
    addtableBackItem() {
      if (this.returnForm.parameteReturnList == undefined) {
        this.returnForm.parameteReturnList = new Array()
      }
      let apiblokObj = {
        catalogApiId: '', //编目接口表id
        parameterName: '', //参数名称
        required: '', //是否必填
        type: '', //类型
        defaultValue: '', //默认值
        describetion: '', //描述
        parameterLocation: '', //参数位置
        id: 0
      }
      this.returnForm.parameteReturnList.push(apiblokObj)
      // this.$set(this.returnForm.parameteReturnList,apiblokObj)
    },

    // 请求/返回参数删除
    DeleteRowApk(index, row) {
      MessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          row.splice(index, 1)
          Message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // excel导入数据
    importExcelList(val) {
      if (
        this.tableForm.dataList[0].name == '' &&
        this.tableForm.dataList[0].enName == '' &&
        this.tableForm.dataList[0].dataType == '' &&
        this.tableForm.dataList[0].dataLength == '' &&
        this.tableForm.dataList[0].dataDictionary == '' &&
        this.tableForm.dataList[0].defaultValue == '' &&
        // this.tableForm.dataList[0].shareProperty == '' &&
        this.tableForm.dataList[0].sharingCondition == '' &&
        // this.tableForm.dataList[0].openAttribute == '' &&
        this.tableForm.dataList[0].nullValue == '' &&
        this.tableForm.dataList[0].dataObject == '' &&
        this.tableForm.dataList[0].dataLevel == '' &&
        this.tableForm.dataList[0].fieldDescription == ''
      ) {
        this.tableForm.dataList = []
      }
      this.tableForm.dataList = this.tableForm.dataList.concat(val)
      this.tableForm.dataList.map(item => {
        if (item.openAttribute == '') {
          item.openAttribute = this.formLabelAlign.openType
        }
        if (item.shareProperty == '') {
          item.shareProperty = this.formLabelAlign.shareType
        }
      })
      // this.tableForm.dataList.map(item => {
      //   if (item.shareProperty == '') {
      //     item.shareProperty = this.formLabelAlign.shareType
      //   }
      // })
    },

    // 重置数据
    resetData() {
      this.modifyId = ''
      this.modifyIdDraft = ''
      this.addId = ''
      this.loadId = ''
      this.newgetid = ''
      this.formLabelAlign = {
        // isCopy: '',
        allowNull: '',
        catalogName: '', //信息资源名称
        catalogEn: '', //信息资源英文名称
        sourceUnit: '', //数源单位
        sourceSystem: '', //数源应用系统
        notAssociatedReason: '', //未关联系统理由
        shareType: '', //共享类型
        shareCondition: '', //共享条件
        dontShareCondition: '', //不予共享条件
        openType: '', //开放类型
        openSociety: '', //是否对社会开放
        keyAreasType: '', //重点领域分类
        keyAreasRemark: '', //重点领域分类备注
        updateFrequency: '', //更新频率
        inputFrequency: '',
        generateDataset: '',
        dataRange: [], //数据范围
        informationSummary: '', //信息资源摘要
        businessDepartment: '1', //业务责任科室
        businessPerson: '', //业务责任人
        contactInformation: '', //联系方式
        relatedGovernment: '', //是否关联政务服务事项
        businessCode: '', //业务办理事项编码
        businessName: '', //业务办理事项名称
        eventType: '', //事项类型
        eventLevel: '', //事项层级
        directoryCode: '', //事项基本目录编码
        itemData: '', //数据所属事项名称
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        drivingLevel: '', //行驶层级
        resultType: '', //结果类型
        applicationScenario: '', //应用场景
        applicationScenarioDescribe: '', //应用场景描述
        provideChannels: '', //提供渠道
        electronicLicense: '', //是否电子证照
        baseLibrary: '', //是否关联基础/专题库
        relatedCategories: '1', //是否关联类目
        categoryClassification: '', //类目分类
        dataFormat: '', //数据格式

        apiList: [
          //数据格式-接口
          // {
          //   apiName: '', //接口名称
          //   responseType: '', //响应类型
          //   requestMode: '', //请求方式
          //   requestType: '', //请求数据类型
          //   apiRoute: '', //API路径
          //   apiDescribe: '', //接口描述
          //   requestExample: '', //请求示例
          //   returnExample: '', //返回示例
          //   catalogId: '',
          //   id: '',
          //   serviceType: '', //后端服务请求
          //   host: '', //调用地址      //后端服务host
          //   method: '', //调用方法名称
          //   namespace: '', //命名空间
          //   path: '', //后端服务Path
          //   parameterList: [],
          //   parameteReturnList: []
          // }
        ],

        bmCatalogDataSource: {
          catalogId: '',
          databaseName: '', //数据源名称//库名
          sqDataSourceId: '', //数栖id
          tableName: '' //表名
        },
        cataStatus: 0,
        createdBy: '',
        createdTime: '',
        dataList: [
          //数据项
          // {
          //   name: '', //中文名称
          //   enName: '', //英文名称
          //   dataType: '', //数据类型
          //   dataLength: '', //数据长度
          //   dataDictionary: '', //数据字典项
          //   defaultValue: '', //默认值
          //   shareProperty: '', //共享属性
          //   sharingCondition: '', //共享条件
          //   openAttribute: '', //开放属性
          //   nullValue: '', //是否可为空
          //   dataObject: '', //数据对象
          //   dataLevel: '', //数据级别
          //   fieldDescription: '', //字段描述
          //   id: ''
          // }
        ],
        id: '',
        imputationStatus: 0,
        releaseBy: '',
        releaseTime: '',
        status: 0, //编目状态(10新增;20编辑，90删除)
        updateBy: '',
        updateTime: ''
      }
      // 是否关联政务服务事项
      this.related = {
        relatedGovernment: ''
      }
      this.alignItem = {
        businessCode: '', //业务办理事项编码
        businessName: '', //业务办理事项名称
        eventType: '', //事项类型
        eventLevel: '', //事项层级
        directoryCode: '', //事项基本目录编码
        itemData: '', //数据所属事项名称
        implementationCode: '', //实施清单编码
        implementationName: '', //实施清单名称
        drivingLevel: '', //行驶层级
        resultType: '', //结果类型
        applicationScenario: '', //应用场景
        applicationScenarioDescribe: '', //应用场景描述
        provideChannels: '', //提供渠道
        electronicLicense: '' //是否电子证照
      }
      //是否关联基础/专题库
      this.Library = {
        baseLibrary: '', //是否关联基础库/专题库
        categoryClassification: '' //类目分类
      }
      // 数据格式
      this.labeldataForm = { dataFormat: '' }
      this.bmCatalogDataSource = {
        catalogId: '',
        databaseName: '', //数据源名称//库名
        sqDataSourceId: '', //数栖id
        tableName: '' //表名
      }
      // 数据项
      this.tableForm.dataList = [
        //数据项
        {
          name: '', //中文名称
          enName: '', //英文名称
          dataType: '', //数据类型
          dataLength: '', //数据长度
          dataDictionary: '', //数据字典项
          defaultValue: '', //默认值
          shareProperty: '', //共享属性
          sharingCondition: '', //共享条件
          openAttribute: '', //开放属性
          nullValue: '', //是否可为空
          dataObject: '', //数据对象
          dataLevel: '', //数据级别
          fieldDescription: '', //字段描述
          id: ''
        }
      ]
      // 数据格式-接口
      this.apiList = [
        //数据格式-接口
        {
          apiName: '', //接口名称
          responseType: '', //响应类型
          requestMode: '', //请求方式
          requestType: '', //请求数据类型
          apiRoute: '', //API路径
          apiDescribe: '', //接口描述
          requestExample: '', //请求示例
          returnExample: '', //返回示例
          catalogId: '',
          id: '',

          serviceType: '', //后端服务请求
          host: '', //调用地址      //后端服务host
          method: '', //调用方法名称
          namespace: '', //命名空间
          path: '', //后端服务Path

          parameterList: [],
          parameteReturnList: []
        }
      ]
      this.requestForm.parameterList = [
        //数据格式-接口-表格-请求参数
        {
          catalogApiId: '', //编目接口表id
          parameterName: '', //参数名称
          required: '', //是否必填
          type: '', //类型
          defaultValue: '', //默认值
          describetion: '', //描述
          parameterLocation: '', //参数位置
          // parameterType: '', //请求返回类别
          id: ''
        }
      ]
      this.returnForm.parameteReturnList = [
        //数据格式-接口-表格-返回参数
        {
          catalogApiId: '', //编目接口表id
          parameterName: '', //参数名称
          required: '', //是否必填
          type: '', //类型
          defaultValue: '', //默认值
          describetion: '', //描述
          parameterLocation: '', //参数位置
          // parameterType: '', //请求返回类别
          id: ''
        }
      ]
      this.example = {
        requestExample: '',
        returnExample: ''
      }
    },
    // cancel() {

    cancelAdd() {
      this.cancelAddServ = false
      if (this.modifyIdDraft != '') {
        // this.$router.push({
        //   path: '/datefrom/draftbox'
        // })
        this.$router.back()
      } else if (this.modifyId != '') {
        // this.$router.push({
        //   path: '/datefrom/cataloglist'
        // })
        this.$router.back()
      } else {
        this.$router.push({
          path: '/datefrom/cataloglist'
        })
      }
      this.modifyIdDraft = ''
      this.addId = ''
      // this.loading = true
      this.resetData()
    }
  },
  computed: {
    ...mapState({
      datefromList: state => state.indatafrom.datefromList
    })
  }
}
</script>

<style lang="less" scoped>
/deep/.el-form-item__label:before {
  content: '*';
  color: #f56c6c;
  margin-right: 5px;
  font-weight: bold;
}

/deep/.el-form-item__label:before {
  content: '';
  margin-right: 10px;
  font-weight: bold;
}
.dataLis-demo {
  position: relative;
}
.demo:before {
  position: absolute;
  top: 2px;
  left: -12px;
  content: '*';
  color: #f56c6c;
  font-weight: bold;
}
/deep/.el-table .cell {
  padding-left: 15px;
  padding-right: 15px;
}
.formdivflex {
  display: flex;
  justify-content: space-between;
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
h3 {
  margin: 20px 0 0 0;
  font-size: 15px;
  font-weight: 900;
}
.topfont {
  width: 43px;
  height: 29px;
  font-size: 21px;
}
.cardpad {
  padding-left: 20px;
  width: 100%;
}
.cardpadmargtop {
  margin-top: 24px;
  padding-left: 20px;
  width: 100%;
}
.frommaglef {
  font-size: 14px;
  width: 100%;
}
.fromtopmag {
  margin-top: 8px;
}
.fromweiht {
  width: 13vw;
}
.updatewei {
  width: 40%;
}
.timewei {
  width: 60%;
}
.fromweihtlong {
  width: 400px;
}
.frommagin {
  margin-right: 280px;
}
.frombigmagin {
  margin-right: 480px;
}
.frommaginmini {
  margin-right: 150px;
}
.frombigweiht {
  width: 65vw;
}
.fromsmowit {
  width: 13vw;
}
.soemagin {
  margin-right: 80px;
}
.frombiggmagin {
  margin-right: 800px;
}
.pcolorred {
  margin-left: 20px;
  color: red;
}
.pilangflex {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 25px 0;
}
.pilangflexnew {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 25px 0;
}
.spanfont {
  font-size: 16px;
}
// 接口
.httpweihei {
  width: 100%;
  height: 32px;
  border: 1px solid #1890ff;
  border-radius: 2%;
  background-color: #eff7ff;
}

.butflexcz {
  display: flex;
}
.butczwh {
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 14px;
  padding: 0;
  margin-right: 20px;
}

.wubut {
  position: absolute;
  top: 36px;
  left: 20px;
  width: 100px;
  z-index: 1;
  background-color: white;
}
.wubutwei {
  width: 120px;
  height: 32px;
  margin-left: 15px;
}
.imaginle {
  margin-left: 10px;
}
.footweiht {
  width: 100%;
}
.footmag {
  margin-top: 42px;
  // width: 75px;
}
h3 {
  height: 27px;
  font-size: 17px;
  font-weight: 500;
  color: #333333;
  line-height: 27px;
}
.twofromflex {
  position: relative;
}
.towfrompos {
  position: absolute;
  top: -3px;
  left: 500px;
}
.fromgeshimag {
  margin-top: 30px;
}
// .flootdivmag {
//   margin-top: 10px;
// }
.examinepcent {
  font-size: 16px;
  text-align: center;
  margin-top: 90px;
}
.fromiteminptwh {
  width: 550px;
  height: 313px;
}

.dialogmargdaoru {
  margin: 0 60px 0 60px;
  padding: 0;
}
.fromweihtbig {
  width: 500px;
}
.fromweihtheng {
  width: 100%;
}

// .dialogweight{
//   width: 1000px;
// }

.jibentop {
  font-size: 16px;
  font-weight: 600;
  color: #1890ff;
}
.jibentopsize {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
}
.pdivider {
  margin: 15px 0;
}
::v-deep .el-divider {
  background-color: #1890ff;
}
.table-SelectedRow-bgcolor {
  td {
    background-color: #fa645f !important;
  }
}
.dialogcenter {
  text-align: center;
  line-height: 200px;
  font-size: 16px;
  color: #000;
}
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
  margin: 0;
}
// .deletdial {
/deep/.el-dialog__body {
  padding: 0 0 10px 0;
}
// }
/deep/.el-icon-info {
  width: 26px;
  height: 26px;
  color: #1890ff;
}

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
  color: #1890ff;
}
// 导入
// .dialoghei {
//   height: 800px;
// }

.dialogmarg {
  margin: 32px 40px 10px 40px;
} ////
.centerupload {
  text-align: center;
} ////
.mbcolor {
  color: #1890ff;
}

.buttonflex {
  display: flex;
  justify-content: flex-end;
  // margin-bottom: 20px;
  .buttonmargin {
    margin-bottom: 20px;
    margin-right: 10px;
  }
  .buttonrigth {
    margin: 0 20px 20px 10px;
  }
}
// /deep/.el-checkbox__input {
//   margin-bottom: 10px;
// }
// /deep/.el-table_6_column_34 {
//   padding-bottom: 20px;
// }

// 删除
// .dialogcenter {
//   text-align: center;
//   line-height: 200px;
// }
// .columuItem {
// ::v-deep.el-form-item {
//   margin-bottom: 0;
// }
// }
</style>
