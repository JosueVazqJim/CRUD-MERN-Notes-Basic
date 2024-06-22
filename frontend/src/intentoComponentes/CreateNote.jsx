import React from "react";
import { useState } from "react";
import axios from 'axios';

export function CreateNote ({ onNoteAdded }){ //espero una prop que es una funcion
    const [createForm, setCreateForm] = useState({
        title: '',
        body: ''
    }); //como estado por defecto se define un objeto vacio con estos atributos

    const updateCreateForm = (e) => { //uso del formulario con react, actualizarlo
        const { name, value } = e.target; //obtenemos el name y el value del elemento del form de cada uno
        setCreateForm({ //actualizamos el estado del form
            ...createForm, //duplicamos el estado actual para actualizar luego
            [name]: value, //aqui se le indica en que atributo del objeto y su valor, como puede ser title: titulo1
        });
    };

    const createNote = async(e) => { //
        e.preventDefault();//hacemos que el formulario no recargue la pagina

        //crear note
        const res = await axios.post("http://localhost:3000/notes", createForm); //se le envia que haga un post del estado createForm 
        //el cual tiene un objeto con la estructura del modelo, parecida
        
        //limpiar formulario
        setCreateForm({ title: '', body: ''});
        
        onNoteAdded(); // Llamamos a la función para actualizar las notas. Le digo que acabo de añadir algo, debes actualizarte
        console.log(res);
    };
    
    
        //cuando se envia el formulario se ejecuta la peticion de crear un note
    return ( 
        <div>
            <h2>Create note</h2>
            <form onSubmit={createNote}>
              <input onChange={updateCreateForm} name="title" value={createForm.title}></input>
              <textarea onChange={updateCreateForm}  name="body" value={createForm.body}></textarea>
              <button type="submir">Crear Note</button>
            </form>
        </div>
    );
};