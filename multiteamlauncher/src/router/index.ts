import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Games from '../views/Games.vue'
import Mods from '../views/Mods.vue'
import Social from '../views/Social.vue'
import Settings from '../views/Settings.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Games',
    component: Games
  },
  {
    path: '/mods',
    name: 'Mods',
    component: Mods
  },
  {
    path: '/social',
    name: 'Social',
    component: Social
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
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
