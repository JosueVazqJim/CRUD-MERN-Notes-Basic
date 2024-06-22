const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { //ahora en vez de ser una nota, solo con strings a mandar, ahora seran objetos los que se enviaran
    type: String,
    require: true,
    unique: true,
    lowerCase: true,
    index: true
  },
  password: {
    type: String,
    require: true
  },
  
});

const User = mongoose.model("User", userSchema); 
//modelo de mongoose para interactuar con la coleccion Note de mongo
//el parametro "Note" es el nombre del modelo, y const Note es la forma en como se va ir expotador el modelo para usarse

module.exports = User; //exportamos el modelo

/* 
se utiliza para definir la estructura de los documentos que se almacenarán en la colección 
"Note" de tu base de datos MongoDB y proporciona una forma de interactuar con esos documentos desde tu aplicación Node.js.
*/