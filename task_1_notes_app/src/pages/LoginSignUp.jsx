import {useState} from "react";
import {v4 as uuid} from "uuid";
import {useNavigate} from "react-router-dom";

function LoginSignUp() {
    const [currentOperation, setCurrentOperation] = useState("login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and Password are required!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const usersDataArray = JSON.parse(localStorage.getItem("usersData"));
        if (!usersDataArray) {
            setError("User does not exist!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const findUser = usersDataArray.find(
            (item) => item.email === email.toLowerCase(),
        );
        if (!findUser) {
            setError("User does not exist!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        if (findUser.password !== password) {
            setError("Incorrect password!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigate(`/welcome/${findUser.id}`);
    }

    function handleSignUp(e) {
        e.preventDefault();
        if (!username || !email || !password) {
            setError("All fields are required!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const localStorageDataExists = localStorage.getItem("usersData");
        if (!localStorageDataExists) {
            localStorage.setItem("usersData", JSON.stringify([]));
        }
        const usersDataArray = JSON.parse(localStorage.getItem("usersData"));
        const userExists = usersDataArray.find(
            (item) => item.email === email.toLowerCase(),
        );
        if (userExists) {
            setError("This email is already in use!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const newUser = {
            id: uuid(),
            username: username,
            email: email.toLowerCase(),
            password: password,
        };
        const updatedUsersDataArray = [...usersDataArray, newUser];
        localStorage.setItem("usersData", JSON.stringify(updatedUsersDataArray));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        navigate(`/welcome/${newUser.id}`);
    }

    function resetStates() {
        setEmail("");
        setPassword("");
        setUsername("");
        setError("");
    }

    return (
        <main className="bg-gradient flex justify-center items-center min-h-screen">
            <div className="bg-white w-[340px] sm:w-[450px] flex flex-col items-center gap-[20px] justify-center p-[30px]">
                {/*Heading*/}
                <h1 className="text-[25px] sm:text-[35px] font-semibold text-center">
                    {currentOperation === "login" ? "Login" : "SignUp"} Form
                </h1>

                {/*Buttons*/}
                <div className="w-full flex">
                    <button
                        onClick={() => {
                            resetStates();
                            setCurrentOperation("login");
                        }}
                        className={`w-full h-[40px] sm:h-[50px] text-[18px] sm:text-[20px] ${currentOperation === "login" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            resetStates();
                            setCurrentOperation("signup");
                        }}
                        className={`w-full h-[40px] sm:h-[50px] text-[18px] sm:text-[20px] ${currentOperation === "signup" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        Signup
                    </button>
                </div>

                {/*Form*/}
                <form className="w-full flex flex-col gap-[18px]">
                    {currentOperation === "signup" && (
                        <input
                            required={true}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="border w-full p-[6px] sm:p-[10px] outline-0 border-gray-300"
                            placeholder="Enter username"
                        />
                    )}
                    <input
                        required={true}
                        type="email"
                        className="border w-full p-[6px] sm:p-[10px] outline-0 border-gray-300"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="border w-full p-[6px] sm:p-[10px] outline-0 border-gray-300"
                        placeholder="Enter password"
                    />

                    <button
                        type="submit"
                        onClick={(e) => {
                            currentOperation === "login" ? handleLogin(e) : handleSignUp(e);
                        }}
                        className="bg-gradient w-full h-[40px] sm:h-[50px] text-white text-[18px] sm:text-[22px]"
                    >
                        {currentOperation === "login" ? "Login" : "SignUp"}
                    </button>
                </form>

                <div className="w-full h-[14px] mt-[-10px]">
                    {error && (
                        <p className="text-red-500 text-[14px] sm:text-[16px] h-full">
                            {error}
                        </p>
                    )}
                </div>

                {/*Line*/}
                <div className="w-full text-right text-[14px] sm:text-[16px]">
                    {currentOperation === "login" ? (
                        <p>
                            New here?{" "}
                            <span
                                onClick={() => {
                                    resetStates();
                                    setCurrentOperation("signup");
                                }}
                                className=" font-semibold cursor-pointer"
                            >
                SignUp
              </span>
                        </p>
                    ) : (
                        <p>
                            Have an account?{" "}
                            <span
                                onClick={() => {
                                    resetStates();
                                    setCurrentOperation("login");
                                }}
                                className="font-semibold cursor-pointer"
                            >
                Login
              </span>
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}

export default LoginSignUp;
