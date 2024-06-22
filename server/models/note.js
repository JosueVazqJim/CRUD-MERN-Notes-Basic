const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: { //asociamos un user a cada nota
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Note = mongoose.model("Note", noteSchema); 
//modelo de mongoose para interactuar con la coleccion Note de mongo
//el parametro "Note" es el nombre del modelo, y const Note es la forma en como se va ir expotador el modelo para usarse

module.exports = Note; //exportamos el modelo

/* 
se utiliza para definir la estructura de los documentos que se almacenarán en la colección 
"Note" de tu base de datos MongoDB y proporciona una forma de interactuar con esos documentos desde tu aplicación Node.js.
*/