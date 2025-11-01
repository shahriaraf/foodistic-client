import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Root = () => {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const hideLayoutPaths = ["/login", "/register"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideLayout && <Navbar />}
      <Outlet />
      {!shouldHideLayout && <Footer />}
    </div>
  );
};

export default Root;
