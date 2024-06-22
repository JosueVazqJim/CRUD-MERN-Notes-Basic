/**Este fue un intento de hacer los componentes casi desde 0, funcionan, hacen solicitudes ysirven, pero no se ve tan ideal */

import { useState } from "react";
import { FetchNotes } from "./FetchNotes";
import { CreateNote } from "./CreateNote";
import { UpdateNote } from "./UpdateNote";

export function App() {
  const [updateFetch, setUpdateFetch] = useState(false); //valor inicial para indicar si se debe actualizar FetchNotes
  const [selectedNote, setSelectedNote] = useState(null); //estado para ver si hay algun Note seleccioando, almacena Notes


  const handleUpdateFetch = () => { //cambia el estado de false a true y viceversa
    setUpdateFetch(!updateFetch); /*cambia el estado teniendo como referencia el estado anterior*/
  };

  const handleEditNote = (note) => { //funcion que recibe un Note y cambia el estado por ese Note
    setSelectedNote(note);
  };

  //le pasamos dos props o atributos a FetchNotes que es el estado en forma de bandera indicando si se debe actualizar o no, true o false
  //y el otro es una funcion que se manda a llamar en FetchNotes pero se ejecuta aca
  /*onNoteAdded espera una funcion, y es la función que se llama cuando se añade una nueva nota y que cambia el estado updateFetch para que
   FetchNotes actualice la lista de notas.*/
   /*Si hay algo en selectedNote, quiere decir que se lecciono un Note para editar y se muestra el formulario y se le pasan los datos 
   del Note guardados en el estado para llenar el formulario */
  return (
    <div className="App">
      <FetchNotes updateFetch={updateFetch} onEdit={handleEditNote} ></FetchNotes> 
      <CreateNote onNoteAdded={handleUpdateFetch}></CreateNote>
      {selectedNote && <UpdateNote note={selectedNote} onNoteUp={handleUpdateFetch}/>}
    </div>
  )
}