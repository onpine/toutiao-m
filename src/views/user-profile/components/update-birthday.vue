<template>
  <div class="update-name">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="修改生日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: data
      })
      this.$toast.success('保存成功')
      this.$emit('input', data)
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang='less'>
.name-field-wrap {
  padding: 10px;
}
</style>
