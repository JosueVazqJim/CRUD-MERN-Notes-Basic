import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { NotesPages } from "../pages/NotesPages";
import { LoginPage } from '../pages/LoginPage';
import { RequireAuth } from './RequireAuth';
import { SignupPage } from '../pages/SignupPage';
import { LogoutPage } from '../pages/LogoutPage';

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>SignUp</Link>
        </li>
        <li>
          <Link to='/logout'>Logout</Link>
        </li>
      </ul>
        <Routes>
          <Route index element={<RequireAuth><NotesPages></NotesPages></RequireAuth>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signup" element={<SignupPage></SignupPage>}></Route>
          <Route path="/logout" element={<LogoutPage></LogoutPage>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}