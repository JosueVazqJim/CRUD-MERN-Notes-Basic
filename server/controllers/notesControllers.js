const Note = require('../models/note'); //importamos el modelo

const fetchNotes = async (req, res) => { //solicitar todas las notes
    try {
        //encontrar las notes
        const notes = await Note.find({ user: req.user._id}); //esto es gracias a mongoose, crea coleccion en mongo. y con mongoose le indicamos la accion de la bd
        //busca las Notes donde user es igual a el id de quien hace la peticion
        //enviar como respuesta las notes
        res.json({ notes: notes});
    } catch(err) {
        console.log(err);
    }
};

const fetchNote = async (req, res) => { //solicitar una Note
    try {
        //sacar el id de la url gracias a express
        const noteId = req.params.id;
        //encontrar la note con ese id
        const note = await Note.findOne({_id: noteId, user: req.user._id}).exec();
        //responder con esa note
        res.json({ note: note });
    } catch(err) {
        console.log(err);
    }
};

const createNote = async (req, res) => { //cuando se haga un post en /notes que seria la ruta o solicitud va a correr esto
    //obtener la data del cuerpo de la solicitud. ademas, si no esta la coleccion notes, se crea en mongo
    try {
        const title = req.body.title;
        const body = req.body.body;
        //crear una note con esa data
        const note = await Note.create({
            title: title,
            body: body,
            user: req.user._id
        });
        //responder al cliente como respuesta la nueva note
        res.json({ note: note }); //como respuesta sera un json con la note creadas
    } catch(err) {
        console.log(err);
    }
};

const updateNote = async (req, res) => { //actualizar una Note
    try {
        //obtener id de la url
        const noteId = req.params.id;
        //obtener la data para actualizar del cuerpo de la solicitud
        const title = req.body.title;
        const body = req.body.body;
        //encontrar y actualizar registro
        const note = await Note.findOneAndUpdate( //busca quien la Note que coincida con el id de la nota y de quien creo la nota con el que
        //solicita la actualizacion
            {_id: noteId, user: req.user._id}, 
            {
                title: title,
                body: body
            }, { new: true }); //ese ultimo es para ver el note actualizado como respuesta
        //responder con la note actualizada
        res.json({ note: note })
    } catch(err) {
        console.log(err);
    }
    
};

const deleteNote = async (req, res) => { //borrar una note
    try {
        //obtener el id de los parámetros de la URL
        const noteId = req.params.id;
        //borrar el registro
        await Note.deleteOne({ _id: noteId, user: req.user._id});    
        //responder
        res.json( { success: "susful delete"} );
    }  catch(err) {
        console.log(err);
    }
   
};

module.exports = { 
    fetchNotes, 
    fetchNote, 
    createNote, 
    updateNote, 
    deleteNote
}; //exportamos todas las funciones