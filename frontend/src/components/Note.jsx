import notesStore from "../stores/notesStore";

export function Note({ note }) {
    const store = notesStore(); //nos da acceso al notesStore, las funciones, el estado global y los demas estados
    //aqui con store solo accedemos a las funciones
    return (
        <div key={note._id}>
            <h3>{note.title}</h3>
            <button onClick={() => store.deleteNote(note._id)}> 
                Delete note
            </button>
            <button onClick={() => store.toggleUpdate(note)}>
                Update note
            </button>
        </div>
    );
};
