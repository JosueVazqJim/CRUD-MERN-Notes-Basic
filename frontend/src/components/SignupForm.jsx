import authStore from "../stores/authStore";
import { useNavigate } from 'react-router-dom';

export function SignupForm() {
    const store = authStore();//estado global y sub estados
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        //prevenimos que el formulario recargue la pagina
        e.preventDefault();
        await store.signup();
            //navegacion
            navigate('/login');
    }


    return(
        <form onSubmit={handleSignup}>
            <input value={store.signupForm.email} type="email" name="email" onChange={store.updateSignupFormField}></input>
            <input value={store.signupForm.password} type="password" name="password" onChange={store.updateSignupFormField}></input>
            <button type="submit">Signup</button>
        </form>
    );
}