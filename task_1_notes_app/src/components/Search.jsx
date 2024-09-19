import NotesList from "./NotesList.jsx"
import {useState, useEffect} from "react"

function Search(props) {
    const [searchText, setSearchText] = useState("")
    const [searchedNotes, setSearchedNotes] = useState([])
    const {notesData, loggedInUserId, setNotesData} = props
    useEffect(() => {
        if (!searchText) setSearchedNotes([])
        else {
            const searchedNotesArray = notesData.filter(note => note.noteTitle.toLowerCase().includes(searchText.toLowerCase())
                || note.noteText.toLowerCase().includes(searchText.toLowerCase()))
            setSearchedNotes(searchedNotesArray)
        }
    }, [searchText, notesData]);

    return <div className="w-full">
        <input
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className="mt-[10px] w-full outline-0 px-[20px] py-[10px] text-[16px] sm:text-[18px] bg-white text-black rounded-[5px]"
            placeholder="Search note"
        />

        <div className="mt-[40px]">
            {!searchText &&
                <p className="text-white text-center font-semibold text-[18px] sm:text-[24px] mt-[80px]">Search notes by Title or Text</p>
            }
            {searchText && searchedNotes.length < 1 &&
                <p className="text-white text-center font-semibold text-[18px] sm:text-[24px] mt-[80px]">No such notes found!</p>
            }
            {searchText && searchedNotes.length > 0 &&
                <NotesList
                    notesData={notesData}
                    setNotesData={setNotesData}
                    loggedInUserId={loggedInUserId}
                    showUserOnlyNotes={false}
                    searchedNotes={searchedNotes}
                />}
        </div>
    </div>
}

export default Search