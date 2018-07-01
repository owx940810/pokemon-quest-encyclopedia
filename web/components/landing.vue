<template lang="pug">
  #landing
    h1 Pokemon Quest Guide
    .pokemons
      .pokemon(v-for="pokemon in pokemons", @click="selectPokemon(pokemon)")
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
    h1
      text-align: center

    .pokemons
      margin-top: 50px
      display: flex
      flex-flow: row wrap
      padding: 0 50px

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
          font-size: 13px

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
        pokemons: []
      }
    },

    mounted () {
      setTimeout(() => {
        this.pokemons = window.APP.pokemons
      }, 0)
    },

    methods: {
      selectPokemon (pokemon) {
        this.$router.push('/pokemon/' + pokemon.id)
      }
    }
  }
</script>
