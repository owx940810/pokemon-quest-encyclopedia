const fs = require('fs')
const arraysort = require('array-sort')

const raw = {}
const data = {}

raw.recipe = fs.readFileSync('./pokemon-recipes.json', 'utf-8')
data.recipe = JSON.parse(raw.recipe)

raw.pokemon = fs.readFileSync('./pokemon.json', 'utf-8')
data.pokemon = JSON.parse(raw.pokemon)

const pokemonnames = data.pokemon.data.map(item => {
  return {
    name: item.name
  }
})

pokemonnames.map(obj => {
  obj.recipes = []
  data.recipe.map(item => {
    item.variations.filter(variation => {
      let index = 0
      let arr = variation.pokemon.filter((pokemon, i) => {
        if (pokemon === obj.name) {
          index = i
        }
        return pokemon === obj.name
      })
      if (arr.length > 0) {
        obj.recipes.push({
          ingredients: variation.ingredients,
          rate: variation.rate[index]
        })
      }
    })
  })
})

let complete = pokemonnames.filter(obj => obj.recipes.length > 0)

complete.map(item => {
  item.recipes = arraysort(item.recipes, 'rate', {reverse: true}).filter((d, i) => i < 10)
  return item
})

fs.writeFile('complete-recipes.json', JSON.stringify(complete), 'utf-8', (err) => {
  if (err) throw err
  console.log('done!')
})
