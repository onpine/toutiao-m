<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/stroage'

export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onDelete (history, index) {
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        setItem('search-histories', this.searchHistories)
      } else {
        this.$emit('search', history)
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
