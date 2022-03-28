<template>
  <div>
    <pageMain>
      <template v-slot:header>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="文章标题">
            <el-input v-model="searchForm.title" placeholder="文章标题"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="发布状态">
              <el-option label="已发布" value="1"></el-option>
              <el-option label="未发布" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="onSubmit">搜索</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:main>
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border>
          <el-table-column prop="sort_order" width="60" label="序号">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="title" label="文章标题" />
          <el-table-column prop="sort_order" label="状态">
            <template #header>
              <div class="tipsLabel">
                <span>状态呀</span>
                <el-tooltip class="item" effect="dark" content="点击状态切换文章发布状态" placement="top">
                  <span class="icon">
                    <el-icon>
                      <question-filled />
                    </el-icon>
                  </span>
                </el-tooltip>
              </div>
            </template>
            <template #default="scope">
              <div class="status_box">
                <el-tag
                  class="ml-2"
                  v-if="scope.row.status === 1"
                  type="success"
                  @click="changStatus(scope.row)"
                >已发布</el-tag>
                <el-tag
                  class="ml-2"
                  v-if="scope.row.status === 0"
                  type="danger"
                  @click="changStatus(scope.row)"
                >未发布</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="所属分类">
            <template #default="scope">{{ categoryOptions[scope.row.category] }}</template>
          </el-table-column>
          <el-table-column label="所属标签">
            <template #default="scope">
              <el-tag
                v-for="(item, index) in scope.row.tags_labels"
                :key="index"
                type="success"
                class="label_tag"
              >{{ item }}</el-tag>
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
              <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from "vue-router"
import { parseTime } from "/@/utils/filter"
import { Search } from '@element-plus/icons-vue'
import { getBlogList, deleteBlog, getBlogCaegoryList, getBlogTagList, updateBlog } from '/@/api/blog'
import { ElMessage, ElMessageBox } from "element-plus"
const route = useRouter()
const loading = ref(false)
const total = ref(0)
const searchForm = reactive({
  title: "",
  status: "",
})
const pageForm = reactive({
  page: 1,
  page_size: 20,
})
const onReset = () => {
  pageForm.page = 1
  searchForm.title = ''
  searchForm.status = ''
  getData()
}
const onSubmit = () => {
  getData()
}


const categoryOptions = ref({})
const tagOptions = ref({})
// 获取分类
const getBlogCaegory = async () => {
  return new Promise((resolve, reject) => {
    getBlogCaegoryList({ type: 1 }).then((res: any) => {
      if (res.code === 200) {
        let obj = {}
        res.data.list.map(e => {
          obj[e.id] = e.name
        })
        categoryOptions.value = obj
      }
      resolve(true)
    })
  })

}

// 获取标签
const getBlogTag = async () => {
  new Promise((resolve, reject) => {
    getBlogTagList({ status: 1 }).then((res: any) => {
      if (res.code === 200) {
        let obj = {}
        res.data.list.map(e => {
          obj[e.id] = e.name
        })
        tagOptions.value = obj
      }
      resolve(true)
    })
  })

}


const tableData = ref([])
const getData = async () => {
  loading.value = true
  let params = Object.assign({}, pageForm, searchForm)
  if (params.status === '') delete params.status
  let res: any = await getBlogList(params)
  if (res.code === 200) {
    total.value = res.data.count
    res.data.list.map(e => {
      e.tags_labels = []
      if (e.tag) {
        e.tag.split(',').map(i => {
          e.tags_labels.push(tagOptions.value[i])
        })
      }
    })
    tableData.value = res.data.list
    loading.value = false
  }
}

const main = async () => {
  await getBlogCaegory()
  await getBlogTag()
  getData()
}
main()

// 分页
const handleSizeChange = (val: number) => {
  pageForm.page_size = val
  getData()
}
const handleCurrentChange = (val: number) => {
  pageForm.page = val
  getData()
}

const handleEdit = (row: any) => {
  let { id } = row
  route.push({
    path: '/blog/add',
    query: { id: id }
  })
}
const handleDelete = (row: any) => {
  let { id, title } = row
  ElMessageBox.confirm(`你确定删除文章【${title}】?`, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res: any = await deleteBlog({ id: id })
      if (res.code === 200) {
        ElMessage.success('删除成功')
        getData()
      }
    })
    .catch(() => { })
}

const changStatus = async (row: any) => {
  let { status, id, title } = row
  let message = status === 1 ? `是否取消发布文章【${title}】?` : `是否发布文章【${title}】?`
  ElMessageBox.confirm(message, "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      let res: any = await updateBlog({ status: status === 1 ? 0 : 1, id: id })
      if (res.code === 200) {
        ElMessage.success("更新成功")
        getData()
      }
    })
    .catch(() => { })
}
</script>
<style scoped lang="scss">
.essay-list {
  width: 100%;
  margin: unset;
  border-bottom: 1px solid #e5e6eb;
  padding: 16px 16px;
  height: 86px;
  box-sizing: border-box;
  &:hover {
    background-color: #fafafa;
  }
}
.infos {
  font-size: 14px;
  line-height: 22px;
  color: #86909c;
}
.first-line {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .dropdown {
    width: 50px;
    flex-shrink: 0;
  }
  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.el-icon--right {
  font-weight: 600;
  font-size: 24px;
}
.empty {
  margin-top: 45px;
}
.label_tag {
  margin-right: 3px;
  margin-bottom: 3px;
}
.tipsLabel {
  span {
    padding: 0;
    margin: 0;
  }
  display: flex;
  align-items: center;
  .icon {
    margin-left: 5px;
    margin-bottom: -2px;
  }
}
.status_box {
  cursor: pointer;
}
</style>
