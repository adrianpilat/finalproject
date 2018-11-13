<template>
    <div class="navbar">
        <nav class="teal darken-1">
            <div class="container">
                <a class="brand-logo left" href="#">Navbar</a>
                <!--
                    brand-logo - gives a bit of style and pushes it to the lest
                -->
                <ul class="right">
                    <li><a href="#/">Chat</a></li>
                    <li><a href="#/map">Map</a></li>
                    <li>
                        <router-link :to="{ name: 'Signup' }"
                            >Signup</router-link
                        >
                    </li>
                    <li><a href="#">Log in</a></li>
                    <li><a @click="logout">Log out</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from "firebase";
export default {
    name: "Navbar",
    data() {
        return {};
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ name: "Signup" });
                });
        }
    }
};
</script>

<style></style>
