<template lang="pug">
  #pokemon
    .wrapper
      h4.id #[span #]{{ pokemon.id }}
      .img-wrapper.large
        img(:src="pokemon.image")
      h5.name {{ pokemon.name }}
      .type
        .label(v-for="type in pokemon.type", :class="type") {{ type }}
    .wrapper
      h5 #[u Evolution]
      .specialevolution(v-if="pokemon.evolution && Array.isArray(pokemon.evolution[0])")
        .evolutions(v-for="evolutions in pokemon.evolution")
          .evolution(v-for="evolution in evolutions")
            P.lvl(v-show="evolution.lvl") {{ evolution.lvl }}
            .img-wrapper(@click="selectPokemon(evolution.id)")
              img(:src="evolution.image")

      .evolutions(v-else-if="pokemon.evolution && pokemon.evolution.length > 0")
        .evolution(v-for="evolution in pokemon.evolution")
          P.lvl(v-show="evolution.lvl") {{ evolution.lvl }}
          .img-wrapper(@click="selectPokemon(evolution.id)")
            img(:src="evolution.image")
      h6.noevolutions(v-else) no evolution
      p(v-show="pokemon.evolutiondesc")
        i {{ pokemon.evolutiondesc }}

      h5 #[u Details]
      .details(v-if="pokemon.details")
        p Attack Type: {{ pokemon.details.type }}
        p HP: {{ pokemon.details.hp }}
        p ATTACK: {{ pokemon.details.atk }}

    .wrapper
      h5 #[u Skills]
      ul.skills
        li(v-for="skill in pokemon.detailedskills" v-if="pokemon.detailedskills.length > 0")
          p.name
            b {{ skill.name }}
          .type
            .label(:class="skill.type") {{ skill.type }}
          p.desc {{ skill.desc }}

    .wrapper
      h5 #[u Bingo Bonus]
      ul.bingo
        .li(v-for="(bingo, index) in pokemon.bingo")
          h6 Bonus {{ index + 1 }}
          ul
            li(v-for="bonus in bingo") {{ bonus }}

    .wrapper
      h5 #[u Recipes]
      ul.recipes
        p(v-if="typeof pokemon.recipes === 'string'") {{ pokemon.recipes }}
        li.ingredients(v-else, v-for="recipe in pokemon.recipes")
          .ingredient-wrapper(v-for="ingredient in recipe.ingredients")
            .ingredient(:class="ingredient", v-if="ingredient.split('').length === 1")
            .multi-ingredient(v-if="ingredient.split('').length > 1")
              .ingredient(v-for="item in ingredient.split('')", :class="item")
          p {{ recipe.rate }}#[span %]

    button.favorite(@click="addFavorite", v-show="favoritestate") Add to Favorites
    button.removefavorite(@click="removeFavorite", v-show="!favoritestate") Remove From Favorites
</template>

<style lang="sass">
  @import '../sass/variables'
  @import '../sass/mixins'

  #pokemon
    position: relative
    background-color: $white
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-auto-rows: auto;
    margin: 0 auto
    width: 90%
    border-radius: 20px
    grid-auto-flow: dense

    +mobile
      grid-template-columns: minmax(300px, 1fr)

    h4
      &.id
        font-family: "Share Tech Mono", sans-serif

    h5
      &.name
        margin: 1em 0

    .img-wrapper
      background-color: $powder
      cursor: pointer

    .wrapper
      padding: 20px

      &:nth-child(2)
        grid-column-end: span 2

        +mobile
          grid-column-end: initial

      &:nth-child(3)
        grid-column-end: span 3

        +mobile
          grid-column-end: initial

      &:nth-child(4), &:nth-child(5)
        grid-column-end: span 2

        +mobile
          grid-column-end: initial

    .noevolutions
      margin: 10px 0 50px 0

    .evolutions
      display: flex
      flex-flow: row nowrap
      justify-content: center
      margin: 10px 0 50px 0

      .evolution
        position: relative

        .img-wrapper
          +mobile
            width: 60px

        p
          &.lvl
            position: absolute
            left: -40px
            display: block
            width: 30px
            margin: 0
            text-align: center
            top: 60px

            +mobile
              top: 45px

        img
          width: 80px

        & + .evolution
          margin-left: 50px

          &::before
            content: ""
            display: block
            position: absolute
            top: 30px
            background-size: contain
            width: 30px
            height: 30px
            left: -40px
            background-color: transparent

            +mobile
              width: 20px
              height: 20px
              top: 25px
              left: -35px

    .details
      p
        margin: 10px 0 0 0

    .skills
      list-style: none
      margin: 0
      padding: 0

      li
        & + li
          margin-top: 10px

        p
          margin: 0

          &.name
            display: inline-block

          &.desc
            font-size: 0.9em

        .type
          display: inline-block
          margin-left: 10px

    .bingo
      padding: 0
      margin: 0

      ul
        list-style-type: disc
</style>

<script>
  export default {
    name: 'pokemon',
    data () {
      return {
        pokemon: {},
        favoritestate: false
      }
    },

    watch: {
      '$route.params.id' (value) {
        this.init()
      },
    },

    mounted () {
      this.init()
    },

    methods: {
      init () {
        this.pokemon = this.$parent.pokemons.find(pokemon => pokemon.id === this.$route.params.id)

        gtag('config', 'UA-93111170-3', {
          'page_title': 'pokemon: ' + this.pokemon.name,
          'page_path': this.$route.path
        })

        this.pokemon.detailedskills = []
        this.getSkills()
        this.checkFavorite()
      },

      getSkills () {
        this.pokemon.detailedskills = this.pokemon.skills.map(skill => {

          return this.$parent.skills.find(item => item.name === skill)
        })
      },

      selectPokemon (id) {
        this.$router.push('/pokemon/' + id)
      },

      checkFavorite () {
        let storage = window.localStorage.getItem('favorite')
        if (!storage) {
          this.favoritestate = true
          return
        }
        if (JSON.parse(storage).find(item => item === this.pokemon.id)) {
          return this.favoritestate = false
        }
        this.favoritestate = true
      },

      addFavorite () {
        let storage = window.localStorage.getItem('favorite')
        if (!storage) {
          this.favoritestate = false
          return window.localStorage.setItem('favorite', JSON.stringify([this.pokemon.id]))
        }
        if (JSON.parse(storage).find(item => item === this.pokemon.id)) {
          return
        }

        let newstorage = JSON.parse(storage)
        newstorage.push(this.pokemon.id)
        this.favoritestate = false
        window.localStorage.setItem('favorite', JSON.stringify(newstorage))
      },

      removeFavorite () {
        let storage = JSON.parse(window.localStorage.getItem('favorite'))
        let index = storage.indexOf(this.pokemon.id)
        storage.splice(index, 1)
        window.localStorage.setItem('favorite', JSON.stringify(storage))
        this.favoritestate = true
      }
    }
  }
</script>
