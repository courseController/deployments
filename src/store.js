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
    topics: [],
    presentation: {},
    user: {},
    modal: {
      title: '',
      html: '',
      show: false
    }
  },
  mutations: {
    applyPresentation: (state, payload) => {
      state.presentation = payload
    },

    toggleCompleted: (state, payload) => {
      for (var i in state.topics) {
        var topic = state.topics[i];
        if (topic.key == payload.key) {
          topic.completed = !topic.completed;
          CourseController.recordCompletion({ key: topic.key, completed: topic.completed });
        }
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
    }
  },
  actions: {

    setPresentation: ({ commit, state }, presentation) => {
      commit('applyPresentation', presentation)
    },

    setTopics: ({ commit, state }, topics) => {
      commit('applyTopcis', topics)
    },

    setUser: ({ commit, state }, user) => {
      commit('applyUser', user)
    },
    clearUser: ({ commit, state }) => {
      commit('applyUser', {})
    },

    setModal: ({ commit, state }, content) => {
      content.show = (!_.isEmpty(content.title))
      commit('applyModal', content)
    },
    clearModal: ({ commit, state }) => {
      commit('applyModal', { title: '', html: '' })
    }
  },
});
