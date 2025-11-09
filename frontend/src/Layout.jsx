import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // ✅ Import footer component

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main style={{ flex: "1 0 auto" }}>
        <Outlet />
      </main>
      <Footer /> {/* ✅ Stays at the bottom */}
    </div>
  );
}
