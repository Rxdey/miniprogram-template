# geek-header
一款自定义导航栏，为您省去复杂的手机状态高度计算和小程序胶囊对不齐的问题。使用它，您无需再为多端适配而浪费精力。虽然性能不如原生导航栏，但它比原生更加灵活且功能更加强大。

## 使用方法
从插件市场直接使用HBuilderX 导入即可直接快速使用。

## 基本使用
默认标题会与pages.json中的navigationBarTitleText的属性一致
```vue
<view>
	<geek-header></geek-header>
</view>
```

## 白色箭头
如需使用白色箭头可使用`whiteback`属性
如果没有设置`titleColor`(标题颜色)属性 则 会变成白色
如果没有设置`bgColor`(导航栏背景色)属性 则 会变成透明色
```vue
<view>
	<geek-header whiteback></geek-header>
</view>
```

## 不使用返回箭头(左侧内容)
如果不需要返回箭头则可以使用`noLeft`属性来取消
```vue
<view>
	<geek-header noLeft></geek-header>
</view>
```

## 导航栏背景色
可以`bgColor`属性来自定义导航栏的背景色
```vue
<view>
	<geek-header bgColor="rgba(0, 0, 0, 0)"></geek-header>
</view>
```

## 防止塌陷
考虑到有时候编写的内容需要在标题部分生成一块同高度的元素来防止塌陷，这时可以使用`placeholder`属性来实现这个效果
```vue
<view>
	<geek-header placeholder></geek-header>
</view>
```

## 自定义导航栏插槽使用
有三种插槽`left`、`center`、`right`分别对应插槽的三个位置可自行使用

## API
### Props
| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | -- | -- | -- |
| autoBack | 是否自动返回 | Boolean | true | false |
| noLeft | 是否没有左侧内容 | Boolean | false | true |
| title | 导航栏标题 | String | '' | - |
| titleColor | 导航栏标题颜色 | String | 默认同箭头颜色一致 | - |
| whiteback | 是否为白色返回箭头 | Boolean | false | true |
| rightText | 右侧文字 | String | '' | - |
| rightPadding | 右侧padding | String | '30rpx' | - |
| rightPadding | 右侧padding | String | '30rpx' | - |
| rightColor | 右侧右侧字体颜色 | String | '#000' | - |
| placeholder | 是否生成一个等高元素，防止塌陷 | Boolean | false | true |
### Event
| 事件名 | 说明 |
| --- | --- |
| leftClick | 点击左侧区域出触发 |
| rightClick | 点击右侧区域出触发 |
### Slot
| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧部分内容 |
| center | 自定义中间部分内容 |
| right | 自定义右侧部分内容 |