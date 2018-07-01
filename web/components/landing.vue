<template lang="pug">
  #landing
    #search-wrapper
      input(type="text", placeholder="pikachu", v-model="searchedpokemon")

    .pokemons
      .pokemon(v-for="pokemon in selectedpokemons", @click="selectPokemon(pokemon)")
        .number
          p
            b #[span #]{{ pokemon.id }}
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
      margin: 0 auto
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

    .pokemons
      margin-top: 50px
      display: flex
      flex-flow: row wrap
      padding: 0 50px

      +mobile
        padding: 0 20px

      .pokemon
        position: relative
        margin: 0 5px 15px 5px
        cursor: pointer
        transition: all 100ms

        &:hover
          transform: scale(1.1)

        img
          width: 70px

        p
          text-align: center
          margin: 0
          font-size: 12px

        .number
          width: 50px
          height: 20px
          border-radius: 7px 7px 0 0
          background-color: $white
          padding: 2px 0

          p
            font-family: "Share Tech Mono", monospace

        .desc
          width: 80px
          height: 100px
          background-color: $white
          box-shadow: 0 5px 0 $grey-l
          border-radius: 0 7px 7px 7px
          padding: 5px
          display: flex
          flex-flow: column nowrap
          justify-content: space-between

</style>

<script>
  export default {
    name: 'landing',
    data () {
      return {
        pokemons: [],
        searchedpokemon: ''
      }
    },

    computed: {
      selectedpokemons () {
        if (!this.searchedpokemon) {
          return JSON.parse(JSON.stringify(this.pokemons))
        }
        return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(this.searchedpokemon.toLowerCase()) >= 0)
      }
    },

    mounted () {
      setTimeout(() => {
        this.pokemons = window.APP.pokemons
      }, 1000)
    },

    methods: {
      selectPokemon (pokemon) {
        this.$router.push('/pokemon/' + pokemon.id)
      }
    }
  }
</script>
