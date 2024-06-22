import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react'

export function UpdateNote ({ note, onNoteUp }){ //recibe un Note como prop

    const [updateForm, setUpdateForm] = useState({//estado inicial para llenarel formulario con los datos de Note
        _id: note._id,
        title: note.title,
        body: note.body
    });

    const [showForm, setShowForm] = useState(false);

    useEffect(() => { //para actualizar cada vez que se hace clic en otro Update de otro Note
        setUpdateForm({
            _id: note._id,
            title: note.title,
            body: note.body
        });
        setShowForm(true); //al hacer clic sobre algun Update se muestra formulario
    }, [note]);

    const handleUpdateFieldChange = (e) => { //uso del formulario con react, actualizarlo con los datos selecionados
        const { value, name } = e.target; //obtenemos el name y el value del elemento del form de cada uno
        setUpdateForm({ //actualizamos el estado del form
            ...updateForm, //duplicamos el estado actual para actualizar luego
            [name]: value, //aqui se le indica en que atributo del objeto y su valor, como puede ser title: titulo1
        });  
    };

    const updateNote = async (e) => {
        e.preventDefault();
        const res = await axios.put(`http://localhost:3000/notes/${note._id}`, updateForm);
        console.log(res);
        setUpdateForm({ _id: null, title: '', body: ''});
        onNoteUp();
        setShowForm(false); //una vez que se actualizo el Note, se oculta el formulario y se deja en blanco
    };

    const cancelUpdate = () => {
        setUpdateForm({ _id: '', title: '', body: ''});
        setShowForm(false); //si se presiona cancelar, se vacia el formulario y se oculta
      };

    return ( 
        <div>
            {showForm && (
                <div>
                <h2>Update Note</h2>
                <form onSubmit={updateNote}>
                    <input value={updateForm.title} name="title" onChange={handleUpdateFieldChange}></input>
                    <textarea value={updateForm.body} name="body" onChange={handleUpdateFieldChange}></textarea>
                    <button type="submit">Update note</button>
                    <button type="button" onClick={cancelUpdate}>Cancel</button>
                </form>
                </div>
            )}
        </div>
    );
};