<template>
  <view class="search-wrap">
    <view class="search-bar">
      <view class="search-bar__field" :style="{ borderRadius: `${radius}rpx` }">
        <view class="search-icon"><icon type="search" :size="16"/></view>
        <input class="field-inner" type="search" :value="props.modelValue" @input="onInput" :placeholder="props.placeholder" confirm-type="search" @confirm="onSearch">
      </view>
      <view class="search-bar__button">
        <view class="search--button" @click="onSearch">{{ props.buttonText }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'search']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: '搜索'
  },
  placeholder: {
    type: String,
    default: '请输入搜索内容'
  },
  radius: {
    type: [String, Number],
    default: 100
  }
});
const onInput = (e) => {
  const val = e. detail.value;
  emit('update:modelValue', val);
};
const onSearch = () => {
  emit('search', props.modelValue)
}
</script>

<style lang="scss">
@import '@/static/styles/variables.scss';

.search-wrap {
  background-color: #fff;
  padding: 10px 0 10px 16px;
}

.search-bar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &__field {
    background-color: #f7f8fa;
    flex: 1;
    min-width: 1px;
    padding: 16rpx 0 16rpx 16rpx;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .search-icon {
      font-size: 0;
      padding-right: 12rpx;
    }
    .field-inner {
      outline: none;
      border: none;
      background-color: inherit;
      font-size: 28rpx;
      color: #333;
      flex: 1;
    }
  }
  &__button {
    padding: 0 16rpx;
    color: #333;
  }
}
</style>