"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_geek_header2 = common_vendor.resolveComponent("geek-header");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  (_easycom_geek_header2 + _easycom_uni_search_bar2)();
}
const _easycom_geek_header = () => "../../uni_modules/geek-header/components/geek-header/geek-header.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_geek_header + _easycom_uni_search_bar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const onSearch = (val) => {
      console.log(val);
    };
    common_vendor.onLoad((option) => {
      console.log(option);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          noLeft: true,
          bgColor: "rgba(0,0,0,0)",
          placeholder: true
        }),
        b: common_vendor.o(onSearch),
        c: common_vendor.o(($event) => searchValue.value = $event),
        d: common_vendor.p({
          radius: 100,
          bgColor: "#fff",
          cancelButton: "none",
          placeholder: "请输入搜索内容",
          modelValue: searchValue.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/home/playspace/github/uniapp/uniapp-demo/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
