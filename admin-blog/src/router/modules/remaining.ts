import { $t } from "/@/plugins/i18n"
import Layout from "/@/layout/index.vue"
import errorRouter from "./error"

const remainingRouter = [
  {
    path: "/login",
    name: "login",
    component: () => import("/@/views/login.vue"),
    meta: {
      title: $t("menus.hslogin"),
      showLink: false,
      i18n: true,
      rank: 101,
    },
  },
  {
    path: "/redirect",
    name: "redirect",
    component: Layout,
    meta: {
      icon: "home-filled",
      title: $t("menus.hshome"),
      i18n: true,
      showLink: false,
      rank: 104,
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        name: "redirect",
        component: () => import("/@/views/redirect.vue"),
      },
    ],
  },
  {
    path: "/blog/add",
    name: "BlogAdd",
    component: () => import("/@/views/blog/add.vue"),
    meta: {
      title: "博客新增",
      i18n: false,
      showLink: false,
    },
  },
  ...errorRouter,
]

export default remainingRouter
