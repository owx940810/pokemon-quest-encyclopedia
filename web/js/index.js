import Vue from 'vue'
import router from './router.js'

if (process.env.ENV === 'prod') {
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

let pokemondata
const getPokemons = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/pokemon.json')
  const data = await response.json()
  return pokemondata = data.data.map(pokemon => {
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
  return skilldata = data.data
}

let bingobonuses
const getBingo = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/bingo.json')
  const data = await response.json()
  return bingobonuses = data
}

const massageData = async () => {
  pokemondata.map(pokemon => {
    pokemon.bingo = bingobonuses.find(item => parseInt(item.pokemon) === parseInt(pokemon.id)).bingo
    return pokemon
  })
}

const init = async () => {
  await getPokemons()
  await getSkills()
  await getBingo()
  await massageData()

  window.APP = new Vue({
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
