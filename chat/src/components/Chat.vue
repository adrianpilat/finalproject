<template>
    <div class="chat container">
        <h2 class="center teal-text">{{ this.name }} is chatting...</h2>
        <div class="card">
            <div class="card-content z-depth-3">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{ message.name }}</span>
                        <span class="grey-text text-darken-3">{{
                            message.content
                        }}</span>
                        <span class="grey-text time">{{
                            message.timestamp
                        }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action"><NewMessage :name="name" /></div>
            <!-- data binding : cuz it will pass a string -->
        </div>
    </div>
</template>

<script>
import NewMessage from "@/components/NewMessage";
import db from "@/firebase/init";
import moment from "moment";

export default {
    name: "Chat",
    props: ["name"],
    components: {
        NewMessage
    },
    data() {
        return {
            messages: []
        };
    },
    created() {
        let ref = db.collection("messages").orderBy("timestamp");

        ref.onSnapshot(snapshot => {
            snapshot.docChanges.forEach(change => {
                // docChanges is property of firebase
                if (change.type == "added") {
                    let doc = change.doc;
                    this.messages.push({
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: moment(doc.data().timestamp).format("lll")
                    });
                }
            });
        });
    }
};
</script>

<style>
.chat h2 {
    font-size: 2.6em;
    margin-bottom: 40px;
}
.chat span {
    font-size: 1.4em;
}
.chat .time {
    display: block;
    font-size: 1em;
}
.chat li {
    padding-top: 10px;
}
.messages {
    max-height: 300px;
    overflow: auto;
}
</style>
