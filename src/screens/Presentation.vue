<template>
    <div>
        <youtube :video="presentation.video"></youtube>
        <story :title="presentation.title"
               :subtitle="presentation.subtitle"
               :main="presentation.html">
        </story>
    </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import Youtube from "../components/Youtube";

  export default {
    name: 'presentation-screen',
    components: { Youtube },
    methods: {
      ...mapActions([
        'setPresentation'
      ])
    },
    computed: {
      ...mapState({
        presentation: state => state.presentation,
      })
    },
    beforeDestroy: function(){
        this.setPresentation({})
    }
  }
</script>


