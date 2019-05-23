<template>
    <div>
        <youtube v-if="videoFormat() == 'youtube'" :video="presentation.video"></youtube>
        <videos v-if="videoFormat() == 'videos'" :video="presentation.video"></videos>

        <story :title="presentation.title"
               :subtitle="presentation.subtitle"
               :main="presentation.html">
        </story>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import Youtube from "../components/Youtube";
    import Videos from "../components/Videos";

    export default {
        name: 'presentation-screen',
        components: {Youtube},
        methods: {

            videoFormat: function () {

                if (typeof this.presentation.video == 'string'
                    && !this.isUrl(this.presentation.video)) {

                    return 'youtube'
                }

                if (typeof this.presentation.video == 'object'
                    && Array.isArray(this.presentation.video)) {
                    return 'videos'
                }

                return ''
            },
            ...mapActions([
                'setPresentation'
            ])
        },
        computed: {

            ...mapState({
                presentation: function (state) {
                    return state.presentation
                },
            })
        },
        beforeDestroy: function () {
            this.setPresentation({})
        }
    }
</script>


