<template>
    <div>
        <!-- 16:9 aspect ratio embed-responsive-16by9 -->
        <!-- 4:3 aspect ratio embed-responsive-4by3 -->

        <div class="embed-responsive embed-responsive-16by9">
            <iframe :src="videoSrc"
                    frameborder="0"
                    data-parameters="showinfo=0"
                    allowfullscreen></iframe>
            <a href="#" @click="$store.dispatch('setModal', { title:'Sorry...', html:'That action is not permitted.' })" class="noshare"></a>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'youtube',
        props: ['video'],

        computed: {
            videoSrc: function () {
                // @see https://developers.google.com/youtube/player_parameters
                return '//www.youtube-nocookie.com/embed/' + this.video + '?rel=0&controls=0&modestbranding=1&showinfo=0&'
            }
        },

        methods: {
            ...mapActions([
                'setModal'
            ])
        }
    }
</script>

<style scoped>
    .noshare{
        display: block;
        width: 30%;
        height: 100%;
        position: absolute;
        top: +0px;
        right:+0px;
        z-index: 1000;

    }
</style>