<template>
  <div>
    <pageMain>
      <template v-slot:header>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="作者">
            <el-input v-model="searchForm.author" placeholder="朝代"></el-input>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="searchForm.title" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              v-model="searchForm.content"
              placeholder="内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="朝代">
            <el-select
              v-model="searchForm.dynasty_id"
              placeholder="朝代"
              style="width: 100px"
            >
              <el-option
                v-for="item in dynastyList"
                :key="item.dynastry_id"
                :label="item.dynastry"
                :value="item.dynastry_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="onSubmit"
              >搜索</el-button
            >
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:main>
        <el-table :data="tableData" border style="width: 100%">
          <template v-slot:empty>
            <el-empty description="暂无数据"></el-empty>
          </template>
          <el-table-column prop="date" label="序号" width="60">
            <template #default="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column prop="title" label="标题" width="180" />
          <el-table-column prop="author" label="作者" width="120" />
          <el-table-column prop="dynasty" label="朝代" width="120" />
          <el-table-column prop="content" label="内容" />
        </el-table>
      </template>
      <template v-slot:page>
        <el-pagination
          :currentPage="pageForm.page"
          :page-size="pageForm.page_size"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </template>
    </pageMain>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue"
import { any, object } from "vue-types"
import { getPoetryList, getPoetryCategory } from "/@/api/poetry"
import pageMain from "/@/components/pageMain/index.vue"

const loading = ref(false)
const searchForm = reactive({
  author: "",
  dynasty_id: "",
  title: "",
  content: "",
})
const tableData = ref([])
const total = ref(0)
const onSubmit = () => {
  getList()
}
const onReset = () => {
  searchForm.author = ""
  searchForm.dynasty_id = ""
  searchForm.title = ""
  searchForm.content = ""
  pageForm.page = 1
  getList()
}

const pageForm = reactive({
  page: 1,
  page_size: 20,
})

const handleSizeChange = (val: number) => {
  getList()
}
const handleCurrentChange = (val: number) => {
  getList()
}

const dynastyList = ref([])
getPoetryCategory({}).then(res => {
  if (res.code === 200) {
    dynastyList.value = res.data.list
  }
})

function getList() {
  loading.value = true
  let params = Object.assign({}, pageForm, searchForm)
  getPoetryList(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.list
      total.value = res.data.count
    } else {
      ElMessage.error(res.msg)
    }
    loading.value = false
  })
}
getList()
</script>
<style scoped></style>
