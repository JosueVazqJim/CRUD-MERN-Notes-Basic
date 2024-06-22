import { useEffect } from "react";
import authStore from "../stores/authStore";

export function LogoutPage() {
    const store = authStore();//estado global y sub estados
    useEffect(() =>{
        store.logout();
    }, [])
    return(
        <div>
            <h1>salida</h1>
        </div>
    );
}