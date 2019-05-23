<template>

    <div id="app" class="fluid-container h-100" @click="function(){}">
        <b-modal v-model="modal.show"
                 id="modal"
                 ok-only
                 :title="modal.title"
                 :no-close-on-backdrop=true
                 :no-close-on-esc=true
                 :hide-header-close=true
                 @hide="clearModal"
        >
            <div v-html="modal.html"></div>
        </b-modal>

        <b-modal v-if="fileSystemUrl"
                 id="FileSystem"
                 title="Downloadable Files"
                 size="lg"
                 :hide-footer=true
                 @shown="reloadIframe"
        >

            <div class="embed-responsive embed-responsive-16by9">
                <iframe id="FileSystemIFrame" :src="fileSystemUrl" :key="'jotform-iframe-'+fileSystemUrl"></iframe>
            </div>

        </b-modal>


        <div id="TopNav" class="fixed-top navbar shadow">

            <div class="left-side">
                <b-button-group class="d-inline-block d-md-none">
                    <b-button @click.stop.prevent="navRequested = !navRequested"><i class="fas fa-bars"></i></b-button>
                    <!--<router-link tag="button" class="btn btn-secondary" :to="{name:'home'}"><i class="fas fa-home"></i></router-link>-->
                </b-button-group>
            </div>

            <div id="Corp" class="align-content-center">
                <img id="Logo" src="/logo.png"/>
                <span id="Wordmark" class="brand-color brand-font">RunningMoms</span>
            </div>


            <b-nav class="float-right" v-if="showUserMenu">
                <b-nav-item-dropdown id="UserMenu" :text="user.first_name" right>
                    <b-dropdown-item>
                        <router-link tag="a" class="dropdown-item" :to="{name: 'set-password'}">Change Password
                        </router-link>
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item @click="logOut()">Logout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>

            <b-nav class="float-right" v-else>
                <b-nav-item-dropdown id="GuestMenu" text="Guest" right>
                    <b-dropdown-item>
                        <router-link tag="a" class="dropdown-item" :to="{name: 'login'}">Login</router-link>
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-nav>

        </div>

        <div id="ScrollToPoint"></div>

        <div id="wrapper" :class="{toggled: (navRequested || ['md','lg', 'xl'].includes($mq))}">
            <div id="SideBar" v-on-click-outside="dismissNav">

                <b-input-group style="min-width: 250px; top: 5px;">
                    <b-form-input/>
                    <b-input-group-append>
                        <progress-button name="bottom"
                                         :height="5"
                                         position="bottom"
                                         class="btn btn-primary"
                                         fill-color="#ffffff">
                            <i class="fas fa-search"></i>
                        </progress-button>
                    </b-input-group-append>
                </b-input-group>

                <ul class="sidebar-nav">
                    <li class="sidebar-brand">
                        <router-link :to="{name:'home'}">
                            <i class="fas fa-home"></i> Home
                        </router-link>
                    </li>

                    <li v-for="item in visableExternalNav">
                        <a :href="item.url" :target="(item.newWindow? '_blank':'_self')">{{ item.label }}</a>
                    </li>
                </ul>

                <ul class="sidebar-nav fixed-bottom">
                    <li>
                        <a target="_blank" href="https://trafficjam.io" style="font-size:0.8em;">Powered by TrafficJam&trade;</a>
                    </li>
                </ul>
            </div>


            <div id="PageWrapper">
                <div class="container-fluid">
                    <router-view></router-view>

                </div>
                <div id="BottomBuffer" class="clearfix"></div>
            </div>

        </div>

        <div id="BottomNav" class="row fixed-bottom navbar">
            <div class="col text-center center_nudge" v-if="!_.isEmpty(presentation)">
                <progress-button v-if="presentation.previous" class="btn btn-lg btn-primary float-left" :height="5"
                                 position="bottom" fill-color="#ffffff"
                                 @click.prevent="loadPresentation({ topic: presentation.topic, presentation: presentation.previous.key })">
                    <i class="fas fa-arrow-left"></i>
                </progress-button>

                <b-btn id="DownloadButton" v-b-modal.FileSystem class="btn btn-lg btn-primary">
                    <i class="far fa-folder-open"></i>
                    <span class="d-none d-lg-inline"> Downloads</span>
                </b-btn>

                <progress-button v-if="presentation.next" class="btn btn-lg btn-primary float-right" :height="5"
                                 position="bottom" fill-color="#ffffff"
                                 @click.prevent="loadPresentation({ topic: presentation.topic, presentation: presentation.next.key })">
                    <i class="fas fa-arrow-right"></i>
                </progress-button>
            </div>
        </div>

    </div>
</template>

<script>
  import Button from 'vue-progress-button'
  import {mapState, mapActions} from 'vuex'
  import {mixin as onClickOutside} from 'vue-on-click-outside'

  var VueScrollTo = require('vue-scrollto');

  export default {
    name: 'app',
    mixins: [onClickOutside],
    data: () => {
      return {
        externalNav: [],
        navRequested: false
      }
    },
    components: {
      'progress-button': Button
    },
    methods: {
      ...mapActions([
        'clearUser'
      ]),

      reloadIframe: function () {
        document.getElementById('FileSystemIFrame').contentWindow.postMessage({ action: 'reload' }, '*');
      },

      dismissNav: function () {
        this.navRequested = false
      },

      stamp: () => {
        return +new Date();
      },
      clearModal: function () {
        this.$store.dispatch('clearModal')
      },

      logOut: function () {
        this.$store.dispatch('clearUser')
        this.$router.push({ name: 'login' })
      },

      loadPresentation (payload) {
        CourseController.loadPresentation(payload)
          .then(function () {
            VueScrollTo.scrollTo('#ScrollToPoint', 500, { duration: 500, easing: "ease" });
          }.bind(VueScrollTo))
      }

    },
    mounted () {
      this.externalNav = nav;
    },
    computed: {
      ...mapState({
        modal: state => state.modal,
        user: state => state.user,
        presentation: state => state.presentation,

        showUserMenu: state => {
          return (!_.isEmpty(state.user)) ? true : false
        },

        fileSystemUrl: state => {
          if (!_.isEmpty(state.presentation)) {
            return CourseController.serverUrl()
              + '/fuqu-course/files/' + state.presentation.topic
              + '/finder?token=' + state.user.api_token
          }
          return false
        },

        visableExternalNav: function(state){
          return this.externalNav.filter(function(item){

            switch(true){

              case (typeof item.audience == 'undefined'):
              case (_.isEmpty(state.user) && item.audience == 'guest'):
              case (!_.isEmpty(state.user) && item.audience == 'member'):
                return true

              default:
                return false

            }

          }.bind(state));
        }
      })
    }
  }
</script>


<style>
    html, body {
        height: 100%;
        margin: 0px;
        padding: 0px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    #TopNav {
        padding-right: 10px;

    }

    #TopNav:after {
        content: "";
        position: absolute;
        left: 0px;
        width: 100%;
        bottom: 1px;
        z-index: -1;

        box-shadow: 0px 0px 4px 2px #666666;
    }

    #wrapper {

        padding-left: 0;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    #wrapper.toggled {
        padding-left: 250px;

    }

    #wrapper .container-fluid {
        padding-right: 10px;
    }

    #SideBar {
        z-index: 1000;
        position: fixed;
        left: 250px;
        width: 0;
        height: 100%;
        margin-left: -250px;
        overflow-y: auto;
        -webkit-transition: all 0.5s ease;
        -moz-transition: all 0.5s ease;
        -o-transition: all 0.5s ease;
        transition: all 0.5s ease;
    }

    #wrapper.toggled #SideBar {
        width: 250px;
    }

    #PageWrapper {
        width: 100%;
        position: absolute;
        padding: 15px;
    }

    #wrapper.toggled #PageWrapper {
        position: absolute;
        margin-right: -250px;
    }

    .left-side {
        max-width: 250px;
    }

    #BottomBuffer {
        height: 50px;
    }

    /* Sidebar Styles */

    .sidebar-nav {

        width: 250px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .sidebar-nav li {
        text-indent: 20px;
        line-height: 40px;
    }

    .sidebar-nav li a {
        display: block;
        text-decoration: none;
    }

    .sidebar-nav li a:hover {
        text-decoration: none;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
    }

    .sidebar-nav li a:active, .sidebar-nav li a:focus {
        text-decoration: none;
    }

    .sidebar-nav > .sidebar-brand {
        height: 65px;
        font-size: 18px;
        line-height: 60px;
    }

    .sidebar-nav > .sidebar-brand a:hover {
        color: #fff;
        background: none;
    }

    .dropdown-menu {
        border-radius: 0.5rem;
    }

    .card {
        min-width: 18rem;
        max-width: 24rem;
        margin-bottom: 15px !important;
    }

    form.wizard {
        margin-top: 125px;
    }

    legend {
        border-bottom: 1px solid #cccccc;
    }

    label {
        display: none;
    }

    .form-row {
        margin-bottom: 10px;
    }

    .modal-header {
        background-color: #efefef;
    }

    #FileSystem .modal-body {
        padding: 0 0.2rem 0.1rem 0.2rem;
    }

    /*
        #FileSystem .modal-body{
            overflow: hidden;
            -webkit-border-bottom-right-radius: 0.3rem;
            -webkit-border-bottom-left-radius: 0.3rem;
            -moz-border-radius-bottomright: 0.3rem;
            -moz-border-radius-bottomleft: 0.3rem;
            border-bottom-right-radius: 0.3rem;
            border-bottom-left-radius: 0.3rem;
        }*/

    @media (min-width: 768px) {
        #wrapper {
            padding-left: 0;
        }

        #wrapper.toggled,
        #Corp {
            padding-left: 250px;
        }

        #BottomNav{
            margin-left: 250px;
        }

        #DownloadButton{
            position: relative;
            left:-110px;
        }

        .center_nudge {
            margin-left: 250px;
        }

        #SideBar {
            width: 0;
        }

        #wrapper.toggled #SideBar {
            width: 250px;
        }

        #PageWrapper {
            padding: 20px;
            position: relative;
        }

        #wrapper.toggled #PageWrapper {
            position: relative;
            margin-right: 0;
        }
    }
</style>

