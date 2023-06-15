const app = getApp();
/**
 * 基础组件 附带一个全局拖拽按钮
 */
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        hiddens: {
            type: Boolean,
            value: false,
            observer: function (n, o) {
                console.log(n, 'base最终结果');
            }
        },
        inspetion: {
            type: Boolean,
            value: false,
            observer: function (n, o) {
                this.setData({
                    hidely: n
                });
            }
        },
        disabled: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
        isMove: false,
        show: false,
        animateEnd: false,
        otherPage: false,
    },
    pageLifetimes: {
        show() {
        }
    },
    lifetimes: {
        attached: function () {
            // 获取不到movable-view的宽度 只能固定64像素，取一半
            const lastX = wx.getStorageSync('baseLastX');
            const lastY = wx.getStorageSync('baseLastY');
            this.setData({
                x: lastX || wx.getSystemInfoSync().windowWidth,
                y: lastY || wx.getSystemInfoSync().windowHeight / 2 - 64,
                lastX: lastX || wx.getSystemInfoSync().windowWidth,
                lastY: lastY || wx.getSystemInfoSync().windowHeight / 2 - 64
            });
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        handleTouchEnd(event) {
            const {
                clientX,
                clientY
            } = event.changedTouches[0];
            // 无移动，判定为点击
            if (!this.data.isMove) {
                // 悬浮球展开动画
                // this.setData({
                //   show: true,
                //   x: wx.getSystemInfoSync().windowWidth / 2 - 64,
                //   y: wx.getSystemInfoSync().windowHeight / 2 - 64,
                // });
                console.log('click')
                return;
            }
            this.setData({
                isMove: false
            });
            const position = {
                x: 0,
                y: clientY - 64
            };
            position.x =
                wx.getSystemInfoSync().windowWidth / 2 - 64 < clientX ?
                    wx.getSystemInfoSync().windowHeight :
                    0;
            wx.setStorageSync('baseLastX', position.x);
            wx.setStorageSync('baseLastY', position.y);
            this.setData(position);
        },
        handleTouchMove() {
            if (this.data.isMove) return;
            this.setData({
                isMove: true,
            });
        },
        handleTouchStart(event) {
            // 记录上次点击位置，方便还原
            const {
                clientX,
                clientY
            } = event.changedTouches[0];
            this.setData({
                lastX: clientX - 32,
                lastY: clientY - 32,
            });
        },
        animationEnd() {
            this.setData({
                animateEnd: true,
            });
        },
        // 没有展开面板不需要这个
        handleClose() {
          console.log('end')
            if (this.data.otherPage) {
                this.setData({
                    otherPage: false
                });
                return;
            }
            this.setData({
                animateEnd: false,
                show: false,
                x: this.data.lastX,
                y: this.data.lastY,
            });
        }
    }
});