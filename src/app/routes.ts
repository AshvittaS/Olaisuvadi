import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { About } from "./pages/About";
import { Results } from "./pages/Results";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "upload", Component: Upload },
      { path: "about", Component: About },
      { path: "results", Component: Results },
    ],
  },
]);
