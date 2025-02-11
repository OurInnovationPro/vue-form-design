<!-- Created by 337547038 on 通用数据表格页. -->
<template>
  <div class="table-list-comm" v-loading="loading">
    <div class="table-search" v-if="Object.keys(searchData).length>0">
      <design-form
        :disabled="loading"
        :form-data="searchData"
        ref="designForm">
        <slot name="DFSearchForm"></slot>
        <template v-if="!$slots.DFSearchForm">
          <el-button
            type="primary"
            @click="getListData"
            :loading="loading">查询
          </el-button>
          <el-button @click="searchClear">清空</el-button>
        </template>
      </design-form>
    </div>
    <slot></slot>
    <div class="table-main">
      <slot name="DFTable"></slot>
      <el-table
        v-if="!$slots.DFTable"
        :data="tableDataList"
        v-bind="tableData.config"
        ref="tableEl">
        <template v-for="item in tableData.columns" :key="item.prop||item.label">
          <el-table-column v-bind="item">
            <template #header="scope" v-if="item.help">
              {{ scope.column.label }}
              <Tooltip :content="item.help"></Tooltip>
            </template>
            <template #default="scope" v-if="$slots[item.prop]">
              <slot
                :name="item.prop"
                :row="scope.row"
                :$index="scope.$index">
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="table-page" v-if="showPage">
      <el-pagination
        v-model:currentPage="currentPage"
        :page-sizes="[20, 30, 40,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import designForm from './form.vue'
import {reactive, toRefs, ref, onMounted} from 'vue'
import {useRoute} from 'vue-router'
import Tooltip from './tooltip.vue'

export default {
  name: "tableList",
  props: {
    searchData: Object,
    tableData: Object,
    beforeRequest: Function,
    afterResponse: Function,
    showPage: {
      type: Boolean,
      default: true
    },
    autoLoad: { // onMounted后自动加载数据，当列表存在默认筛选条件时，可能存在searchData的数据还没请求回来，此时加载可以关掉自动加载，改为手当searchData请求完后再加载，避免重复加载请求
      type: Boolean,
      default: true
    },
    requestUrl: Function, // 请求的api
    tableList: Array // 当requestUrl没传时，表格行数据使用传入的
  },
  components: {designForm, Tooltip},
  setup(props) {
    const route = useRoute()
    const designForm = ref()
    const tableEl = ref()
    const state = reactive({
      loading: false,
      tableDataList: props.tableList, // 表格行数据
      currentPage: 1,
      pageSize: 20,
      total: 0
    })
    // 筛选查询列表数据
    const getListData = () => {
      if (state.loading) {
        return // 防重复加载
      }
      state.loading = true
      // 筛选查询一般不存在校验，这里直接取值
      let formValue = designForm.value && designForm.value.getValue(true)
      if (props.beforeRequest) {
        formValue = props.beforeRequest(formValue || {})
      }
      /*console.log(formValue)
      console.log('请求数据')*/
      props.requestUrl && props.requestUrl(route.query.formName, formValue)
        .then(res => {
          let result = res.data.data
          if (props.afterResponse) {
            result = props.afterResponse(result)
          }
          /*console.log(result)*/
          state.tableDataList = result
          state.loading = false
        })
        .catch(res => {
          state.loading = false
        })
      state.loading = false
    }
    // 仅清空筛选输入
    const searchClear = () => {
      designForm.value.ruleForm.resetFields() // 这个只是清空了model的值
      designForm.value.setValue(designForm.value.getValue()) // 重新将取到的空值对筛选表单赋值
    }
    const handleSizeChange = page => {
      state.pageSize = page
      getListData()
    }
    const handleCurrentChange = page => {
      state.currentPage = page
      getListData()
    }
    onMounted(() => {
      props.autoLoad && getListData() // 请求列表数据
    })
    return {
      ...toRefs(state),
      handleSizeChange,
      handleCurrentChange,
      getListData,
      searchClear,
      designForm,
      tableEl
    }
  }
}
</script>
