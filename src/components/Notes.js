import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes(props) {

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Succefully!", "success");
  }
  const handleOnchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
    props.showAlert("Updated Succefully!", "success");
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h2>Add A Note</h2>
              <form className='my-3'>
                <div className="form-group my-3">
                  <label htmlFor="etitle">Tittle*</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter Tittle" onChange={handleOnchange} value={note.etitle} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="edescription">Description*</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Description.." onChange={handleOnchange} value={note.edescription} />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="etag">Description*</label>
                  <input type="text" className="form-control" id="etag" name="etag" placeholder="Tag.." onChange={handleOnchange} value={note.etag} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2" >
          {notes.length === 0 && 'No Notes To Display.'}
        </div>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
        })}

      </div>
    </>
  )
}
