<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <div class="row">
            <div class="col" v-html="main"></div>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'story',
      props: ['title', 'subtitle', 'main']
    }
</script>

<style>
    h1 {
        font-size: 1.5rem;
        margin-top: 5px;
        margin-bottom: 0px;
        text-align: center;
        font-weight: normal;
        color: #222;
    }

    h2 {
        font-size: 1rem;
        font-weight: lighter;
        font-variant: normal;
        text-transform: uppercase;
        color: #666666;
        margin-top: 10px;
        text-align: center !important;
        letter-spacing: 0.3em;
    }
</style>
