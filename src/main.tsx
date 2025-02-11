import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Auth from "./pages/auth"
import Layout from "./components/layout"
import Posts from "./pages/posts"
import CurrentPost from "./pages/current-post"
import Profile from "./pages/profile"
import Subs from "./pages/subs"
import { AuthGuard } from "./features/authGuard"
import Categories from "./pages/categories"
import CurrentCategory from "./pages/current-category"
import CurrentTopic from "./pages/current-topic"
import AdvancedCreator from "./components/advanced-post-creator"
import Notifications from "./pages/notifications"
import PostEditor from "./pages/post-editor"
import SearchPage from "./pages/search-page"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "users/:id",
        element: <Profile />,
      },
      {
        path: "subs",
        element: <Subs />,
      },
      
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:id",
        element: <CurrentCategory />,
      },
      {
        path: "categories/topic/:id",
        element: <CurrentTopic />,
      }
      ,
      {
        path: "create",
        element: <AdvancedCreator />,
      },
      {
        path: "post-edit/:id",
        element: <PostEditor />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "search",
        element: <SearchPage />,
      }
    ],
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
