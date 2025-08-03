import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import {  AuthLayout } from "./components";
import HomePage, { LoginPage, SignupPage, AllPosts, AddPostPage, EditPostPage, PostPage } from './pages/index'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authentication={false}>
                        <LoginPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authentication={false}>
                        <SignupPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <AddPostPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        {" "}
                        <EditPostPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: <PostPage />,
            },
        ],
    },
])
