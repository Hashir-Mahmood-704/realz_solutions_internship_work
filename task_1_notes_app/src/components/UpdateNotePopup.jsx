import {useState} from "react";
import {IoCloseCircleOutline} from "react-icons/io5";

function UpdateNotePopup(props) {
    const {note, setOpenPopup, handleUpdate} = props;
    const [updateNoteTitle, setUpdateNoteTitle] = useState(note.noteTitle);
    const [updateNoteText, setUpdateNoteText] = useState(note.noteText);
    const [error, setError] = useState("");
    return (
        <div
            onClick={() => setOpenPopup(false)}
            className="h-screen w-screen backdrop-blur-lg bg-black/50 fixed z-50 top-0 left-0 flex justify-center items-center"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[320px] sm:w-[600px] p-[20px] rounded-[5px] relative"
            >
        <span onClick={() => setOpenPopup(false)} className="absolute right-[10px] top-[10px]">
          <IoCloseCircleOutline size={25}/>
        </span>
                <h1 className="text-center font-semibold text-[20px] sm:text-[24px] mb-[10px]">
                    Update Note
                </h1>
                <form className="flex flex-col items-center gap-[25px]">
                    <input
                        type="text"
                        value={updateNoteTitle}
                        onChange={(e) => setUpdateNoteTitle(e.target.value)}
                        className="w-full outline-0 px-[20px] py-[10px] text-[16px] sm:text-[18px] bg-gradient text-white rounded-[5px]"
                        placeholder="Enter note title"
                    />
                    <textarea
                        value={updateNoteText}
                        onChange={(e) => setUpdateNoteText(e.target.value)}
                        className="w-full outline-0 px-[20px] py-[10px] text-[16px] sm:text-[18px] bg-gradient text-white rounded-[5px] h-[150px]"
                        placeholder="Enter note text"
                    />

                    {/*Error*/}
                    <div className="w-full h-[1px] mt-[-10px] mb-[10px]">
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (!updateNoteTitle || !updateNoteText) {
                                setError("All fields are required!");
                                setTimeout(() => setError(""), 3000);
                                return;
                            }
                            handleUpdate(note.noteId, updateNoteTitle, updateNoteText);
                            setOpenPopup(false);
                        }}
                        type="submit"
                        className="w-[150px] h-[40px] sm:h-[50px] text-[16px] sm:text-[20px] bg-gradient text-white rounded-[5px]"
                    >
                        Update Note
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateNotePopup;
