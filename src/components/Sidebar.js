import React from "react";
import { MdLibraryAdd } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { RiDeleteBin7Line } from "react-icons/ri";


function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => {


    return (
      <button
        className={`notes-btn ${
          note.id === props.findCurrentNote.id ? "selected" : ""
        }`}
        key={note.id}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        {" "}
        { note.body.split('\n')[0] }
        <RiDeleteBin7Line
          size={20}
          className="delete-icon"
          onClick={(event) => props.deleteNote( event, note.id)}
        />{" "}
      </button>
    );
  });
  return (
    <div className="sidebar-container">
      <div className="mynotes">
        <h2> My Notes</h2>{" "}
        <button className="sidebar-add-btn" onClick={props.createNote}>
          {" "}
          <HiPlus />{" "}
        </button>
      </div>
      {noteElements}
    </div>
  );
}

export default Sidebar;
