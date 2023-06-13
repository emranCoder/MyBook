import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import { useState } from 'react';


export default function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;

    const[note, setNote] = useState ({title:"", description: "", tag: ""});

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description: "", tag: ""});
        props.showAlert("Note Added Successfully", "success");
    }
    const handleOnchange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }



    return (
        <div className="container my-3">
            <h2>Add A Note</h2>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">Tittle*</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Tittle" onChange={handleOnchange} value={note.title} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description*</label>
                    <input type="text" className="form-control" id="description" name="description" placeholder="Description.." onChange={handleOnchange}  value={note.description}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Description*</label>
                    <input type="text" className="form-control" id="tag" name="tag" placeholder="Tag.." onChange={handleOnchange}  value={note.tag}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
