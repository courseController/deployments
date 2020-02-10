import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'
import _ from 'lodash'

Vue.set(Vue.prototype, '_', _);

const vuexPersist = new VuexPersist({
  key: 'course-controller',
  storage: localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  getters: {},
  state: {
    enrollment: {},
    topics: [],
    presentation: {},
    user: {},
    modal: {
      title: '',
      html: '',
      show: false
    },
    searchResults:[]
  },
  mutations: {
    applyPresentation: (state, payload) => {
      state.presentation = payload
    },

    toggleCompleted: (state, payload) => {
      switch (payload.type) {
        case 'topic':
        for (var i in state.topics) {
          var topic = state.topics[i]
          if (topic.key == payload.key) {
            topic.completed = !topic.completed
            CourseController.recordCompletion('topic', {key: topic.key, completed: topic.completed})
            break
          }
        }
        break;

        case 'presentation':
          var presentation = state.presentation
          presentation.completed = !presentation.completed
          CourseController.recordCompletion('presentation', {key: presentation.key, topic:presentation.topic, completed: presentation.completed})
          break
      }
    },
    applyTopcis: (state, payload) => {
      state.topics = payload
    },
    applyUser: (state, payload) => {
      state.user = payload
    },
    applyModal: (state, payload) => {
      if (payload.title == 'The given data was invalid.') {
        payload.title = 'Error'
      }
      state.modal = payload
    },
    applySearchResults: (state, payload) => {
      state.searchResults = payload
    }
  },
  actions: {

    setSearchResults: ({commit, state}, results) => {
      commit('applySearchResults', results)
    },

    setPresentation: ({commit, state}, presentation) => {
      commit('applyPresentation', presentation)
    },

    setTopics: ({commit, state}, topics) => {
      commit('applyTopcis', topics)
    },

    setEnrollment: ({commit, state}, enrollment) => {
      commit('applyEnrollment', enrollment)
    },

    setUser: ({commit, state}, user) => {
      commit('applyUser', user)
    },
    clearUser: ({commit, state}) => {
      commit('applyUser', {})
    },

    setModal: ({commit, state}, content) => {
      content.show = (!_.isEmpty(content.title))
      commit('applyModal', content)
    },
    clearModal: ({commit, state}) => {
      commit('applyModal', {title: '', html: ''})
    },
    clearSearchResults: ({commit, state}) => {
      commit('applySearchResults', [])
    },
  },
});
