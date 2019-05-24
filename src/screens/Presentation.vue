<template>
    <div>
        <youtube v-if="videoFormat() == 'youtube'" :video="presentation.video"></youtube>
        <videos v-if="videoFormat() == 'videos'" :video="presentation.video" :key="keyGen(presentation.video)"></videos>

        <div class="fa-pull-left position-absolute"
             style="margin-top:-5px;"
             @click="toggleCompleted({type: 'presentation', key: presentation.key})">
            <check :tog="presentation.completed"></check>
        </div>

        <story :title="presentation.title"
               :subtitle="presentation.subtitle"
               :main="presentation.html">
        </story>

    </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'

  export default {
    name: 'presentation-screen',
    methods: {

      keyGen: (obj) => {
        let objJsonStr = JSON.stringify(obj)
        let objJsonB64 = Buffer.from(objJsonStr).toString("base64")

        return objJsonB64;
      },

      videoFormat: function () {

        if (typeof this.presentation.video == 'string'
          && !this.isUrl(this.presentation.video)) {

          return 'youtube'
        }

        if (typeof this.presentation.video == 'object'
          && Array.isArray(this.presentation.video)) {
          return 'videos'
        }

        return ''
      },
      ...mapActions([
        'setPresentation'
      ]),
      ...mapMutations([
        'toggleCompleted'
      ])
    },
    computed: {

      ...mapState({
        presentation: function (state) {
          return state.presentation
        },
      })
    },
    beforeDestroy: function () {
      this.setPresentation({})
    }
  }
</script>