import React from 'react'
import { MdLibraryAdd } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";




function Sidebar(props) {

  const noteElements = props.notes.map( (note,index) => {
    return   <button className={`notes-btn ${ note.id === props.findCurrentNote.id ? "selected" : "" }`} 
    key={note.id} 
    onClick={ () => props.setCurrentNoteId(note.id) }>  Note { index + 1}  
    <TiDelete size={35} className='delete-icon' onClick={props.deleteNote} /> </button>
  })
  return (
    <div className='sidebar-container'>
      <div className='mynotes'>
      <h2> My Notes</h2>   <button className='sidebar-add-btn' onClick={props.createNote}> <HiPlus /> </button>
      </div>
     {noteElements}
    </div>
  )
}

export default Sidebar