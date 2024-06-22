import notesStore from "../stores/notesStore";
import { Note } from './Note';

export function Notes() {
    const store = notesStore(); //nos da acceso al notesStore, las funciones, el estado global y los demas estados
    return (
        <div>
          <h2>Notes:</h2>
          {store.notes &&
            store.notes.map((note) => {
              return <Note note={note} key={note._id} />;
            })}
        </div>
      );
};
