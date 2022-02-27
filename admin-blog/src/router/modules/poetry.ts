import Layout from "/@/layout/index.vue"

const poetryRouter = {
  path: "/poetry",
  name: "Poetry",
  component: Layout,
  redirect: "/poetry/list",
  meta: {
    icon: "notebook",
    title: "古今诗词",
    i18n: false,
    rank: 0,
  },
  children: [
    {
      path: "/poetry/list",
      name: "PoetryList",
      component: () => import("/@/views/poetry/index.vue"),
      meta: {
        title: "诗词列表",
        i18n: false,
      },
    },
    {
      path: "/poetry/category",
      name: "PoetryCategory",
      component: () => import("/@/views/poetry/category.vue"),
      meta: {
        title: "诗词分类",
        i18n: false,
      },
    },
  ],
}

export default poetryRouter
