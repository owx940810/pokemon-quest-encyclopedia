<template lang="pug">
  #landing
    .favorites-wrapper(v-if="favorites.length > 0")
      h2 #[u Favorites]
      .favorites
        .pokemon(v-for="pokemon in favorites", @click="selectPokemon(pokemon)")
          .number
            p
              b #[span #]{{ pokemon.id }}
          .desc
            img(:src="pokemon.image" )
            P {{ pokemon.name }}
      hr

    #search-wrapper
      input(type="text", placeholder="pikachu", v-model="searchedpokemon")

    .toggles
      button.default(@click="changeSort") SORT BY#[br]#[hr]{{ sort.type[sort.index].toLocaleUpperCase() }}

    .pokemons
      .pokemon(v-for="pokemon in selectedpokemons", @click="selectPokemon(pokemon)")
        .number
          p(v-show="sort.index === 0") #[b #[span #]{{ pokemon.id }}]
          ul.type(v-show="sort.index === 1")
            li(:class="pokemon.type[0]")
            li(v-show="pokemon.type.length > 1", :class="pokemon.type[1]")
          p(v-show="sort.index === 2") #[b #[span ATK] {{ pokemon.details.atk }}]
          p(v-show="sort.index === 3") #[b #[span HP] {{ pokemon.details.hp }}]

        .desc
          img(:src="pokemon.image" )
          P {{ pokemon.name }}

</template>

<style lang="sass" scoped>
  @import '../sass/variables'
  @import '../sass/mixins'

  #landing
    #search-wrapper
      position: relative
      display: block
      margin: 20px auto 0 auto
      width: 300px

      &::after
        content: ""
        display: block
        position: absolute
        z-index: 1
        width: 20px
        height: 20px
        background-size: contain
        right: 10px
        top: 50%
        transform: translateY(-50%)
        opacity: 0.8

      input
        background-color: $white
        border-radius: 20px
        padding: 7px 15px
        border: 1px solid $line
        width: 100%

    h1
      text-align: center

    .toggles
      margin-top: 30px
      padding: 0 50px
      display: flex
      flex-direction: row-reverse

      +mobile
        padding: 0 20px

    .pokemons, .favorites
      margin-top: 30px
      padding: 0 50px
      display: grid
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr))
      grid-gap: 15px

      +mobile
        padding: 0 20px
        display: grid
        grid-template-columns: repeat(4, minmax(60px, 1fr))

      .pokemon
        position: relative
        cursor: pointer
        transition: all 100ms

        &:hover
          transform: scale(1.05)

        &:active
          transform: translateY(3px)

          .desc
            box-shadow: 0 2px 0 $grey-l

        img
          width: 70px

        p
          text-align: center
          margin: 0
          font-size: 12px

        .number
          width: 60px
          height: 20px
          border-radius: 7px 7px 0 0
          background-color: $white
          padding: 2px 0

          +mobile
            width: 100%

          p
            font-family: "Share Tech Mono", monospace

          ul.type
            +clearlist
            padding: 4px
            text-align: left
            font-size: 2em
            line-height: 0.8em

            +clearfix

            li
              float: left
              width: 10px
              height: 10px
              border-radius: 50%

              &:nth-child(2)
                margin-left: 2px

              &.bug
                background-color: $bug
              &.dark
                background-color: $dark
              &.dragon
                background-color: $dragon
              &.electr
                background-color: $electr
              &.fairy
                background-color: $fairy
              &.fighting
                background-color: $fighting
              &.fire
                background-color: $fire
              &.flying
                background-color: $flying
              &.ghost
                background-color: $ghost
              &.grass
                background-color: $grass
              &.ground
                background-color: $ground
              &.ice
                background-color: $ice
              &.normal
                background-color: $normal
              &.poison
                background-color: $poison
              &.psychc
                background-color: $psychc
              &.rock
                background-color: $rock
              &.steel
                background-color: $steel
              &.water
                background-color: $water

        .desc
          // width: 80px
          width: 100%
          height: 100px
          background-color: $white
          box-shadow: 0 5px 0 $grey-l
          border-radius: 0 7px 7px 7px
          padding: 5px
          display: flex
          flex-flow: column nowrap
          justify-content: space-between
          transition: all 100ms

          p
            +mobile
              font-size: 8px

          +mobile
            border-radius: 0 0 7px 7px
            width: 100%
            height: 80px

          img
            width: 100%
            height: 80px

            +mobile
              height: initial

    .favorites
      margin-top: 20px
      margin-bottom: 20px
      padding: 0

    .favorites-wrapper
      padding: 0 50px

      +mobile
        padding: 0 20px

</style>

<script>
  import _ from 'lodash'
  export default {
    name: 'landing',
    data () {
      return {
        pokemons: this.$parent.pokemons,
        searchedpokemon: '',
        favorites: [],
        sort: {
          type: ['id', 'type', 'atk', 'hp'],
          index: 0
        }
      }
    },

    computed: {
      selectedpokemons () {
        let selected = []
        if (this.searchedpokemon) {
          selected = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(this.searchedpokemon.toLowerCase()) >= 0)
        } else {
          selected =  JSON.parse(JSON.stringify(this.pokemons))
        }

        let sort = this.sort.type[this.sort.index]
        let direction = 'asc'
        if (sort === 'atk' || sort === 'hp') {
          sort = 'details.' + sort
          direction = 'desc'
        }
        return _.orderBy(selected, [sort], [direction])
      }
    },

    mounted () {
      gtag('config', 'UA-93111170-3', {
        'page_title': 'landing',
        'page_path': '/'
      })

      this.getSortType()
      this.getFavorites()
    },

    methods: {
      selectPokemon (pokemon) {
        gtag('event', 'button', {
          'event_category': 'selectpokemon',
          'event_label': pokemon.id
        })

        this.$router.push('/pokemon/' + pokemon.id)
      },

      getFavorites () {
        let storage = window.localStorage.getItem('favorite')
        if (!storage) {
          return
        }
        let favorites = JSON.parse(storage)
        this.favorites = favorites.map(item => this.pokemons.find(pokemon => parseInt(pokemon.id) === parseInt(item)))
      },

      getSortType () {
        if (!window.localStorage.getItem('sort')) {
          return window.localStorage.setItem('sort', this.sort.index)
        }
        this.sort.index = parseInt(window.localStorage.getItem('sort'))
      },

      changeSort () {
        this.sort.index++
        if (this.sort.index >= this.sort.type.length) {
          this.sort.index = 0
        }
        window.localStorage.setItem('sort', this.sort.index)
      }
    }
  }
</script>
