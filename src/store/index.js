import { createStore } from 'vuex'

export default createStore({
  state: {
    asideVisible: false,
    sidebarVisible: true,
    sidebarUnfoldable: false,
    theme: 'default',
      isSidebarOpen: false,
  },
  mutations: {
    toggleAside(state) {
      state.asideVisible = !state.asideVisible
    },
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleTheme(state, payload) {
      state.theme = payload.value
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  },
  actions: {},
  modules: {},
})
