"use strict";
const common_vendor = require("../../../../common/vendor.js");
function useNavbarInfo() {
  const type = common_vendor.index.getSystemInfoSync().uniPlatform;
  let cachetInfo = common_vendor.ref({
    height: 0,
    top: 0,
    width: 0
  });
  if (type != "app" && type != "web" && type != "mp-lark") {
    cachetInfo.value = common_vendor.wx$1.getMenuButtonBoundingClientRect();
  } else {
    cachetInfo.value.height = 50;
  }
  let statusBarHeight = common_vendor.ref(0);
  let safeAreaInsetTop = common_vendor.ref(0);
  let safeAreaInsetBottom = common_vendor.ref(0);
  let cachetWidthPX = common_vendor.ref(0);
  let navHeightPX = common_vendor.ref(0);
  let statusBarHeightPX = common_vendor.ref(0);
  let safeAreaInsetTopPX = common_vendor.ref(0);
  let safeAreaInsetBottomPX = common_vendor.ref(0);
  let headerPaddingHeightPX = common_vendor.ref(0);
  let headerPaddingBottomHeightPX = common_vendor.ref(0);
  if (type != "app" && type != "web" && type != "mp-lark") {
    headerPaddingBottomHeightPX.value = cachetInfo.value.height * 0.3 + "px";
  } else {
    headerPaddingBottomHeightPX.value = "0px";
  }
  common_vendor.onLoad(() => {
    statusBarHeight.value = common_vendor.index.getSystemInfoSync().statusBarHeight + (cachetInfo.value.top ? cachetInfo.value.top - common_vendor.index.getSystemInfoSync().statusBarHeight : 0);
    safeAreaInsetTop.value = common_vendor.index.getSystemInfoSync().safeAreaInsets.top;
    safeAreaInsetBottom.value = common_vendor.index.getSystemInfoSync().safeAreaInsets.bottom;
    cachetWidthPX.value = cachetInfo.value.width + 15 + "px";
    navHeightPX.value = cachetInfo.value.height + "px";
    statusBarHeightPX.value = statusBarHeight.value + "px";
    safeAreaInsetTopPX.value = safeAreaInsetTop.value + "px";
    safeAreaInsetBottomPX.value = safeAreaInsetBottom.value + "px";
    headerPaddingHeightPX.value = statusBarHeight.value + cachetInfo.value.height + "px";
  });
  return {
    cachetWidthPX,
    navHeightPX,
    statusBarHeightPX,
    safeAreaInsetTopPX,
    safeAreaInsetBottomPX,
    headerPaddingHeightPX,
    headerPaddingBottomHeightPX
  };
}
exports.useNavbarInfo = useNavbarInfo;
