<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="30" height="30" round fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditNameShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender === 0 ? '男' : '女'"
      @click="isEditGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isEditBirthdayShow = true"
    />
    <!-- 修改昵称 -->
    <van-popup
      v-if="isEditNameShow"
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name v-model="user.name" @close="isEditNameShow = false" />
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-if="isEditGenderShow"
      v-model="isEditGenderShow"
      position="bottom"
    >
      <update-gender v-model="user.gender" @close="isEditGenderShow = false" />
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
      v-if="isEditBirthdayShow"
      v-model="isEditBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-model="user.birthday"
        @close="isEditBirthdayShow = false"
      />
    </van-popup>
    <!-- 修改头像 -->
    <van-popup
      class="update-photo-popup"
      v-if="isEditPhotoShow"
      v-model="isEditPhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <update-photo
        :file="previewImage"
        @close="isEditPhotoShow = false"
        @update-photo="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'

export default {
  name: 'UserProfile',
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data () {
    return {
      user: {},
      isEditNameShow: false,
      isEditGenderShow: false,
      isEditBirthdayShow: false,
      isEditPhotoShow: false,
      previewImage: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserPrifile()
  },
  mounted () {},
  methods: {

    async loadUserPrifile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },

    onFileChange () {
      const blob = this.$refs.file.files[0]
      this.isEditPhotoShow = true
      this.previewImage = blob
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
.update-photo-popup {
  background-color: #000;
}
</style>
