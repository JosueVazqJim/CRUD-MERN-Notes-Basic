import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { DeleteNote } from "./DeleteNote";

export function FetchNotes ({ updateFetch, onEdit }){ //espero una prop para ver si actualizo mi estado, y otra que es una funcion para enviarle un Note
    const [notes, setNotes] = useState(null); //estado para las notes

    useEffect(() => {
        fetchNotes(); //ejecuto
    }, [updateFetch]); //me actualizo cuando updateFetch me lo indica, cuando es true o cuando se recarga la pagina

    const fetchNotes = async() => { //funcion para traer las notes
        //fetch notes
        const res = await axios.get('http://localhost:3000/notes'); //solicitud de las notas al server
        //definir el estado
        setNotes(res.data.notes)
        console.log(res);
    };

    const handleDelete = () => { //funcion que se le pasa al boton Delete en caso de presionarlo y asi actualizar el fetch
        // Actualizar el fetch después de borrar una nota
        /*No hay que pasarle el estado de App.jsx pues al presionar el boton de Delete le indicamos que ejecute esta funcion*/
        fetchNotes();
    };

    /*El boton de Update activa la funcion onEdit pasada como prop y se le pasa el Note para que App.jsx trabaje con el */
    return (
        <div>
            <h2>
                Notes:
                    {notes && notes.map(note => { //primero verifica si notes no es null
                    //podriamos hacer un componente para darle estilo a cada nota
                        const { _id, title } = note
                        return <div key={_id}>
                            <p>{title}</p>
                            <DeleteNote onNoteDel={handleDelete} idNote={_id}></DeleteNote>
                            <button onClick={() => onEdit(note)}>Update</button>
                        </div>
                    })}
            </h2>
        </div>
    );
};