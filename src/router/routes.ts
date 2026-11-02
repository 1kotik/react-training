import Posts from "../pages/Posts.tsx";
import Login from "../pages/Login.tsx";
import CreatePost from "../pages/CreatePost.tsx";
import FavoritePosts from "../pages/FavoritePosts.tsx";
import AboutMe from "../pages/AboutMe.tsx";

export const publicRoutes = [
    {path: '/posts', component: Posts},
    {path: '/login', component: Login}
]
export const privateRoutes = [
    {path: '/addpost', component: CreatePost},
    {path: '/favorites', component: FavoritePosts},
    {path: '/about-me', component: AboutMe},
]