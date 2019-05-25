<template>
    <div class="row">
        <div class="col d-none d-xl-block"></div>

        <div class="col">

            <form class="shadow-sm p-3 mb-5 bg-white rounded align-middle wizard" @submit.prevent="processForm">
                <fieldset>
                    <legend>Login</legend>
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

                    <div class="form-row">
                        <div class="col-md-12">
                            <label for="password">password</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"></i>
                                </span>
                                </div>
                                <input id="password"
                                       name="password"
                                       v-model.trim="password"
                                       class="form-control"
                                       type="password"
                                       placeholder="password"
                                       required>
                            </div>
                        </div>
                    </div>

                </fieldset>

                <div class="text-center">

                    <progress-button :height="5"
                                     type="submit"
                                     position="bottom"
                                     class="btn btn-primary"
                                     fill-color="#ffffff"
                                     @click="processForm">Login</progress-button>

                    <router-link :to="{name: 'forgot-password'}" tag="button" role="button" class="btn btn-default fa-pull-left">
                        <i class="fa fa-info-circle"></i> Forgot password
                    </router-link>
                    <div class="clearfix"></div>
                </div>
            </form>

        </div>
        <div class="col d-none d-xl-block"></div>
    </div>
</template>

<script>
  import Button from 'vue-progress-button'

  export default {
    name: 'login-screen',
    components: {'progress-button': Button},
    mounted(){
      if(!_.isEmpty(this.$store.state.user)){
        CourseController.useToken(this.$store.state.user.api_token)
        this.$router.push({name:'home'})
      }
    },
    data: () => {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      processForm () {
        var router = this.$router;
        CourseController.login(this.email, this.password)
          .then(function (response) {
            router.push({ name: 'home' })
          }.bind(router))
      }
    }
  }
</script>

<style>

</style>
