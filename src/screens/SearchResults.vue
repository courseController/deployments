<template>
    <div class="container">

        <h1>Search Results</h1>

        <h2>
            <strong class="text-danger">
                <span v-if="(found)">{{ found }}</span>
                <span v-else>No</span>
            </strong>
            result<span v-if="(found != 1)">s</span> found
        </h2>

        <div class="row">
            <div class="col">
                <b-card no-body
                        v-for="topic in resultsByTopic"
                        v-bind:data="topic"
                        v-bind:key="topic.key"
                        class="overflow-hidden"
                        style="max-width: 100%;">
                    <b-row no-gutters>
                        <b-col md="4">
                            <div class="card-img"
                                 :style="{ backgroundImage: 'url('+ topic.cover +')' }"
                            ></div>
                        </b-col>
                        <b-col md="8">
                            <b-card-body :title="topic.name">
                                <b-card-text>

                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"
                                            v-for="presentation in topic.presentations"
                                            v-bind:data="presentation"
                                            v-bind:key="presentation.key"
                                        >
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{presentation.title}} ::
                                                    {{presentation.subtitle}}</h5>

                                                <progress-button class="btn btn-xs btn-primary"
                                                                 :height="5"
                                                                 position="bottom"
                                                                 fill-color="#ffffff"
                                                                 @click.prevent="openPresentation(topic, presentation)"
                                                >
                                                    <i class="fas fa-arrow-right"></i>
                                                </progress-button>

                                            </div>
                                            <div>{{presentation.synopsis}}</div>
                                        </li>

                                    </ul>

                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>

            </div>
        </div>

    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Button from 'vue-progress-button'

  export default {
    name: 'search-screen',
    components: {
      'progress-button': Button
    },

    methods: {
      openPresentation: function (topic, presentation) {
        var router = this.$router
        CourseController.loadPresentation({ topic: topic.key, presentation: presentation.key })
          .then(function (response) {
            router.push({ name: 'presentation' })
          }.bind(router))
      }
    },

    computed: {
      found: function(){
        return this.searchResults.length
      },

      resultsByTopic: function () {
        let topics = {}

        for (var i = 0; i < this.searchResults.length; i++) {
          let presentation = this.searchResults[i]
          let topic = {...presentation.topic}
          //delete presentation.topic

          if (typeof topics[topic.key] == 'undefined') {
            topics[topic.key] = topic
            topics[topic.key]['presentations'] = []
          }

          topics[topic.key].presentations.push(presentation)
        }

        return topics
      },

      ...mapState({
        searchResults: state => state.searchResults,
      }),
    },
  }
</script>


<style>

    h1 {
        font-size: 1.5rem;
        margin-top: 5px;
        margin-bottom: 0px;
        text-align: center;
        font-weight: normal;
        color: #222;
    }

    h2 {
        font-size: 1rem;
        font-weight: lighter;
        font-variant: normal;
        text-transform: uppercase;
        color: #666666;
        margin-top: 10px;
        text-align: center !important;
        letter-spacing: 0.3em;
    }

    .card-img {
        display: block;
        height: 100%;
        min-height: 175px;

        background-repeat: no-repeat;
        background-position: center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

    .card-title {
        border-bottom: 1px solid #cccccc;
    }

</style>
