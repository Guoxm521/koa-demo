<template>
	<div>
		<el-popover
			placement="bottom-end"
			:teleported="false"
			:width="560"
			trigger="click"
			v-model:visible="visible"
		>
			<template #reference>
				<el-button type="primary" @click="visible = true">发布</el-button>
			</template>
			<div>
				<div class="header">发布文章</div>
				<div class="main">
					<div class="form-item">
						<div class="label required">分类：</div>
						<div class="content">
							<div
								@click="form.caregory = item.id"
								v-for="(item, index) in categoryOptions"
								:key="index"
								:class="['item', form.caregory == item.id ? 'active' : '']"
							>
								{{ item.name }}
							</div>
						</div>
					</div>
					<div class="form-item">
						<div class="label required">添加标签：</div>
						<div class="content">
							<el-select
								v-model="form.tag"
								multiple
								:multiple-limit="3"
								collapse-tags
								tag-type="success"
								placeholder="请选择标签"
								style="width: 240px"
								:teleported="false"
							>
								<el-option
									@click.prevent
									v-for="(item, index) in tagOptions"
									:key="index"
									:label="item.name"
									:value="item.id"
								/>
							</el-select>
						</div>
					</div>
					<div class="form-item">
						<div class="label required">文章封面：</div>
						<div class="content">
							<div v-show="!form.cover">
								<div class="select_btn" @click="uploadImage">
									<el-icon :size="20"><plus /></el-icon>
									<div>上传封面</div>
								</div>
								<div class="advice">上传小于2M的jpg,png格式的图片</div>
								<input
									type="file"
									ref="upload"
									@change="changeImgae"
									style="display: none"
								/>
							</div>
							<div class="image_box" v-show="form.cover">
								<el-icon :size="20" class="delete_icon" @click="deleteCover"
									><delete
								/></el-icon>
								<el-image
									style="width: 160px; height: 106px"
									:src="form.cover"
									fit="cover"
								/>
							</div>
						</div>
					</div>
					<div class="form-item">
						<div class="label required">编辑摘要：</div>
						<div class="content">
							<el-input
								v-model="form.des"
								:rows="5"
								maxlength="100"
								:minlength="50"
								:show-word-limit="true"
								type="textarea"
								resize="none"
								:class="[showDesError ? 'input_error' : '']"
							/>
							<p class="tip" v-if="showDesError">文章长度应该为50-100</p>
						</div>
					</div>
				</div>
				<div class="footer">
					<el-button @click="visible = false">取消</el-button>
					<el-button type="primary" @click="submit">确认发布</el-button>
				</div>
			</div>
		</el-popover>
	</div>
</template>

<script lang="ts" setup>
	import { reactive, ref, toRef, defineProps, watch, onMounted } from "vue"
	import { ElNotification } from "element-plus"
	import { getBlogCaegoryList, getBlogTagList } from "/@/api/blog"
	import uploadApi from "/@/utils/upload"
	import { throttle } from "lodash-es"
	import { addBlog, updateBlog } from "/@/api/blog.ts"
	const props = defineProps({
		title: {
			type: String,
			default: "",
		},
		content: {
			type: String,
			default: "",
		},
	})
	watch(props, (newProps, oldProps) => {
		form.title = newProps.title
		form.content = newProps.content
	})

	const currentId = ref(null)
	const form = reactive({
		caregory: "",
		tag: [],
		des: "",
		cover: "",
		title: "",
		content: "",
		status: 2,
	})
	watch(form, (newForm, oldForm) => {
		if (
			newForm.caregory ||
			newForm.tag.length > 0 ||
			newForm.des ||
			newForm.cover ||
			newForm.title ||
			newForm.content
		) {
			if (!currentId.value) {
				addArticle()
			} else {
				updateArticle()
			}
		}
	})
	const visible = ref(false)
	const showDesError = ref(false)
	const upload = ref()
	const uploadImage = () => {
		upload.value.click()
	}
	const tagOptions = ref([])
	const categoryOptions = ref([])

	// 获取标签
	getBlogTagList({ status: 1 }).then((res: any) => {
		if (res.code === 200) {
			tagOptions.value = res.data.list
		}
	})

	// 获取分类
	getBlogCaegoryList({ type: 1, status: 1 }).then((res: any) => {
		if (res.code === 200) {
			categoryOptions.value = res.data.list
		}
	})

	const changeImgae = async (e: any) => {
		let op = e.target.files[0]
		let res: any = await uploadApi(op)
		if (res.code === 200) {
			form.cover = res.data.url
		}
	}

	// 删除上传的图片
	const deleteCover = () => {
		form.cover = ""
	}

	const notice = (value: string) => {
		ElNotification({
			title: "提示",
			message: value,
			duration: 1500,
			type: "error",
		})
	}
	const submit = async () => {
		demo()
		if (form.des.length < 50 || form.des.length > 100) {
			showDesError.value = true
		} else {
			showDesError.value = false
		}
		if (!form.caregory) return notice("请选择文章所属分类")
		if (!form.tag) return notice("请选择文章所属标签")
		if (!form.des) return notice("请输入文章简介")
		updateArticle(1)
	}

	const demo = throttle(type => {
		console.log("执行", type)
	}, 1000)

	// 新增文章
	const addArticle = throttle(async () => {
		let formParams = JSON.parse(JSON.stringify(form))
		formParams.tag = formParams.tag.join(",")
		let res: any = await addBlog(formParams)
		if (res.code === 200) {
			currentId.value = res.data.id
		}
	}, 5000)

	// 更新文章
	const updateArticle = throttle(async status => {
		let formParams = JSON.parse(JSON.stringify(form))
		if (status) {
			formParams.status = status
		}
		formParams.tag = formParams.tag.join(",")
		formParams.id = currentId.value
		let res: any = await updateBlog(formParams)
	}, 5000)
</script>
<style lang="scss" scoped>
.header {
	font-size: 20px;
	padding: 10px 0 10px 0;
	border-bottom: 1px solid #e5e6eb;
}
.footer {
	font-size: 20px;
	padding: 10px 0 10px 0;
	border-top: 1px solid #e5e6eb;
	display: flex;
	justify-content: flex-end;
}
.main {
	padding: 10px 0;
	.form-item {
		display: flex;
		align-items: flex-start;
		margin: 20px 20px 32px;
		.label {
			width: 85px;
			flex: none;
			text-align: right;
			font-size: 14px;
			color: #1d2129;
			line-height: 28px;
			&.required {
				&::before {
					content: "*";
					color: #f53f3f;
					vertical-align: -2px;
					margin-right: 5px;
				}
			}
		}
		.content {
			flex: auto;
			position: relative;
			.item {
				display: inline-block;
				margin-right: 5px;
				margin-bottom: 10px;
				padding: 0 0.7rem;
				font-size: 14px;
				line-height: 28px;
				width: 88px;
				height: 28px;
				white-space: nowrap;
				overflow: hidden;
				text-align: center;
				text-overflow: ellipsis;
				border-radius: 2px;
				cursor: pointer;
				color: #86909c;
				background-color: #f4f5f5;
				&:hover {
					background: #e5e6eb;
				}
				&.active {
					color: #1d7dfa;
					background-color: #e8f3ff;
				}
			}
			.tip {
				font-size: 12px;
				color: #f56c6c;
			}
			.input_error {
				::v-deep(.el-textarea__inner) {
					border-color: #f56c6c !important;
				}
			}
			.image_box {
				position: relative;
				width: fit-content;
				height: fit-content;
				.delete_icon {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1000;
					color: #ffffff;
					cursor: pointer;
					&:hover {
						color: #e8f3ff;
					}
				}
			}
		}
		.select_btn {
			width: 160px;
			height: 86px;
			background-color: #fafafa;
			border: 1px dashed #e5e6eb;
			margin-bottom: 16px;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			div {
				color: #86909c;
				margin-top: 5px;
			}
		}
		.advice {
		}
	}
}
::v-deep(.el-select__tags) {
	padding-left: 5px !important;
}
</style>
