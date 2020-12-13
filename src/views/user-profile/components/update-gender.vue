<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      showPicker: false,
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
