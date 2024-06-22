import notesStore from "../stores/notesStore";

export function CreateForm() {
    const store = notesStore(); //nos da acceso al notesStore y el estado global
    /*se ejecuta a funcion updateNote dew abajo cada vez que se envia el formulario
        y se muestra este formulario si se dio clic en update
      */
    if (store.updateForm._id) return <></>; /*se ejecuta a funcion createNote dew abajo cada vez que se envia el formulario
    Se oculta el formulario si se presiono Update
  */
    return (
        <div>
          <h2>Create note</h2>
          <form onSubmit={store.createNote}> 
            <input
              onChange={store.updateCreateFormField} 
              value={store.createForm.title}
              name="title"
            />
            <textarea
              onChange={store.updateCreateFormField}
              value={store.createForm.body}
              name="body"
            />
            <button type="submit">Create note</button>
          </form>
        </div>
    );
};
