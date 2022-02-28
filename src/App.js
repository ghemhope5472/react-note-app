import Split from "react-split";
import "./App.css";
import * as Showdown from "showdown";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

function App() {
  // added lazy loading on the notes state so it will not go the localstorage every re-render, it improve performnce of the app
  const [notes, setNotes] = useState( () =>  JSON.parse(localStorage.getItem('notes')) || [] );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );




//use localStorate
useEffect( () => {
  localStorage.setItem('notes', JSON.stringify(notes))
}, [ notes ])




  //create note
  const createNote = () => {
    const newNote = {
      id: nanoid(),
      body: "Type your note.....",
    };
    setNotes((prevNotes) => [...prevNotes, newNote ]);
    setCurrentNoteId(newNote.id);
  };




  //updateNote
  function updateNote(text){
    // REVISED FEBRUARY 28, 2022 @ 12:10 
    //NEW FEATURE ( rearrange the array when a user edit a note, recent edited note will be on the top )
      //steps 
      setNotes( oldNotes =>{
            //create empty array
        const newArray = [];
            //loop over original array
        for(var i=0; i < oldNotes.length; i++){
            const oldNote = oldNotes[i]
            //if the id matches the currentnoteid
            if( oldNote.id === currentNoteId ){
                // put the updated note to the beginning of the array
                newArray.unshift({ ...oldNote, body: text })
            }else{
                //else push the oldNote(no change)
                // push the old notes to the end of the new array
                newArray.push(oldNote)
            }
        }
        //return new array
        //this will return a new array
        return newArray
      })

    //OLD CODE does not rearrange the order of notes array
    //setNotes
    //map through notes array
    //compare curentnoteid === note.id
    //update new state object
    //  setNotes( oldNotes => oldNotes.map( note => {
    //    return note.id === currentNoteId ?
    //       { ...note, body: text } : note
    //  }))
  }
      
  //findcurrentnote
  function findCurrentNote() {
    //find
    //match id
    //return note
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }


  //setcurrentnote id when sidebar btn is clicked
  //call the setCurrentId directly in the button at sidebar 

  function deleteNote(event, idToBeDeleted){
    //prevent an event in the parent element when the delete icon is clicked
    event.stopPropagation();

    // map to oldnotes and return array that the id that do not equal to idtobedeleted
    setNotes( oldNotes =>  oldNotes.filter( note => note.id != idToBeDeleted ))
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split
          className="split"
          sizes={[25, 75]}
          minSize={100}
          expandToMin={false}
          gutterSize={10}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <Sidebar
            notes={notes}
            findCurrentNote={findCurrentNote()}
            createNote={createNote}
            setCurrentNoteId={setCurrentNoteId}
            deleteNote={deleteNote}
            
          />
          <Editor updateNote={updateNote} findCurrentNote={findCurrentNote()} />
        </Split>
      ) : (
        <div className="empty-notes">
          <h1>No notes to display</h1>
          <button className="empty-btn" onClick={createNote}>
            {" "}
            Create{" "}
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
