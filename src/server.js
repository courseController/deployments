import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import _ from 'lodash'

Vue.set(Vue.prototype, '_', _);

Vue.use(VueAxios, axios)

let SERVER_URL = (process.env.NODE_ENV === 'production')
  ? 'https://CourseController.com'
  : 'http://CourseController.test'

export default {

  serverUrl: () => {
    return SERVER_URL;
  },

  loadPresentation: (payload) => {
    var route = '/fuqu-course/topics/{topic}/presentations/{presentation}'
      .replace('{topic}', payload.topic).replace('{presentation}', payload.presentation)

    return axios.get(SERVER_URL + route)
      .then((response) => {
        response.data.topic = payload.topic
        VueApp.$store.dispatch('setPresentation', response.data)
      })
  },

  searchCourseContent: (payload) => {
    var route = '/fuqu-course/search?search_string={search_string}'
      .replace('{search_string}', payload.searchString)

    return axios.get(SERVER_URL + route)
      .then()
  },

  recordCompletion: (type, payload) => {
    var route;
    switch (type) {
      case 'topic':
        route = '/fuqu-course/topics/{topic}/{action}'
          .replace('{topic}', payload.key).replace('{action}', 'update')

        return axios.post(SERVER_URL + route, payload)
        //break

      case 'presentation':
        route = '/fuqu-course/topics/{topic}/presentations/{presentation}/{action}'
          .replace('{topic}', payload.topic).replace('{presentation}', payload.key).replace('{action}', 'update')

        return axios.post(SERVER_URL + route, payload)
        //break

    }
  },

  loadTopics: () => {
    axios.get(SERVER_URL + '/fuqu-course/topics')
      .then((response) => {
        VueApp.$store.dispatch('setTopics', response.data)
      })
  },

  login: (email, password) => {

    return axios.post(SERVER_URL + '/fuqu/enrollments/login', {email, password})
      .then((response) => {
        startUserSession(response.data)
      })
  },

  forgotPassword: (email) => {
    return axios.post(SERVER_URL + '/fuqu/enrollments/forgot-password', {email})
  },

  useForgotPasswordHash: (hash) => {
    return axios.post(SERVER_URL + '/fuqu/enrollments/forgot-password-user', {hash})
      .then((response) => {
        startUserSession(response.data)
      })
  },

  setPassword: (password) => {
    return axios.post(SERVER_URL + '/fuqu/enrollments/set-password', {password});
  },

  useToken: (token) => {
    axios.defaults.headers.common['Authorization'] = token;
  },

  useLoginAs: (enrollment) => {
    if (typeof axios.defaults.headers.common['Authorization'] != 'undefined') {
      delete axios.defaults.headers.common['Authorization']
    }
    return axios.post(SERVER_URL + '/fuqu/enrollments/login-as', {enrollment})
      .then((response) => {
        startUserSession(response.data)
      })
  },
}

////////////////////////////////////////

function startUserSession(user) {
  CourseController.useToken(user.api_token)
  VueApp.$store.dispatch('setUser', user)
}

function showServerError(message) {
  if (!_.isEmpty(message.data.errors)) {
    var title = message.data.message;
    var html = '<ul>'
    for (var i in message.data.errors) {
      html += message.data.errors[i]
    }
    html += '<ul>'
  } else {
    title = 'Error'
    html = '<p>' + message.data.message + '</p>'
  }

  VueApp.$store.dispatch('setModal', {title, html})
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  showServerError(error.response);
  return Promise.reject(error);
});


