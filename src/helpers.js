const Helpers = {
    install(Vue, opts) {
        Vue.mixin({
            methods: {
                generateUuid: function(){
                    return Math.random().toString(36).substring(2)
                        + (new Date()).getTime().toString(36)
                },

                isUrl: function (str) {
                    if(typeof str !== 'string'){
                        return false
                    }

                    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator

                    return !!pattern.test(str)
                }
            }
        });
    }
}

export default Helpers;