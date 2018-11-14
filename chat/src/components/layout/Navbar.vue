<template>
    <div class="navbar">
        <nav class="teal darken-1">
            <div class="container">
                <a class="brand-logo left" href="#">Navbar</a>
                <!--
                    brand-logo - gives a bit of style and pushes it to the lest
                -->
                <ul class="right">
                    <li v-if="user">
                        <a class="current-email">{{ user.email }}</a>
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'Welcome' }"
                            >Chat</router-link
                        >
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'GMap' }">Map</router-link>
                    </li>
                    <li v-if="!user">
                        <!-- !user only shows when user is not logged in -->
                        <router-link :to="{ name: 'Signup' }"
                            >Signup</router-link
                        >
                    </li>
                    <li v-if="!user">
                        <router-link :to="{ name: 'Login' }">Login</router-link>
                    </li>
                    <li v-if="user"><a @click="logout">Log out</a></li>
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
        return {
            user: null
        };
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ name: "Login" });
                });
        }
    },
    created() {
        //let user = firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });
    }
};
</script>

<style>
.current-email {
    color: rgb(17, 218, 197);
    font-weight: bold;
}
</style>
