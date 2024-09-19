import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAndSetUserData} from "../utils/getAndSetUserData.js";
import CreateNote from "../components/CreateNote.jsx";
import NotesList from "../components/NotesList.jsx";
import Search from "../components/Search.jsx"

function Dashboard() {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [userData, setUserData] = useState(null);
    const [notesData, setNotesData] = useState([]);
    const [currentSelection, setCurrentSelection] = useState("all-notes");

    useEffect(() => {
        getAndSetUserData(navigate, setUserData, userId);
    }, []);

    useEffect(() => {
        const notesDataArray = JSON.parse(localStorage.getItem("notesData"));
        if(notesDataArray && notesDataArray.length > 0) {
        setNotesData(notesDataArray);
        }
    }, [currentSelection]);
    return (
        <main className="bg-gradient min-h-[calc(100vh-50px)] sm:min-h-[calc(100vh-80px)] p-1 overflow-y-auto">
            <div className="mt-[50px] sm:mt-[20px] max-w-[360px] sm:max-w-[800px] h-[300px] mx-auto">
                {/*Buttons*/}
                <div className="flex w-full">
                    <button
                        onClick={() => setCurrentSelection("all-notes")}
                        className={`w-full h-[40px] sm:h-[50px] text-[12px] sm:text-[20px] ${currentSelection === "all-notes" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        All Notes
                    </button>
                    <button
                        onClick={() => setCurrentSelection("my-notes")}
                        className={`w-full h-[40px] sm:h-[50px] text-[12px] sm:text-[20px] ${currentSelection === "my-notes" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        My Notes
                    </button>
                    <button
                        onClick={() => setCurrentSelection("create-note")}
                        className={`w-full h-[40px] sm:h-[50px] text-[12px] sm:text-[20px] ${currentSelection === "create-note" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        Create note
                    </button>
                    <button
                        onClick={() => setCurrentSelection("search-note")}
                        className={`w-full h-[40px] sm:h-[50px] text-[12px] sm:text-[20px] ${currentSelection === "search-note" ? "bg-gradient text-white" : "text-black bg-white border-2"} `}
                    >
                        Search note
                    </button>
                </div>

                {/*Content*/}
                <div className="w-full mt-[25px] relative">
                    {currentSelection === "all-notes" &&
                        <NotesList
                            notesData={notesData}
                            setNotesData={setNotesData}
                            loggedInUserId={userId}
                        />
                    }

                    {currentSelection === "my-notes" &&
                        <NotesList
                            notesData={notesData}
                            setNotesData={setNotesData}
                            loggedInUserId={userId}
                            showUserOnlyNotes={true}
                        />
                    }

                    {currentSelection === "create-note" && <CreateNote userData={userData}/>}

                    {currentSelection === "search-note" &&
                        <Search notesData={notesData}
                                setNotesData={setNotesData}
                                loggedInUserId={userId}
                        />
                    }
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
