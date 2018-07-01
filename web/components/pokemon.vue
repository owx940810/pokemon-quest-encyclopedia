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
      .evolutions(v-if="pokemon.evolution && pokemon.evolution.length > 0")
        .evolution(v-for="evolution in pokemon.evolution")
          P.lvl(v-show="evolution.lvl") {{ evolution.lvl }}
          .img-wrapper
            img(:src="evolution.image")
      h6.noevolutions(v-else) no evolution

      h5 #[u Details]
      .details(v-if="pokemon.details")
        p Attack Type: {{ pokemon.details.type }}
        p HP: {{ pokemon.details.hp }}
        p ATTACK: {{ pokemon.details.atk }}

    .wrapper
      h5 #[u Skills]
      ul.skills
        li(v-for="skill in pokemon.skills" v-if="pokemon.skills[0].name")
          p.name
            b {{ skill.name }}
          .type
            .label(:class="skill.type") {{ skill.type }}
          p.desc {{ skill.desc }}

</template>

<style lang="sass">
  @import '../sass/variables'
  @import '../sass/mixins'

  #pokemon
    background-color: $white
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr))
    grid-auto-rows: auto;
    margin: 0 auto
    width: 90%
    border-radius: 20px

    h4
      &.id
        font-family: "Share Tech Mono", sans-serif

    h5
      &.name
        margin: 1em 0

    .img-wrapper
      background-color: $powder

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

</style>

<script>
  export default {
    name: 'pokemon',
    data () {
      return {
        pokemon: {}
      }
    },

    mounted () {
      setTimeout(() => {
        let index = this.$route.params.id
        this.pokemon = window.APP.pokemons.find(pokemon => pokemon.id === index)
        this.getSkills()
      }, 100)
    },

    methods: {
      getSkills () {
        window.fetch(process.env.WEB_BASE + '/static/json/skills.json')
          .then(res => res.json())
          .then(res => {
            this.pokemon.skills = this.pokemon.skills.map(skill => {
              return res.data.find(item => item.name === skill)
            })
          })
      }
    }
  }
</script>
