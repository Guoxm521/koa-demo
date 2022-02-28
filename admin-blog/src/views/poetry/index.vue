<template>
  <div>
    <pageMain>
      <template v-slot:header>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="作者">
            <el-input v-model="formInline.user" placeholder="朝代"></el-input>
          </el-form-item>
          <el-form-item label="朝代">
            <el-select v-model="formInline.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button type="primary" @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form></template
      >
      <template v-slot:main>
        <el-table :data="tableData" border style="width: 100%">
          <template v-slot:empty>
            <el-empty description="暂无数据"></el-empty
          ></template>
          <el-table-column prop="date" label="序号" width="60" />
          <el-table-column prop="name" label="标题" />
          <el-table-column prop="address" label="作者" />
          <el-table-column prop="address" label="朝代" />
          <el-table-column prop="address" label="内容" /> </el-table
      ></template>
      <template v-slot:page>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination
      ></template>
    </pageMain>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from "vue"
import { getPoetryList } from "/@/api/poetry"
import pageMain from "/@/components/pageMain/index.vue"

const tableData = []
const formInline = reactive({
  user: "",
  region: "",
})

const onSubmit = () => {
  console.log("submit!")
}
getPoetryList({}).then(res => {
  console.log(res)
})
</script>
<style scoped></style>
