"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const uni_modules_geekHeader_components_hooks_useNavbarInfo = require("../hooks/useNavbarInfo.js");
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "DEMO",
      navigationBarBackgroundColor: "#000000",
      navigationBarTextStyle: "white",
      navigationStyle: "custom"
    }
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8",
  "app-plus": {
    background: "#efeff4"
  }
};
const pages$1 = {
  pages,
  globalStyle
};
const _sfc_main = {
  __name: "geek-header",
  props: {
    // 右侧文字
    rightText: {
      default: "",
      type: String
    },
    // 背景色
    bgColor: {
      default: "",
      type: String
    },
    //是否有标题颜色
    titleColor: {
      default: "",
      type: String
    },
    // 是否为白色返回箭头
    whiteback: {
      default: false,
      type: Boolean
    },
    // 是否没有返回
    noLeft: {
      default: false,
      type: Boolean
    },
    // 页面标题
    title: {
      default: "",
      type: String
    },
    // 右侧padding
    rightPadding: {
      default: "30rpx"
    },
    // 右侧颜色
    rightColor: {
      default: "#000",
      type: String
    },
    // 是否自动返回
    autoBack: {
      default: true,
      type: Boolean
    },
    // 是否生成一个等高元素，防止塌陷
    placeholder: {
      default: false,
      type: Boolean
    }
  },
  emits: ["leftClick", "rightClick"],
  setup(__props, { emit }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "022e7378": common_vendor.unref(headerPaddingHeightPX),
      "03e2b5cf": common_vendor.unref(headerPaddingBottomHeightPX),
      "0e3d40e3": common_vendor.unref(navHeightPX)
    }));
    let { headerPaddingHeightPX, navHeightPX, headerPaddingBottomHeightPX } = uni_modules_geekHeader_components_hooks_useNavbarInfo.useNavbarInfo();
    let headerTitle = common_vendor.ref("");
    let headerTitleColor = common_vendor.ref("");
    let headerBgColor = common_vendor.ref("");
    let HeaderBoxStyle = common_vendor.ref({});
    common_vendor.watchEffect(() => {
      if (props.title) {
        headerTitle.value = props.title;
      } else {
        let routes = getCurrentPages();
        let url = routes[routes.length - 1].route;
        let page = pages$1.pages.filter((page2) => page2.path == url)[0];
        let title = page.style.navigationBarTitleText;
        headerTitle.valu = title;
      }
      if (!props.bgColor) {
        if (props.whiteback) {
          headerBgColor.value = "rgba(0, 0, 0, 0)";
        } else {
          headerBgColor.value = "#fff";
        }
      } else {
        headerBgColor.value = props.bgColor;
      }
      if (!props.titleColor) {
        if (props.whiteback) {
          headerTitleColor.value = "#fff";
        } else {
          headerTitleColor.value = "#000";
        }
      } else {
        headerTitleColor.value = props.titleColor;
      }
      if (props.placeholder) {
        HeaderBoxStyle.value = {
          paddingTop: headerPaddingHeightPX.value,
          paddingBottom: headerPaddingBottomHeightPX.value
        };
      } else {
        HeaderBoxStyle.value = {};
      }
    });
    let headerRightClick = () => {
      emit("rightClick");
    };
    let headerLeftClick = () => {
      emit("leftClick");
      if (props.autoBack) {
        common_vendor.index.navigateBack();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.noLeft
      }, !__props.noLeft ? common_vendor.e({
        b: __props.whiteback
      }, __props.whiteback ? {
        c: common_assets._imports_0
      } : {
        d: common_assets._imports_1
      }, {
        e: common_vendor.o((...args) => common_vendor.unref(headerLeftClick) && common_vendor.unref(headerLeftClick)(...args))
      }) : {}, {
        f: common_vendor.t(common_vendor.unref(headerTitle)),
        g: common_vendor.unref(headerTitleColor),
        h: common_vendor.t(__props.rightText),
        i: common_vendor.o((...args) => common_vendor.unref(headerRightClick) && common_vendor.unref(headerRightClick)(...args)),
        j: __props.rightPadding,
        k: __props.rightColor,
        l: common_vendor.unref(headerBgColor),
        m: common_vendor.s(common_vendor.unref(HeaderBoxStyle)),
        n: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-689b797c"], ["__file", "C:/home/playspace/github/uniapp/uniapp-demo/uni_modules/geek-header/components/geek-header/geek-header.vue"]]);
wx.createComponent(Component);
