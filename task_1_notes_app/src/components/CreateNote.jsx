import {v4 as uuid} from "uuid";
import {useState} from "react";

function CreateNote(props) {
    const {userData} = props;
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleCreateNote(e) {
        e.preventDefault();
        if (!noteTitle || !noteText) {
            setError("All fields are required!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const newNote = {
            noteId: uuid(),
            userId: userData.id,
            username: userData.username,
            noteTitle: noteTitle,
            noteText: noteText,
            dateCreated: new Date().toLocaleDateString(),
        };
        const localStorageNotesDataExists = JSON.parse(
            localStorage.getItem("notesData"),
        );
        if (!localStorageNotesDataExists) {
            localStorage.setItem("notesData", JSON.stringify([]));
        }
        const localStorageNotesDataArray = JSON.parse(
            localStorage.getItem("notesData"),
        );
        const noteExists = localStorageNotesDataArray.find(
            (item) => item.noteTitle === noteTitle,
        );
        if (noteExists) {
            setError("This note title is already in use, try another one!");
            setTimeout(() => setError(""), 3000);
            return;
        }
        const updatedNotesDataArray = [...localStorageNotesDataArray, newNote];
        localStorage.setItem("notesData", JSON.stringify(updatedNotesDataArray));
        setSuccess("Note created successfully!");
        setTimeout(() => setSuccess(""), 3000);
        setNoteTitle("");
        setNoteText("");
    }

    return (
        <div className="bg-white w-full p-[20px] rounded-[5px] mt-[50px]">
            <h1 className="text-center font-semibold text-[20px] sm:text-[24px] mb-[10px]">
                Create New Note
            </h1>
            <form className="flex flex-col items-center gap-[18px] sm:gap-[25px]">
                <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full outline-0 px-[20px] py-[10px] text-[16px] sm:text-[18px] bg-gradient text-white rounded-[5px]"
                    placeholder="Enter note title"
                />
                <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full outline-0 px-[20px] py-[10px] text-[16px] sm:text-[18px] bg-gradient text-white rounded-[5px] h-[150px]"
                    placeholder="Enter note text"
                />

                {/*Error*/}
                <div className="w-full h-[1px] mt-[-10px] mb-[10px]">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                </div>
                <button
                    onClick={(e) => handleCreateNote(e)}
                    type="submit"
                    className="w-[130px] sm:w-[150px] h-[35px] sm:h-[50px] text-[16px] sm:text-[20px] bg-gradient text-white rounded-[5px]"
                >
                    Create Note
                </button>
            </form>
        </div>
    );
}

export default CreateNote;
