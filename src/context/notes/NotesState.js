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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDZjZjUxMzdlZmJjYjNjOTRmMGU0MmIifX0sImlhdCI6MTY4NTEwOTkyMn0.XgWNXz3ch_STRaSHUAjE1A6668jyYn7bJwP83QNO7kQ",
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json);

  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //TODO: API CALL
    console.log({ title, description, tag });

    //API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDZjZjUxMzdlZmJjYjNjOTRmMGU0MmIifX0sImlhdCI6MTY4NTEwOTkyMn0.XgWNXz3ch_STRaSHUAjE1A6668jyYn7bJwP83QNO7kQ",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);

    const note = {
      "_id": "6470be53e4c766741045a626c12",
      "user": "646cf521345787efbcb3c94f0e42b",
      "title": title,
      "description": description,
      "tags": tag,
      "date": "2023-05-26T14:12:35.350Z",
      "__v": 0
    };
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDZjZjUxMzdlZmJjYjNjOTRmMGU0MmIifX0sImlhdCI6MTY4NTEwOTkyMn0.XgWNXz3ch_STRaSHUAjE1A6668jyYn7bJwP83QNO7kQ",
      },
    });
    const json = response.json();
    console.log(json);


    console.log("Deleting the note with id: " + id);
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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOnsiaWQiOiI2NDZjZjUxMzdlZmJjYjNjOTRmMGU0MmIifX0sImlhdCI6MTY4NTEwOTkyMn0.XgWNXz3ch_STRaSHUAjE1A6668jyYn7bJwP83QNO7kQ",
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit the client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        return setNotes(newNotes);
      }
      
    }
    

  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
