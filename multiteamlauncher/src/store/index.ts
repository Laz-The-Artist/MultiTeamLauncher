import { createStore } from 'vuex'

export default createStore({
  state: {
    settings: {
      general: {
        gameLibraryLoc: "",
        autoUpdateGames: true,
        autoUpdateLauncher: true,
        limitBandwidth: true,
        limitBandwidthNumber: 20,
        languageCode: 0,
        defaultStartTab: 0,
        runAtStartUp: true
      }
    },
    friendList: [
      {
        username: "Laz",
        status: "offline"
      },
      {
        username: "Cat Core",
        status: "online"
      }
    ],
    selectedGame: 0,
    gameList: [
      {
        name: "JASG",
        version: {
            name: "WorldGenTest - TechDemo 1",
            versionNumber: "0.0.0"
        },
        iconURL: "./res/img/game_icon_jasg.png",
        previewURL: "./res/img/preview_jasg.png",
        descriptionTitle: "Just a survival game",
        description: "JASG is a fantasy 8-bit Survival game, within a topdown-perspective world.<br><br>This amazing new experience comes with a lot of exploration, advancing through this mysterious world, achieving magic, defeating bosses, crafting equipment and many more! Have i mentioned that its like 70% procedural?",
        downloadURL: "",
        color: "#140C1F",
        index: 0
      },
      {
        name: "Soldiers of The Office",
        version: {
            name: "N/A",
            versionNumber: "0.0.0"
        },
        iconURL: "./res/img/game_icon_soto.png",
        previewURL: "./res/img/placeholder_preview.png",
        descriptionTitle: "Description",
        description: "Soldiers of the office is a story based, 2D platformer-shooter, all about the weird war of humans against an infection that spreads with ultra-modern technology.",
        downloadURL: "",
        color: "#242735",
        index: 1
      },
      {
        name: "Project Freedom",
        version: {
            name: "N/A",
            versionNumber: "0.0.0"
        },
        iconURL: "./res/img/game_icon_pf.png",
        previewURL: "./res/img/placeholder_preview.png",
        descriptionTitle: "Description",
        description: "Project Freedom is a 3D game, but its not what you would expect.<br><br>This game will have a play-mode for every type of game, like minecraft, pubg, cs:go, lol, overwatch, and many more new custom or weird play-modes",
        downloadURL: "",
        color: "#009f00",
        index: 2
      }
    ]
  },
  mutations: {
    setSelectedGame: (state, index: number) => {
      state.selectedGame = index;
      return;
    },
    setGeneralSetting: (state, param: {name: string, value: unknown}) => {
      let settings: any = state.settings.general;
      settings[param.name] = param.value;
      state.settings.general = settings;
      return;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    gameList: state => {
      return state.gameList
    },
    selectedGame: state => {
      return state.selectedGame
    },
    friendList: state => {
      return state.friendList
    }
  }
})
