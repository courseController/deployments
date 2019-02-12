<template>
    <div class="row">
        <div class="col d-none d-xl-block"></div>

        <div class="col">

            <form class="shadow-sm p-3 mb-5 bg-white rounded align-middle wizard" @submit.prevent="processForm">
                <fieldset>
                    <legend>Set Password</legend>

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
                    <button role="button" class="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>

        </div>
        <div class="col d-none d-xl-block"></div>
    </div>
</template>

<script>
  export default {
    name: 'login-screen',
    data: () => {
      return {
        password: ''
      }
    },
    methods: {
      processForm () {
        var router = this.$router;
        CourseController.setPassword(this.password)
          .then(function (response) {
            router.push({name:'home'})
          }.bind(router))
      }
    }
  }
</script>

<style>

</style>
