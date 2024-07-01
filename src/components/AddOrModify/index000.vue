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
            <el-input v-model.trim="formLabelAlign.catalogName" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <el-form-item label="信息资源英文名称" key="2" class="fromtopmag" prop="catalogEn">
            <el-input v-model.trim="formLabelAlign.catalogEn" placeholder="请输入" class="fromweiht"></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>

        <div class="formdivflex">
          <el-form-item label="开放类型" key="3" class="fromtopmag" prop="openType">
            <el-select v-model="formLabelAlign.openType" placeholder="请选择" class="fromweiht">
              <el-option
                :label="openitem.text"
                :value="openitem.value"
                v-for="(openitem, index) in datefromList.opentype"
                :key="openitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数源应用系统" key="4" class="fromtopmag" prop="sourceSystem">
            <el-select v-model="formLabelAlign.sourceSystem" placeholder="请选择" class="fromweiht">
              <el-option
                :label="appli.text"
                :value="appli.value"
                v-for="(appli, index) in datefromList.application"
                :key="appli.value"
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
          <el-form-item label="共享类型" key="6" class="fromtopmag" prop="shareType">
            <el-select v-model="formLabelAlign.shareType" placeholder="请选择" class="fromweiht">
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
          >
            <el-input
              v-model.trim="formLabelAlign.shareCondition"
              :disabled="formLabelAlign.shareType !== '20'"
              placeholder="请输入"
              key="8"
              class="fromweiht"
            ></el-input>
          </el-form-item>
          <div style="width:30px"></div>
        </div>
        <div class="formdivflex">
          <el-form-item label="更新频率" key="9" class="fromtopmag" prop="updateFrequency">
            <el-row class="fromweiht">
              <el-col :span="11"
                ><el-select v-model="formLabelAlign.updateFrequency" placeholder="请选择">
                  <el-option
                    :label="frequencyitem.text"
                    :value="frequencyitem.value"
                    v-for="(frequencyitem, index) in datefromList.frequency"
                    :key="frequencyitem.value"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="13">
                <el-input
                  v-model.trim="formLabelAlign.inputFrequency"
                  placeholder="请输入"
                  class="inpuweiht"
                ></el-input>
              </el-col>
            </el-row>
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
          <el-form-item label="重点领域分类" key="11" class="fromtopmag" prop="keyAreasType">
            <el-select v-model="formLabelAlign.keyAreasType" placeholder="请选择" class="fromweiht">
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

        <el-form-item key="13" label="是否对社会开放" class="fromtopmag" prop="openSociety">
          <el-select v-model="formLabelAlign.openSociety" placeholder="请选择" class="fromweiht frommagin">
            <el-option
              :label="society.text"
              :value="society.value"
              v-for="(society, index) in datefromList.opensociety"
              :key="society.value"
            ></el-option>
          </el-select>
        </el-form-item>

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

        <!-- <el-form-item label="业务责任科室" class="fromtopmag" prop="businessDepartment">
          <el-select v-model="formLabelAlign.businessDepartment" placeholder="请选择" class="fromsmowit soemagin">
            <el-option
              :label="business.text"
              :value="business.value"
              v-for="(business, index) in datefromList.department"
              :key="business.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <div class="formdivflex">
          <el-form-item label="数源单位" key="15" class="fromtopmag" prop="sourceUnit">
            <el-select v-model="formLabelAlign.sourceUnit" placeholder="请选择" class="fromweiht">
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
        </div>
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
                :label="ification.text"
                :value="ification.value"
                v-for="(ification, index) in datefromList.classification"
                :key="ification.value"
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
            <el-select v-model="alignItem.applicationScenarioDescribe" placeholder="请选择" class="fromweiht">
              <el-option
                :label="descrip.text"
                :value="descrip.value"
                v-for="(descrip, index) in datefromList.description"
                :key="descrip.value"
              ></el-option>
            </el-select>
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
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <div style="width:30px"></div>
        </div>
      </el-form>
    </el-card>

    <!--  -->
    <el-card class="cardpadmargtop" v-loading="loading">
      <p class="jibentopsize">类目关联</p>
      <el-divider class="pdivider"></el-divider>
      <div class="twofromflex">
        <el-form ref="Library" :inline="true" size="small" :rules="libraryRules" :model="Library" label-width="185px">
          <div class="formdivflex">
            <el-form-item label="是否关联基础库/专题库：" key="34" prop="baseLibrary">
              <el-radio-group v-model="Library.baseLibrary">
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
      <p class="jibentopsize">数据格式</p>
      <el-divider class="pdivider"></el-divider>
      <el-form
        :inline="true"
        ref="labeldataForm"
        size="small"
        :label-position="labelPosition"
        :rules="labelPositionRules"
        :model="labeldataForm"
        label-width="120px"
        class="fromgeshimag"
      >
        <el-form-item label="数据格式" key="38" class="fromtopmag" prop="dataFormat">
          <el-select
            v-model="labeldataForm.dataFormat"
            @change="changedataFormat"
            placeholder="请选择"
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
          <el-form-item label="数据库名" key="39" class="fromtopmag" prop="databaseName">
            <el-select
              v-model="bmCatalogDataSource.databaseName"
              filterable
              placeholder="请选择"
              class="fromsmowit frommaginmini"
            >
              <el-option
                @click.native="handlerdatabase(database)"
                :label="database.name"
                :value="database.name"
                v-for="(database, index) in databaseNameList"
                :key="database.storageId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表名" key="40" class="fromtopmag" prop="tableName">
            <el-select v-model="bmCatalogDataSource.tableName" filterable placeholder="请选择" class="fromsmowit">
              <!-- @change="handtableTypeList" -->
              <el-option
                @click.native="handtableTypeList(tableTypeItem)"
                :label="tableTypeItem.name"
                :value="tableTypeItem.name"
                v-for="(tableTypeItem, index) in tableType"
                :key="tableTypeItem.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="pilangflexnew" v-if="labeldataForm.dataFormat === 'excel'">
          <div>
            <span>数据项</span>
            <span class="pcolorred"
              >提示：数据项(字段)需逐个新增，且至少明确一个数据项(字段)作为主键，以便开展数据归集！</span
            >
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
            <span>数据项</span>
            <span class="pcolorred"
              >提示：数据项(字段)需逐个新增，且至少明确一个数据项(字段)作为主键，以便开展数据归集！</span
            >
          </div>
          <div class="butflexcz">
            <el-button class="butczwh" type="primary">批量删除</el-button>
          </div>
        </div>
        <!-- 数据项表格 -->
        <el-table
          :data="formLabelAlign.dataList"
          tooltip-effect="dark"
          style="width: 100%"
          :header-cell-style="{ background: '#E6F7FF', color: '#606266' }"
          @selection-change="handleSelect"
          :row-class-name="tableRowClassName"
          v-if="labeldataForm.dataFormat === 'excel' || labeldataForm.dataFormat === '数据库'"
        >
          <el-table-column type="selection" align="center" width="55"> </el-table-column>
          <el-table-column type="index" label="序号" width="120" align="center"> </el-table-column>
          <el-table-column prop="name" label="中文名称" width="180">
            <template slot-scope="{ row }">
              <el-input v-model="row.name" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="enName" label="英文名称" width="180">
            <template slot-scope="{ row }">
              <el-input v-model="row.enName" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dataType" label="数据类型" width="140">
            <template slot-scope="{ row }">
              <el-input v-model="row.dataType" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dataLength" label="数据长度" width="140">
            <template slot-scope="{ row }">
              <el-input v-model="row.dataLength" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dataDictionary" label="数据字典项" width="140">
            <template slot-scope="{ row }">
              <el-input v-model="row.dataDictionary" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="defaultValue" label="默认值" width="140">
            <template slot-scope="{ row }">
              <el-input v-model="row.defaultValue" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="shareProperty" label="共享属性" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.shareProperty" placeholder="请选择">
                <el-option
                  :label="propertyitem.text"
                  :value="propertyitem.value"
                  v-for="(propertyitem, index) in datefromList.property"
                  :key="propertyitem.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="sharingCondition" label="共享条件" width="140">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.sharingCondition" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="openAttribute" label="开放属性" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.openAttribute" placeholder="请选择">
                <el-option
                  :label="properties.text"
                  :value="properties.value"
                  v-for="(properties, index) in datefromList.openproperties"
                  :key="properties.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="primaryKey" label="是否主键" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.primaryKey" placeholder="请选择">
                <el-option
                  :label="primary.text"
                  :value="primary.value"
                  v-for="(primary, index) in datefromList.primaryKey"
                  :key="primary.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="nullValue" label="是否可为空" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.nullValue" placeholder="请选择">
                <el-option
                  :label="emptyitem.text"
                  :value="emptyitem.value"
                  v-for="(emptyitem, index) in datefromList.empty"
                  :key="emptyitem.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dataObject" label="数据对象" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.dataObject" placeholder="请选择">
                <el-option
                  :label="dataObjitem.text"
                  :value="dataObjitem.value"
                  v-for="(dataObjitem, index) in datefromList.dataObject"
                  :key="dataObjitem.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="dataLevel" label="数据级别" width="140">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.dataLevel" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="fieldDescription" label="字段描述" width="180">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.fieldDescription" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scoped">
              <el-button type="text" @click="handleDeleteRow(scoped.$index, formLabelAlign.dataList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-if="labeldataForm.dataFormat === '接口'">
        <!-- :rules="rules" -->
        <el-form
          :inline="true"
          label-width="120px"
          size="small"
          :rules="apiListRules"
          ref="apiList"
          :label-position="labelPosition"
          :model="apiList"
          class="frommaglef"
        >
          <el-form-item label="接口名称" key="41" prop="apiName" class="fromtopmag">
            <el-input
              v-model="apiList[0].apiName"
              placeholder="请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位"
              class="fromweiht frommagin"
            ></el-input>
          </el-form-item>
          <el-form-item label="响应类型" key="42" class="fromtopmag" prop="responseType">
            <el-select v-model="apiList[0].responseType" placeholder="请选择" class="fromweiht">
              <el-option
                :label="scenarioitem.text"
                :value="scenarioitem.text"
                v-for="(scenarioitem, index) in datefromList.responseType"
                :key="scenarioitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求方式" key="43" class="fromtopmag" prop="requestMode">
            <el-select v-model="apiList[0].requestMode" placeholder="请选择" class="fromweiht frommagin">
              <el-option
                :label="scenarioitem.text"
                :value="scenarioitem.text"
                v-for="(scenarioitem, index) in datefromList.requestMode"
                :key="scenarioitem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="请求数据类型" key="44" class="fromtopmag" prop="requestType">
            <el-select v-model="apiList[0].requestType" placeholder="请选择" class="fromweiht">
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
              v-model="apiList[0].apiRoute"
              placeholder="以/开头，支持英文、数字、下划线、连字符(-)，不超过200个字符，例如：/a1/b2"
              class="frombigweiht"
            ></el-input>
          </el-form-item>
          <el-form-item label="后端服务请求" class="fromtopmag" prop="serviceType">
            <el-select v-model="apiList[0].serviceType" placeholder="请选择" class="frombigweiht">
              <el-option
                :label="service.text"
                :value="service.text"
                v-for="(service, index) in datefromList.serviceRequest"
                :key="service.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <div v-if="apiList[0].serviceType == 'WebService' || ''">
            <el-form-item label="调用地址" class="fromtopmag" prop="host">
              <el-input type="input" v-model="apiList[0].host" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="空间命名" class="fromtopmag" prop="namespace">
              <el-input type="input" v-model="apiList[0].namespace" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="调用方法名称" class="fromtopmag" prop="method">
              <el-input type="input" v-model="apiList[0].method" class="frombigweiht"></el-input>
            </el-form-item>
            <el-form-item label="接口描述" class="fromtopmag" prop="apiDescribe">
              <el-input
                type="textarea"
                :rows="3"
                maxlength="300"
                v-model="apiList[0].apiDescribe"
                placeholder="请输入（20字以上）"
                class="frombigweiht"
              ></el-input>
            </el-form-item>
          </div>

          <div v-if="apiList[0].serviceType === 'http'">
            <div class="httpweihei"><i class="el-icon-info"></i><span>以http://开头，且不包含Path</span></div>
            <el-form-item label="后端服务host" class="fromtopmag" prop="host">
              <el-input type="input" v-model="apiList[0].host" class="frombigweiht"></el-input>
            </el-form-item>
            <div class="httpweihei">
              <i class="el-icon-info"></i
              ><span
                >以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter
                Path，放在${}中，如/user/${userid}</span
              >
            </div>
            <el-form-item label="后端服务Path" class="fromtopmag" prop="path">
              <el-input type="input" v-model="apiList[0].path" class="frombigweiht"></el-input>
            </el-form-item>
          </div>

          <div v-if="apiList[0].serviceType === 'https'">
            <div class="httpweihei"><i class="el-icon-info"></i><span>以https://开头，且不包含Path</span></div>
            <el-form-item label="后端服务host" class="fromtopmag" prop="host">
              <el-input type="input" v-model="apiList[0].host" class="frombigweiht"></el-input>
            </el-form-item>

            <div class="httpweihei">
              <i class="el-icon-info"></i
              ><span
                >以/开头，支持英文、数字、下划线、连字符(-)，后端服务Path中若包含请求参数中的Parameter
                Path，放在${}中，如/user/${userid}</span
              >
            </div>
            <el-form-item label="后端服务Path" class="fromtopmag" prop="path">
              <el-input type="input" v-model="apiList[0].path" class="frombigweiht"></el-input>
            </el-form-item>
          </div>

          <div v-if="apiList[0].serviceType === 'dubbo'">
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
          </div>

          <div v-if="apiList[0].serviceType === 'TCP'">
            <div class="httpweihei">
              <i class="el-icon-info"></i
              ><span>直接输入{地址:端口号}，地址可以输入IP地址或者域名地址，地址和端口号都必填</span>
            </div>
            <el-form-item label="后端服务host" class="fromtopmag" prop="host">
              <el-input type="input" v-model="apiList[0].host" class="frombigweiht"></el-input>
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
        <el-table
          :data="apiList[0].parameterList"
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
          <el-table-column type="index" label="序号" width="120" align="center"> </el-table-column>
          <el-table-column prop="parameterName" label="参数名称" width="230">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.parameterName" placeholder="xxx"></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="required" label="是否必填" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.required" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.type" placeholder="请选择">
                <el-option
                  :label="paraitem.text"
                  :value="paraitem.text"
                  v-for="(paraitem, index) in datefromList.paraType"
                  :key="paraitem.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="defaultValue" label="默认值" width="180">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.defaultValue" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="describetion" label="描述" width="180">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.describetion" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="parameterLocation" label="参数位置" width="180">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.parameterLocation" placeholder="请选择">
                <el-option
                  :label="parameter.text"
                  :value="parameter.text"
                  v-for="(parameter, index) in datefromList.parameterLocation"
                  :key="parameter.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="{ row, $index }">
              <el-button type="text" @click="DeleteRowApk($index, apiList[0].parameterList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <el-table
          :data="apiList[0].parameteReturnList"
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
          <el-table-column type="index" label="序号" width="120" align="center"> </el-table-column>
          <el-table-column prop="parameterName" label="参数名称" width="230">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.parameterName" placeholder="xxx"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="required" label="是否必填" width="140">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.required" placeholder="请选择">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.type" placeholder="请选择">
                <el-option
                  :label="paraitem.text"
                  :value="paraitem.text"
                  v-for="(paraitem, index) in datefromList.paraType"
                  :key="paraitem.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="defaultValue" label="默认值" width="180">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.defaultValue" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="describetion" label="描述" width="180">
            <template slot-scope="{ row, $index }">
              <el-input v-model="row.describetion" placeholder="XXX"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="parameterLocation" label="参数位置" width="180">
            <template slot-scope="{ row, $index }">
              <el-select v-model="row.parameterLocation" placeholder="请选择">
                <el-option
                  :label="parameter.text"
                  :value="parameter.text"
                  v-for="(parameter, index) in datefromList.parameterLocation"
                  :key="parameter.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="{ row, $index }">
              <el-button type="text" @click="DeleteRowApk($index, apiList[0].parameteReturnList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h3 class="footmag">请求示例</h3>
        <el-input
          type="textarea"
          :rows="3"
          maxlength="300"
          v-model="apiList[0].requestExample"
          placeholder="请输入（20字以上）"
          class="footweiht"
        ></el-input>
        <h3 class="footmag">返回示例</h3>
        <el-input
          type="textarea"
          :rows="3"
          maxlength="300"
          v-model="apiList[0].returnExample"
          placeholder="请输入（20字以上）"
          class="footweiht"
        ></el-input>
      </div>
    </el-card>

    <el-card class="cardpadmargtop">
      <el-row>
        <el-col :span="6" :offset="20">
          <div class="flootdivmag">
            <el-button size="small" type="primary" @click="save('formLabelAlign')">保存</el-button>
            <el-button size="small" @click="isExamineDialogVisible = true">提交审核</el-button>
            <el-button size="small" @click="cancel">取消</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 提交审核的弹框 -->
      <el-dialog title="提示" :visible.sync="isExamineDialogVisible" width="30%">
        <el-divider></el-divider>
        <p class="examinepcent">是否确定提交该编目审核</p>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="isExamineDialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="addSubmit">提交</el-button>
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
      <!-- <el-dialog title="批量导入数据项" :visible.sync="isExcleLeadingin" width="30%"> -->
      <ExcelLeadingin
        ref="excelLeadingin"
        v-if="isExcleLeadingin"
        :requestType="requestType"
        :isExcleLeadingin="isExcleLeadingin"
        @changeExcleLeadingin="changeExcleLeadingin"
        @importExcelList="importExcelList"
      ></ExcelLeadingin>
      <!-- </el-dialog> -->

      <!-- 接口-请求参数-导入 -->
      <el-dialog title="Excel导入" class="dialoghei" :visible.sync="isAskExport" width="30%">
        <el-divider></el-divider>
        <div class="dialogmarg centerupload">
          <el-upload
            drag
            class="upload-demo"
            ref="upload"
            name="file"
            action="/dtwave-om/api/cataLog/importParameterExcel"
            accept=".xls,.xlsx"
            :headers="headerObj"
            :on-success="uploadSuccessExcel"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击图标选择Excel文件上传</div>
            <div class="el-upload__tip exceluploaddiv" slot="tip">
              点击 <span class="mbcolor" @click="downloadmu"> 模版 </span> 下载数据目录模版
            </div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer excelbutweizhi">
          <el-button size="small" @click="isAskExport = false" class="butonqumarg">取 消</el-button>
          <el-button type="primary" size="small" :disabled="isdisabled" @click="importParameterExcel">{{
            uploading ? '解析中...' : '提交解析'
          }}</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ExcelLeadingin from '@/views/datefrom/components/ExcelLeadingin'
import {
  postlistDatabase,
  getTargetcopy,
  postRelationType,
  postAddSave,
  getaddNewNodeList,
  postsubmitCatalog,
  postUpdate,
  deleteParameter,
  mechanismTree
} from '@/api/api'
import { download } from '@/api/manage'
import { MessageBox, Message } from 'element-ui'
export default {
  name: 'AddOrModify',
  components: {
    ExcelLeadingin
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (!reg.test(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    let checkApiName = (rule, value, callback) => {
      let apiItem = /^\w+$/
      if (!apiItem.test(value)) {
        callback(new Error('请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位'))
      } else {
        callback()
      }
    }
    return {
      headerObj: {
        'X-Access-Token': JSON.parse(window.localStorage.getItem('pro__Access-Token')).value
      },
      citys:[],
      loading: true,
      tableData: [],
      obj: {},
      input: '',
      labelPosition: 'left',
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
        // 事项类型
        eventType: 'event_type',
        // 事项层级
        classification: 'event_classification',
        // 行使层级
        exercise: 'exercise_level',
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
        primaryKey: 'primary_key',
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
        parameterLocation: 'parameter_location'
      },
      // 导入
      isExportId: '',
      isAskExport: false,
      resbodyList: {},
      file: '',
      filename: '',
      errmesg: [],
      result: '',
      fileName: '',
      uploading: false,
      isdisabled: true,
      downloadName: '编目导入_1661239378734.xlsx',

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
        catalogName: '', //信息资源名称
        catalogEn: '', //信息资源英文名称
        sourceUnit: '', //数源单位
        sourceSystem: '', //数源应用系统
        notAssociatedReason: '', //未关联系统理由
        shareType: '', //共享类型
        shareCondition: '', //共享条件
        openType: '', //开放类型
        openSociety: '', //是否对社会开放
        keyAreasType: '', //重点领域分类
        keyAreasRemark: '', //重点领域分类备注
        updateFrequency: '', //更新频率
        inputFrequency: '',
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
            primaryKey: '', //是否主键
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
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
      // 数据格式-接口
      apiList: [
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
          ],
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
        }
      ],

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
      // 编辑
      modifyId: '',
      // 草稿箱编辑
      modifyIdDraft: '',
      // 表单校验
      formLabelAlignRules: {
        catalogName: [{ required: true, message: '请输入信息资源名称', trigger: 'blur' }],
        catalogEn: [{ required: true, message: '请输入信息资源英文名称', trigger: 'blur' }],
        sourceUnit: [{ required: true, message: '请选择数源单位', trigger: 'change' }],
        sourceSystem: [{ required: true, message: '请选择数源应用系统', trigger: 'change' }],
        shareType: [{ required: true, message: '请选择共享类型', trigger: 'change' }],
        shareCondition: [{ required: true, message: '请选择共享条件', trigger: 'change' }],
        openType: [{ required: true, message: '请选择开放类型', trigger: 'change' }],
        // openSociety: [{ required: true, message: '请选择是否对社会开放', trigger: 'change' }],
        keyAreasType: [{ required: true, message: '请选择重点领域分类', trigger: 'change' }],
        keyAreasRemark: [{ required: true, message: '请输入重点领域分类备注', trigger: 'blur' }],
        updateFrequency: [{ required: true, message: '请选择更新频率', trigger: 'change' }],
        dataRange: [{ required: true, message: '请选择数据范围', trigger: 'change' }],
        informationSummary: [
          { required: true, message: '请输入信息资源摘要', trigger: 'blur' },
          {
            min: 20,
            message: '请输入20字以上',
            trigger: 'blur'
          }
        ],
        // businessDepartment: [{ required: true, message: '请选择业务责任科室', trigger: 'change' }],
        businessPerson: [{ required: true, message: '请输入业务责任人', trigger: 'blur' }],
        contactInformation: [{ required: true, validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' }]
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
        applicationScenarioDescribe: [{ required: true, message: '请选择应用场景描述', trigger: 'change' }],
        provideChannels: [{ required: true, message: '请选择提供渠道', trigger: 'change' }]
      },
      libraryRules: {
        baseLibrary: [{ required: true, message: '请选择是否关联基础库/专题库', trigger: 'change' }],
        categoryClassification: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      labelPositionRules: {
        dataFormat: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      bmCatalogDataSourceRules: {
        databaseName: [{ required: true, message: '请选择', trigger: 'change' }],
        tableName: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      apiListRules: {
        apiName: [
          {
            required: true,
            validator: checkApiName,
            trigger: 'blur'
          },
          {
            min: 3,
            max: 128,
            message: '请输入API名称，仅限中英文、字母、数字和下划线，长度范围3-128位',
            trigger: 'blur'
          }
        ],
        apiRoute: [
          {
            required: true,
            message: '以/开头，支持英文、数字、下划线、连字符(-)，不超过200个字符，例如：/a1/b2',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {
    // 新增页面选择框的数据-请求数据字典得到
    this.dictionaryList()
    // 新增页面-数据格式-数据库的选择框数据请求
    this.listDatabaseList()
    // 新增页面-类目关联-基础库/专题库数据
    this.getTargetcopyinptList()
    this.changeOption(this.formLabelAlign.dataRange)
    this.chanismTree()
  },
  methods: {
     // 数源单位
    getquery() {
      queryUserUnit().then(res => {
        if (res.success) {
          if (res.body.length == 1) {
            this.formLabelAlign.sourceUnit = res.body
          }
        }
      })
    },
    chanismTree() {
      mechanismTree().then((res) => {
        if (res.success) {
          this.citys = res.body.children.flat(Infinity)
          // console.log(this.citys);
        }
      })
    },
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
      }
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
              this.formLabelAlign.dataList.splice(arr1[j] - j - 1, 1)
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
      if (this.formLabelAlign.dataList == undefined) {
        this.formLabelAlign.dataList = new Array()
      }
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
      newObj.openAttribute = ''
      newObj.primaryKey = ''
      newObj.shareProperty = ''
      newObj.sharingCondition = ''
      this.formLabelAlign.dataList.push(newObj)
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
        primaryKey,
        empty,
        dataObject,
        requestMode,
        responseType,
        requestDataType,
        serviceRequest,
        paraType,
        parameterLocation
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
      this.$store.dispatch('getPrimaryKey', primaryKey)
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
    },
    // 点击数据格式
    changedataFormat(val) {
      if (val == 'excel') {
        this.listDatabaseList()
        this.apiList = []
        this.bmCatalogDataSource.databaseName = ''
        this.bmCatalogDataSource.sqDataSourceId = ''
        this.bmCatalogDataSource.tableName = ''
        this.formLabelAlign.dataList = [
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
            primaryKey: '', //是否主键
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
        this.bmCatalogDataSource.databaseName = ''
        this.bmCatalogDataSource.sqDataSourceId = ''
        this.bmCatalogDataSource.tableName = ''
        this.formLabelAlign.dataList = [
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
            primaryKey: '', //是否主键
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      }
      if (val == '接口') {
        console.log('95959595')
        ;(this.apiList = [
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
            ],
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
          }
        ]),
          (this.bmCatalogDataSource.databaseName = '')
        this.bmCatalogDataSource.sqDataSourceId = ''
        this.bmCatalogDataSource.tableName = ''
        this.formLabelAlign.dataList = [
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
            primaryKey: '', //是否主键
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
        ]
      }
    },
    // 新增页面-数据格式-数据库的选择框数据请求
    listDatabaseList() {
      let a = {}
      postlistDatabase(a).then(res => {
        if (res.success) {
          this.databaseNameList = res.body
        }
      })
    },
    // 点击数据库名-请求表名数据
    handlerdatabase(database) {
      this.bmCatalogDataSource.sqDataSourceId = database.storageId
      this.obj = {
        fromDataId: database.id,
        toClassId: '46',
        currentPage: '1',
        pageSize: '10'
      }
      postRelationType(this.obj).then(res => {
        if (res.success) {
          this.tableType = res.body
        }
      })
    },
    // 点击表名-请求对应表格数据
    handtableTypeList(tableTypeItem) {
      // let tableitem = this.tableType.filter((value, index) => {
      //   return value.name == tabName
      // })
      console.log(tableTypeItem)
      this.obj = {
        fromDataId: tableTypeItem.id,
        toClassId: '47',
        currentPage: '1',
        pageSize: '9999'
      }
      this.requestType()
    },
    requestType() {
      postRelationType(this.obj).then(res => {
        if (res.success) {
          this.formLabelAlign.dataList = res.body
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

    getAddData(val) {
      this.loading = val
      this.getquery()
    },

    // 请求获取编辑的初始化数据
    getUpdateAddData(row) {
      this.modifyId = row
      let arrayid = row
      getaddNewNodeList(arrayid).then(res => {
        if (res.success) {
          this.formLabelAlign = res.body
          this.formLabelAlign.dataRange = JSON.parse(res.body.dataRange)
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
          //是否关联基础/专题库
          this.Library.baseLibrary = res.body.baseLibrary
          this.Library.categoryClassification = res.body.categoryClassification
          // 数据格式
          this.labeldataForm.dataFormat = res.body.dataFormat
          this.bmCatalogDataSource = res.body.bmCatalogDataSource
          // 接口
          this.apiList = res.body.apiList

          this.addId = res.body.id
          this.loading = false
        }
      })
    },
    // 草稿箱页面编辑
    getDraftboxAddData(row) {
      this.modifyIdDraft = row
      let arrayid = row
      getaddNewNodeList(arrayid).then(res => {
        if (res.success) {
          this.formLabelAlign = res.body
          this.formLabelAlign.dataRange = JSON.parse(res.body.dataRange)
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
          //是否关联基础/专题库
          this.Library.baseLibrary = res.body.baseLibrary
          this.Library.categoryClassification = res.body.categoryClassification
          // 数据格式
          this.labeldataForm.dataFormat = res.body.dataFormat
          this.bmCatalogDataSource = res.body.bmCatalogDataSource
          // 接口
          this.apiList = res.body.apiList

          this.addId = res.body.id
          this.loading = false
        }
      })
    },

    // 选中当前行的数据
    handleSelect(row) {
      this.checkedDetail = row
      this.selectID = []
      if (row.length > 0) {
        row.forEach((value, index) => {
          this.selectID.push(value.id)
        })
      }
    },
    // 选中背景色
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.selectID.values()) {
        if (item === row.id) {
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
          this.isAskID.push(value.id)
        })
      }
    },
    // 选中背景色
    tableRowClassNameAsk({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.isAskID.values()) {
        if (item === row.id) {
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
          this.isBackID.push(value.id)
        })
      }
    },
    // 选中背景色
    tableRowClassNameBack({ row, rowIndex }) {
      row.index = rowIndex + 1
      let color = ''
      for (let item of this.isBackID.values()) {
        if (item === row.id) {
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
              this.apiList[0].parameterList.splice(arr1[j] - j - 1, 1)
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
              this.apiList[0].parameteReturnList.splice(arr1[j] - j - 1, 1)
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
    // 点击保存发送请求
    save() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs['formLabelAlign'].validate(valid => {
          if (valid) resolve()
        })
      })

      const p2 = new Promise((resolve, reject) => {
        this.$refs['related'].validate(valid => {
          if (valid) resolve()
        })
      })

      const p3 = new Promise((resolve, reject) => {
        this.$refs['Library'].validate(valid => {
          if (valid) resolve()
        })
      })
      const p4 = new Promise((resolve, reject) => {
        this.$refs['labeldataForm'].validate(valid => {
          if (valid) resolve()
        })
      })
      const p5 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
          this.$refs['bmCatalogDataSource'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })
      const p6 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          this.$refs['apiList'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })
      const p7 = new Promise((resolve, reject) => {
        if (this.related.relatedGovernment === '是') {
          this.$refs['alignItem'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })

      Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(() => {
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
        this.formLabelAlign.apiList = this.apiList

        let formLabel = this.formLabelAlign
        if (this.modifyId != '' || this.modifyIdDraft != '') {
          postUpdate(formLabel).then(res => {
            if (res.success) {
              Message({
                message: '保存成功',
                type: 'success'
              })
              // this.$emit('update:visible', false)
              // if(this.modifyIdDraft != ''){

              // }
              this.resetData()
              this.$emit('draftSuccess', false)
              this.$router.push({
                path: '/datefrom/draftbox'
              })
            } else {
              //   Message({
              //     type: 'warning',
              //     message: res.header.message
              //   })
              Message.error(res.header.message)
            }
          })
        } else {
          postAddSave(formLabel).then(res => {
            if (res.success) {
              Message({
                message: '保存成功',
                type: 'success'
              })

              this.resetData()
              this.$emit('draftSuccess', false)
              console.log('0258')
              this.$router.push({
                path: '/datefrom/draftbox'
              })
            } else {
              Message.error(res.header.message)
            }
          })
        }
        this.modifyId = ''
        this.modifyIdDraft == ''
        this.addId == ''
      })
    },
    // 点击提交审核
    addSubmit() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs['formLabelAlign'].validate(valid => {
          if (valid) resolve()
        })
      })

      const p2 = new Promise((resolve, reject) => {
        this.$refs['related'].validate(valid => {
          if (valid) resolve()
        })
      })

      const p3 = new Promise((resolve, reject) => {
        this.$refs['Library'].validate(valid => {
          if (valid) resolve()
        })
      })
      const p4 = new Promise((resolve, reject) => {
        this.$refs['labeldataForm'].validate(valid => {
          if (valid) resolve()
        })
      })
      const p5 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === 'excel' || this.labeldataForm.dataFormat === '数据库') {
          this.$refs['bmCatalogDataSource'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })
      const p6 = new Promise((resolve, reject) => {
        if (this.labeldataForm.dataFormat === '接口') {
          this.$refs['apiList'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })
      const p7 = new Promise((resolve, reject) => {
        if (this.related.relatedGovernment === '是') {
          this.$refs['alignItem'].validate(valid => {
            if (valid) resolve()
          })
        } else {
          resolve()
        }
      })

      Promise.all([p1, p2, p3, p4, p5, p6, p7]).then(() => {
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
        this.formLabelAlign.apiList = this.apiList

        let dataformLabel = this.formLabelAlign
        if (this.modifyId != '' || this.modifyIdDraft != '') {
          let catalogid = { id: this.addId }
          postsubmitCatalog(catalogid).then(res => {
            if (res.success) {
              Message({
                message: '提交审核成功!',
                type: 'success'
              })
              this.isExamineDialogVisible = false
              this.resetData()
              this.$emit('closeModify', false)
              //通知返回列表页成功，在列表页发请求重新获取列表数据
              this.$emit('backSuccess')
              this.$router.push({
                path: '/datefrom/cataloglist'
              })
            } else {
              this.isExamineDialogVisible = false
              Message({
                type: 'info',
                message: res.header.message
              })
            }
          })
        } else {
          postAddSave(dataformLabel).then(res => {
            if (res.success) {
              let lableId = res.result.dataId
              let catalog = { id: lableId }
              postsubmitCatalog(catalog).then(res => {
                if (res.success) {
                  Message({
                    message: '提交审核成功!',
                    type: 'success'
                  })
                  this.isExamineDialogVisible = false
                  this.resetData()

                  this.$emit('closeModify', false)
                  //通知返回列表页成功，在列表页发请求重新获取列表数据
                  this.$emit('backSuccess')
                } else {
                  this.isExamineDialogVisible = false
                  Message({
                    type: 'info',
                    message: res.header.message
                  })
                }
              })
            }
          })
        }
        this.modifyId = ''
        this.modifyIdDraft == ''
        this.addId == ''
      })
    },
    parameterExcel(val) {
      this.isExportId = val
      this.isAskExport = true
    },

    // 导入成功
    uploadSuccessExcel(res, file, fileList) {
      this.fileName = file.name
      if (res.success) {
        this.result = res.success
        this.resbodyList = res.body
        this.isdisabled = false
      } else {
        this.$message.warning(res.message)
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
          this.apiList[0].parameterList = this.apiList[0].parameterList.concat(resbodyList)
        } else {
          this.apiList[0].parameteReturnList = this.apiList[0].parameteReturnList.concat(resbodyList)
        }
      } else {
        this.uploading = false
        this.$message.warning(`${this.fileName}上传失败`)
      }
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
      download({ fileName: this.downloadName })
        .then(res => {
          console.log(res)
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
      if (this.apiList.parameterList == undefined) {
        this.apiList.parameterList = new Array()
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
      this.apiList[0].parameterList.push(apinewObj)
      // this.$set(this.formLabelAlign.apiList.parameterList,'apinewObj')
    },
    addtableBackItem() {
      if (this.apiList.parameteReturnList == undefined) {
        this.apiList.parameteReturnList = new Array()
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
      this.apiList[0].parameteReturnList.push(apiblokObj)
      // this.$set(this.apiList.parameteReturnList,apiblokObj)
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
      this.formLabelAlign.dataList = this.formLabelAlign.dataList.concat(val)
    },
    // deleteBackList() {
    //   deleteParameter(this.isBackID).then(res => {
    //     if (res.success) {
    //       Message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     } else {
    //       Message.error('删除失败')
    //     }
    //   })
    //   this.isBackID = []
    //   this.deleteBack = false
    // },

    // 重置数据
    resetData() {
      this.formLabelAlign = {
        catalogName: '', //信息资源名称
        catalogEn: '', //信息资源英文名称
        sourceUnit: '', //数源单位
        sourceSystem: '', //数源应用系统
        notAssociatedReason: '', //未关联系统理由
        shareType: '', //共享类型
        shareCondition: '', //共享条件
        openType: '', //开放类型
        openSociety: '', //是否对社会开放
        keyAreasType: '', //重点领域分类
        keyAreasRemark: '', //重点领域分类备注
        updateFrequency: '', //更新频率
        inputFrequency: '',
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
                id: 0
              }
            ],
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
                id: 0
              }
            ]
          }
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
            primaryKey: '', //是否主键
            nullValue: '', //是否可为空
            dataObject: '', //数据对象
            dataLevel: '', //数据级别
            fieldDescription: '', //字段描述
            id: ''
          }
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
      ;(this.labeldataForm = { dataFormat: '' }),
        (this.bmCatalogDataSource = {
          catalogId: '',
          databaseName: '', //数据源名称//库名
          sqDataSourceId: '', //数栖id
          tableName: '' //表名
        })
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
          ],
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
        }
      ]
    },
    cancel() {
      this.resetData()
      if (this.modifyIdDraft == '') {
        this.$emit('closeModify', false)
      } else {
        this.$emit('closeDraft', false)
      }
      this.modifyIdDraft == ''
      this.addId == ''
      this.loading = true
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
  font-size: 19px;
  text-align: center;
  margin-top: 30px;
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
}
/deep/.el-dialog__title {
  color: #1890ff;
}
/deep/.el-divider--horizontal {
  background-color: #1890ff;
  margin: 0;
}
.deletdial {
  /deep/.el-dialog__body {
    padding: 0;
  }
}
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
  margin: 32px 40px 0 40px;
} ////
.centerupload {
  text-align: center;
} ////
.mbcolor {
  color: #1890ff;
}
.butonqumarg {
  margin-right: 10px;
}

// 删除
// .dialogcenter {
//   text-align: center;
//   line-height: 200px;
// }
</style>
