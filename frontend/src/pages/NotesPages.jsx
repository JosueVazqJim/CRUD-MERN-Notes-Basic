import { Notes } from "../components/Notes";
import { UpdateForm } from "../components/UpdateForm";
import { CreateForm } from "../components/CreateForm";
import notesStore from "../stores/notesStore";
import {  useEffect } from "react";

export function NotesPages() {
    const store = notesStore(); //nos da acceso al notesStore y el estado global
      // Use effect
    useEffect(() => { //actualiza el fetch para recargar los Notes, este useEffect hace que la funcion se ejecute cada que se inicia
        store.fetchNotes(); //se ejecuta una vez cada que recarga y solo ahi, por el []
        //con store accedemos a la funcion fetchNotes o  a los estados
    }, []);

    return(
        <div>
            <Notes></Notes>

            <UpdateForm></UpdateForm>

            <CreateForm></CreateForm>
        </div>
    );
};