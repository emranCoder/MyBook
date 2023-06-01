import React, { useState } from 'react'
import NoteContext from './NoteContext'

export default function NotesState(props) {

const notesInitial =
    [
        {
          "_id": "6470bdd778177356432a1899c6efa",
          "user": "646cf51377efbcb3c94f0e42b",
          "title": "My Title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "2023-05-26T14:10:25.551Z",
          "__v": 0
        },
        {
          "_id": "6470be537e72487c641045a626c12",
          "user": "646cf517863277efbcb3c94f0e42b",
          "title": "New Note",
          "description": "This is a self project",
          "tags": "General",
          "date": "2023-05-26T14:12:35.350Z",
          "__v": 0
        },{
          "_id": "6470bdd13725667432a1899c6efa",
          "user": "646cf513727e456fbcb3c94f0e42b",
          "title": "My Title",
          "description": "Please wake up early",
          "tags": "General",
          "date": "2023-05-26T14:10:25.551Z",
          "__v": 0
        },
        {
          "_id": "6470be53e4c766741045a626c12",
          "user": "646cf521345787efbcb3c94f0e42b",
          "title": "New Note",
          "description": "This is a self project",
          "tags": "General",
          "date": "2023-05-26T14:12:35.350Z",
          "__v": 0
        }
      ]

      const[notes,setNotes] =  useState(notesInitial)
      //Add Note
      const addNote = (title, description, tag)=>{
        //TODO: API CALL
        const note = {
          "_id": "6470be53e4c766741045a626c12",
          "user": "646cf521345787efbcb3c94f0e42b",
          "title": "New Note",
          "description": "This is a self project [ADDED]",
          "tags": "General",
          "date": "2023-05-26T14:12:35.350Z",
          "__v": 0
        };
        setNotes(notes.push(note));
      }
      //Delete Note
      const deletedNote = ()=>{
        
      }
      //Edit Note
      const editNote = ()=>{
        
      }


  return (
    <NoteContext.Provider value={{notes, addNote, deletedNote, editNote }}>
        {props.children}
    </NoteContext.Provider>
  )
}
