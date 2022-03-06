// 静态路由
import homeRouter from "./home"
import errorRouter from "./error"
import externalLink from "./externalLink"
import poetryRouter from "./poetry"
import blogRouter from "./blog"
import remainingRouter from "./remaining"
import { RouteRecordRaw, RouteComponent } from "vue-router"

import {
  ascending,
  formatTwoStageRoutes,
  formatFlatteningRoutes,
} from "../utils"
import { buildHierarchyTree } from "/@/utils/tree"

// 原始静态路由（未做任何处理）
const routes = [homeRouter, poetryRouter, blogRouter]

// 导出处理后的静态路由（三级及以上的路由全部拍成二级）
export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
  formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
)

// 用于渲染菜单，保持原始层级
export const constantMenus: Array<RouteComponent> = ascending(routes).concat(
  ...remainingRouter
)
