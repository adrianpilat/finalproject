import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import Chat from "@/components/Chat";
import GMap from "@/components/home/GMap";
import Signup from "@/components/auth/Signup";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "Welcome",
            component: Welcome
        },
        {
            path: "/chat",
            name: "Chat",
            component: Chat,
            props: true,
            beforeEnter: (to, from, next) => {
                // route guard!
                if (to.params.name) {
                    next();
                } else {
                    next({ name: "Welcome" });
                }
            }
        },
        {
            path: "/map",
            name: "GMap",
            component: GMap
        },
        {
            path: "/signup",
            name: "Signup",
            component: Signup
        }
    ]
});
