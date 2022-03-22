<template>
  <div>
    <pageMain>
      <template v-slot:header>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="标签名称">
            <el-input
              v-model="searchForm.name"
              placeholder="标签名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option label="有效" value="1"></el-option>
              <el-option label="无效" value="0"></el-option>
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
      <template v-slot:header-right>
        <el-button type="primary" @click="dialogVisible = true"
          >新增标签</el-button
        ></template
      >
      <template v-slot:main>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
        >
          <el-table-column prop="sort_order" width="60" label="序号">
            <template #default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标签名称" />
          <el-table-column prop="sort_order" width="100" label="状态">
            <template #default="scope">
              <el-tag class="ml-2" v-if="scope.row.status === 1" type="success">
                启用</el-tag
              >
              <el-tag class="ml-2" v-if="scope.row.status === 2" type="danger">
                关闭</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="c_time" label="创建时间">
            <template #default="scope">
              {{ parseTime(scope.row.c_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="u_time" label="更新时间">
            <template #default="scope">
              {{ parseTime(scope.row.u_time) }}
            </template>
          </el-table-column>
          <el-table-column width="200" align="center" prop="操作" label="操作">
            <template #default="scope">
              <el-button type="text" @click="handleEditBlogTag(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="handleDelBlogTag(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
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
    <el-dialog
      :model-value="dialogVisible"
      width="550px"
      :before-close="handleClose"
      :title="tagAddForm.id ? '编辑分类' : '新增分类'"
    >
      <div>
        <el-form :model="tagAddForm" label-width="100px">
          <el-form-item label="标签名称">
            <el-input
              v-model="tagAddForm.name"
              placeholder="清输入标签名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="tagAddForm.status">
              <el-radio :label="1">开启</el-radio>
              <el-radio :label="2">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="diaLoading" @click="handleSubmit"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, nextTick } from "vue"
import {
  getBlogTagList,
  deleteBlogTag,
  updateBlogTag,
  addBlogTag,
} from "/@/api/blog"
import { parseTime } from "/@/utils/filter"
import { ElMessage, ElMessageBox } from "element-plus"
import { toReactive } from "@vueuse/core"
import Row from "element-plus/es/components/row/src/row"
interface row {
  id: number
  parent_id: number
  name: string
  sort_order: number
  status: number
}
const loading = ref(false)
const total = ref(0)
const searchForm = reactive({
  name: "",
  status: "",
})

const pageForm = reactive({
  page: 1,
  page_size: 20,
})

const onSubmit = () => {
  getList()
}
const onReset = () => {
  searchForm.name = ""
  searchForm.status = ""
  pageForm.page = 1
  getList()
}

const tableData = ref([])
const getList = () => {
  loading.value = true
  let params = Object.assign({}, pageForm, searchForm)
  getBlogTagList(params).then((res: any) => {
    if (res.code === 200) {
      tableData.value = res.data.list
      total.value = res.data.count
    } else {
      ElMessage.error(res.message)
    }
    loading.value = false
  })
}
getList()

// 分页
const handleSizeChange = (val: number) => {
  pageForm.page_size = val
  getList()
}
const handleCurrentChange = (val: number) => {
  pageForm.page = val
  getList()
}

// 删除
const handleDelBlogTag = (item: any) => {
  const { id, name, status } = item
  ElMessageBox.confirm(`你确定删除标签【${name}】?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      deleteBlogTag({ id: id }).then((res: any) => {
        if (res.code === 200) {
          ElMessage.error("删除成功!")
          getList()
        }
      })
    })
    .catch(() => {})
}

// 编辑 && 新增
const dialogVisible = ref(false)
const diaLoading = ref(false)
const tagAddForm = toReactive({
  id: "",
  name: "",
  status: "",
})
const handleClose = (done: () => void) => {
  done()
  tagAddForm.id = ""
  tagAddForm.name = ""
  tagAddForm.status = ""
}
const handleEditBlogTag = (row: any) => {
  tagAddForm.id = row.id
  tagAddForm.name = row.name
  tagAddForm.status = row.status
  nextTick()
  dialogVisible.value = true
}
const handleSubmit = async () => {
  diaLoading.value = true
  let res: any = {}
  let message: string = "新增成功"
  if (tagAddForm.id) {
    res = await updateBlogTag(tagAddForm)
    if (res.code === 200) message = "编辑成功"
  } else {
    res = await addBlogTag(tagAddForm)
    if (res.code === 200) message = "新增成功"
  }
  if (res.code === 200 && message) {
    ElMessage.success(message)
  }
  getList()
  dialogVisible.value = false
  diaLoading.value = false
}
</script>
<style scoped></style>
