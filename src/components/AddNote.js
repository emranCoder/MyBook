import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const handleClick = ()=>{

    }
    const handleOnchange = ()=>{

    }



    return (
        <div className="container my-3">
            <h2>Add A Note</h2>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">Email address</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleOnchange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="desc">Password</label>
                    <input type="text" className="form-control" id="desc" name="desc" placeholder="Password" onChange={handleOnchange} />
                </div>
                <div className="form-check my-3">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleOnchange} />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}
