<template>
        <div class="embed-responsive embed-responsive-16by9">
            <video controls playsinline>
                <source v-for="url in video"
                        v-bind:data="url"
                        v-bind:key="url"
                        :src="url.replace('https:','').replace('http:','')" :type="mimeType(url)">
            </video>
        </div>

</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: 'videos',
        props: ['video'],

        methods: {

            mimeType: (url) => {
                let mime = url.split('?')[0].split('.').pop()
                return {
                    mp4: 'video/mp4',
                    webm: 'video/webm'
                }[mime]
            },

            ...mapActions([
                'setModal'
            ])
        }
    }
</script>

<style scoped>
    .embed-responsive{
        background-image: url("/bg_video.jpg");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }
</style>