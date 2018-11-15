<template>
    <div class="map">
        <h2 class="teal-text">Check who's online right now.</h2>
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";
export default {
    name: "GMap",
    data() {
        return {
            lat: 52,
            lng: 14
        };
    },
    methods: {
        renderMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: this.lat, lng: this.lng },
                zoom: 6,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false
            });
            db.collection("users")
                .get()
                .then(users => {
                    users.docs.forEach(doc => {
                        let data = doc.data();
                        if (data.geolocation) {
                            let marker = new google.maps.Marker({
                                position: {
                                    lat: data.geolocation.lat,
                                    lng: data.geolocation.lng
                                },
                                map: map
                            });
                            // add click event to Marker
                            marker.addListener("click", () => {
                                console.log("slug: ", doc.id);
                                this.$router.push({
                                    name: "ViewProfile",
                                    params: { id: doc.id }
                                });
                            });
                        }
                    });
                });
        }
    },
    mounted() {
        //get current user
        let user = firebase.auth().currentUser;
        // console.log("user:", user);
        // get user geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    this.lat = pos.coords.latitude;
                    this.lng = pos.coords.longitude;
                    // find the user record and then update geo coords
                    db.collection("users")
                        .where("user_id", "==", user.uid) //user_id should match user.uid from line 32 and console log
                        .get()
                        .then(snapshot => {
                            snapshot.forEach(doc => {
                                console.log("doc.id:", doc.id); //this is the slug of the alias
                                db.collection("users")
                                    .doc(doc.id)
                                    .update({
                                        geolocation: {
                                            lat: pos.coords.latitude,
                                            lng: pos.coords.longitude
                                        }
                                    });
                            });
                        })
                        .then(() => {
                            this.renderMap();
                        });

                    this.renderMap();
                },
                err => {
                    console.log(err);
                    this.renderMap();
                },
                { maximumAge: 600, timeout: 3000 }
            ); //maximumage looking for catched position within an hour
        } else {
            // position centre by defualt values
            this.renderMap();
        }
        // console.log(firebase.auth().currentUser);
    }
};
</script>

<style>
.google-map {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: rgb(39, 122, 106);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.map h2 {
    font-size: 1.8em;
    margin-top: 7px;
    margin-left: 8px;
}
</style>
