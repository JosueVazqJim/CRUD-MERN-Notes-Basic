import authStore from "../stores/authStore";
import { useNavigate } from 'react-router-dom';
export function LoginForm() {
    const store = authStore();//estado global y sub estados
    const navigate = useNavigate();

    const handleLogin = async (e) => {
                //prevenimos que el formulario recargue la pagina
        e.preventDefault();
        await store.login();
        //navegacion
        navigate('/');
    }

    return(
        <form onSubmit={handleLogin}>
            <input value={store.loginForm.email} type="email" name="email" onChange={store.updateLoginFormField}></input>
            <input value={store.loginForm.password} type="password" name="password" onChange={store.updateLoginFormField}></input>
            <button type="submit">Login</button>
        </form>
    );
}