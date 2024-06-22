import notesStore from "../stores/notesStore";

export function UpdateForm() {
    const store = notesStore(); //nos da acceso al notesStore y el estado global
    /*se ejecuta a funcion updateNote dew abajo cada vez que se envia el formulario
        y se muestra este formulario si se dio clic en update
      */
    if (!store.updateForm._id) return <></>; /*se ejecuta a funcion updateNote dew abajo cada vez que se envia el formulario
    y se muestra este formulario si se dio clic en update
  */
    return (
        <div>
            <h2>Update note</h2>
            <form onSubmit={store.updateNote}>
                <input
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.title}
                name="title"
                />
                <textarea
                onChange={store.handleUpdateFieldChange}
                value={store.updateForm.body}
                name="body"
                />
                <button type="submit">Update note</button>
            </form>
        </div>
    );
};
