<template>
    <div class="card-deck">
        <card v-for="topic in topics"
              v-bind:data="topic"
              v-bind:key="topic.key"
              :presentation="topic.presentation"
              :title="topic.name"
              :description="topic.description"
              :image="topic.cover"
              :class="{topic, disabled: !topic.presentation}"
              :action="makeActionClosure(topic)"
        >

            <div slot="footer">

                <div v-if="topic.presentation"
                     class="fa-pull-left"
                     @click="toggleCompleted({type: 'topic', key: topic.key})">
                    <check :tog="topic.completed"></check>
                </div>

                <progress-button
                        v-if="topic.presentation"
                        :height="5"
                        position="bottom"
                        class="btn btn-primary fa-pull-right"
                        fill-color="#ffffff"
                        @click.prevent="openPresentation(topic, topic.presentation)">
                    <i class="fa fa-book-reader"></i> Open
                </progress-button>


                <progress-button
                        v-if="!topic.presentation"
                        :height="5"
                        position="bottom"
                        class="btn btn-outline-default fa-pull-left"
                        fill-color="#ffffff"
                        @click="$bvModal.show('unlock')"
                >
                    <i class="fa fa-unlock"></i>
                </progress-button>

                <progress-button
                        v-if="!topic.presentation"
                        :height="5"
                        position="bottom"
                        class="btn btn-outline-primary fa-pull-right"
                        fill-color="#ffffff"
                        @click="$bvModal.show('unlock')"
                >
                    <i class="fa fa-info-circle"></i>
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
    components: {'progress-button': Button},
    methods: {
      makeActionClosure: function(topic){
        if(typeof topic.presentation != "undefined"){
            var openPresentation = this.openPresentation;
            return function(){openPresentation(topic, topic.presentation)}.bind(openPresentation);
        }else{
          var bvModal = this.$bvModal;
         return function(){bvModal.show('unlock')}.bind(bvModal)
        }
      },

      openPresentation: function (topic, presentation) {
        var router = this.$router
        CourseController.loadPresentation({topic: topic.key, presentation: presentation.key})
          .then(function (response) {
            router.push({name: 'presentation'})
          }.bind(router))
      },
      ...mapMutations([
        'toggleCompleted',
        'searchCourseContent'
      ])
    },

    computed: {
      ...mapState({
        topics: state => state.topics,
      }),
    },

    beforeMount() {
      CourseController.loadTopics()
    }
  }
</script>
