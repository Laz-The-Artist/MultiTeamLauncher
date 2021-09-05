import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Games from '../views/Games.vue'
import Mods from '../views/Mods.vue'
import Social from '../views/Social.vue'
import Settings from '../views/Settings.vue'
import GameBar from "../components/games/nav/GameNav.vue"
import GameBarEmpty from "../components/GameNavEmpty.vue"
import HeaderSubSocial from "../components/social/HeaderSub.vue"
import HeaderSubSettings from "../components/settings/HeaderSub.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Games',
    components: {
      default: Games,
      navBar: GameBar
    }
  },
  {
    path: '/mods',
    name: 'Mods',
    components: {
      default: Mods,
      navBar: GameBar
    }
  },
  {
    path: '/social',
    name: 'Social',
    components: {
      default: Social,
      navBar: GameBarEmpty,
      headerSub: HeaderSubSocial
    }
  },
  {
    path: '/social/groups',
    name: 'Social-Groups',
    components: {
      default: Social,
      navBar: GameBarEmpty,
      headerSub: HeaderSubSocial
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    components: {
      default: Settings,
      navBar: GameBarEmpty,
      headerSub: HeaderSubSettings
    }
  },
  {
    path: '/settings/account',
    name: 'Settings-Account',
    components: {
      default: Settings,
      navBar: GameBarEmpty,
      headerSub: HeaderSubSettings
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
