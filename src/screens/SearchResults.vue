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

                <div class="card">
                    <div class="card-img-top"
                         :style="{ backgroundImage: 'url(' + 'http://lorempixel.com/250/140/sports'.replace('https:','').replace('http:','') + ')' }"></div>
                    <div class="card-body">
                        <h5 class="card-title">adsf</h5>
                        <p class="card-text">adf</p>
                    </div>
                    <div class="card-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<scritp>

</scritp>


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
