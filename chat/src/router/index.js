import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

import Welcome from "@/components/Welcome";
import Chat from "@/components/Chat";
import GMap from "@/components/home/GMap";
import Signup from "@/components/auth/Signup";
import Login from "@/components/auth/Login";
import ViewProfile from "@/components/profile/ViewProfile";
import HomePage from "@/components/layout/HomePage";
import ImageUpload from "@/components/upload/ImageUpload";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/chatwelcome",
            name: "Welcome",
            component: Welcome,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/chat",
            name: "Chat",
            component: Chat,
            props: true,
            meta: {
                requiresAuth: true
            },
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
            component: GMap,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/signup",
            name: "Signup",
            component: Signup
        },
        {
            path: "/",
            name: "Login",
            component: Login
        },
        {
            path: "/profile/:id",
            name: "ViewProfile",
            component: ViewProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/homepage",
            name: "HomePage",
            component: HomePage,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/imageupload",
            name: "ImageUpload",
            component: ImageUpload,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    //check to see if route requires requires auth
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        // check auth state of user
        let user = firebase.auth().currentUser;
        if (user) {
            // user signed in, proceed to route
            next();
        } else {
            //user not signed in, redirect to Login
            next({ name: "Login" });
        }
    } else {
        next();
    }
});

export default router;
