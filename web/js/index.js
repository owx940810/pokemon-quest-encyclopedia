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
    getPokemons () {
      window.fetch(process.env.WEB_BASE + '/static/json/pokemon.json')
        .then(res => res.json())
        .then(res => {
          this.pokemons = res.data.map(pokemon => {
            pokemon.evolution = pokemon.evolution.map(evolution => {
              evolution.image = process.env.WEB_BASE + '/images/pokemon-icons/' + evolution.id + '.png'
              return evolution
            })
            pokemon.image = process.env.WEB_BASE + '/images/pokemon-icons/' + pokemon.id + '.png'
            return pokemon
          })
        })
    },

    getSkills () {
      window.fetch(process.env.WEB_BASE + '/static/json/skills.json')
        .then(res => res.json())
        .then(res => {
          this.skills = res.data
        })
    }
  }
})
