<template>
    <div class="image-uplaod container">
        <div class="card-panel center">
            <h2 class="teal-text">Upload your images.</h2>
            <input type="file" @change="onFileSelected" accept="image/*" />
            <button @click="onUpload">Upload</button>
        </div>
        <!-- <button @click="refreshImages">Refresh</button> -->
        <div ref="photogrid" class="flex"></div>
    </div>
</template>

<script>
import firebase from "firebase";
import formatDate from "date-fns/format";
export default {
    name: "ImageUpload",
    data() {
        return {
            selectedFile: null
        };
    },
    mounted() {
        this.refreshImages();
    },
    methods: {
        refreshImages() {
            const div = this.$refs.photogrid;
            div.innerHTML = "";
            const collection = firebase
                .firestore()
                .collection("images")
                .orderBy("uploadDate", "desc")
                .get()
                .then(results => {
                    results.forEach(doc => {
                        const img = document.createElement("img");
                        img.src = doc.get("image");
                        div.appendChild(img);
                    });
                });
        },
        onFileSelected(e) {
            this.selectedFile = event.target.files[0];
        },
        onUpload(e) {
            const uploadDate = new Date();
            const filepath = `images/${formatDate(
                uploadDate,
                "YYYYMMDDHHmmss"
            )}-${this.selectedFile.name}`;
            const ref = firebase.storage().ref(filepath);
            ref.put(this.selectedFile)
                .then(() => ref.getDownloadURL())
                .then(url => {
                    console.log("uploaded", filepath);
                    return firebase
                        .firestore()
                        .collection("images")
                        .add({ uploadDate, image: url });
                })
                .then(() => {
                    console.info("stored", filepath, "successfully!");
                    this.refreshImages();
                });
        }
    }
};
</script>

<style>
.image-uplaod img {
    width: 350px;
    height: 350px;
    object-fit: cover;

    margin: 35px;
}
.flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-self: center;
}
.image-upload {
    max-width: 500px;
    margin-top: 60px;
}
h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
    margin-top: 0px;
}
.card-panel {
    margin-top: 40px;
}
input {
    width: 94px;
}
</style>
