import {useEffect, useState} from "react";
import {useNavigate, Link, useParams} from "react-router-dom";
import {getAndSetUserData} from "../utils/getAndSetUserData.js";

function Welcome() {
    const {userId} = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getAndSetUserData(navigate, setUserData, userId);
    }, []);
    return <main className="bg-gradient  min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="flex flex-col items-center gap-[15px]">
            <h1 className="text-white text-[26px] sm:text-[35px] font-semibold">
                WELCOME {userData?.username.toUpperCase()}
            </h1>
            <Link to={`/dashboard/${userId}`}>
                <p className="text-center text-[16px] sm:text-[18px] bg-white w-fit sm:p-[10px] p-[8px]">
                    Go To Dashboard
                </p>
            </Link>
        </div>
    </main>
}

export default Welcome;
