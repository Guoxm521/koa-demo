import Layout from "/@/layout/index.vue";

const aboutRouter = {
  path: "/about",
  name: "About",
  component: Layout,
  redirect: "/about/project",
  meta: {
    icon: "data-board",
    title: '项目相关',
    rank: 0
  },
  children: [
    {
      path: "/about/project",
      name: "AboutParam",
      component: () => import("/@/views/about/index.vue"),
      meta: {
        title:"项目相关",
      }
    }
  ]
};

export default aboutRouter;
