import Layout from "/@/layout/index.vue"

const companyRouter = [
  {
    path: "/company",
    name: "Company",
    component: Layout,
    redirect: "/company/index",
    meta: {
      icon: "bell",
      title: "公司脚本",
      i18n: false,
      rank: 0,
    },
    children: [
      {
        path: "/company/index",
        name: "CompanyList",
        component: () => import("/@/views/company/index.vue"),
        meta: {
          title: "接口注册",
          i18n: false,
        },
      }
    ],
  },
]

export default companyRouter
