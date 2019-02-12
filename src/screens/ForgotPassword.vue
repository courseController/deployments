<template>
    <div class="row">
        <div class="col d-none d-xl-block"></div>

        <div class="col">

            <form class="shadow-sm p-3 mb-5 bg-white rounded align-middle wizard" @submit.prevent="processForm">
                <fieldset>
                    <legend>Forgot Password</legend>
                    <div class="form-row">
                        <div class="col-md-12">
                            <label for="email">Email</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-user"></i>
                                </span>
                                </div>
                                <input id="email"
                                       name="email"
                                       v-model.trim="email"
                                       class="form-control"
                                       type="email"
                                       placeholder="email"
                                       required>
                            </div>
                        </div>
                    </div>

                </fieldset>

                <div class="text-center">
                    <router-link v-if="!loggedIn"
                                 :to="{name: 'login'}"
                                 tag="button"
                                 role="button"
                                 class="btn btn-default fa-pull-left">
                        <i class="fa fa-info-circle"></i> Back to Login
                    </router-link>
                    <button role="button" class="btn btn-primary" type="submit">Reset</button>
                </div>
            </form>

        </div>
        <div class="col d-none d-xl-block"></div>
    </div>
</template>

<script>
  import Button from 'vue-progress-button'
  import {mapActions} from 'vuex'

  export default {
    name: 'login-screen',
    components: {'progress-button': Button},
    data: () => {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      processForm () {
        var callback = this.setModal;
        CourseController.forgotPassword(this.email)
          .then(function (response) {
            callback({ title: 'Sercurity', html: 'An email has been sent with a link to reset your password.' })
          }.bind(callback))
      },
      ...mapActions([
        'setModal'
      ])
    }
  }
</script>
