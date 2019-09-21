<template>
    <div class="card">
        <div class="card-img-top"
             :style="{ backgroundImage: 'url(' + image.replace('https:','').replace('http:','') + '?w=500)' }"
             @click.prevent="action"
        ></div>
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">{{ description }}</p>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['image', 'action', 'title', 'description', 'presentation'],
  }
</script>

<style scoped>
    .card-img-top {
        display: block;
        width: 100%;
        height: 180px;

        background-repeat: no-repeat;
        background-position: center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>
