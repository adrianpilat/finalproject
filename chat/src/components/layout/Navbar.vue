<template>
    <div class="navbar ">
        <nav class="teal darken-1 ">
            <div class="container">
                <router-link :to="{ name: 'HomePage' }">
                    <img
                        class="brand-logo left logo"
                        src="https://i.imgur.com/VxTOuXi.png"
                        alt="logo"
                /></router-link>
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
                    <li v-if="user">
                        <router-link :to="{ name: 'ImageUpload' }"
                            >Images</router-link
                        >
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
.navbar .current-email {
    color: rgb(20, 193, 176);
    font-weight: bold;
}
.navbar .logo {
    height: 63px;
}
@media only screen and (min-width: 200px) and (max-width: 1050px) {
    .navbar .logo {
        display: none;
    }
}
</style>
