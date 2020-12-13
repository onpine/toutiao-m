<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 消息列表 -->
    <van-cell-group class="message-list" ref="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
    </van-cell-group>
    <!-- 发送消息 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入" :border="false" />
      <van-button type="info" size="small" @click="onSend">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { getItem, setItem } from '@/utils/stroage'

export default {
  name: 'UserChat',
  components: {},
  props: {},
  data () {
    return {
      message: '',
      socket: null,
      messages: getItem('toutiao-messages') || []
    }
  },
  computed: {},
  watch: {
    messages () {
      setItem('toutiao-messages', this.messages)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  created () {
    const socket = io('http://ttapi.research.itcast.cn')
    this.socket = socket
    socket.on('connect', () => {
      console.log('建立连接成功了')
    })
    socket.on('event', data => {})
    socket.on('disconnect', () => {
      console.log('断开连接了')
    })
    socket.on('message', data => {
      this.messages.push(data)
    })
  },
  mounted () {
    this.scrollToBottom()
  },
  methods: {
    onSend () {
      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      this.socket.emit('message', data)
      this.messages.push(data)
      this.message = ''
    },

    scrollToBottom () {
      const list = this.$refs['messages-list']
      list.scrollTop = list.scrollHeight
    }
  }
}
</script>

<style scoped lang='less'>
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.send-message-wrap {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
.van-button__text {
  width: 35px;
}
</style>
