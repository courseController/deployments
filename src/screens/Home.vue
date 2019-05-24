<template>
    <div class="card-deck">
        <card v-for="topic in topics"
              :presentation="topic.presentation"
              :title="topic.name"
              :description="topic.description"
              :image="topic.cover"
        >

            <div slot="footer">

                <div class="fa-pull-left"
                     @click="toggleCompleted({type: 'topic', key: topic.key})">
                    <check :tog="topic.completed"></check>
                </div>

                <progress-button
                        :height="5"
                        position="bottom"
                        class="btn btn-primary fa-pull-right"
                        fill-color="#ffffff"
                        @click.prevent="openPresentation(topic, topic.presentation)">
                    Open
                </progress-button>

            </div>

        </card>
    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import Button from 'vue-progress-button'

  export default {
    name: 'home-screen',
    components: { 'progress-button': Button },
    methods: {
      openPresentation: function (topic, presentation) {
        var router = this.$router
        CourseController.loadPresentation({ topic: topic.key, presentation: presentation.key })
          .then(function (response) {
            router.push({ name: 'presentation' })
          }.bind(router))
      },
      ...mapMutations([
        'toggleCompleted'
      ])
    },

    computed: {
      ...mapState({
        topics: state => state.topics,
      }),
    },

    beforeMount () {
      CourseController.loadTopics()
    }
  }
</script>
