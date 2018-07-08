import Vue from 'vue'
import router from './router.js'

let pokemondata
const getPokemons = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/pokemon.json')
  const data = await response.json()
  pokemondata = data.data.map(pokemon => {
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
}

let skilldata
const getSkills = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/skills.json')
  const data = await response.json()
  skilldata = data.data
}

const init = async () => {
  await getPokemons()
  await getSkills()
  const app = new Vue({
    el: '#app',
    router,
    data: {
      pokemons: pokemondata,
      skills: skilldata
    },
    created () {
    }
  })
}

init()
