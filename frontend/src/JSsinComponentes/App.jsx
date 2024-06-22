//ESte es el js puro, todas las funciones se hicieron aca, falta modularlo

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // State
  const [notes, setNotes] = useState(null); //estadp qie almacena los Notes
  const [createForm, setCreateForm] = useState({ //estado para el formulario, almacena el cuerpo del Note
    //al formulario se le pasa directamente el estado y su atributo correspondiente
    //si es un input y debe de ponerse el title, se pone value={createForm.title}, al inicio es vacio pero conforme se teclea, se actualiza lo del campo
    title: "",
    body: "",
  });

  const [updateForm, setUpdateForm] = useState({ //estado para actualizar fomrulario, almacena el cuerpo de un Note con su id
    _id: null,
    title: "",
    body: "",
  });

  // Use effect
  useEffect(() => { //actualiza el fetch para recargar los Notes, este useEffect hace que la funcion se ejecute cada que se inicia
    fetchNotes(); //se ejecuta una vez cada que recarga y solo ahi, por el []
  }, []);

  const fetchNotes = async () => { //funcion que hace la solicitud de las Notes
    // Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");

    // Set to state
    setNotes(res.data.notes); //el estado se le agregan las Notes
  };

  const updateCreateFormField = (e) => { //funcion para setear los valores de un Note en el formulario de actualizacion o de creacion
    //lo que hace es que dependiendo del elemento del formulario, obtiene su nombre y su valor
    //como un input con name: title y con contenido:Note1. almacena lo que se teclea
    //se activa cada vez que tecleamos algo
    const { name, value } = e.target;

    setCreateForm({
      ...createForm, //obtenemos el estado actual y se sobrescribe con lo que se va tecleando
      [name]: value,
    });
  };

  const createNote = async (e) => {
    e.preventDefault(); //prevenimos que el formulario recargue la pagina

    const res = await axios.post("http://localhost:3000/notes", createForm); //solicitamos un post enviando el estado, que tiene un Note

    setNotes([...notes, res.data.note]); //sactualizamos el estado Notes con la respuesta del post que son tambien Notes
    //. no se vuelve a llamar a la bd solicitando los
    //notes, pues los obtuvo como respuesta del post y el mapeo en de Note se actualiza

    setCreateForm({ //limpiamos el estado, y tambien se tiene que limpiar el formulario
      title: "",
      body: "",
    });
  };

  const deleteNote = async (_id) => { //delete que espera un id para saber que borrar
    // Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);

    // Update state
    //se hace un filtrado de los Notes que hay en el estado y se excluye el que se elimino, no se accede otra vez a la bd
    const newNotes = [...notes].filter((note) => {
      return note._id !== _id;
    });

    setNotes(newNotes); //se reasigna con los Notes anteriores menos el que se elimino
  };

  const handleUpdateFieldChange = (e) => { //funciona para ir actualizando el elemento conforme se tipea informacion
    const { value, name } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const toggleUpdate = (note) => { //funcion que llena el estado con el Note del boton que se cliqueo
    // Set state on update form
    setUpdateForm({ title: note.title, body: note.body, _id: note._id });
  };

  const updateNote = async (e) => { //funcion de solicitud de actualizacion si se envia el formulario
    e.preventDefault();

    const { title, body } = updateForm; //del estado se extrae  title y body

    // Send the update request
    const res = await axios.put(
      `http://localhost:3000/notes/${updateForm._id}`, //del estado se extrae el id
      { title, body } //se le indica que debe reemplazar
    );

    // Update state
    //se filtra par aencontrar el Note actualizado en la lista de Notes del estado, y se le actualiza con la informacion obtenida
    //como respuesta, y se actualizan los Notes del estado
    const newNotes = [...notes]; //duplica el estado
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    // Clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };

  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes && //como es el mismo archivo, mandamos a llamar al estado notes que tiene los Notes que saco el Fettch. primero checa si existe
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
                <button onClick={() => deleteNote(note._id)}>
                  Delete note
                </button>
                <button onClick={() => toggleUpdate(note)}>Update note</button>
              </div>
            );
          })}
      </div>

      {updateForm._id && ( /*se ejecuta a funcion updateNote dew abajo cada vez que se envia el formulario
        y se muestra este formulario si se dio clic en update
      */
        <div>
          <h2>Update note</h2>
          <form onSubmit={updateNote}>
            <input
              onChange={handleUpdateFieldChange}
              value={updateForm.title}
              name="title"
            />
            <textarea
              onChange={handleUpdateFieldChange}
              value={updateForm.body}
              name="body"
            />
            <button type="submit">Update note</button>
          </form>
        </div>
      )}

      {!updateForm._id && (/*se ejecuta a funcion createNote dew abajo cada vez que se envia el formulario
        Se muestra el formulario si no se presiono Update
      */
        <div>
          <h2>Create note</h2>
          <form onSubmit={createNote}> 
            <input
              onChange={updateCreateFormField} 
              value={createForm.title}
              name="title"
            />
            <textarea
              onChange={updateCreateFormField}
              value={createForm.body}
              name="body"
            />
            <button type="submit">Create note</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;