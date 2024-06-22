import React from "react";
import axios from 'axios';

export function DeleteNote ({ onNoteDel, idNote }){ //espero una prop que es una funcion para ejecutar la actualizacion del fetch y un id

    const deleteNote = async () => {
        //borrar la note
        const res = await axios.delete(`http://localhost:3000/notes/${idNote}`);
        onNoteDel();
        console.log(res); 
    };
    
    
        //cuando se envia el formulario se ejecuta la peticion de crear un note
    return ( 
        <button onClick={deleteNote}>Delete note</button>
    );
};