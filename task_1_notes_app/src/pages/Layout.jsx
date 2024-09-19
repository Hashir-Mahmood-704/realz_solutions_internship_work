import {Outlet, useLocation} from "react-router-dom";

import Navbar from "../components/Navbar.jsx";

function Layout() {
    const {pathname} = useLocation();
    return (
        <main className="font-poppins">
            {pathname !== "/" && <Navbar/>}
            <Outlet/>
        </main>
    );
}

export default Layout;
