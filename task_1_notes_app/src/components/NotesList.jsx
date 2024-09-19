import SingleNote from "./SingleNote";

function NotesList(props) {
    const {notesData, loggedInUserId, setNotesData, showUserOnlyNotes, searchedNotes} = props;

    function handleDelete(noteId) {
        const updatedNotesArray = notesData.filter(
            (note) => note.noteId !== noteId,
        );
        localStorage.setItem("notesData", JSON.stringify(updatedNotesArray));
        setNotesData(updatedNotesArray);
    }

    function handleUpdate(noteId, updatedNoteTitle, updatedNoteText) {
        const targetNote = notesData.find((note) => note.noteId === noteId);
        const filteredNotesArray = notesData.filter(
            (item) => item.noteId !== noteId,
        );
        targetNote.noteText = updatedNoteText;
        targetNote.noteTitle = updatedNoteTitle;
        const finalNotesArray = [...filteredNotesArray, targetNote];
        localStorage.setItem("notesData", JSON.stringify(finalNotesArray));
        setNotesData(finalNotesArray);
    }

    let notesToShow = []
    if (searchedNotes && searchedNotes.length > 0) {
        notesToShow = searchedNotes
    } else if(showUserOnlyNotes) {
        notesToShow = notesData.filter(note => note.userId === loggedInUserId)
    } else {
        notesToShow = notesData
    }
    if (!notesToShow || notesToShow.length < 1)
        return (
            <p className="font-semibold text-white text-[20px] text-center mt-[100px]">
                OOPS! Looks like here are no notes created
            </p>
        );
    return (
        <div className="hide-scrollbar flex flex-col items-center gap-[20px] h-[500px] overflow-y-auto">
            {[...notesToShow].reverse().map((note) => (
                <SingleNote
                    key={note.noteId}
                    note={note}
                    loggedInUserId={loggedInUserId}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            ))}
        </div>
    );
}

export default NotesList;
