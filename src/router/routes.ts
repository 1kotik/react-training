import Posts from "../pages/Posts.tsx";
import Login from "../pages/Login.tsx";
import CreatePost from "../pages/CreatePost.tsx";
import FavoritePosts from "../pages/FavoritePosts.tsx";
import AboutMe from "../pages/AboutMe.tsx";

export const RoutePaths = {
    POSTS: '/posts',
    LOGIN: '/login',
    ADD_POST: '/addpost',
    FAVORITES: '/favorites',
    ABOUT_ME: '/about-me',
} as const;

export const publicRoutes = [
    {path: RoutePaths.POSTS, component: Posts},
    {path: RoutePaths.LOGIN, component: Login}
]
export const privateRoutes = [
    {path: RoutePaths.ADD_POST, component: CreatePost},
    {path: RoutePaths.FAVORITES, component: FavoritePosts},
    {path: RoutePaths.ABOUT_ME, component: AboutMe},
]