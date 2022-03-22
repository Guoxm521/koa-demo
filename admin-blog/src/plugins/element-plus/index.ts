import { App, Component } from "vue"
import {
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElPagination,
  ElMessage,
  ElDialog,
  ElUpload,
  ElDescriptions,
  ElDescriptionsItem,
  ElImage,
  // 指令
  ElLoading,
  ElInfiniteScroll,

} from "element-plus"

// Directives
const plugins = [ElLoading, ElInfiniteScroll ]

const components = [
  ElTag,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElScrollbar,
  ElSubMenu,
  ElButton,
  ElCol,
  ElRow,
  ElDivider,
  ElDropdown,
  ElMenu,
  ElMenuItem,
  ElDropdownItem,
  ElDropdownMenu,
  ElIcon,
  ElInput,
  ElPopover,
  ElPopper,
  ElTooltip,
  ElDrawer,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElBacktop,
  ElSwitch,
  ElBadge,
  ElTabs,
  ElTabPane,
  ElAvatar,
  ElEmpty,
  ElCollapse,
  ElCollapseItem,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElPagination,
  ElMessage,
  ElDialog,
  ElUpload,
  ElDescriptions,
  ElDescriptionsItem,
  ElImage
]


import { Plus, Delete} from "@element-plus/icons-vue"
const icons = [Plus, Delete]

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component)
  })
  icons.forEach((icon: Component) => {
    app.component(icon.name,icon)
  })
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
