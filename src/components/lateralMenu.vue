<template>
    <div id="menu--lateral">
        <nav>
            <template v-for="(r,i) in routes" :key="'lmenu'+i">
                <router-link v-if="r['title']" :to="r['path']" class="nav--link"> {{r['title']}} </router-link>
            </template>
        </nav>
        <div class="flipLMenu">&nbsp;</div>
    </div>
</template>
<script setup>
import router from '../router';

const routes = router.options.routes

</script>
<style>
    #menu--lateral {
        @apply block w-36 grid h-[100vw];
        grid-template-columns:1fr 3px;
    }
    .nav--link {
        @apply block h-10 leading-10 px-2 odd:bg-slate-200;
    }
    .nav--link:hover {
        @apply bg-gray-800 text-white;
    }
    .router-link-active { text-decoration:underline; }
    nav {
        @apply block w-auto;
    }
    .flipLMenu {
        @apply bg-gray-300;
    }
</style>