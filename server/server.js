//CARGAR VARIABLES DE AMBIENTE
//el dotenv sirve para esto
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

//import dependencies
const express = require("express");
const connectToDb = require('./config/connectToDb');//este contiene el archivo de conexion, la funcion que conecta
const notesController = require('./controllers/notesControllers'); //importamos las funciones
const cors = require('cors'); //es para que el server acepte solicitudes de cualquier dominio, pues el el cliente tendra otra direccion y puerto
const usersController = require('./controllers/usersController');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/requireAuth,js')

//creando app de express para usarla luego en otros elementos
const app = express();

//configurando app de express para trabajar con json en las respuestas y solicitudes
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true

}));//se pueden restringir cirtos dominios, pero en este caso cualqiera puede solicitar
app.use(cookieParser());//ahora puede leer jason y cookies

//conectando a la bd
connectToDb();

//Rutas
//ruta de prueba de levantamiento del server, accediendo solo a localhost:3000
/*
app.get('/', (req, res) => {
    res.json({hello: 'world'});
});
*/
//el /notes... es para hacer las solicitudes hacia esa url, cada vez que se haga, va para alla
//son funciones que se ejecutan cuando la ruta coincide con la URL solicitada.

//el requireAuth, es para solicitar necesariamente credenciales para tratar de hacer una solicitud, esto desde postman o cualquier ootro lado
app.get('/notes', requireAuth, notesController.fetchNotes);
app.get('/notes/:id', requireAuth, notesController.fetchNote);
app.post('/notes', requireAuth, notesController.createNote);
app.put('/notes/:id', requireAuth, notesController.updateNote);
app.delete('/notes/:id', requireAuth, notesController.deleteNote);

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);

app.get("/check-auth", requireAuth, usersController.checkAuth);

//iniciar el server
app.listen(process.env.PORT);