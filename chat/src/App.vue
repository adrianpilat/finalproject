<template>
    <div id="app">
        <!-- <p>test test</p> -->
        <Navbar />
        <router-view />
    </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
export default {
    name: "App",
    components: {
        Navbar
    }
};
</script>

<style>
/* #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>

<style>
body {
    background-color: #f2f3f5;
}
</style>
