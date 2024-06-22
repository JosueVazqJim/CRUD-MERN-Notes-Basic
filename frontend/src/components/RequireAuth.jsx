import { useEffect } from "react";
import authStore from "../stores/authStore";
import { Navigate } from 'react-router-dom';

export function RequireAuth(props) {
    //el prop es una prop especial que obtiene lo que sea que tenga esa etiueta
    /*en este caso, se usa como contenedor de NotesPages que es la principal, y primero se evalua este componente
    que si el estado es false muestra este div, pero si esta logueado entonces renderiza lo que tiene encerrado NotesPages*/

    
    const store = authStore();

    useEffect(() =>{
        if (store.loggedIn === null){ //se ejecuta al recargar la pagina pues este estado lo resetea y verifica si lo esta
            store.checkAuth(); //verifica la cookie
        }
    }, [])

    if (store.loggedIn === null) {
        return <div>loading</div>
    }

    if (store.loggedIn === false) { //si no esta logueado se envia a la pagina de login
        return <Navigate to="/login"></Navigate>
    }
    return (
        <div>
            {props.children} 
        </div>
    );
};

/*ejemplo:
<RequireAuth>hola</RequireAuth>
se le pasaria como prop el hola
*/