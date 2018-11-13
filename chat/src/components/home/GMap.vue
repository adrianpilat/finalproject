<template>
    <div class="map">
        <h3>Map!</h3>
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
import firebase from "firebase";
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
        }
    },
    mounted() {
        this.renderMap();
        console.log(firebase.auth().currentUser);
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
</style>
