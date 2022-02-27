import { $t } from "/@/plugins/i18n";
import Layout from "/@/layout/index.vue";

const errorRouter = [
  {
    path: "/error/401",
    name: "401",
    component: () => import("/@/views/error/401.vue"),
    meta: {
      title: $t("menus.hsfourZeroOne"),
      i18n: true,
      showLink: false,
    }
  },
  {
    path: "/error/404",
    name: "404",
    component: () => import("/@/views/error/404.vue"),
    meta: {
      title: $t("menus.hsfourZeroFour"),
      i18n: true,
      showLink: false,
    }
  }
]

export default errorRouter;
