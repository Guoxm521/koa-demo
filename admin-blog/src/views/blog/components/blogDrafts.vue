<template>
  <div>
    <pageMain>
      <template v-slot:header>
        <div class="header">
          <el-input
            v-model="title"
            placeholder="请输入标题关键字"
            :suffix-icon="Search"
            style="width: 400px;"
            @keydown.enter="getData"
          />
        </div>
      </template>
      <template v-slot:main>
        <div v-show="tableData.length > 0">
          <div class="essay-list" v-for="item in tableData" :key="item.id">
            <div class="first-line">
              <div class="title">{{ item.title }}</div>
              <div class="dropdown">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                      <more-filled />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <span @click="handleEdit(item)">编辑</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span @click="handleDelete(item)">删除</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div class="infos">{{ parseTime(item.u_time) }}</div>
          </div>
        </div>
        <div class="empty" v-show="tableData.length === 0">
          <el-empty :image-size="200" />
        </div>
      </template>
    </pageMain>
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, onBeforeMount, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { getBlogList, deleteBlog } from '/@/api/blog'
import { parseTime } from "/@/utils/filter"
import { ElMessage } from "element-plus"
const route = useRouter()
const title = ref('')
const tableData = ref([])
const getData = async () => {
  let res: any = await getBlogList({ status: 2, page_size: 10000, title: title.value })
  if (res.code === 200) {
    tableData.value = res.data.list
    emits('setDraftsNum', res.data.list.length)
  }
}
getData()
const handleEdit = (row: any) => {
  let { id } = row
  route.push({
    path: '/blog/add',
    query: { id: id }
  })
}
const handleDelete = async (row: any) => {
  let { id } = row
  let res: any = await deleteBlog({ id: id })
  if (res.code === 200) {
    ElMessage.success('删除成功')
    getData()
  }
}

const emits = defineEmits(['setDraftsNum'])
</script>
<style scoped lang="scss">
.header {
  padding-left: 16px;
}
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
</style>
