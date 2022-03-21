import Layout from "/@/layout/index.vue"

const blogRouter = [
  {
    path: "/blog",
    name: "Blog",
    component: Layout,
    redirect: "/blog/index",
    meta: {
      icon: "bell",
      title: "我的博客",
      i18n: false,
      rank: 0,
    },
    children: [
      {
        path: "/blog/index",
        name: "Bloglist",
        component: () => import("/@/views/blog/index.vue"),
        meta: {
          title: "博客列表",
          i18n: false,
        },
      },
      {
        path: "/blog/category",
        name: "BlogCategory",
        component: () => import("/@/views/blog/category.vue"),
        meta: {
          title: "博客分类",
          i18n: false,
        },
      },
      {
        path: "/blog/tag",
        name: "BlogTag",
        component: () => import("/@/views/blog/tag.vue"),
        meta: {
          title: "分类标签",
          i18n: false,
        },
      },
    ],
  },
]

export default blogRouter
