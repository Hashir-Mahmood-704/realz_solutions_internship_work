import {useNavigate} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        navigate("/");
    }

    return (
        <nav className="flex justify-between items-center h-[50px] sm:h-[80px] px-[15px] sm:px-[25px] bg-gradient border-b">
            <h1 className="text-white text-[22px] sm:text-[30px] font-bold">
                Notes App
            </h1>
            <button
                onClick={handleLogout}
                className="h-[30px] sm:h-[50px] w-[80px] sm:w-[100px] bg-white text-[14px] sm:text-[18px]"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;
