import Vue from 'vue'
import Router from 'vue-router'

import landing from '../components/landing.vue'
import pokemon from '../components/pokemon.vue'
import moves from '../components/moves.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: landing
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: pokemon
    },
    {
      path: '/moves',
      name: 'moves',
      component: moves
    }
  ]
})
