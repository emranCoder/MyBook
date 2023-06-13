import React, { useState } from 'react'
import NoteContext from './NoteContext'

export default function NotesState(props) {

  const host = "http://localhost:5000";


  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  //Gets All Note
  const getNotes = async () => {
    //TODO: API CALL

    //API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    setNotes(json);

  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO: API CALL

    //API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //Delete Note
  const deleteNote = async (id) => {
    //TODO: API CALL
    //API Call
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = response.json();

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }


  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();


    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit the client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      } 
    }
    return setNotes(newNotes);
    

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
