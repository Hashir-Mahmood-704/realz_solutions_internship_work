import {FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useState} from "react";
import UpdateNotePopup from "./UpdateNotePopup.jsx";

function SingleNote(props) {
    const {note, loggedInUserId, handleDelete, handleUpdate} = props;
    const [openPopup, setOpenPopup] = useState(false);

    return (
        <div
            key={note.noteId}
            className="bg-white text-black w-[320px] sm:w-[550px] rounded-[5px] py-[15px] px-[20px]"
        >
            <div className="flex items-center gap-[10px]">
                <h3 className="text-[14px] sm:text-[18px]">Title:</h3>
                <h2 className="text-[20px] sm:text-[24px] font-semibold">{note.noteTitle}</h2>
            </div>
            <div className="flex items-start gap-[10px]">
                <h3 className="text-[14px] sm:text-[18px]">Text:</h3>
                <p className="text-[16px] sm:text-[20px] font-semibold">{note.noteText}</p>
            </div>

            <div className="mt-[10px] text-[14px]">
                <p>
                    Created by: <span className="font-semibold">{note.username}</span>
                </p>
                <div className="flex justify-between">
                    <p>
                        Created on: <span>{note.dateCreated}</span>
                    </p>
                    {note.userId === loggedInUserId && (
                        <div className="flex gap-[10px] items-center">
                            <button onClick={() => setOpenPopup(true)}>
                                <FaEdit size={20}/>
                            </button>
                            <button onClick={() => handleDelete(note.noteId)}>
                                <MdDelete size={22}/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {openPopup && (
                <UpdateNotePopup
                    note={note}
                    setOpenPopup={setOpenPopup}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default SingleNote;
