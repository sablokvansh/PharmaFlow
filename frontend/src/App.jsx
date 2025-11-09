// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/User/Home";
import Inventory from "./Inventory";
import Reports from "./Reports";
import About from "./About";
import Layout from "./Layout";
import Suppliers from "./Suppliers";
import Login from "./Login";
import Signup from "./sign up";
import GhostCursor from "./components/GhostCursor";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Footer from "./components/Footer";

function App() {
  const router = createBrowserRouter([
    // ✅ Default route → Login page
    { path: "/", element: <Login /> },

    // ✅ Routes with Layout (Navbar, etc.)
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/home", element: <Home /> },  // ✅ Home now on /home
        { path: "/about", element: <About /> },
        { path: "/inventory", element: <Inventory /> },
        { path: "/reports", element: <Reports /> },
        { path: "/suppliers", element: <Suppliers /> },
      ],
    },

    // ✅ Other standalone pages
    { path: "/sign-up", element: <Signup /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
  ]);

  return (
    <>
      {/* ✅ Ghost cursor visible on every page */}
      <GhostCursor />

      {/* ✅ App routes */}
      <RouterProvider router={router} />

      {/* ✅ Footer visible globally (optional) */}
      {/* <Footer /> */}
    </>
  );
}

export default App;
