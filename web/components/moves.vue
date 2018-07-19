<template lang="pug">
  #moves

</template>

<style lang="sass" scoped>
  @import '../sass/variables'
  @import '../sass/mixins'

  #moves

</style>

<script>
  import _ from 'lodash'
  export default {
    name: 'moves',

    mounted () {
      gtag('config', 'UA-93111170-3', {
        'page_title': 'moves',
        'page_path': this.$route.path
      })
    },

    methods: {
    }
  }
</script>
