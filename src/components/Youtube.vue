<template>
    <div>
        <!-- 16:9 aspect ratio embed-responsive-16by9 -->
        <!-- 4:3 aspect ratio embed-responsive-4by3 -->
        <div class="embed-responsive embed-responsive-16by9">
            <iframe :src="videoSrc"
                    frameborder="0"
                    allowfullscreen></iframe>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'youtube',
    props: ['video'],

    computed: {
      videoSrc: function () {
        return '//www.youtube.com/embed/' + this.video + '?rel=0&controls=0&showinfo=0'
      }
    }
  }
</script>
