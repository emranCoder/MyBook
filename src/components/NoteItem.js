import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


export default function NoteItem(props) {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body ">
                    <div className="d-flex aligh-items-center">
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Succefully!", "success");  } }></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note); }}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}
