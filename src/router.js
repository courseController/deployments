import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/search-results',
      name: 'search-results',
      component: () => import('./screens/SearchResults.vue')
    },

    {
      path: '/presentation',
      name: 'presentation',
      component: () => import('./screens/Presentation.vue'),
      beforeEnter: (to, from, next) => {
        if(typeof VueApp == 'undefined' || _.isEmpty(VueApp.$store.state.user)){
          next({name : 'login'})
        }else if(_.isEmpty(VueApp.$store.state.presentation)){
          next({name : 'home'})
        }else{
          next()
        }
      }
    },
    {
      path: '',
      name: 'home',
      component: () => import('./screens/Home.vue'),
      beforeEnter: (to, from, next) => {
        if(typeof VueApp == 'undefined' || _.isEmpty(VueApp.$store.state.user)){
          next({name : 'login'})
        }else{
          VueApp.$store.dispatch('setPresentation', {})
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./screens/Login.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('./screens/ForgotPassword.vue'),
    },
    {
      path: '/set-password/:hash?',
      name: 'set-password',
      component: () => import('./screens/SetPassword.vue'),
      beforeEnter: (to, from, next) => {
        if(!_.isEmpty(to.params.hash)){

          CourseController.useForgotPasswordHash(to.params.hash)
            .then(function(response){
              next({name:'set-password'});
            }.bind(next))

        }else if(typeof VueApp == 'undefined' || _.isEmpty(VueApp.$store.state.user)){
          next({name : 'login'})
        }else{
          next()
        }
      }
    },
    {
      path: '/login-as/:enrollment',
      name: 'login-as',
      beforeEnter: (to, from, next) => {
        CourseController.useLoginAs(to.params.enrollment)
          .then(function(response){
            next({name:'home'})
          }.bind(next))
      }
    }
  ],
})
