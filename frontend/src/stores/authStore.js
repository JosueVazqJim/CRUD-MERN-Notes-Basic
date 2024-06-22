
//para manejar los estados, se suele usar las props, pero se vuelve engorros, ne cambio,
//se suele usar un global state como el de react, pero aqui se usara zustand
//aqui se ponen todos los estados y funciones
//sera el responsable de asociar estados con las funciones
//tenemos acceso a todos los estados
import { create } from 'zustand'
import axios from 'axios';

const authStore = create((set) => ({ 
//este almacenara los estados para la parte de autenticacion
    loginForm: {
        email: "",
        password: ""
    },

    //state àra ver si el usuario esta logueado o no
    loggedIn: null,

    signupForm: {
        email: "",
        password: ""
    },

    updateLoginFormField: (e) => {
        //funcion para setear los valores de un loginForm en el formulario de creacion
    //lo que hace es que dependiendo del elemento del formulario, obtiene su nombre y su valor
    //como un input con name: title y con contenido:Note1. almacena lo que se teclea
    //se activa cada vez que tecleamos algo en alguna entrada de formulario, se tiene que poner en las entradas, no en el form 
        const { name, value } = e.target;

        set((state) => {
            return {
                loginForm: {
                    ...state.loginForm,  //obtenemos el estado actual y se sobrescribe con lo que se va tecleando, esta es la forma de zustand
                    [name]: value,//de esta forma se actualiza solo cierto atributo del estado
                },
            };
        });
    },

    updateSignupFormField: (e) => {
        //funcion para setear los valores de un loginForm en el formulario de creacion
    //lo que hace es que dependiendo del elemento del formulario, obtiene su nombre y su valor
    //como un input con name: title y con contenido:Note1. almacena lo que se teclea
    //se activa cada vez que tecleamos algo en alguna entrada de formulario, se tiene que poner en las entradas, no en el form 
        const { name, value } = e.target;

        set((state) => {
            return {
                signupForm: {
                    ...state.signupForm,  //obtenemos el estado actual y se sobrescribe con lo que se va tecleando, esta es la forma de zustand
                    [name]: value,//de esta forma se actualiza solo cierto atributo del estado
                },
            };
        });
    },

    login: async () => { //funcion que envia solicitud de post
        const { loginForm } = authStore.getState(); //sacamos los estados actuales

        try {
            await axios.post("/login", loginForm); 
            set({loggedIn: true}); //estado que cambia a que si esta logueado
            set({
                loginForm: {
                    email: "",
                    password: "",
                }
            });
        } catch(err){
            set({loggedIn: false});
            alert('Usuario no encontrado'); //en caso de que ocurra un error se muestra la alerta
        }
       
    },

    checkAuth: async () => {
        try {
            await axios.get("/check-auth"); //verifica si el token de quien hace la slicitud tiene un token con si id dentro,
            set({ loggedIn: true});//si es asi, esta logueado o debe de estar logueado
        } catch(err){
            set({ loggedIn: false});
        }
    },

    signup: async () => { //funcion que envia solicitud de post
        const { signupForm } = authStore.getState(); //sacamos los estados actuales

        const res = await axios.post("/signup", signupForm); 
        console.log(res);

        //actualizamos estados
        set({
            signupForm: {
                email: "",
                password: "",
            }
        });
       
    },

    logout: async () => { //funcion que envia solicitud de post
        await axios.get("/logout"); 
        set({ loggedIn: false});
    },
}));

export default authStore