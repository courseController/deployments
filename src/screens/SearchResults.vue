<template>
    <div class="container">

        <h1>Search Results</h1>

        <h2>
            <strong class="text-danger">3</strong>
            results were found for the search for
            <strong class="text-danger">Lorem</strong>
        </h2>

        <div class="row">
            <div class="col">


                <b-card no-body class="overflow-hidden" style="max-width: 100%;">
                    <b-row no-gutters>
                        <b-col md="3">
                            <div class="card-img"
                                 :style="{ backgroundImage: 'url(https://picsum.photos/400/400/?image=20)' }"></div>
                        </b-col>
                        <b-col md="9">
                            <b-card-body title="Horizontal Card">
                                <b-card-text>
                                    This is a wider card with supporting text as a natural lead-in to additional
                                    content.
                                    This content is a little bit longer.
                                </b-card-text>
                            </b-card-body>
                        </b-col>
                    </b-row>
                </b-card>

              search:  {{ $parent.searchString }}

            </div>
        </div>

    </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: 'search-screen',
    computed: {
      ...mapState({
        searchResults: state => state.searchResults,
      }),
    },
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

    .card-img {
        display: block;
        min-height: 200px;
        height: 100%;

        background-repeat: no-repeat;
        background-position: center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }

</style>
