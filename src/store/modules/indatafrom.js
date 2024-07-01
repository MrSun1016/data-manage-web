// import { getDictItems } from '@/api/api'
import { getDictItems } from '@/api/api'

const indatafrom = {
    state: {
        datefromList: {
            application: {},
            shuyuansource: {},
            catalogingStatus: {},
            catalogueList: {},
            aggregate: {},
            // 共享类型
            sharetype: {},
            // 开放类型
            opentype: {},
            // 是否对社会开放
            opensociety: {},
            // 重点领域分类
            keyareastype: {},
            // 业务责任科室
            department: {},
            // 更新频率////////
            frequency: {},
            // 事项类型
            eventType: {},
            // 事项层级
            classification: {},
            // 行使层级
            exercise: {},
            // 结果类型
            resultType: {},
            // 应用场景
            scenario: {},
            // 应用场景描述
            description: {},
            // 提供渠道
            channels: {},
            // 数据格式
            dataFormat: {},
            // 共享属性
            property: {},
            // 开放属性
            openproperties: {},
            // 是否主键
            primaryKey: {},
            // 是否可为空
            empty: {},
            // 数据对象
            dataObject: {},
            // 行政区划
            division: {},
            // 请求方式
            requestMode: {},
            // 响应类型
            responseType: {},
            // 请求数据类型
            requestDataType: {},
            // 预警信息下架理由
            earlywarning: {},
            // 健康码信息下架理由
            health: {},
            // 	后端服务请求
            serviceRequest: {},
            // 参数类型
            paraType: {},
            // 	参数位置
            parameterLocation: {},
            // 使用应用系统
            useAppSystem: {},
            // 数源部门
            applyDept: {},
            //释放状态
            releaseType: {},
            // 数据类型
            shareType: {},
            // 消息类型
            messageType: {},
            // 资料管理类型
            management: {},
            // 数据级别
            dataLevel: {},
            // 数据类型
            fieldDataType: {},
            // 更新状态
            updateTatus: {},
            // 共享数据状态
            shareDataStatus: {},
            // 接口类型
            apiType: {},
            // 状态
            state: {},
            // 公告状态
            announcement: {},
            transportMode: {}
        }
    },
    mutations: {
        RECEIVE_APPLICATION(state, application) {
            state.datefromList.application = application
        },
        RECEIVE_SHUYUANSOURCE(state, shuyuansource) {
            state.datefromList.shuyuansource = shuyuansource
        },
        RECEIVE_CATALOGINGSTATUS(state, catalogingStatus) {
            state.datefromList.catalogingStatus = catalogingStatus
        },
        RECEIVE_CATALOGUELIST(state, catalogueList) {
            state.datefromList.catalogueList = catalogueList
        },
        RECEIVE_AGGREGATE(state, aggregate) {
            state.datefromList.aggregate = aggregate
        },
        RECEIVE_SHARETYPE(state, sharetype) {
            state.datefromList.sharetype = sharetype
        },
        RECEIVE_OPENTYPE(state, opentype) {
            state.datefromList.opentype = opentype
        },
        RECEIVE_OPENSOCIETY(state, opensociety) {
            state.datefromList.opensociety = opensociety
        },
        RECEIVE_KEYAREASTYPE(state, keyareastype) {
            state.datefromList.keyareastype = keyareastype
        },
        RECEIVE_DEPARTMENT(state, department) {
            state.datefromList.department = department
        },
        RECEIVE_FREQUENCY(state, frequency) {
            state.datefromList.frequency = frequency
        },
        RECEIVE_EVENTTYPE(state, eventType) {
            state.datefromList.eventType = eventType
        },
        RECEIVE_CLASSIFICATION(state, classification) {
            state.datefromList.classification = classification
        },
        RECEIVE_EXERCISE(state, exercise) {
            state.datefromList.exercise = exercise
        },
        RECEIVE_RESULTTYPE(state, resultType) {
            state.datefromList.resultType = resultType
        },
        RECEIVE_SCENARIO(state, scenario) {
            state.datefromList.scenario = scenario
        },
        RECEIVE_DESCRIPTION(state, description) {
            state.datefromList.description = description
        },
        RECEIVE_CHANNELS(state, channels) {
            state.datefromList.channels = channels
        },
        RECEIVE_DATAFORMAT(state, dataFormat) {
            state.datefromList.dataFormat = dataFormat
        },
        RECEIVE_PROPERTY(state, property) {
            state.datefromList.property = property
        },
        RECEIVE_OPENPROPERTIES(state, openproperties) {
            state.datefromList.openproperties = openproperties
        },
        RECEIVE_PRIMARYKEY(state, primaryKey) {
            state.datefromList.primaryKey = primaryKey
        },
        RECEIVE_EMPTY(state, empty) {
            state.datefromList.empty = empty
        },
        RECEIVE_DATAOBJECT(state, dataObject) {
            state.datefromList.dataObject = dataObject
        },
        RECEIVE_DIVISION(state, division) {
            state.datefromList.division = division
        },
        RECEIVE_REQUESTMODE(state, requestMode) {
            state.datefromList.requestMode = requestMode
        },
        RECEIVE_RESPONSETYPE(state, responseType) {
            state.datefromList.responseType = responseType
        },
        RECEIVE_REQUESTDATATYPE(state, requestDataType) {
            state.datefromList.requestDataType = requestDataType
        },
        RECEIVE_EARLYWARNING(state, earlywarning) {
            state.datefromList.earlywarning = earlywarning
        },
        RECEIVE_HEALTH(state, health) {
            state.datefromList.health = health
        },
        RECEIVE_SERVICEREQUEST(state, serviceRequest) {
            state.datefromList.serviceRequest = serviceRequest
        },
        RECEIVE_PARATYPE(state, paraType) {
            state.datefromList.paraType = paraType
        },
        RECEIVE_PARAMETERLOCATION(state, parameterLocation) {
            state.datefromList.parameterLocation = parameterLocation
        },
        RECEIVE_USEAPPSYSTEM(state, useAppSystem) {
            state.datefromList.useAppSystem = useAppSystem
        },
        RECEIVE_APPLYDEPT(state, applyDept) {
            state.datefromList.applyDept = applyDept
        },
        RECEIVE_RELEASETYPE(state, releaseType) {
            state.datefromList.releaseType = releaseType
        },
        RECEIVE_SHARETYPE(state, shareType) {
            state.datefromList.shareType = shareType
        },
        RECEIVE_MESSAGETYPE(state, messageType) {
            state.datefromList.messageType = messageType
        },
        RECEIVE_MANAGEMENT(state, management) {
            state.datefromList.management = management
        },
        RECEIVE_DATALEVEL(state, dataLevel) {
            state.datefromList.dataLevel = dataLevel
        },
        RECEIVE_FIELDDATATYPE(state, fieldDataType) {
            state.datefromList.fieldDataType = fieldDataType
        },
        RECEIVE_UPDATETATUS(state, updateTatus) {
            state.datefromList.updateTatus = updateTatus
        },
        RECEIVE_SHAREDATASTATUS(state, shareDataStatus) {
            state.datefromList.shareDataStatus = shareDataStatus
        },
        RECEIVE_APITYPE(state, apiType) {
            state.datefromList.apiType = apiType
        },
        RECEIVE_STATE(state, states) {
            state.datefromList.state = states
        },
        RECEIVE_ANNOUNCEMENT(state, announcement) {
            state.datefromList.announcement = announcement
        },
        RECEIVE_TRANSPORTMODE(state, transportMode) {
            state.datefromList.transportMode = transportMode
        },
    },
    actions: {
        // 使用应用系统
        getUseAppSystem({ commit }, useAppSystem) {
            getDictItems(useAppSystem).then(res => {
                if (res.success) {
                    commit('RECEIVE_USEAPPSYSTEM', res.result)
                }
            })
        },
        // 数源部门
        getApplyDept({ commit }, applyDept) {
            getDictItems(applyDept).then(res => {
                if (res.success) {
                    commit('RECEIVE_APPLYDEPT', res.result)
                }
            })
        },
        // 释放状态
        getReleaseType({ commit }, releaseType) {
            getDictItems(releaseType).then(res => {
                if (res.success) {
                    commit('RECEIVE_RELEASETYPE', res.result)
                }
            })
        },
        // 数据类型
        getShareType({ commit }, shareType) {
            getDictItems(shareType).then(res => {
                if (res.success) {
                    commit('RECEIVE_SHARETYPE', res.result)
                }
            })
        },
        // 行政区划
        getadministrativeDivision({ commit }, system) {
            getDictItems(system).then(res => {
                if (res.success) {
                    commit('RECEIVE_DIVISION', res.result)
                }
            })
        },
        getApplicationList({ commit }, system) {
            // 数源应用系统
            getDictItems(system).then(res => {
                if (res.success) {
                    // this.application = res.result
                    commit('RECEIVE_APPLICATION', res.result)
                }
            })
        },
        getShuyuanSourceList({ commit }, source) {
            // 数源单位
            getDictItems(source).then(res => {
                if (res.success) {
                    // this.shuyuansource = res.result
                    commit('RECEIVE_SHUYUANSOURCE', res.result)
                }
            })
        },
        getCatalogingList({ commit }, status) {
            // 编目状态
            getDictItems(status).then(res => {
                if (res.success) {
                    commit('RECEIVE_CATALOGINGSTATUS', res.result)
                }
            })
        },
        getCatalogueListList({ commit }, cata) {
            // 目录状态
            getDictItems(cata).then(res => {
                if (res.success) {
                    commit('RECEIVE_CATALOGUELIST', res.result)
                }
            })
        },
        getAggregateList({ commit }, imputation) {
            // 归集状态
            getDictItems(imputation).then(res => {
                if (res.success) {
                    commit('RECEIVE_AGGREGATE', res.result)
                }
            })
        },
        getSharetypeList({ commit }, sharetype) {
            // 共享类型
            getDictItems(sharetype).then(res => {
                if (res.success) {
                    commit('RECEIVE_SHARETYPE', res.result)
                }
            })
        },
        getOpentypeList({ commit }, opentype) {
            // 开放类型
            getDictItems(opentype).then(res => {
                if (res.success) {
                    commit('RECEIVE_OPENTYPE', res.result)
                }
            })
        },
        getOpensocietyList({ commit }, opensociety) {
            // 是否对社会开放
            getDictItems(opensociety).then(res => {
                if (res.success) {
                    commit('RECEIVE_OPENSOCIETY', res.result)
                }
            })
        },
        getKeyareastypeList({ commit }, keyareastype) {
            // 重点领域分类
            getDictItems(keyareastype).then(res => {
                if (res.success) {
                    commit('RECEIVE_KEYAREASTYPE', res.result)
                }
            })
        },
        getDepartmentList({ commit }, department) {
            // 业务责任科室
            getDictItems(department).then(res => {
                if (res.success) {
                    commit('RECEIVE_DEPARTMENT', res.result)
                }
            })
        },
        // // 更新频率
        //   frequency:'update_frequency',
        getFrequencyList({ commit }, frequency) {
            getDictItems(frequency).then(res => {
                if (res.success) {
                    commit('RECEIVE_FREQUENCY', res.result)
                }
            })
        },
        //   // 事项类型
        //   eventType:'event_type',
        getEventTypeList({ commit }, eventType) {
            getDictItems(eventType).then(res => {
                if (res.success) {
                    commit('RECEIVE_EVENTTYPE', res.result)
                }
            })
        },
        //   // 事项层级
        //   classification:'event_classification',
        getClassification({ commit }, classification) {
            getDictItems(classification).then(res => {
                if (res.success) {
                    commit('RECEIVE_CLASSIFICATION', res.result)
                }
            })
        },
        //   // 行使层级
        //   exercise:'exercise_level',
        getExercise({ commit }, exercise) {
            getDictItems(exercise).then(res => {
                if (res.success) {
                    commit('RECEIVE_EXERCISE', res.result)
                }
            })
        },
        //   // 结果类型
        //   resultType:'result_type',
        getResultType({ commit }, resultType) {
            getDictItems(resultType).then(res => {
                if (res.success) {
                    commit('RECEIVE_RESULTTYPE', res.result)
                }
            })
        },
        //   // 应用场景
        //   scenario:'application_scenario',
        getScenario({ commit }, scenario) {
            getDictItems(scenario).then(res => {
                if (res.success) {
                    commit('RECEIVE_SCENARIO', res.result)
                }
            })
        },
        //   // 应用场景描述
        //   description:'scenario_description',
        getDescription({ commit }, description) {
            getDictItems(description).then(res => {
                if (res.success) {
                    commit('RECEIVE_DESCRIPTION', res.result)
                }
            })
        },
        //   // 提供渠道
        //   channels:'provide_channels',
        getChannels({ commit }, channels) {
            getDictItems(channels).then(res => {
                if (res.success) {
                    commit('RECEIVE_CHANNELS', res.result)
                }
            })
        },
        //   // 数据格式
        //   dataFormat:'data_format',
        getDataFormat({ commit }, dataFormat) {
            getDictItems(dataFormat).then(res => {
                if (res.success) {
                    commit('RECEIVE_DATAFORMAT', res.result)
                }
            })
        },
        //   // 共享属性
        //   property:'share_property',
        getProperty({ commit }, property) {
            getDictItems(property).then(res => {
                if (res.success) {
                    commit('RECEIVE_PROPERTY', res.result)
                }
            })
        },
        //   // 开放属性
        //   openproperties:'open_properties',
        getOpenproperties({ commit }, openproperties) {
            getDictItems(openproperties).then(res => {
                if (res.success) {
                    commit('RECEIVE_OPENPROPERTIES', res.result)
                }
            })
        },
        //   // 是否主键
        //   primaryKey:'primary_key',
        getPrimaryKey({ commit }, primaryKey) {
            getDictItems(primaryKey).then(res => {
                if (res.success) {
                    commit('RECEIVE_PRIMARYKEY', res.result)
                }
            })
        },
        //   // 是否可为空
        //   empty:'can_it_be_empty',
        getEmptyList({ commit }, empty) {
            getDictItems(empty).then(res => {
                if (res.success) {
                    commit('RECEIVE_EMPTY', res.result)
                }
            })
        },
        //   // 数据对象
        //   dataObject:'data_object',
        getDataObject({ commit }, dataObject) {
            getDictItems(dataObject).then(res => {
                if (res.success) {
                    commit('RECEIVE_DATAOBJECT', res.result)
                }
            })
        },
        // 请求方式
        // requestMode,
        getRequestMode({ commit }, requestMode) {
            getDictItems(requestMode).then(res => {
                if (res.success) {
                    commit('RECEIVE_REQUESTMODE', res.result)
                }
            })
        },
        // 响应类型
        // responseType
        getResponseType({ commit }, responseType) {
            getDictItems(responseType).then(res => {
                if (res.success) {
                    commit('RECEIVE_RESPONSETYPE', res.result)
                }
            })
        },
        // 请求数据类型
        // requestDataType
        getRequestDataType({ commit }, requestDataType) {
            getDictItems(requestDataType).then(res => {
                if (res.success) {
                    commit('RECEIVE_REQUESTDATATYPE', res.result)
                }
            })
        },
        // 预警信息下架理由
        // earlywarning: 'early_warning_information',
        getEarlywarning({ commit }, earlywarning) {
            getDictItems(earlywarning).then(res => {
                if (res.success) {
                    commit('RECEIVE_EARLYWARNING', res.result)
                }
            })
        },
        // 健康码信息下架理由
        // health: 'health_code_information'
        getHealth({ commit }, health) {
            getDictItems(health).then(res => {
                if (res.success) {
                    commit('RECEIVE_HEALTH', res.result)
                }
            })
        },
        // 	后端服务请求
        // serviceRequest:'service_request'
        getServiceRequest({ commit }, serviceRequest) {
            getDictItems(serviceRequest).then(res => {
                if (res.success) {
                    commit('RECEIVE_SERVICEREQUEST', res.result)
                }
            })
        },
        // 参数类型
        // paraType
        getParaType({ commit }, paraType) {
            getDictItems(paraType).then(res => {
                if (res.success) {
                    commit('RECEIVE_PARATYPE', res.result)
                }
            })
        },

        // 	参数位置
        // parameterLocation
        getParameterLocation({ commit }, parameterLocation) {
            getDictItems(parameterLocation).then(res => {
                if (res.success) {
                    commit('RECEIVE_PARAMETERLOCATION', res.result)
                }
            })
        },

        // 	消息类型
        // messageType
        getMessageType({ commit }, messageType) {
            getDictItems(messageType).then(res => {
                if (res.success) {
                    commit('RECEIVE_MESSAGETYPE', res.result)
                }
            })
        },
        // 	资料管理类型
        // management
        getManagement({ commit }, management) {
            getDictItems(management).then(res => {
                if (res.success) {
                    commit('RECEIVE_MANAGEMENT', res.result)
                }
            })
        },
        //  数据级别
        // dataLevel
        getDataLevel({ commit }, dataLevel) {
            getDictItems(dataLevel).then(res => {
                if (res.success) {
                    commit('RECEIVE_DATALEVEL', res.result)
                }
            })
        },
        //  数据类型
        // fieldDataType
        getFieldDataType({ commit }, fieldDataType) {
            getDictItems(fieldDataType).then(res => {
                if (res.success) {
                    commit('RECEIVE_FIELDDATATYPE', res.result)
                }
            })
        },
        //  更新状态
        // updateTatus
        getUpdateTatus({ commit }, updateTatus) {
            getDictItems(updateTatus).then(res => {
                if (res.success) {
                    commit('RECEIVE_UPDATETATUS', res.result)
                }
            })
        },
        //共享数据状态
        // shareDataStatus: 'share_data_status',
        getShareDataStatus({ commit }, shareDataStatus) {
            getDictItems(shareDataStatus).then(res => {
                if (res.success) {
                    commit('RECEIVE_SHAREDATASTATUS', res.result)
                }
            })
        },
        // 接口类型
        // apiType: 'apiType',
        getApiType({ commit }, apiType) {
            getDictItems(apiType).then(res => {
                if (res.success) {
                    commit('RECEIVE_APITYPE', res.result)
                }
            })
        },
        // 状态
        // state: 'state',
        getState({ commit }, state) {
            getDictItems(state).then(res => {
                if (res.success) {
                    commit('RECEIVE_STATE', res.result)
                }
            })
        },
        // 公告状态
        // announcement: 'announcement_status',
        getAnnouncement({ commit }, announcement) {
            getDictItems(announcement).then(res => {
                if (res.success) {
                    commit('RECEIVE_ANNOUNCEMENT', res.result)
                }
            })
        },
        // 更新频率2
        // 传输模式
        getTransportMode({ commit }, transportMode) {
            getDictItems(transportMode).then(res => {
                if (res.success) {
                    commit('RECEIVE_TRANSPORTMODE', res.result)
                }
            })
        },

    },
}

export default indatafrom