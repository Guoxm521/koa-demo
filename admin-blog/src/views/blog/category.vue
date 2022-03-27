<template>
  <div>
    <pageMain>
      <template v-slot:header-right>
        <el-button type="primary" @click="openDialog = true">新增分类</el-button>
      </template>
      <template v-slot:main>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          default-expand-all
        >
          <el-table-column prop="name" label="分类标题" />
          <el-table-column prop="sort_order" label="序号" />
          <el-table-column prop="sort_order" width="100" label="状态">
            <template #default="scope">
              <el-tag class="ml-2" v-if="scope.row.status === 1" type="success">启用</el-tag>
              <el-tag class="ml-2" v-if="scope.row.status === 2" type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="c_time" label="创建时间">
            <template #default="scope">{{ parseTime(scope.row.c_time) }}</template>
          </el-table-column>
          <el-table-column prop="u_time" label="更新时间">
            <template #default="scope">{{ parseTime(scope.row.u_time) }}</template>
          </el-table-column>
          <el-table-column width="200" align="center" prop="操作" label="操作">
            <template #default="scope">
              <el-button type="text" @click="handleAddBlogCategory(scope.row)">新增</el-button>
              <el-button type="text" @click="handleEditBlogCategory(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelBlogCategory(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <categoryAddDialog
        v-model:open="openDialog"
        v-model:ceshi="ceshi"
        :title="dialogTitle"
        :categoryInfo="categoryInfo"
        :type="handleType"
        @refresh="handleGetBlogList"
      ></categoryAddDialog>
    </pageMain>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue"
import { getBlogCaegoryList, delBlogCategory } from "/@/api/blog"
import { parseTime } from "/@/utils/filter"
import { ElMessage, ElMessageBox } from "element-plus"
import categoryAddDialog from "./components/categoryAddDialog.vue"
interface row {
  id: number
  parent_id: number
  name: string
  sort_order: number
  status: number
}

const tableData = ref([])
const handleGetBlogList = () => {
  getBlogCaegoryList({}).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.list
    }
  })
}
handleGetBlogList()

// 删除
const handleDelBlogCategory = (item: any) => {
  const { id, name, status } = item
  // if (status === 1) {
  //   ElMessage.error("该分类正在使用，无法删除")
  //   return
  // }
  ElMessageBox.confirm(`你确定删除分类【${name}】?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      delBlogCategory({ id: id }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.error("删除成功!")
          handleGetBlogList()
        }
      })
    })
    .catch(() => { })
}

// 编辑 && 新增
const openDialog = ref(false)
const dialogTitle = ref("新增分类")
const ceshi = ref("你好")
const handleType = ref("add")

const categoryInfo = reactive({
  id: null,
  parent_id: null,
  parent_name: null,
  name: null,
  sort_order: null,
  status: null,
})

const handleAddBlogCategory = (row: row) => {
  handleType.value = "add"
  dialogTitle.value = "新增分类"
  handleRow(row)
}
const handleEditBlogCategory = (row: row) => {
  handleType.value = "edit"
  dialogTitle.value = "编辑分类"
  handleRow(row)
}

const handleRow = (row: row) => {
  categoryInfo.id = row.id
  categoryInfo.parent_id = row.parent_id
  categoryInfo.parent_name = getFatherName(row.parent_id)
  categoryInfo.name = row.name
  categoryInfo.sort_order = row.sort_order
  categoryInfo.status = row.status
  openDialog.value = true
}

// 获取父级分类的名称
function getFatherName(parent_id) {
  let array = flatArray(tableData.value)
  let item = array.find(e => {
    return e.id === parent_id
  })
  return item ? item.name : "一级分类"
}

// 数组扁平化
function flatArray(arr) {
  const res = []
  res.push(...arr)
  for (const item of arr) {
    if (item.children && item.children.length) {
      res.push(...flatArray(item.children))
    }
  }
  return res
}
</script>
<style scoped></style>
