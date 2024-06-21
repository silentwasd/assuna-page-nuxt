<script setup lang="ts">
</script>
<template>
    <div class="overflow-hidden relative w-dvh h-dvh">

        <Head>
            <title>Главная</title>
        </Head>

        <div class="bg bg-fuchsia-300 w-dvw h-dvh fixed -z-10"></div>

        <div class="overflow-auto w-full h-full">

            <div class="container mx-auto max-w-4xl">
                <div id="vhs">
                    <div class="scanlines"></div>
                    <div class="vhs-wrap">
                        <div class="vhs-meta">
                        </div>
                    </div>
                </div>

                <LangBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <HelloBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <RadioBlock class="second-bg md:rounded-2xl p-10 md:my-10"/>

                <SocialBlock class="second-bg md:rounded-2xl p-10 md:mb-10"/>

            </div>
        </div>
    </div>


</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Dela+Gothic+One&display=swap&family=Oswald:wght@200..700&display=swap&family=Josefin+Sans:ital,wght@0,100..700;1,100..700');

.bg {
    background-image: url(https://i.redd.it/1iwcit1gidyy.jpg);
    background-position: center;
    background-size: cover;

}

.second-bg {
    background-color: rgba(255, 255, 255, .8);
    clip-path: inset(0px round 10px);
    animation: 10s rotate linear infinite;
    border: 0.5vmin solid;
    --angle: 0deg;
    border-image: conic-gradient(from var(--angle), #1b1641, #3c249c, #832ad0, #47ffbf, #35dece, #2d9abb, #2de2e6, #035ee8, #f6019d, #d40078, #9700cc) 1;
}

@keyframes rotate {
    to {
        --angle: 360deg;
    }
}

@property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
}


#vhs *::selection {
    background: #fd5d8d;
    color: #270245;
}

#vhs a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    pointer-events: all;
}


#vhs .scanlines {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;

    opacity: 0.6;


}

#vhs .scanlines::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 0, 0, 0.5) 51%
    );
    background-size: 100% 4px;
    will-change: background, background-size;
    -webkit-animation: scanlines 0.2s linear infinite;
    animation: scanlines 0.2s linear infinite;
}


/* Animations */

@-webkit-keyframes scanlines {
    from {
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(50%, transparent),
            color-stop(51%, rgba(0, 0, 0, 0.5))
        );
        background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%
        );
        background-size: 100% 4px;
    }
    to {
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(50%, rgba(0, 0, 0, 0.5)),
            color-stop(51%, transparent)
        );
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 50%,
            transparent 51%
        );
        background-size: 100% 4px;
    }
}

@keyframes scanlines {
    from {
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(50%, transparent),
            color-stop(51%, rgba(0, 0, 0, 0.5))
        );
        background: linear-gradient(
            to bottom,
            transparent 50%,
            rgba(0, 0, 0, 0.5) 51%
        );
        background-size: 100% 4px;
    }
    to {
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            color-stop(50%, rgba(0, 0, 0, 0.5)),
            color-stop(51%, transparent)
        );
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 50%,
            transparent 51%
        );
        background-size: 100% 4px;
    }
}

::-webkit-scrollbar {
    width: 8px; /* Set the width of the scrollbar */
}

/* Customize scrollbar track */
::-webkit-scrollbar-track {
    background: black; /* Set track background color */
}

/* Customize scrollbar thumb */
::-webkit-scrollbar-thumb {
    background: deeppink;
    border: none;
    /* Set thumb border radius */
}

</style>



