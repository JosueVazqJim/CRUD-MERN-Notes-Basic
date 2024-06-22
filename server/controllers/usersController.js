const User = require("../models/user"); 
const bcrypt = require("bcryptjs");//para encriptar password
const jwt = require("jsonwebtoken"); //para el jwt token
//nuestro usuaio va a enviar este token con cada solicitud

const signup = async (req, res) => {
    try {
        //obtener el email y possword de la solicitud
        const {email, password} = req.body;
        //hash para el password
        const hashedPassword = bcrypt.hashSync(password, 8);
        //crear User con el modelo User y con la data
        await User.create({ email, password: hashedPassword});
        //respuesta
        res.sendStatus(200);//susful
    } catch(err) {
        res.sendStatus(400) //error generico
    }
   
}

const login = async (req, res) => {    
    try {
        //obtener el email y possword de la solicitud
        const {email, password} = req.body;
        //encontrar el usuario con el email de la solicitud, ya no con id
        const user= await User.findOne( {email} );
        if(!user) return res.sendStatus(401);
        //comparar password de la solicitud con el password hasheado
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch) return res.sendStatus(401);
        // crear un token jwt, el primer argumento es la data que hay que encriptar con un token y el segundo es una key para encriptar
        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET); //LE DAMOS EL CUERPO Y LO CODIFICAMOS CON LA VARIABEL DE AMBIENTE

        //enviar la cookie
        res.cookie("Authorization", token, { //se llama autorizacion y se le manda el token
            expires: new Date(exp),
            httpOnly: true, //para que solo el navegador y el server lean la cookie
            sameSite: "lax", //
            secure: process.env.NODE_ENV === "production"
        })
        res.sendStatus(200);
    } catch(err){
        res.sendStatus(400); //error generico
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch {
        res.sendStatus(400); //error generico
    }
}

const checkAuth = async (req, res) => {
    try {
        res.sendStatus(200);
        console.log('tas loco');
    } catch(err){
        res.sendStatus(400); //error generico
    }
}  


module.exports = { 
    signup, 
    login, 
    logout,
    checkAuth
}; //exportamos todas las funciones