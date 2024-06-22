//para manejar los estados, se suele usar las props, pero se vuelve engorros, ne cambio,
//se suele usar un global state como el de react, pero aqui se usara zustand
//aqui se ponen todos los estados y funciones
//sera el responsable de asociar estados con las funciones
//tenemos acceso a todos los estados
import { create } from 'zustand'
import axios from 'axios';

const notesStore = create((set) => ({ //creamos el estado global llamado noteStorey set que funciona para actualizar los demas estados como notes
    //estados iniciales
    notes: null, //este es para almacenar Notes

    createForm: { //permite que el formulario de creacion se vaya actualizando conforme lo que se escribe dentro
        title: '',
        body: ''
    },

    updateForm: { //se debe de llenar con los datos de la Note seleccionada
        _id: null,
        title: '',
        body: ''
    },
    //el set es un estado que se puede usar donde sea, gracias a zustand
    //el notes es como el swithc que actualiza el set

    fetchNotes: async () => { //funcion que hace la solicitud de las Notes
        // Fetch the notes, traemos las Notes
        const res = await axios.get("/notes");

        set({ //actualizamos un estado, solo se hace en si una vez al recargar la pagina
            notes: res.data.notes //el estado se le agregan las Notes
        });
    },

    updateCreateFormField: (e) => {
        //funcion para setear los valores de un createForm
    //lo que hace es que dependiendo del elemento del formulario, obtiene su nombre y su valor
    //como un input con name: title y con contenido:Note1. almacena lo que se teclea
    //se activa cada vez que tecleamos algo en alguna entrada de formulario, se tiene que poner en las entradas, no en el form 
        const { name, value } = e.target;

        set((state) => {
            return {
                createForm: { //esta es la forma de trabajar de forma asincrona
                    ...state.createForm,  //obtenemos el estado actual y se sobrescribe con lo que se va tecleando, esta es la forma de zustand
                    [name]: value,//de esta forma se actualiza solo cierto atributo del estado
                },
            };
        });
    },
    
    createNote: async (e) => { //funcion que envia solicitud de post
        e.preventDefault(); //prevenimos que el formulario recargue la pagina
    
        const { createForm, notes } = notesStore.getState(); //sacamos los estados actuales

        const res = await axios.post("/notes", createForm); //solicitamos un post enviando el estado, que tiene un Note
    
        set({ //sactualizamos el estado Notes con la respuesta del post que son tambien Notes
            //. no se vuelve a llamar a la bd solicitando los
            //notes, pues los obtuvo como respuesta del post y el mapeo en de Note se actualiza
            notes: [...notes, res.data.note],
            createForm: { //limpiamos el estado, y tambien se tiene que limpiar el formulario
                title: "",
                body: "",
            }
        });
    },

    deleteNote: async (_id) => { //delete que espera un id para saber que borrar
        // Delete the note
        await axios.delete(`/notes/${_id}`);
    
        const { notes } = notesStore.getState();

        // Update state
        //se hace un filtrado de los Notes que hay en el estado y se excluye el que se elimino, no se accede otra vez a la bd
        const newNotes = notes.filter((note) => {
          return note._id !== _id;
        });

        set({ notes: newNotes });//se reasigna con los Notes anteriores menos el que se elimino
    },

    handleUpdateFieldChange: (e) => { //funciona para ir actualizando el elemento conforme se tipea informacion
        const { name, value } = e.target;

        set((state) => {
            return {
                updateForm: {
                    ...state.updateForm,  //obtenemos el estado actual y se sobrescribe con lo que se va tecleando
                    [name]: value,
                },
            };
        });
    },

    toggleUpdate: (note) => { //funcion que llena el estado con el Note del boton que se cliqueo
        // Set state on update form
        set({
            updateForm: {
                title: note.title, body: note.body, _id: note._id 
            }
        })
    },
    
    updateNote: async (e) => { //funcion de solicitud de actualizacion si se envia el formulario
        e.preventDefault();
        
        const { updateForm: {title, body, _id },  notes}= notesStore.getState();//del estado se extrae  title y body y notes
    
        // Send the update request
        const res = await axios.put(
          `/notes/${_id}`, 
          { title, body } //se le indica que debe reemplazar
        );
    
        // Update state
        //se filtra par aencontrar el Note actualizado en la lista de Notes del estado, y se le actualiza con la informacion obtenida
        //como respuesta, y se actualizan los Notes del estado
        const newNotes = [...notes]; //duplica el estado
        const noteIndex = notes.findIndex((note) => {
          return note._id === _id;
        });
        newNotes[noteIndex] = res.data.note;
    
        //actualizamos estados
        set({
            notes: newNotes,
            // Clear update form state
            updateForm: {
                _id: null,
                title: "",
                body: "",
            }
        });
    },
}));

export default notesStore