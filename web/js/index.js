import Vue from 'vue'
import router from './router.js'
import moment from 'moment'

if (process.env.ENV === 'prod') {
  Vue.config.devtools = false
  Vue.config.debug = false
  Vue.config.silent = true
}

let pokemondata
const getPokemons = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/pokemon.json')
  const data = await response.json()
  return pokemondata = data.map(pokemon => {
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

let recipes
const getRecipes = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/recipes.json')
  const data = await response.json()
  return recipes = data
}

let pokemonskills
const getPokemonSkills = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/skills.json')
  const data = await response.json()
  return pokemonskills = data
}

let skilldata
const getSkills = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/skills-description.json')
  const data = await response.json()
  return skilldata = data
}

let bingobonuses
const getBingo = async () => {
  const response = await window.fetch(process.env.WEB_BASE + '/static/json/bingo.json')
  const data = await response.json()
  return bingobonuses = data
}

const massageData = async () => {
  pokemondata.map((pokemon, index) => {
    pokemon.bingo = bingobonuses.find(item => parseInt(item.id) === parseInt(pokemon.id)).bingo
    pokemon.skills = pokemonskills.find(item => item.id === pokemon.id).skills
    let temprecipe = recipes.find(item => item.name === pokemon.name)
    if (temprecipe) {
      pokemon.recipes = temprecipe.recipes
    } else {
      pokemon.recipes = pokemondata[index - 1].recipes
    }
    return pokemon
  })
}

const init = async () => {
  await getPokemons()
  await getRecipes()
  await getPokemonSkills()
  await getSkills()
  await getBingo()
  await massageData()

  window.APP = new Vue({
    el: '#app',
    router,
    data: {
      pokemons: pokemondata,
      skills: skilldata,
      alertstate: false
    },
    created () {
    },
    mounted () {
      if (process.env.ENV === 'prod') {
        gtag('js', new Date())
        gtag('config', 'UA-93111170-3')
      }

      let now = new moment()
      let end = new moment('2018-7-23', 'YYYY-MM-DD')
      let duration = moment.duration(now.diff(end)).asDays()

      if (duration < 0 && !window.localStorage.getItem('versionalert')) {
        this.alertstate = true
      }
    },
    methods: {
      closeAlert () {
        window.localStorage.setItem('versionalert', '1.1')
        this.alertstate = false
      }
    }
  })
}

init()
