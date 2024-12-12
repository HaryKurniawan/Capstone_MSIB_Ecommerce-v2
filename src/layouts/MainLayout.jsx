import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cart from "../pages/Cart";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Cart />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
