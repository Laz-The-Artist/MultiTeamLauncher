import { createStore } from 'vuex'

export default createStore({
  state: {
    gameList: [
      {
        bgColor: "#140C1F",
        iconPath: "./src/assets/game_icon_jasg.png",
        index: 0
      },
      {
        bgColor: "#140C1F",
        iconPath: "../../../../assets/game_icon_jasg.png",
        index: 1
      }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    gameList: state => {
      return state.gameList
    }
  }
})
