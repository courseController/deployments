<template>
    <div>
        <!-- 16:9 aspect ratio embed-responsive-16by9 -->
        <!-- 4:3 aspect ratio embed-responsive-4by3 -->
        <div class="embed-responsive embed-responsive-16by9">
            <video controls playsinline>
                <source v-for="url in video"
                        v-bind:data="url"
                        v-bind:key="url"
                        :src="url.replace('https:','').replace('http:','')" :type="mimeType(url)">
            </video>
        </div>

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
    .noshare {
        display: block;
        width: 30%;
        height: 100%;
        position: absolute;
        top: +0px;
        right: +0px;
        z-index: 1000;

    }
</style>