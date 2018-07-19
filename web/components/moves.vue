<template lang="pug">
  #moves
    ul.skills
      li(v-for="skill in skills", :data-id="skill.id")
        p.name
          b {{ skill.name }}
        .type
          .label(:class="skill.type") {{ skill.type }}

        .waittime
          .time-wrapper
            img(src=process.env.WEB_BASE + "/images/feather/clock.svg")
            p {{ skill.wait }}s

        .movestones
          img(src=process.env.WEB_BASE + "/images/stones/wl.png", v-show="skill.wl")
          img(src=process.env.WEB_BASE + "/images/stones/ww.png", v-show="skill.ww")
          img(src=process.env.WEB_BASE + "/images/stones/bb.png", v-show="skill.bb")
          img(src=process.env.WEB_BASE + "/images/stones/sc.png", v-show="skill.sc")
          img(src=process.env.WEB_BASE + "/images/stones/sh.png", v-show="skill.sh")
          img(src=process.env.WEB_BASE + "/images/stones/st.png", v-show="skill.st")
        p.desc {{ skill.desc }}
        .pokemons(v-if="skill.pokemons")
          .pokemon(v-for="pokemon in skill.pokemons")
            img(:src="pokemon")
        hr


</template>

<style lang="sass" scoped>
  @import '../sass/variables'
  @import '../sass/mixins'

  #moves
    position: relative
    background-color: $white
    margin: 0 auto
    width: 80%
    max-width: 1024px
    padding: 20px
    border-radius: 20px

    +mobile
      width: 90%

    .skills
      +clearlist

      li
        p
          margin: 0

          &.name
            display: inline-block

          &.desc
            margin-top: 3px
            font-size: 0.9em

        .type
          display: inline-block
          margin-left: 10px
          vertical-align: middle

        .waittime
          display: inline-block
          vertical-align: middle
          margin-left: 10px
          padding: 2px
          border: 1px solid $line
          border-radius: 5px

          .time-wrapper
            display: flex
            justify-content: center
            align-items: center

          p
            margin-left: 3px

          img
            width: 14px

        .movestones
          display: inline-block
          height: 19px
          vertical-align: middle

          +mobile
            width: 100%

          img
            display: inline-block
            margin-left: 5px
            width: 19px
            height: 19px

            &:nth-child(1)
              +mobile
                margin-left: 0

        .pokemons
          display: grid
          grid-template-columns: repeat(auto-fill, minmax(30px, 1fr))
          grid-gap: 5px
          margin-top: 5px

        hr
          border: 0
          border-top: 1px solid $line
          margin: 10px auto

</style>

<script>
  import _ from 'lodash'
  export default {
    name: 'moves',
    data () {
      return {
        skills: this.$parent.skills
      }
    },

    created () {
      this.getPokemons()
    },

    mounted () {
      if (process.env.ENV === 'prod') {
        gtag('config', 'UA-93111170-3', {
          'page_title': 'moves',
          'page_path': this.$route.path
        })
      }

      if (this.$route.query.id) {
        setTimeout(() => {
          window.scrollTo(0, window.moves.querySelector('[data-id="' + this.$route.query.id + '"]').offsetTop + window.moves.offsetTop - 10)
        }, 0)
      }
    },

    methods: {
      getPokemons () {
        this.skills.map(skill => {
          skill.pokemons = this.$parent.pokemons.filter(pokemon => {
            return pokemon.skills.find(item => item.toLocaleLowerCase() === skill.name.toLocaleLowerCase())
          }).map(pokemon => process.env.WEB_BASE + '/images/pokemon-icons/' + pokemon.id + '.png')
          return skill
        })
      }
    }
  }
</script>
