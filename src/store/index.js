import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/stroage'

Vue.use(Vuex)

const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY),
    cachePages: ['LayoutIndex']
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem(USER_KEY, data)
    },

    addCachePage (state, pageName) {
      if (!state.cachePages.includes(pageName)) {
        state.cachePages.push(pageName)
      }
    },
    removeCachePage (state, pageName) {
      const index = state.cachePages.indexOf(pageName)
      if (index !== -1) {
        state.cachePages.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
