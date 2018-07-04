import Vue from 'vue'
import router from './router.js'

window.APP = new Vue({
  el: '#app',
  router,
  data: {
    pokemons: [],
    skills: []
  },

  mounted () {
    this.getPokemons()
    this.getSkills()
  },

  methods: {
    async getPokemons () {
      let response = await window.fetch(process.env.WEB_BASE + '/static/json/pokemon.json')
      let data = await response.json()
      let pokemons = data.data.map(pokemon => {
        pokemon.evolution = pokemon.evolution.map(evolution => {
          if (Array.isArray(evolution)) {
            return evolution.map(item => {
              item.image = process.env.WEB_BASE + '/images/pokemon-icons/' + item.id + '.png'
              return item
            })
          }
          evolution.image = process.env.WEB_BASE + '/images/pokemon-icons/' + evolution.id + '.png'
          return evolution
        })
        pokemon.image = process.env.WEB_BASE + '/images/pokemon-icons/' + pokemon.id + '.png'
        return pokemon
      })
      this.pokemons.push(...pokemons)
    },

    async getSkills () {
      let response = await window.fetch(process.env.WEB_BASE + '/static/json/skills.json')
      let data = await response.json()
      let skills = data.data
      this.skills.push(...skills)
    }
  }
})
